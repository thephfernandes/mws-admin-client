<template>
  <div>
    <MatchEditor :create="create" />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "nuxt-property-decorator";
import MatchEditor from "@/components/matches/MatchEditor.vue";

@Component({
  components: {
    MatchEditor,
  },
})

export default class extends Vue {
  private create = false;

  layout() {
    return "mws";
  }
}
</script>