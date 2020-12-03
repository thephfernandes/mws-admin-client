<template>
    <div>
        <v-card>
            <v-card-title>Add a new seller</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.name" label="Seller name" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.invoiceIdPrefix" label="Invoice Prefix" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.vatNumber" label="VAT number" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.country" label="Country" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.address1" label="Address 1" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.address2" label="Address 2" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.email" label="Email" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.website" label="Website" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.nextInvoiceId" label="Next InvoiceId" outlined />
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-row justify="space-around">
                            <v-btn color="error" @click="goBack">Cancel</v-btn>
                            <v-btn color="success" @click="addSeller">Update</v-btn>
                        </v-row>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import {Order} from "~/models/order";

@Component
export default class AddSellerPage extends Vue {
    seller: Order = new Order();

    goBack(): void {
        this.$router.back();
    }

    addSeller(): void {
        this.$store.dispatch('sellers/addSeller', this.seller).then((response) => {
            console.log(response);
            this.$router.push({name: 'finance-sellers'});
        });
    }

    layout(): string {
        return 'mws';
    }
}
</script>
