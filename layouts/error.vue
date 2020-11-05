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

<script lang="ts">
  import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component
export default class Error extends Vue {
  pageNotFound: string = '404 Not Found';
  otherError: string = 'An error occurred';

  @Prop({ type: Object, required: false }) readonly error!: Object;

  layout() {
    return 'mws';
  }
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
