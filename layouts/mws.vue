<template>
  <v-app>
    <modalRoot />
    <v-app-bar dark clipped-left app color="#35495e">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-toolbar-title v-text="title" class="mr-2" />
            <v-text-field
              label="Search"
              solo
              clearable
              dense
              v-model="search"
              hide-details
              prepend-inner-icon="mdi-magnify"
              class="search"
            />
            <v-spacer />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped width="320px">
      <v-list shaped>
        <div v-for="(item, i) in jsonData.menu" :key="i">
          <div
            class="nav-item-wrapper"
            v-if="item.productionReady || isDevelopment"
            :id="item.name + ' nav item'"
          >
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

                <v-list-item v-if="child.productionReady || isDevelopment" :to="child.to" color="blue" :id="child.name + ' nav item'" router exact>
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
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <breadcrumbs />
        <nuxt />
        <Snackbar/>
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
import Snackbar from '~/components/shared/Snackbar.vue'

@Component({
  components: {
    breadcrumbs,
    modalRoot,
    Snackbar
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

  get greeting() {
    if (this.$auth.user) {
      return "Welcome, " + this.$auth.user;
    } else {
      return;
    }
  }

  get isDevelopment() {
    return process.env.NODE_ENV === "development";
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

.search {
  margin-top: 0;
}
</style>