<template>
  <div>
    <EditCharity :create="create" />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "nuxt-property-decorator";
import EditCharity from "@/components/content/charities/CharityEditor.vue";

@Component({
  components: {
    EditCharity,
  },
})

export default class extends Vue {
  private create = true;

  layout() {
    return "mws";
  }
}
</script>