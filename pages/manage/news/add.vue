<template>
  <div>
    <EditPost :create="create" />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "nuxt-property-decorator";
import EditPost from "@/components/content/news/NewsEditor.vue";

@Component({
  components: {
    EditPost,
  },
})

export default class extends Vue {
  private create = true;

  layout() {
    return "mws";
  }
}
</script>