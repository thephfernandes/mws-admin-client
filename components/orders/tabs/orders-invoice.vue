<template>
    <div>
        <v-card-title>Invoices</v-card-title>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-btn>Send invoice to request billing</v-btn>
                </v-col>
                <v-col>
                    <v-checkbox label="Invoice sent" hide-details />
                </v-col>
            </v-row>
        </v-card-text>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from "nuxt-property-decorator";

    @Component
    export default class OrdersInvoiceTab extends Vue {}
</script>
