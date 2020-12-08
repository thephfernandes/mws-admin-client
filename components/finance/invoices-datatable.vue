<template>
    <div>
        <v-data-table
                :items="invoices"
                :headers="headers"
                :loading="loading"
                :search="search"
                loading-text="Loading invoices..."
                :footer-props="footerPropsOptions"
                :custom-filter="customSearchFilter"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>All club invoices</v-toolbar-title>
                    <v-spacer/>
                    <v-text-field
                            label="Search"
                            v-model="search"
                            outlined
                            dense
                            hide-details
                            clearable prepend-inner-icon="mdi-magnify"
                    />
                    <v-spacer />
                    <nuxt-link class="link" to="/finance/invoices/add">
                        <v-btn color="success">
                            <v-icon class="mr-2">mdi-file-plus-outline</v-icon>
                            Invoice
                        </v-btn>
                    </nuxt-link>
                </v-toolbar>
            </template>
            <template v-slot:item.id="{item}">
                <nuxt-link :to="`/finance/invoices/${item.id}`" class="link">{{item.id}}</nuxt-link>
            </template>
            <template v-slot:item.auctionCharge="{item}">
                &euro; {{ formatCurrency(item.auctionCharge) }}
            </template>
            <template v-slot:item.clubPayout="{item}">
                &euro; {{ formatCurrency(item.clubPayout) }}
            </template>
            <template v-slot:item.paymentHandling="{item}">
                &euro; {{ formatCurrency(item.paymentHandling) }}
            </template>
            <template v-slot:item.price="{item}">
                &euro; {{ formatCurrency(item.price) }}
            </template>
            <template v-slot:item.setupCharge="{item}">
                &euro; {{ formatCurrency(item.setupCharge) }}
            </template>
            <template v-slot:item.shipping="{item}">
                &euro; {{ formatCurrency(item.shipping) }}
            </template>
            <template v-slot:item.paymentHandling="{item}">
                &euro; {{ formatCurrency(item.paymentHandling) }}
            </template>
            <template v-slot:item.shippingCharge="{item}">
                &euro; {{ formatCurrency(item.shippingCharge) }}
            </template>
            <template v-slot:item.totalCharge="{item}">
                &euro; {{ formatCurrency(item.totalCharge) }}
            </template>
            <template v-slot:item.vat="{item}">
                &euro; {{ formatCurrency(item.vat) }}
            </template>
            <template v-slot:item.vatCharge="{item}">
                &euro; {{ formatCurrency(item.vatCharge) }}
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from "nuxt-property-decorator";
    import {IInvoice} from "~/interfaces/IInvoice";

    @Component
    export default class InvoicesDatatableComponent extends Vue {
        loading: boolean = true;
        search: string = '';
        footerPropsOptions = {
            'items-per-page-options': [5, 10, 25, 50]
        };

        created(): void {
            this.$store.dispatch('invoices/fillInvoices');
        }

        @Watch('invoices')
        onLoadingInvoices(invoices: IInvoice[]) {
            if (invoices.length > 0) {
                this.loading = false;
            }
        }

        formatCurrency(amount: number): string {
            if (!amount) return '0';
            return amount.toFixed(2).replace('.', ',');
        }

        get invoices(): IInvoice[] {
            return this.$store.getters['invoices/getInvoices'];
        }

        customSearchFilter(value: any, search: string, item: IInvoice) {
            const inId = RegExp(search, 'i').test(item.id.toString());
            const inAgreementId = RegExp(search, 'i').test(item.agreementId.toString());
            const inMatchId = RegExp(search, 'i').test(item.matchId.toString());
            return inId || inAgreementId || inMatchId;
        }

        get headers() {
            return [
                {
                    text: 'Id',
                    value: 'id'
                },
                {
                    text: 'Agreement',
                    value: 'agreementId'
                },
                {
                    text: 'Match',
                    value: 'matchId',
                    divider: true
                },
                {
                    text: 'Auction charge',
                    value: 'auctionCharge'
                },
                {
                    text: 'Club payout',
                    value: 'clubPayout'
                },
                {
                    text: 'Payment handling',
                    value: 'paymentHandling'
                },
                {
                    text: 'Price',
                    value: 'price'
                },
                {
                    text: 'Setup charge',
                    value: 'setupCharge'
                },
                {
                    text: 'Shipping',
                    value: 'shipping'
                },
                {
                    text: 'Shipping charge',
                    value: 'shippingCharge'
                },
                {
                    text: 'Total charge',
                    value: 'totalCharge'
                },
                {
                    text: 'VAT',
                    value: 'vat'
                },
                {
                    text: 'VAT charge',
                    value: 'vatCharge'
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
