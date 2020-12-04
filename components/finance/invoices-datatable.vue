<template>
    <div>
        <v-data-table
                :items="invoices"
                :headers="headers"
                :loading="loading"
                loading-text="Loading invoices..."
        >
        </v-data-table>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from "nuxt-property-decorator";
    import {IInvoice} from "~/interfaces/IInvoice";

    @Component
    export default class InvoicesDatatableComponent extends Vue {
        loading: boolean = true;

        created(): void {
            this.$store.dispatch('invoices/fillInvoices');
        }

        @Watch('invoices')
        onLoadingInvoices(invoices: IInvoice[]) {
            if (invoices.length > 0) {
                this.loading = false;
            }
        }

        get invoices(): IInvoice[] {
            return this.$store.getters['invoices/getInvoices'];
        }

        get headers() {
            return [
                {
                    text: 'Id',
                    value: 'id'
                }
            ];
        }

    }
</script>