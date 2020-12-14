<template>
    <div>
        <v-data-table
                :items="invoiceItems"
                :footer-props="footerPropsOptions"
                :headers="headers"
                :search="search"
                class="invoiceItems-datatable"
                @click:row="toInvoiceItem"
                :loading="loading"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Invoice items</v-toolbar-title>
                    <v-spacer />
                    <v-text-field dense label="Search" v-model="search" outlined prepend-inner-icon="mdi-magnify" />
                    <v-spacer />
                    <nuxt-link class="link" :to="`/finance/invoices/${invoiceId}/invoiceItem/add`">
                        <v-btn><v-icon class="mr-2">mdi-plus</v-icon>Invoice item</v-btn>
                    </nuxt-link>
                </v-toolbar>
            </template>
            <template v-slot:item.price="{item}">
                &euro; {{ formatCurrency(item.price) }}
            </template>
            <template v-slot:item.vat="{item}">
                &euro; {{ formatCurrency(item.vat) }}
            </template>
            <template v-slot:item.paymentHandling="{item}">
                &euro; {{ formatCurrency(item.paymentHandling) }}
            </template>
            <template v-slot:item.shipping="{item}">
                &euro; {{ formatCurrency(item.shipping) }}
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator";
    import {IInvoiceItem} from "~/interfaces/IInvoiceItem";

    @Component
    export default class InvoiceItemsTable extends Vue {
        invoiceId: number = 0;
        search: string = '';
        loading: boolean = true;
        invoiceItems: IInvoiceItem[] = [] as IInvoiceItem[];
        footerPropsOptions = {
            'items-per-page-options': [5, 10, 25, 50]
        };

        created(): void {
            this.invoiceId = parseInt(this.$route.params.id);
            this.setInvoiceItems();
            this.$store.dispatch('invoices/getInvoiceItemsSetToStore', this.invoiceId);
        }

        toInvoiceItem(invoiceItem: IInvoiceItem): void {
            this.$router.push({
                name: 'finance-invoices-id-invoiceItem-invoiceItemId',
                params: {
                    invoiceItemId: invoiceItem.id.toString()
                }
            })
        }

        setInvoiceItems(): void {
            const response = this.$store.dispatch('invoices/getInvoiceItems', this.invoiceId)
                .then((response) => {
                    this.loading = false;
                    this.invoiceItems = response.data;
                })
                .catch((error) => console.error(error));
        }

        formatCurrency(amount: number): string {
            if (!amount) return '0';
            return amount.toFixed(2).replace('.', ',');
        }

        get headers() {
            return [
                {
                    text: 'Id',
                    value: 'id',
                    divider: true
                },
                {
                    text: 'Title',
                    value: 'title'
                },
                {
                    text: 'Price',
                    value: 'price'
                },
                {
                    text: 'VAT',
                    value: 'vat'
                },
                {
                    text: 'Payment handling',
                    value: 'paymentHandling'
                },
                {
                    text: 'Shipping',
                    value: 'shipping'
                }
            ];
        }
    }
</script>
<style lang="scss">
    .link {
        text-decoration: none;
    }
    .invoiceItems-datatable {
        .text-start {
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>