<template>
  <h1>{{ this.$route.params }}</h1>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  layout() {
    return "mws";
  }
}
</script>