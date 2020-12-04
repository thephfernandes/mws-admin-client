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
              class="news-title"
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
        <v-file-input accept="image/*" label="Image"/>
        <FinishEdit @save-post="saveCharity" @delete-post="deleteCharity" />
      </v-card>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "nuxt-property-decorator";
import FinishEdit from "@/components/shared/FinishEdit.vue";

@Component({
  components: {
    FinishEdit,
  },
})
export default class EditCharity extends Vue {
  private id = 0;
  private create = false;
  private API_URL = "https://mws-cms-api.herokuapp.com";
  
  created() {
    this.id = parseInt(this.$route.params.id);
    this.create = this.id === 0;
    this.$store.dispatch("charity/fillCharity", { id: this.id });
  }

  get charity() {
    return this.$store.getters["charity/getCharity"];
  }

  saveCharity() {
    if (this.checkCharity()) {
      alert("Saving charity");
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

.news-title input {
  font-weight: bold;
}

.v-input--selection-controls__input label {
  color: #333;
}

.news-content {
  margin-bottom: 0.5rem;
}
</style>
