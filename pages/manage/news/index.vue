<template>
  <div>
    <Posts :posts="posts" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Posts from "@/components/content/news/News.vue";

@Component({
  components: {
    Posts,
  },
})
export default class Index extends Vue {
  private matches: Object[] = [
    {
      home_team: "manchester",
      away_team: "liverpool",
      match_date: "01-01-9999",
      finished: false,
    },
    {
      home_team: "chelsea",
      away_team: "totenham",
      match_date: "01-01-8888",
      finished: false,
    },
    {
      home_team: "lorem FC",
      away_team: "ipsum madrid",
      match_date: "01-01-7777",
      finished: false,
    },
  ];

  get posts() {
    let file = require("./posts.json")
    return file.posts;
  }

  layout() {
    return "mws";
  }
}
</script>

<style></style>
