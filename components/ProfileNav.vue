<template>
  <div class="profile">
    <strong v-html="greeting"></strong>
    <!-- <v-avatar size="36px">
      <img
        alt="avatar"
        src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
      />
    </v-avatar> -->
  </div>
</template>

<script lang="ts">
import { Prop, Vue } from "nuxt-property-decorator";

export default class ProfileNav extends Vue {
    name: string = 'Steve';

    get greeting() {
        return "Welcome, " + this.name;
    }
};
</script>

<style>
</style>