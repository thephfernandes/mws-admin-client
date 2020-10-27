<template>
  <v-app>
    <modalRoot />
    <v-app-bar
      dark
      dense
      clipped-left
      app
      :src="bannerImage"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(0,102,0,.8), rgba(51,255,51,.5)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-text-field label="Search" solo clearable dense></v-text-field>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list shaped>
        <div v-for="(item, i) in jsonData.menu" :key="i">
          <v-list-group v-if="item.children" :prepend-icon="item.icon">
            <template v-slot:activator>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </template>

            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-group v-if="child == 'Shirts'" sub-group>
                <template v-slot:activator>
                  <v-list-item-title v-text="child"></v-list-item-title>
                </template>
                <v-list-item v-for="(shirt, i) in shirts" :key="i" link>
                  <v-list-group v-if="shirt == 'European Shirts'" sub-group>
                    <template v-slot:activator>
                      <v-list-item-title v-text="shirt"></v-list-item-title>
                    </template>
                    <v-list-item
                      v-for="(league, i) in europeanShirts"
                      :key="i"
                      link
                    >
                      <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title v-text="league"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title v-text="shirt"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>

              <v-list-item-title v-else v-text="child"></v-list-item-title>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-item v-else :to="item.to" color="blue" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
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

  get shirts() {
    return ["European Shirts", "International Shirts"];
  }

  get europeanShirts() {
    return ["Premier League", "UEFA", "Spanish League"];
  }
}
</script>

<style lang="scss" scoped>
$width: 720px;

.v-text-field {
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  max-width: $width;
}
</style>