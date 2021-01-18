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
                            <v-text-field
                                v-model="seller.invoiceIdPrefix"
                                label="Invoice Prefix"
                                outlined
                                @input="toUpperCase($event)"
                            />
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
                    </v-row>
                    <v-card-actions>
                        <v-row justify="space-around">
                            <v-btn color="error" @click="goBack">Cancel</v-btn>
                            <v-btn color="success" @click="addSeller">Add</v-btn>
                        </v-row>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import countries from "~/assets/data/countries.json";
import {Seller} from "~/models/seller";

@Component
export default class AddSellerPage extends Vue {
    seller: Seller = new Seller();

    goBack(): void {
        this.$router.back();
    }

    addSeller(): void {
        this.$store.dispatch('sellers/addSeller', this.seller).then((response) => {
            this.$router.push({name: 'finance-sellers'});
        });
    }

    layout(): string {
        return 'mws';
    }

    toUpperCase(value: string) {
      this.seller.invoiceIdPrefix = value.toUpperCase();
    }

    get countries() {
      return countries.map((c) => ({text: c.text, value: c.text}));
    }
}
</script>
