<template>
  <div>
    <Matches :matches="matches" :stats="stats" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Matches from "@/components/matches/Matches.vue";

@Component({
  components: {
    Matches,
  },
})
export default class Index extends Vue {
  created() {
    this.$store.dispatch("matches/getMatchesSetToStore");
    this.$store.dispatch("matches/getStatsSetToStore");
  }

  get matches() {
    return this.$store.getters["matches/getMatches"];
  }

  get stats() {
    return this.$store.getters["matches/getStats"];
  }

  layout() {
    return "mws";
  }
}
</script>
