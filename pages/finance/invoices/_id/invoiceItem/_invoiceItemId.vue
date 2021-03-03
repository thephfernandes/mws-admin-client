<template>
    <div>
        <v-card>
            <v-card-title>Edit invoice item</v-card-title>
            <v-card-subtitle>ID: {{invoiceItemId}}</v-card-subtitle>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field label="Title" type="text" v-model="invoiceItem.title" outlined />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field
                                    label="Price"
                                    type="number"
                                    v-model="invoiceItem.price"
                                    prepend-inner-icon="mdi-currency-eur"
                                    outlined
                            />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field
                                    label="VAT"
                                    type="number"
                                    v-model="invoiceItem.vat"
                                    prepend-inner-icon="mdi-currency-eur"
                                    outlined
                            />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field
                                    label="Payment handling"
                                    type="number"
                                    v-model="invoiceItem.paymentHandling"
                                    prepend-inner-icon="mdi-currency-eur"
                                    outlined
                            />
                        </v-col>
                        <v-col cols="12" md="6" lg="4">
                            <v-text-field
                                    label="Shipping"
                                    type="number"
                                    v-model="invoiceItem.shipping"
                                    prepend-inner-icon="mdi-currency-eur"
                                    outlined
                            />
                        </v-col>
                    </v-row>
                    <v-row justify="space-around">
                        <v-btn color="error" @click="goBack">Cancel</v-btn>
                        <v-btn color="success" @click="updateInvoiceItem">Update item</v-btn>
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
    export default class EditInvoiceItemPage extends Vue {
        invoiceId: number = 0;
        invoiceItemId: number = 0;
        invoiceItem: InvoiceItem = new InvoiceItem();

        layout(): string {
            return 'mws';
        }

        async created(): Promise<void> {
            this.invoiceId = parseInt(this.$route.params.id);
            this.invoiceItemId = parseInt(this.$route.params.invoiceItemId);
            const invoiceItem = this.$store.getters['invoices/getInvoiceItem'](this.invoiceItemId);
            this.invoiceItem = Object.assign({}, invoiceItem);
            if (invoiceItem === undefined) {
                if(this.$store.getters["invoices/getInvoicesItems"].length === 0) {
                    await this.$store.dispatch("invoices/getInvoiceItems", this.invoiceId)
                }
                this.getInvoiceItem();
            }
        }

        getInvoiceItem(): void {
            this.$store.dispatch('invoices/getInvoiceItem', {id: this.invoiceId, itemId: this.invoiceItemId})
                .then((response) => {
                    if (response.status === 200) {
                        this.invoiceItem = response.data;
                    }
                })
                .catch((error) => { console.error(error) })
        }



        goBack(): void {
            this.$router.back();
        }

        updateInvoiceItem(): void {
            this.$store.dispatch('invoices/updateInvoiceItem',
                {
                    item: this.invoiceItem,
                    id: this.invoiceItemId
                })
            .then((response) => {
                if (response.status === 200) {
                    this.$router.push(
                        {
                            name: 'finance-invoices-id',
                            params: {id: this.invoiceId.toString()}
                        });
                }
            })
            .catch((error) => { console.error(error) });
        }
    }
</script>
