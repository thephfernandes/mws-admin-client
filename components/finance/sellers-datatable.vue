<template>
    <div>
        <v-data-table
            :items="sellers"
            :headers="headers"
            :loading="loading"
            loading-text="Loading sellers..."
            :footer-props="footerPropsOptions"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>All sellers</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <nuxt-link to="/finance/sellers/add" class="link">
                        <v-btn color="success">
                            <v-icon class="mr-2">mdi-plus</v-icon>
                            New seller
                        </v-btn>
                    </nuxt-link>
                </v-toolbar>
            </template>
            <template v-slot:item.id="{item}">
                <nuxt-link :to="`/finance/sellers/${item.id}`" class="link">{{item.id}}</nuxt-link>
            </template>
            <template v-slot:item.name="{item}">
                <nuxt-link :to="`/finance/sellers/${item.id}`" class="link">{{item.name}}</nuxt-link>
            </template>
            <template v-slot:item.email="{item}">
                <a :href="`mailto:${item.email}`" class="link">{{item.email}}</a>
            </template>
            <template v-slot:item.website="{item}">
                <a :href="`https://${item.website}`" class="link">{{item.website}}</a>
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
import {Component, Vue, Prop, Watch} from "nuxt-property-decorator";
import {ISeller} from "~/interfaces/ISeller";

@Component
export default class SellersDatatableComponent extends Vue {
    @Prop({ type: Array, required: true }) readonly sellers!: ISeller[];
    loading: boolean = true;
    footerPropsOptions = {
        'items-per-page-options': [5, 10, 25, 50]
    };

    @Watch('sellers')
    onSellersLoaded(val: ISeller[]) {
        if (val.length > 0) {
            this.loading = false;
        }
    }

    get headers() {
        return [
            {
                text: 'Id',
                value: 'id'
            },
            {
                text: 'Next invoiceId',
                value: 'nextInvoiceId',
                divider: true
            },
            {
                text: 'Invoice Prefix',
                value: 'invoiceIdPrefix'
            },
            {
                text: 'Name',
                value: 'name'
            },
            {
                text: 'VAT #',
                value: 'vatNumber'
            },
            {
                text: 'Address 1',
                value: 'address1'
            },
            {
                text: 'Address 2',
                value: 'address2'
            },
            {
                text: 'Country',
                value: 'country'
            },
            {
                text: 'Email',
                value: 'email'
            },
            {
                text: 'Website',
                value: 'website'
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
