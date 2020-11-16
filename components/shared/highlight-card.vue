<template>
    <v-card color="#385F73" dark>
        <v-card-title v-if="currency == null">{{ title }}</v-card-title>
        <v-card-title v-if="currency == 0">&euro; {{ formatCurrency(title) }}</v-card-title>
        <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    </v-card>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";

    @Component
    export default class HighlightCardComponent extends Vue {
        @Prop({ type: Number, required: true }) readonly title!: number;
        @Prop({ type: String, required: true }) readonly subtitle!: string;
        @Prop({type: Number, required: false }) readonly currency!: number;

        name() {
            return "highLight-card-component";
        }

        formatCurrency(price: number): string {
            const totalAmountSpent = price.toFixed(2);
            return totalAmountSpent.replace('.', ',');
        }
    }
</script>
