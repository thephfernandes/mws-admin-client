<template>
  <v-form v-if="match.id !== undefined">
    <v-container class="edit-charity">
      <div v-if="create" class="font-weight-bold">Add a new match</div>
      <v-row v-else>
        <v-card flat>
          <v-card-title
            class="text-h4 ml-n2"
            v-text="match.featured_club"
          ></v-card-title>
          <v-card-subtitle class="overline text-h6 ml-n2"
            >{{ match.teams }} | {{ formattedDate }}</v-card-subtitle
          >
          <v-card-text class="ml-n2 py-0 mb-n5">
            <v-select
              :items="agreements"
              label="Choose invoice agreement"
              outlined
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="mt-n6 download-club-invoice"
              @click="downloadClubInvoice(false)"
              large
              color="primary"
            >
              Create Club Invoice
            </v-btn>
            <v-btn 
              class="mt-n6 download-club-invoice" 
              @click="downloadClubInvoice(true)" 
              large 
              color="primary"
             >
                 Create final Club Invoice
            </v-btn>
            <FinishEdit @save-post="saveMatch" @delete-post="deleteMatch" />
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "nuxt-property-decorator";
import FinishEdit from "@/components/shared/FinishEdit.vue";

interface keyable {
  [key: string]: any;
}

@Component({
  components: {
    FinishEdit,
  },
})
export default class MatchEditor extends Vue {
  @Prop({ type: Boolean, required: true }) create!: boolean;
  private id = 0;
  private match: keyable = {};
  private name: string = "";

  async created() {
    this.id = this.create ? 0 : parseInt(this.$route.params.id);
    await this.$store.dispatch("matches/getMatchSetToStore", this.id);
    this.match = this.$store.getters["matches/getMatch"];
  }

    get agreements() {
        return this.$store.getters["matches/getAgreements"];
    }

    get formattedDate() {
        const arr = this.match.date.slice(0, 10).split("-");
        return arr[2] + "/" + arr[1] + "/" + arr[0].substring(2);
    }

    saveMatch() {
        if (this.checkMatch()) {
            this.$store.dispatch("match/updateMatch", this.match);
            alert("Saving match");
            this.$router.push({ path: "/match/scheduled" });
        }
    }

    downloadClubInvoice(final : boolean) {
        this.$store.dispatch("matches/downloadClubInvoice", {matchId: this.id, payload: {"final" : final}})
            .then(response => {
                const pdfLink = response.data;
                window.open(pdfLink)
            }
        ).catch(error => {
            alert(error)
        })
    }

    deleteMatch() {
        alert("Deleting match");
    }

    checkMatch() {
        if (false) {
        alert(
            "To add a new charity, please enter at least a title and the description"
        );
        return false;
        }
        return true;
    }

    layout() {
        return "mws";
    }
}
</script>

<style>
.edit-charity .v-card {
  padding: 0.5rem;
}

.charity-title input {
  font-weight: bold;
}

.v-input--selection-controls__input label {
  color: #333;
}
</style>
