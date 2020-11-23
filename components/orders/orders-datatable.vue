<template>
    <div class="orders-data">
        <v-data-table
                :items="orders"
                :headers="headers"
                :footer-props="footerPropsOptions"
        >
            <template v-slot:item.OrderID="{ item }">
                <nuxt-link :to="`/orders/${item.OrderID}`" class="link">{{item.OrderID}}</nuxt-link>
            </template>
            <template v-slot:item.MatchID="{ item }">
                <nuxt-link :to="`/events/${item.MatchID}`" class="link">{{item.MatchID}}</nuxt-link>
            </template>
            <template v-slot:item.PlayerName="{ item }">
                <nuxt-link :to="`/products/${item.PlayerID}`" class="link">{{item.PlayerName}}</nuxt-link>
            </template>
            <template v-slot:item.UserMail="{ item }">
                <nuxt-link :to="`/customers/${item.UserID}`" class="link">{{item.UserMail}}</nuxt-link>
            </template>
            <template v-slot:item.UserMail="{ item }">
                <nuxt-link :to="`/customers/${item.UserID}`" class="link">{{item.UserMail}}</nuxt-link>
            </template>
            <template v-slot:item.OrderCreationDate="{ item }">
                {{ formatDate(item.OrderCreationDate) }}
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";
    import { IOrder } from "../../interfaces/IOrder";
    import Datatable from "~/components/customer/datatable.vue";
    @Component({
        components: {Datatable}
    })
    export default class OrdersTableComponent extends Vue {
        footerPropsOptions = {
            'items-per-page-options': [5, 10, 25, 50]
        };
        @Prop({ type: Array, required: true }) readonly orders!: IOrder[];


        name(): string {
            return 'orders-table-component'
        }

        formatDate(string: string) {
            const date = new Date(string);
            const options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric',
                hour12: false,
                timeZone: 'Europe/Amsterdam'
            };
            return new Intl.DateTimeFormat('nl-NL', options).format(date);
        }

        get headers() {
            return [
                {
                    text: 'Id',
                    value: 'OrderID'
                },
                {
                    text: 'Status'
                },
                {
                    text: 'Actions',
                    divider: true
                },
                {
                    text: 'Certificate #',
                    value: 'OrderCertificateNumber'
                },
                {
                    text: 'MatchId',
                    value: 'MatchID'
                },
                {
                    text: 'Player',
                    value: 'PlayerName'
                },
                {
                    text: 'Customer',
                    value: 'UserMail'
                },
                {
                    text: 'Order date',
                    value: 'OrderCreationDate'
                }
            ]
        }
    }
</script>
<style lang="scss" scoped>
    .link {
        text-decoration: none;
    }
</style>