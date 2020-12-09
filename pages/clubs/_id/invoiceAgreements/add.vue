<template>
    <div>
        <v-card>
            <v-card-title>Add invoice agreement</v-card-title>
            <v-card-subtitle>For {{club.name}}</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6" lg="4">
                        <v-select
                                label="Seller"
                                :items="sellers"
                                v-model="InvoiceAgreement.sellerId"
                                :value="sellers"
                                outlined
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                            label="Name"
                            v-model="InvoiceAgreement.name"
                            outlined
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="Payment handling percentage"
                                type="number"
                                outlined
                                v-model="InvoiceAgreement.paymentHandlingPercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="Shipping insurance percentage"
                                type="number"
                                outlined
                                v-model="InvoiceAgreement.shippingInsurancePercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="Shipping flat fee"
                                type="number"
                                outlined
                                v-model="InvoiceAgreement.shippingFlatFee"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="MWS handling percentage"
                                type="number"
                                outlined
                                v-model="InvoiceAgreement.mwsHandlingPercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="MWS auction percentage"
                                type="number"
                                outlined
                                v-model="InvoiceAgreement.mwsAuctionPercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="MWS VAT percentage"
                                type="number"
                                outlined
                                v-model="InvoiceAgreement.mwsVatPercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="MWS setup fee"
                                type="number"
                                outlined
                                v-model="InvoiceAgreement.mwsSetupFee"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="Third party VAT percentage"
                                type="number"
                                outlined
                                v-model="InvoiceAgreement.thirdPartyVatPercentage"
                        />
                    </v-col>
                </v-row>
                <v-row justify="space-around">
                    <v-btn color="error" @click="goBack">Cancel</v-btn>
                    <v-btn color="success" @click="addInvoiceAgreement" :disabled="InvoiceAgreement.sellerId === 0">Create Invoice agreement</v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "nuxt-property-decorator";
    import InvoiceAgreement from "~/models/invoiceAgreement.ts"
    import {IClub} from "~/interfaces/IClub";
    import {ISeller} from "~/interfaces/ISeller";

    @Component
    export default class AddInvoicePage extends Vue {
        InvoiceAgreement: InvoiceAgreement = new InvoiceAgreement();
        clubId: number = 0;

        created(): void {
            this.clubId = parseInt(this.$route.params.id);
            this.InvoiceAgreement.clubId = this.clubId;
        }

        get sellers() {
            const sellers: ISeller[] = this.$store.getters['sellers/getSellers'];
            if (sellers.length === 0) {
                this.$store.dispatch('sellers/fillSellers');
            }
            const items: any = [];
            sellers.forEach((s) => {
                items.push({text: s.name, value: s.id})
            });
            return items;
        }

        goBack(): void {
            this.$router.back();
        }

        get club(): IClub {
            return this.$store.getters['clubs/getClub'](this.clubId);
        }

        addInvoiceAgreement(): void {
            this.$store.dispatch('clubs/addInvoiceAgreement', this.InvoiceAgreement).then((response) => {
                this.$router.push({name: 'clubs-id', params: {id: this.clubId.toString()}});
            });
        }

        layout(): string {
            return 'mws';
        }

    }
</script>
