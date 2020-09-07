<template>
  <div>
    <v-breadcrumbs :items="getBreadcrumbs()"></v-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Breadcrumbs extends Vue {
  name() {
    return "breadcrumbs";
  }
  getBreadcrumbs() {
    let crumbs: Array<any> = [];
    const pathArray = this.$route.path.split("/");
    pathArray.shift();
    pathArray.forEach((el, idx, array) => {
      let crumb = {
        text: el.charAt(0).toUpperCase() + el.slice(1),
        href: `/${el}`,
        disabled: false,
      };
      crumbs.push(crumb);
    });
    return crumbs;
  }
}
</script>
