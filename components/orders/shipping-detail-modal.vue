<template>
    <v-card>
        <v-card-title>Shipping detail</v-card-title>
    </v-card>
</template>
<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator";

    @Component
    export default class ShippingDetailModalComponent extends Vue {
        name(): string {
            return 'shipping-detail-modal-component';
        }
    }
</script>
