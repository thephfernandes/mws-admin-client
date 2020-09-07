<template>
  <v-app>
    <v-app-bar
      dense
      clipped-left
      app
      src="https://picsum.photos/1200/300/?blur"
      fade-img-on-scroll
      prominent
      shrink-on-scroll
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item v-for="(item, i) in menu" :key="i" :to="item.to" router exact>
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
        <v-container>
          <breadcrumbs />
        </v-container>
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

@Component({
  components: {
    breadcrumbs,
  },
})
export default class Mws extends Vue {
  private title: string = process.env.npm_package_name || "MWS Admin Portal";
  private drawer: boolean = true;
  private menu = [
    {
      name: "Home",
      icon: "mdi-home",
      to: "/",
    },
    {
      name: "Customers",
      icon: "mdi-account-group",
      to: "/customers",
    },
    {
      name: "Matches",
      icon: "mdi-account-group",
      to: "/",
    },
  ];
}
</script>
