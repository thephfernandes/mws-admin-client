<template>
  <v-card color="#385F73" dark>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class customerCard extends Vue {
  @Prop({ type: Number, required: true }) readonly title!: number;
  @Prop({ type: String, required: true }) readonly subtitle!: string;
  
  name() {
    return "CustomerCard";
  }
}
</script>
