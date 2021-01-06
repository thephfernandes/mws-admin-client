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

    const fullPathArray = this.$route.fullPath.split('/');
    let paths: Array<string> = [];
    fullPathArray.shift();
    fullPathArray.forEach((p: string, index: number) => {
      if (paths.length > 0) {
        paths.push(paths[index - 1] + '/' + p)
      } else {
        paths.push('/' + p);
      }

      let crumb = {
        text: p.charAt(0).toUpperCase() + p.slice(1),
        href: paths[index],
        disabled: false
      };
      crumbs.push(crumb);
    });

    crumbs[crumbs.length - 1].disabled = true;

    return crumbs;
  }
}
</script>
