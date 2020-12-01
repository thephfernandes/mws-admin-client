<template>
  <v-form>
    <v-container class="edit-news">
      <div class="font-weight-bold">Editing post ID {{ id }}</div>
      <br />
      <v-card outlined>
        <EditNews @save-post="savePost" @delete-post="deletePost"/>
        <v-checkbox
          v-model="post.Published"
          label="Published"
          color="success"
        />
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="Writer"
              placeholder="Writer"
              outlined
              hide-details="auto"
              v-model="post.Writer"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="Tags (seperated by only comma ',' and no other character)"
              placeholder="tags,separated by commas only,no spaces needed"
              outlined
              hide-details="auto"
              v-model="post.Tags"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Title"
              placeholder="Title"
              outlined
              hide-details="auto"
              v-model="post.Title"
              class="news-title"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              label="Preview"
              placeholder="Preview"
              outlined
              hide-details="auto"
              v-model="post.PreviewText"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Image"
              placeholder="How does this thing work hmm"
              outlined
              hide-details="auto"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              label="Tinymce not working"
              placeholder="Tinymce"
              outlined
              hide-details="auto"
              v-model="post.Content"
            />
          </v-col>
        </v-row>
        <EditNews @save-post="savePost" @delete-post="deletePost"/>
      </v-card>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Posts from "@/components/content/news/News.vue";
import EditNews from "@/components/content/news/EditNews.vue";
// import Editor from "@tinymce/tinymce-vue";

interface keyable { 
  [key: string]: any;
}

@Component({
  components: {
    Posts,
    EditNews,
  }
})

export default class EditPost extends Vue {
  private id = 0;
  private post: keyable = {};

  created() {
    this.id = parseInt(this.$route.params.editpost);
    this.getPost();
  }

  getPost() {
    let file = require("../posts.json");
    let post = file.posts.find((post: keyable) => post.id === this.id);
    this.post = post;
  }

  savePost() {
    if (this.checkTags()) {
      alert("Please do not use any apostrophe characters in the tags");
      return;
    }
    alert("Saving posts");
  }

  deletePost() {
    alert("Deleting posts");
  }

  checkTags() {
    return this.post.Tags.indexOf("'") >= 0 || this.post.Tags.indexOf('"') >= 0
      ? true
      : false;
  }

  layout() {
    return "mws";
  }
}
</script>

<style>
.edit-news .v-card {
  padding: 0.5rem;
}

.news-title input {
  font-weight: bold;
}

.v-input--selection-controls__input label {
  color: #333;
}
</style>
