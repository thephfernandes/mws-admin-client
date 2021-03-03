<template>
  <div>
    <v-row justify="center" align="center" v-if="loading">
      <v-progress-circular class="mt-10" indeterminate :size="100" color="green"></v-progress-circular>
    </v-row>
    <Matches v-else :matches="matches" :stats="stats" />
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
  private loading: boolean = true;

  async created() {
    await this.$store.dispatch("matches/getFinanceMatchesSetToStore");
    await this.$store.dispatch("matches/getStatsSetToStore");
    this.loading = false;
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
