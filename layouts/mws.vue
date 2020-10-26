<template>
  <v-app>
    <modalRoot />
    <v-app-bar
      dark
      dense
      clipped-left
      app
      fade-img-on-scroll
      prominent
      shrink-on-scroll
      :src="bannerImage"
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(0,102,0,.8), rgba(51,255,51,.5)"></v-img>
      </template>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list shaped>
        <v-list-item v-for="(item, i) in jsonData.menu" :key="i" :to="item.to" color="blue" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <breadcrumbs />
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} | {{ title }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import breadcrumbs from "~/components/layout/breadcrumbs.vue";
import modalRoot from "~/components/layout/modalRoot.vue";

@Component({
  components: {
    breadcrumbs,
    modalRoot,
  },
})
export default class Mws extends Vue {
  private title: string = process.env.npm_package_name || "MWS Admin Portal";
  private drawer: boolean = true;
  private bannerImage: string =
    "https://source.unsplash.com/1600x900/?sport,football,soccer";

  get jsonData() {
    let file = require("~/assets/fakeData.json");
    return file;
  }
}
</script>
