<template>
    <v-data-table :items="agreements" :headers="headers" :footer-props="footerPropsOptions">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Invoice agreements</v-toolbar-title>
                <v-spacer />
                <v-btn color="success"><v-icon class="mr-2">mdi-plus</v-icon>Invoice agreement</v-btn>
            </v-toolbar>
        </template>
        <template v-slot:item.sellerId="{item}">
            <nuxt-link :to="`/finance/sellers/${item.sellerId}`" class="link">{{item.seller.name}}</nuxt-link>
        </template>
    </v-data-table>
</template>
<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
import {IInvoiceAgreement} from "~/interfaces/IInvoiceAgreement";

@Component
export default class InvoiceAgreementsDatatableComponent extends Vue {
    @Prop({ type: Array, required: true }) readonly agreements!: IInvoiceAgreement[];
    footerPropsOptions = {
        'items-per-page-options': [5, 10, 25, 50]
    };

    get headers() {
        return [
            {
                text: 'Id',
                value: 'id'
            },
            {
                text: 'ClubId',
                value: 'clubId',
                divider: true
            },
            {
                text: 'Seller',
                value: 'sellerId'
            },
            {
                text: 'Third party VAT',
                value: 'thirdPartyVatPercentage'
            },
            {
                text: 'Payment Handling',
                value: 'paymentHandlingPercentage'
            },
            {
                text: 'Shipping Insurance',
                value: 'shippingInsurancePercentage'
            },
            {
                text: 'Shipping Flat Fee',
                value: 'shippingFlatFee'
            },
            {
                text: 'MWS Handling Percentage',
                value: 'mwsHandlingPercentage'
            },
            {
                text: 'MWS Auction Percentage',
                value: 'mwsAuctionPercentage'
            },
            {
                text: 'MWS VAT Percentage',
                value: 'mwsVatPercentage'
            },
            {
                text: 'MWS Setup Fee',
                value: 'mwsSetupFee'
            }
        ];
    }
}
</script>
<style lang="scss" scoped>
.link {
    text-decoration: none;
}
</style>