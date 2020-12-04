<template>
  <v-card flat tile class="post-api">
    <v-card-actions class="d-flex justify-space-between mb-6">
      <v-btn class="ma-2" @click="$emit('save-post')"  large color="primary">
        Save
      </v-btn>
      <v-btn
        class="ma-2"
        @click="revealdelete = true"
        large
        outlined
        color="error"
      >
        Delete
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-card
        flat
        tile
        v-if="revealdelete"
        class="transition-fast-in-fast-out v-card--reveal d-flex justify-space-between mb-6"
        style="height: 100%;"
      >
        <v-card-text class="text-subtitle-1 font-weight-bold text--primary">
          <div>
            Are you sure you want to delete or you just accidentally pressed on the button?
          </div>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn @click="$emit('delete-post')" color="error">
            Delete
          </v-btn>
          <v-btn @click="revealdelete = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {

  private revealdelete = false;

  layout() {
    return "mws";
  }  
}
</script>