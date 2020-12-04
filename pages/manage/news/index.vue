<template>
  <div>
    <News :posts="posts" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import News from "@/components/content/news/News.vue";

@Component({
  components: {
    News,
  },
})
export default class Index extends Vue {

  get posts() {
    let file = require("./posts.json")
    return file.posts;
  }

  layout() {
    return "mws";
  }
}
</script>