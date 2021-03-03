<template>
  <v-snackbar class="snack-bar" v-model="show" :color="color">
    <div class="d-flex justify-space-between">
      <div class="snackbar-message">{{ message }}</div>
      <v-btn text @click="show = false">Close</v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class Snackbar extends Vue {

  private show = false;
  private message = '';
  private color = '';

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.show = true
      }
    })
  }
}
</script>
<style lang="scss">
.snack-bar {
  .v-snack__content {
    padding: 1rem 0.5rem 1rem 1rem;
  }
  
  .snackbar-message {
    padding-top: 0.5rem;
  }
}
</style>