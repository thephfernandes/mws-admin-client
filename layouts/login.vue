<template>
    <v-app>
        <v-main class="background">
            <v-container>
              <nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Login extends Vue {

}
</script>
<style lang="scss" scoped>
    .background {
        background-image: url("https://www.danvillesoccer.net/wp-content/uploads/2014/01/soccer-background.jpg");
        background-position: center;
        background-size: cover;
        height: 100%;
    }
</style>
