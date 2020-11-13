<template>
    <div>
        <v-card-title>Finance</v-card-title>
        <v-divider />
        <v-card-title>Invoices</v-card-title>
        <v-card-title>Purchase history</v-card-title>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "nuxt-property-decorator";

    @Component
    export default class FinanceComponent extends Vue {
        name(): string {
            return 'finance-component';
        }
    }
</script>