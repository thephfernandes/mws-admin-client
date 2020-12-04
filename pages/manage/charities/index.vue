<template>
  <div>
    <Charities :charities="charities" :total="total" :total_last_month="total_last_month">
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

@Component({
  components: {
    Charities,
  },
})
export default class Index extends Vue {
  private month = "";
  private menu = false;
  private all_time = true;

  created() {
    this.fetchCharities(); 
    this.$store.dispatch("charity/fillTotalStat");
  }

  fetchCharities() {
    this.$store.dispatch("charity/fillCharities", { month: this.month });
  }

  get charities() {
    return this.$store.getters["charity/getCharities"]
  }

  get total() {
    return this.$store.getters["charity/getTotal"]
  }

  get total_last_month() {
    return this.$store.getters["charity/getTotalLastMonth"]
  }

  changeMonth() {
    this.all_time = false;
    this.fetchCharities();
  }

  resetMonth() {
    this.month = "";
    this.fetchCharities();
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
