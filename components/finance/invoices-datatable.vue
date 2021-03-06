<template>
    <div>
        <v-data-table
                :items="invoices"
                :headers="headers"
                :loading="loading"
                :search="search"
                @click:row="toInvoice($event)"
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
            <!-- <template v-slot:item.match.featuredClub.name="{item}">
                <nuxt-link :to="`/clubs/${item.match.featuredClub.id}`" class="link">
                    {{item.match.featuredClub.name}}
                </nuxt-link>
            </template> -->
            <template v-slot:item.matchId="{item}">
                {{item.match.homeClub.name}} - {{item.match.visitingClub.name}}
            </template>
            <template v-slot:item.agreementId="{item}">
                <nuxt-link :to="`/finance/sellers/${item.agreementId}`" class="link">
                    {{item.agreement.seller.name}}
                </nuxt-link>
            </template>
            <template v-slot:item.price="{item}">
                &euro; {{ formatCurrency(item.price) }}
            </template>
            <template v-slot:item.totalCharge="{item}">
                &euro; {{ formatCurrency(item.totalCharge) }}
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, mixins, Watch} from "nuxt-property-decorator";
    import {IInvoice} from "~/interfaces/IInvoice";
    import DatatableLoading from "~/mixins/datatable-loading.ts";

    @Component
    export default class InvoicesDatatableComponent extends mixins(DatatableLoading) {
        @Prop({ type: Array, required: true }) readonly invoices!: IInvoice[];
        search: string = '';
        footerPropsOptions = {
            'items-per-page-options': [5, 10, 25, 50]
        };

        async created(): Promise<void> {
            await this.$store.dispatch('invoices/getInvoicesSetToStore');
        }

        @Watch('invoices')
        onLoadingInvoices(invoices: IInvoice[]) {
            if (this.invoices.length > 0) {
                this.loading = false;
            }
        }

        toInvoice(invoice: IInvoice): void {
          this.$router.push({
            name: 'finance-invoices-id',
            params: {
              id: invoice.id.toString()
            }
          });
        }

        formatCurrency(amount: number): string {
            if (!amount) return '0';
            return amount.toFixed(2).replace('.', ',');
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
                    text: 'Club',
                    value: 'match.featuredClub.name'
                },
                {
                    text: 'Match',
                    value: 'matchId',
                },
                {
                    text: 'Invoice #',
                    value: 'sequenceNumber'
                },
                {
                    text: 'Seller',
                    value: 'agreementId'
                },
                {
                    text: 'Proceeds',
                    value: 'price'
                },
                {
                    text: 'MWS revenue',
                    value: 'totalCharge'
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
