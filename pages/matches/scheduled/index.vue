<template>
  <div>
    <div>This is working rite</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Charities from "@/components/content/charities/Charities.vue";

@Component({
  components: {
    Charities,
  },
})
export default class Index extends Vue {

  fetchMatches() {
    this.$store.dispatch("matches/fillMatches")
  }
  
  created() {
    console.log("on");
  }
  
  layout() {
    return "mws";
  }
}
</script>