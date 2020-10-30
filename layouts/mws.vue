<template>
  <v-app>
    <modalRoot />
    <v-app-bar dark dense clipped-left app color="#35495e">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-container class="mr-auto">
        <v-row>
          <v-col cols="12">
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-text-field label="Search" solo clearable dense v-model="search">
            </v-text-field>
            <div class="profile-greeting ml-auto">
              <strong v-html="greeting"></strong>
              <v-avatar size="36px"></v-avatar>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list shaped>
        <div v-for="(item, i) in jsonData.menu" :key="i">
          <v-list-group v-if="item.children" :prepend-icon="item.icon">
            <template v-slot:activator>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </template>

            <div
              v-for="(child, i) in item.children"
              class="wrapper"
              :key="i"
              link
            >
              <v-list-group
                v-if="child.name == 'Shirts'"
                sub-group
                class="product-group"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="child.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="(shirtType, i) in shirts" :key="i" link>
                  <v-list-item>
                    <v-list-item-title v-text="shirtType"></v-list-item-title>
                  </v-list-item>
                </v-list-item>
              </v-list-group>

              <v-list-item v-else :to="child.to" color="blue" router exact>
                <v-list-item-content>
                  <v-list-item-title v-text="child.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-group>

          <v-list-item
            v-else
            :to="item.to"
            color="blue"
            router
            exact
            class="product-item"
          >
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
  private search: string = "";

  get jsonData() {
    let file = require("~/assets/menuStructure.json");
    return file;
  }

  get greeting(): string {
    return "Welcome, " + this.jsonData.profile.name;
  }
  get shirts(): string[] {
    return ["European Shirts", "International Shirts"];
  }
}
</script>

<style lang="scss" scoped>
$width: 520px;

.col {
    display: flex;
    align-items: center;
}

.v-text-field {
    margin-top: 1.5rem;
    padding: 0.5rem 1rem;
    max-width: $width;
}

.v-list-group {
    .v-list-item {
        padding-left: 71px;
    }
}
</style>