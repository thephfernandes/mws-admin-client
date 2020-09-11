<template>
  <div class="modal">
    <v-dialog v-model="isOpen" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>
          <slot />
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn @click="isOpen = !isOpen">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class modal extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: Boolean, required: true }) isOpen!: boolean;
}
</script>
