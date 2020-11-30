<template>
    <v-card color="#385F73" dark>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
        <v-card-text>{{text}}</v-card-text>
    </v-card>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";

    @Component
    export default class HighlightCardComponent extends Vue {
        @Prop({ type: String, required: true }) readonly title!: number;
        @Prop({ type: String, required: true }) readonly subtitle!: string;
        @Prop({type: String, required: false }) readonly text!: string;

        name() {
            return "highLight-card-component";
        }
    }
</script>
