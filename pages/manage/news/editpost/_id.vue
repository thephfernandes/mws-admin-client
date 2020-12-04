<template>
  <v-form>
    <v-container class="edit-news">
      <div v-if="create" class="font-weight-bold">Create a new post</div>
      <div v-else class="font-weight-bold">Editing post ID {{ id }}</div>
      <br />
      <v-card outlined>
        <FinishEdit @save-post="savePost" @delete-post="deletePost" />
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
            <v-select
              label="Preview Image"
              placeholder="Preview Image"
              outlined
              hide-details="auto"
              :items="fileNames()"
              v-model="post.PreviewImage"
              :disabled="!fileNames().length"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-img
              contain
              v-if="post.PreviewImage"
              :src="
                'https://matchwornshirt.imgix.net/news/' +
                  this.id +
                  '/' +
                  post.PreviewImage
              "
              max-height="400"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="text-body-1 news-content">Post Content</div>
            <Editor
              api-key="no-api-key"
              v-model="post.Content"
              :init="editorInit"
            />
          </v-col>
        </v-row>
        <FinishEdit @save-post="savePost" @delete-post="deletePost" />
      </v-card>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Posts from "@/components/content/news/News.vue";
import FinishEdit from "@/components/content/news/UploadNews.vue";
import Editor from "@tinymce/tinymce-vue";

interface keyable {
  [key: string]: any;
}

@Component({
  components: {
    Posts,
    FinishEdit,
    Editor,
  },
})
export default class EditPost extends Vue {
  private id = 0;
  private create = false;
  private post: keyable = {};
  private API_URL = "https://mws-cms-api.herokuapp.com";
  private editorInit = {
    images_upload_url: "/upload",
    image_title: true,
    plugins: [
      "advlist autolink autoresize lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
    ],
    images_upload_handler: "",
  };

  created() {
    this.id = parseInt(this.$route.params.id);
    this.create = this.id === 0;
    this.getPost();
    this.$store.dispatch("news/fillFileUrls", { id: this.id });
    // this.getFilesForPost();
  }

  fileNames() {
    const fileNames = [];
    for (const file of this.fileUrls) {
      let name = file.replace(
        "https://matchwornshirt.imgix.net/news/" + this.id + "/",
        ""
      );
      fileNames.push(name);
    }
    return fileNames;
  }

  get fileUrls() {
    return this.$store.getters["news/getFileUrls"];
  }

  getPost() {
    if (!this.create) {
      // will be replaced with real API
      let file = require("../posts.json");
      let post = file.posts.find((post: keyable) => post.Id === this.id);
      this.post = {
        ...post,
        PreviewImage: post.PreviewImage.replace(
          "https://matchwornshirt.imgix.net/news/" + this.id + "/",
          ""
        ),
      };
    } else {
      this.post = {
        Id: 0,
        Title: "",
        PreviewText: "",
        Content: "",
        Writer: "",
        Tags: "",
        Published: false,
        Created: "",
        PreviewImage: "",
      };
    }
  }

  savePost() {
    if (this.checkPost()) {
      alert("Saving posts");
    }
  }

  deletePost() {
    alert("Deleting posts");
  }

  checkPost() {
    if (!this.post.Title || !this.post.Writer) {
      alert(
        "To create a new news post, please enter at least a title and the writer name"
      );
      return false;
    } else if (
      this.post.Tags.indexOf("'") >= 0 ||
      this.post.Tags.indexOf('"') >= 0
    ) {
      alert("Please do not use any apostrophe characters in the tags");
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
.edit-news .v-card {
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
