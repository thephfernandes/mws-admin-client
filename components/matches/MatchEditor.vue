<template>
  <v-form>
    <v-container class="edit-charity">
      <div v-if="create" class="font-weight-bold">Add a new charity</div>
      <div v-else class="font-weight-bold">Editing charity ID {{ id }}</div>
      <br />
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "nuxt-property-decorator";
import FinishEdit from "@/components/shared/FinishEdit.vue";

@Component({
  components: {
    FinishEdit,
  },
})
export default class MatchEditor extends Vue {
  @Prop({ type: Boolean, required: true }) create!: boolean;
  private id = 0;
  // private charity: Charity = new Charity();
  private match = {};

  created() {
    this.id = this.create ? 0 : parseInt(this.$route.params.id);
    this.$store
      .dispatch("matches/getMatchSetToStore", { id: this.id })
      .then(() => {
        const match = this.$store.getters["matches/getMatch"];
        this.match = Object.assign({}, match);
      });
  }

  get invoices() {
    return this.$store.getters["matches/getInvoices"];
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
