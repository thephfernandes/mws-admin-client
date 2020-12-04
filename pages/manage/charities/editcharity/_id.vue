<template>
  <v-form>
    <v-container class="edit-charity">
      <div v-if="create" class="font-weight-bold">Add a new charity</div>
      <div v-else class="font-weight-bold">Editing charity ID {{ id }}</div>
      <br />
      <v-card outlined>
        <FinishEdit @save-post="saveOrg" @delete-post="deleteOrg" />
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Title"
              placeholder="Title"
              outlined
              hide-details="auto"
              v-model="org.title"
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
              v-model="org.description"
            />
          </v-col>
        </v-row>
        <v-file-input accept="image/*" label="Image"/>
        <FinishEdit @save-post="saveOrg" @delete-post="deleteOrg" />
      </v-card>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "nuxt-property-decorator";
import FinishEdit from "@/components/content/charities/UploadCharity.vue";

interface keyable {
  [key: string]: any;
}

@Component({
  components: {
    FinishEdit,
  },
})
export default class EditOrg extends Vue {
  private id = 0;
  private create = false;
  private org: keyable = {};
  private API_URL = "https://mws-cms-api.herokuapp.com";
  
  created() {
    this.id = parseInt(this.$route.params.id);
    this.create = this.id === 0;
    this.getOrg();
  }

  getOrg() {
    if (!this.create) {
      axios
      .post(
        this.API_URL + "/api/v1/charities"
      )
      .then((response) => response.data)
      .then((response) => {
        this.org = response.find((org: keyable) => org.id === this.id)
      });
    } else {
      this.org = {
        id: 0,
        title: '',
        total_raised: 0,
        description: '',
      };
    }
  }

  saveOrg() {
    if (this.checkOrg()) {
      alert("Saving charity");
    }
  }

  deleteOrg() {
    alert("Deleting charity");
  }

  checkOrg() {
    if (!this.org.title || !this.org.description) {
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
