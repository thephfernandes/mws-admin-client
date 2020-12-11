<template>
  <v-form>
    <v-container class="edit-charity">
      <div v-if="create" class="font-weight-bold">Add a new match</div>
      <div v-else class="font-weight-bold">Editing match ID {{ id }}</div>
      <br />
      <div class="text-h4">Teams: {{ match.teams }}</div>
      <br />
      <div class="text-h5">Featured club: {{ match.featured_club }}</div>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6" md="4">
          <v-text-field
            label="Name"
            placeholder="Put your name here"
            v-model="name"
            outlined
          />
        </v-col>
        <v-col class="d-flex" cols="12" sm="6" md="4">
          <v-select
            :items="agreements"
            label="Choose invoice agreement"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <br />
      <FinishEdit @save-post="saveMatch" @delete-post="deleteMatch" />
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
  // private charity: Charity = new Charity();
  private match: keyable = {};
  private name: string = "";

  created() {
    this.id = this.create ? 0 : parseInt(this.$route.params.id);
    this.$store
      .dispatch("matches/getMatchSetToStore", { id: this.id })
      .then(() => {
        const match = this.$store.getters["matches/getMatch"];
        this.match = Object.assign({}, match);
      });
  }

  get agreements() {
    return this.$store.getters["matches/getAgreements"];
  }

  saveMatch() {
    if (this.checkMatch()) {
      this.$store.dispatch("match/updateMatch", this.match);
      alert("Saving match");
      this.$router.push({ path: "/manage/charities" });
    }
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
