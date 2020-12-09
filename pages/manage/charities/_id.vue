<template>
  <div>
    <EditCharity :create="create" />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "nuxt-property-decorator";
import EditCharity from "@/components/content/charities/Editor.vue";

@Component({
  components: {
    EditCharity,
  },
})

export default class extends Vue {
  private create = false;

  layout() {
    return "mws";
  }
}
</script>