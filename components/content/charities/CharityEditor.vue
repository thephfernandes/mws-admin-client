<template>
  <v-form>
    <v-container class="edit-charity">
      <div v-if="create" class="font-weight-bold">Add a new charity</div>
      <div v-else class="font-weight-bold">Editing charity ID {{ id }}</div>
      <br />
      <v-card outlined>
        <FinishEdit @save-post="saveCharity" @delete-post="deleteCharity" />
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Title"
              placeholder="Title"
              outlined
              hide-details="auto"
              v-model="charity.title"
              class="charity-title"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              label="Description"
              placeholder="Description"
              outlined
              hide-details="auto"
              v-model="charity.description"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-file-input
              accept="image/*"
              placeholder="Upload image"
              prepend-icon=""
              append-icon="mdi-camera"
              outlined
              filled
            >
            </v-file-input>
          </v-col>
        </v-row>
        <FinishEdit @save-post="saveCharity" @delete-post="deleteCharity" />
      </v-card>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "nuxt-property-decorator";
import FinishEdit from "@/components/shared/FinishEdit.vue";
import { ICharity } from "~/interfaces/ICharity";
import { Charity } from "~/models/charity";

@Component({
  components: {
    FinishEdit,
  },
})
export default class EditCharity extends Vue {  
  @Prop({ type: Boolean, required: true }) create!: boolean;
  private id = 0;
  private charity: Charity = new Charity();

  created() {
    this.id = this.create ? 0 : parseInt(this.$route.params.id);
    this.$store.dispatch("charity/fillCharity", { id: this.id }).then(() => {
      const charity = this.$store.getters["charity/getCharity"];
      this.charity = Object.assign({}, charity);
    });
  }

  saveCharity() {
    if (this.checkCharity()) {
      this.$store.dispatch("charity/updateCharity", this.charity);
      alert("Saving charity");
      this.$router.push({ path: "/manage/charities" });
    }
  }

  deleteCharity() {
    alert("Deleting charity");
  }

  checkCharity() {
    if (!this.charity.title || !this.charity.description) {
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
