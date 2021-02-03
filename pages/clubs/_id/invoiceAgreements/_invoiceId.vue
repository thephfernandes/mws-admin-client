<template>
    <div class="detail-invoice-agreement">
        <v-card>
            <v-card-title>Detail invoice agreement</v-card-title>
            <v-card-subtitle>Of {{club.name}}</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6" lg="4">
                        <v-autocomplete
                                label="Seller"
                                :items="sellers"
                                v-model="InvoiceAgreement.sellerId"
                                :value="sellers"
                                outlined
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field label="Name" v-model="InvoiceAgreement.name" outlined />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="Payment handling percentage"
                                type="number"
                                outlined
                                prepend-inner-icon="mdi-percent"
                                v-model="InvoiceAgreement.paymentHandlingPercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="Shipping insurance percentage"
                                type="number"
                                outlined
                                prepend-inner-icon="mdi-percent"
                                v-model="InvoiceAgreement.shippingInsurancePercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="Shipping flat fee"
                                type="number"
                                outlined
                                prepend-inner-icon="mdi-currency-eur"
                                v-model="InvoiceAgreement.shippingFlatFee"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="Minimum guarantee"
                                type="number"
                                outlined
                                prepend-inner-icon="mdi-currency-eur"
                                v-model="InvoiceAgreement.minimumGuarantee"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="MWS handling percentage"
                                type="number"
                                outlined
                                prepend-inner-icon="mdi-percent"
                                v-model="InvoiceAgreement.mwsHandlingPercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="MWS auction percentage"
                                type="number"
                                outlined
                                prepend-inner-icon="mdi-percent"
                                v-model="InvoiceAgreement.mwsAuctionPercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="MWS VAT percentage"
                                type="number"
                                outlined
                                prepend-inner-icon="mdi-percent"
                                v-model="InvoiceAgreement.mwsVatPercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-select
                            label="MWS setup fee"
                            v-model="InvoiceAgreement.mwsSetupFee"
                            :items="setupFees"
                            outlined
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                                label="Third party VAT percentage"
                                type="number"
                                outlined
                                prepend-inner-icon="mdi-percent"
                                v-model="InvoiceAgreement.thirdPartyVatPercentage"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                      <v-text-field
                          label="Unpaid Product Guarantee"
                          type="number"
                          outlined
                          prepend-inner-icon="mdi-currency-eur"
                          v-model="InvoiceAgreement.unpaidProductGuarantee"
                      />
                    </v-col>
                </v-row>
                <v-row justify="space-around">
                    <v-btn color="error" @click="goBack">Cancel</v-btn>
                    <v-btn color="success" @click="updateInvoiceAgreement" :disabled="InvoiceAgreement.sellerId === 0">Update Invoice agreement</v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "nuxt-property-decorator";
    import InvoiceAgreement from "~/models/invoiceAgreement";
    import {IClub} from "~/interfaces/IClub";
    import {ISeller} from "~/interfaces/ISeller";
    import { mwsSetupFee } from "~/enums/mwsSetupFee.ts";

    @Component
    export default class InvoiceAgreementDetail extends Vue {
        InvoiceAgreement: InvoiceAgreement = new InvoiceAgreement();
        clubId: number = 0;
        invoiceId: number = 0;

        created(): void {
            this.clubId = parseInt(this.$route.params.id);
            this.invoiceId = parseInt(this.$route.params.invoiceId);

            this.setInvoiceAgreement();
        }

        setInvoiceAgreement(): void {
            const invoice = this.$store.getters['clubs/getInvoiceAgreement'](this.invoiceId);
            this.InvoiceAgreement = Object.assign({}, invoice);
        }

        get setupFees() {
          const array = Object.values(mwsSetupFee);
          const shortenArray = array.slice(0, array.length / 2);
          return shortenArray.map((value, index) => ({text: value, value: index}));
        }

        get club(): IClub {
            return this.$store.getters['clubs/getClub'](this.clubId);
        }

        get sellers() {
            const sellers: ISeller[] = this.$store.getters['sellers/getSellers'];
            if (sellers.length === 0) {
                this.$store.dispatch('sellers/getSellersSetToStore');
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

        updateInvoiceAgreement(): void {
            this.$store.dispatch('clubs/updateInvoiceAgreement', {agreement: this.InvoiceAgreement, id: this.invoiceId})
            .then((response) => {
                if (response.status === 200) {
                    this.$router.push({name: 'clubs-id', params: {id: this.clubId.toString()}});
                }
            });
        }

        layout(): string {
            return 'mws';
        }
    }
</script>
<style lang="scss">
.detail-invoice-agreement {
  .v-input__prepend-inner {
    .v-icon {
      font-size: 16px;
    }
  }
}
</style>
