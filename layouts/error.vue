<template>
  <v-app>
    <v-img src="/404.GIF" alt="404 gif" contain="true" max-height="200" />
    <v-alert type="error">
      <h1 v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
      <h1 v-else>{{ otherError }}</h1>
    </v-alert>
    <v-btn nuxt="true" to="/">Home page</v-btn>
  </v-app>
</template>

<script>
export default {
  layout: "mws",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
}
.error {
  padding-top: 10px;
  margin-top: 10px;
}
</style>
