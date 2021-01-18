<template>
    <div>
        <v-card>
            <v-card-title>{{seller.name}}</v-card-title>
            <v-card-subtitle>
                Next invoice prefix:
                {{seller.invoiceIdPrefix}}{{seller.nextInvoiceId}}
            </v-card-subtitle>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.name" label="Seller name" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.invoiceIdPrefix" label="Invoice Prefix" disabled outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="seller.vatNumber" label="VAT number" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-autocomplete
                                v-model="seller.country"
                                :items="countries"
                                outlined label="Country"
                                clearable
                            />
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
                            <v-text-field v-model="seller.nextInvoiceId" label="Next InvoiceId" outlined disabled />
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-row justify="space-around">
                            <v-btn color="error" @click="goBack">Cancel</v-btn>
                            <v-btn color="success" @click="updateSeller">Update</v-btn>
                        </v-row>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
        <v-snackbar :color=" success ? 'green' : 'red'" v-model="showMessage">
            {{message}}
        </v-snackbar>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import {Seller} from "~/models/seller";
import countries from "~/assets/data/countries.json";

@Component
export default class SellerPage extends Vue {
    sellerId: number = 0;
    seller: Seller = new Seller();
    message: string = '';
    success: boolean = true;
    showMessage: boolean = false;

    created(): void {
        this.sellerId = parseInt(this.$route.params.id);
        let seller = this.$store.getters['sellers/getSeller'](this.sellerId);
        this.seller = Object.assign({}, seller);
        if (seller === undefined) {
            this.getSeller();
        }
    }

    async getSeller() {
        await this.$store.dispatch('sellers/getSeller', this.sellerId).then((response) => {
            if (response.status === 200) {
                this.seller = response.data;
                return;
            }
            this.message = 'Something went wrong';
            this.success = false;
            this.showMessage = true;
        });
    }

    get countries() {
      return countries.map((c) => ({text: c.text, value: c.text}));
    }

    goBack(): void {
        this.$router.back();
    }

    async updateSeller() {
        await this.$store.dispatch('sellers/updateSeller', this.seller).then((response) => {
            if (response.status === 200) {
                this.message = 'Seller updated';
                this.success = true;
                this.showMessage = true;
                this.$router.push({name: 'finance-sellers'});
            } else {
                this.message = 'Something went wrong';
                this.success = false;
                this.showMessage = true;
            }
        });
    }

    layout(): string {
        return 'mws';
    }
}
</script>
