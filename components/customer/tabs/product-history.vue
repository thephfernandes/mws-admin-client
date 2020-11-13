<template>
    <div>
        <v-card-title>Product History</v-card-title>
        <v-divider />
        <v-card-title>Purchase history</v-card-title>
        <v-card-title>Bids</v-card-title>
        <v-card-title>Favourite items</v-card-title>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "nuxt-property-decorator";

    @Component
    export default class ProductHistoryComponent extends Vue {
        name(): string {
            return 'product-history-component';
        }
    }
</script>