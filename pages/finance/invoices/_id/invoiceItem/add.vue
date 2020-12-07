<template>
    <div>
        <v-card>
            <v-card-title>Add invoice item</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Title" type="text" v-model="invoiceItem.Title" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field
                                    label="Price"
                                    type="number"
                                    v-model="invoiceItem.Price"
                                    prepend-inner-icon="mdi-currency-eur"
                                    outlined
                            />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field
                                    label="VAT"
                                    type="number"
                                    v-model="invoiceItem.Vat"
                                    prepend-inner-icon="mdi-currency-eur"
                                    outlined
                            />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field
                                    label="Payment handling"
                                    type="number"
                                    v-model="invoiceItem.PaymentHandling"
                                    prepend-inner-icon="mdi-currency-eur"
                                    outlined
                            />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field
                                    label="Shipping"
                                    type="number"
                                    v-model="invoiceItem.Shipping"
                                    prepend-inner-icon="mdi-currency-eur"
                                    outlined
                            />
                        </v-col>
                    </v-row>
                    <v-row justify="space-around">
                        <v-btn color="error" @click="goBack">Cancel</v-btn>
                        <v-btn color="success" @click="addInvoiceItem">Add item</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import InvoiceItem from "~/models/invoiceItem";

    @Component
    export default class AddInvoiceItemPage extends Vue {
        invoiceId: number = 0;
        invoiceItem: InvoiceItem = new InvoiceItem();

        created(): void {
            this.invoiceId = parseInt(this.$route.params.id);
            this.invoiceItem.InvoiceId = this.invoiceId;
        }
        layout(): string {
            return 'mws';
        }

        goBack(): void {
            this.$router.back();
        }

        addInvoiceItem(): void {
            if (this.invoiceItem.Title === '') return;
            console.log(this.invoiceItem);
            this.$store.dispatch('invoices/addInvoiceItem', this.invoiceItem)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.$router.push({name: 'finance-invoices', params: {id: this.invoiceId.toString()}});
                    }
                })
                .catch((error) => { console.error(error)});
        }
    }
</script>
