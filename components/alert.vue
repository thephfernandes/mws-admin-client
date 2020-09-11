<template>
  <div class="alert-test">
    <p>{{ text }}</p>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class Alert extends Vue {
  @Prop({ type: String, required: true }) readonly text!: string;
}
</script>
