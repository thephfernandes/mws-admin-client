<template>
  <v-container class="slider-images">
    <v-row>
      <v-col>
        <draggable
          tag="v-layout"
          group="slides"
          v-model="sliders"
          @start="drag = true"
          @end="drag = false"
        >
          <Slide
            v-for="(item, index) in sliders"
            :key="index"
            :callToAction="item.text"
            :imagePath="item.image"
          />
        </draggable>
      </v-col>
    </v-row>

    <v-row justify="end">
      <v-col>
        <nuxt-link
          to="/manage/slides/add"
          class="v-btn v-btn--container theme--light v-size--default ml-auto"
        >
          Create new slider
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Slide from "~/components/content/sliders/Slide.vue";
import draggable from "vuedraggable";

@Component({
  components: {
    Slide,
    draggable,
  },
})
export default class Index extends Vue {
  sliders = [];

  layout(): string {
    return "mws";
  }

  get jsonData() {
    let file = require("~/assets/menuStructure.json");
    return file;
  }

  mounted() {
    this.sliders = this.jsonData.sliders;
  }
}
</script>

<style>
.layout {
  flex-flow: row wrap;
}
</style>
