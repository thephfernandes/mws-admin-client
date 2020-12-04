<template>
  <div>
    <Charities :orgs="orgs" :total="total" :total_last_month="total_last_month">
      <v-card flat tile class="control-board justify-space-between">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="month"
                  label="Display data by month"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="month"
                type="month"
                :max="new Date().toISOString().substr(0, 7)"
                min="2017-01"
                @input="menu = false"
                @change="changeMonth"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-checkbox
              v-model="all_time"
              label="Display data in total"
              :disabled="all_time"
              @change="resetMonth"
            />
          </v-col>
        </v-row>
        <nuxt-link
          :to="'/manage/charities/editcharity/0'"
          title="Add a new charity"
        >
          <v-btn color="primary" class="new-charity">
            Add a new charity
          </v-btn>
        </nuxt-link>
      </v-card>
    </Charities>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Charities from "@/components/content/charities/Charities.vue";
import axios from "axios";

interface keyable {
  [key: string]: any;
}

@Component({
  components: {
    Charities,
  },
})
export default class Index extends Vue {
  private orgs: keyable[] = [];
  private API_URL = "https://mws-cms-api.herokuapp.com";
  private total = "";
  private total_last_month = "";
  private month = "";
  private menu = false;
  private all_time = true;

  created() {
    this.fetchCharities("");
    this.fetchTotalRaised();
  }

  fetchCharities(month: string) {
    // get all organizations
    const ym = month === "" ? "" : month.split("-");
    axios
      .post(
        this.API_URL + "/api/v1/charities",
        ym === "" ? {} : { Year: ym[0], Month: ym[1] }
      )
      .then((response) => response.data)
      .then((response) => {
        this.orgs = [];
        for (let org of response) {
          this.orgs.push({
            ...org,
            description: this.cutShort(org.description) + "...",
          });
        }
      });
  }

  fetchTotalRaised() {
    axios
      .get(this.API_URL + "/api/v1/charities/dashboard")
      .then((response) => response.data)
      .then((response) => {
        this.total = "€ " + response.total_amount_raised.toLocaleString();
        this.total_last_month =
          "€ " + response.total_amount_raised_last_month.toLocaleString();
      });
  }

  cutShort(str: any) {
    let L = str.length,
      i = -1,
      n = 25;
    while (n-- && i++ < L) {
      i = str.indexOf(" ", i);
      if (i < 0) break;
    }
    return str.slice(0, i);
  }

  changeMonth() {
    this.all_time = false;
    this.fetchCharities(this.month);
  }

  resetMonth() {
    this.month = "";
    this.fetchCharities(this.month);
  }

  layout() {
    return "mws";
  }
}
</script>

<style>
.control-board {
  margin-bottom: 1rem;
}

label.v-label--is-disabled {
  color: #5a6 !important;
}
</style>
