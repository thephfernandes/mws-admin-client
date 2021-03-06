<template>
    <div>
        <v-card>
            <v-card-title>Edit invoice</v-card-title>
            <v-card-subtitle>
                <label class="block">Invoice {{invoiceId}}</label>
                <label v-if="invoice.sequenceNumber" class="block">Sequence number: {{invoice.sequenceNumber}}</label>
            </v-card-subtitle>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Match id" type="number" v-model="invoice.matchId" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Price" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.price" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="VAT" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.vat" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Payment handling" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.paymentHandling" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Shipping" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.shipping" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Shipping charge" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.shippingCharge" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Auction charge" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.auctionCharge" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Setup charge" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.setupCharge" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="VAT charge" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.vatCharge" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Total charge" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.totalCharge" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Club payout" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.clubPayout" outlined />
                        </v-col>
                    </v-row>
                    <v-row justify="space-around">
                        <v-btn color="error" @click="goBack">Cancel</v-btn>
                        <v-btn color="success" @click="updateInvoice">Update</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-text>
                <invoice-items-datatable class="mt-4" />
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import InvoiceItemsTable from "~/components/finance/invoice-items-datatable.vue";
    import Invoice from "~/models/invoice";

    @Component({
        components: {
            InvoiceItemsTable,
        }
    })
    export default class InvoiceDetailPage extends Vue {
        invoiceId: number = 0;
        invoice = new Invoice();

        layout(): string {
            return 'mws';
        }

        goBack(): void {
            this.$router.back();
        }

        updateInvoice(): void {
            this.$store.dispatch('invoices/updateInvoice', this.invoice)
                .then((response) => {
                if (response.status === 200) {
                    this.$router.push({name: 'finance-invoices', params: {id: this.invoiceId.toString()}});
                }
            })
                .catch((error) => {console.error(error)});
        }

        async created(): Promise<void> {
            this.invoiceId = parseInt(this.$route.params.id);
            await this.setInvoice();
        }

        async setInvoice(): Promise<void> {
            let invoice = this.$store.getters['invoices/getInvoice'](this.invoiceId);
            if(invoice === undefined && this.$store.getters["invoices/getInvoices"].length === 0)  {
                await this.$store.dispatch("invoices/getInvoicesSetToStore")
                invoice = this.$store.getters['invoices/getInvoice'](this.invoiceId);
            }
            this.invoice = Object.assign({}, invoice);
        }
    }
</script>
<style lang="scss" scoped>
.block {
    display: block;
}
</style>
