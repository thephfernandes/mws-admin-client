<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-group v-for="cat in categories" :key="cat.name" :prepend-icon="cat.icon">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="cat.name"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="item in categories.items" :key="item">
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" color="light-green lighten-4" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Default extends Vue {
  private clipped: boolean = false;
  private drawer: boolean = false;
  private fixed: boolean = false;
  private items = [
    {
      icon: "mdi-apps",
      title: "Welcome",
      to: "/",
    },
    {
      icon: "mdi-chart-bubble",
      title: "Inspire",
      to: "/inspire",
    },
    {
      icon: "mdi-account",
      title: "Login",
      to: "/login",
    },
  ];
  private categories = [
    {
      icon: "mdi-content-save-edit",
      name: "CMS",
      items: ["Add product"],
    },
    {
      icon: "mdi-account-group",
      name: "CRM",
      items: ["Inbox"],
    },
    {
      icon: "mdi-cash-check",
      name: "Finance",
      items: ["Overview"],
    },
  ];
  private miniVariant: boolean = false;
  private right: boolean = true;
  private rightDrawer: boolean = false;
  private title: string = "MatchWornShirt Admin Panel";
}
</script>
