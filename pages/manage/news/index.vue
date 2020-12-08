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

  created() {
    this.$store.dispatch("news/fillPosts");
  }

  get posts() {
    return this.$store.getters["news/getPosts"]
  }

  layout() {
    return "mws";
  }
}
</script>