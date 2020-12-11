<template>
    <div>
        <v-card>
            <v-card-title>Add invoice</v-card-title>
            <v-card-subtitle>Sequence number: {{invoice.SequenceNumber}}</v-card-subtitle>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Match Id" type="number" v-model="invoice.MatchId" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Agreement Id" type="number" v-model="invoice.AgreementId" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Price" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.Price" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="VAT" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.Vat" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Payment handling" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.PaymentHandling" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Shipping" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.Shipping" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Shipping charge" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.ShippingCharge" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Auction charge" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.AuctionCharge" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Setup charge" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.SetupCharge" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="VAT charge" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.VatCharge" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Total charge" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.TotalCharge" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Club payout" type="number" prepend-inner-icon="mdi-currency-eur" v-model="invoice.ClubPayout" outlined />
                        </v-col>
                    </v-row>
                    <v-row justify="space-around">
                        <v-btn color="error" @click="goBack">Cancel</v-btn>
                        <v-btn color="success" @click="AddInvoice">Add</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator";
    import Invoice from "~/models/invoice";

    @Component
    export default class AddInvoicePage extends Vue {
        invoice: Invoice = new Invoice();

        layout(): string {
            return 'mws';
        }

        AddInvoice(): void {
            if (this.invoice.AgreementId === 0 || this.invoice.MatchId === 0) return;
            this.$store.dispatch('invoices/addInvoice', this.invoice)
                .then((response) => {
                if (response.status === 200) {
                    this.$router.push({name: 'finance-invoices'});
                }
            })
                .catch((error) => { console.error(error) });
        }

        goBack(): void {
            this.$router.back();
        }
    }
</script>
