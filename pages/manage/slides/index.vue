<template>
  <v-container class="slider-images">
      <v-row>
          <v-col v-for="(item, index) in jsonData.sliders" :key="index">
              <Slide :callToAction="item.text" :imagePath="item.image"/>
          </v-col>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Slide from "~/components/content/Slide.vue"

@Component({
    components: {
        Slide
    }
})
export default class Index extends Vue {
    layout(): string {
        return "mws";
    }

    get jsonData() {
    let file = require("~/assets/menuStructure.json");
    return file;
  }
}
</script>

<style>

</style>