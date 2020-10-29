<template>
  <v-card width="500px"> 
      <v-img
        :src="imagePath"
        class="white--text align-end"
        gradient="to bottom, rgba(0, 0, 0, .1), rgba(0, 0, 0, 0.5)"
      >
        <v-card-title v-text="callToAction"></v-card-title>
      </v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class Slide extends Vue {
  @Prop({ type: String, required: true }) readonly callToAction!: string;
  @Prop({ type: String, required: true }) readonly imagePath!: string;
}
</script>

<style>
</style>