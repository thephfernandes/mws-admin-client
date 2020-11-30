<template>
    <v-app>
        <v-app-bar dark dense clipped-left app color="#35495e">
            <strong>Sign in to MWS Admin Portal</strong>
        </v-app-bar>
        <v-main class="background">
            <v-container>
                <nuxt/>
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
        background-image: url("https://source.unsplash.com/1600x900/?soccer");
        background-position: center;
        background-size: cover;
        height: 100%;
    }
</style>
