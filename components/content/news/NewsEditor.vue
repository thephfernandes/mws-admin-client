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
            <div class="text-body-2 font-weight-bold news-content">Content</div>
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
import { Prop, Component, Vue } from "nuxt-property-decorator";
import FinishEdit from "@/components/shared/FinishEdit.vue";
import Editor from "@tinymce/tinymce-vue";
import { INews } from "~/interfaces/INews";
import { News } from "~/models/news"

@Component({
  components: {
    FinishEdit,
    Editor,
  },
})
export default class EditPost extends Vue {
  @Prop({ type: Boolean, required: true }) create!: boolean;
  private id = 0;
  private post: INews = new News;
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
    this.id = this.create ? 0 : parseInt(this.$route.params.id);
    this.$store.dispatch("news/getPostSetToStore", { id: this.id }).then(() => {
      const post = this.$store.getters["news/getPost"];
      this.post = Object.assign({}, post);
    });
    this.$store.dispatch("news/getFileUrlsSetToStore", { id: this.id });
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

  savePost() {
    if (this.checkPost()) {
      this.$store.dispatch("news/updatePost", this.post)
      alert("Saving posts");
      this.$router.push({ path: "/manage/news" });
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