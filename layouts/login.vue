<template>
    <v-app>
        <v-app-bar dark dense clipped-left app color="#35495e">
            <strong>Sign in to MWS Admin Portal</strong>
        </v-app-bar>
        <nuxt/>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Login extends Vue {

}
</script>
