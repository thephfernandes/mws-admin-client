<template>
  <v-card>
      <v-card-title>Add a slider</v-card-title>
      <v-card-text>
          <v-form>
              <v-row>
                  <v-col>
                      <v-text-field id="call-to-action-input" label="Call To Action" counter="32" v-model="callToAction"></v-text-field>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col>
                      <v-file-input label="Image" v-model="imagePath"></v-file-input>
                  </v-col>
              </v-row>
              <v-row align="end">
                  <v-col>
                      <v-btn @click="addSlider()">Add slider</v-btn>
                  </v-col>
              </v-row>
          </v-form>
      </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {
    private callToAction: string = "";
    private imagePath: string = "";

    layout() {
        return "mws";
    }

    private addSlider(): void {
        const slider = {
            text: this.callToAction,
            image: this.imagePath,
        }
        this.$store.commit("slider/add", slider);
    }
}
</script>

<style>
.v-form {
    padding: 1rem 4rem;
}

#call-to-action-input {
    padding-left: 24px;
}
</style>