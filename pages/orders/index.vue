<template>
    <div>
        <h1>Orders</h1>
        <v-row>
            <v-col>
                <highlight-card :title="totalNumOfShirtsWon.toString()" subtitle="Total number of shirts won" />
            </v-col>
            <v-col>
                <highlight-card :title="mostValWinner.email" subtitle="Most valuable customer" :text="mostValWinner.amount" />
            </v-col>
            <v-col>
                <highlight-card :title="mostLoyalWinner.email" subtitle="Most loyal customer" :text="mostLoyalWinner.amount.toString()" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <orders-table :orders="orders" />
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator";
    import OrdersDashboard from "~/assets/data/orders-dashboard.json";
    import HighlightCardComponent from "~/components/shared/highlight-card.vue";
    import OrdersTableComponent from "~/components/orders/orders-datatable.vue";


    @Component({
        components: {
            'highlight-card': HighlightCardComponent,
            'orders-table': OrdersTableComponent
        }
    })
    export default class IndexOrders extends Vue {
        layout(): string {
            return 'mws';
        }

        get totalNumOfShirtsWon(): number {
            return OrdersDashboard.total_number_of_shirts_won;
        }

        get mostValWinner() {
            const amount = OrdersDashboard.most_valuable_winner.amount.toFixed(2);
            const amountFormatted = amount.replace('.', ',');
            return {
                'email': OrdersDashboard.most_valuable_winner.email,
                'amount': `€ ${amountFormatted}`
            };
        }

        get mostLoyalWinner() {
            return OrdersDashboard.most_loyal_winner;
        }

        get orders() {
            return this.$store.getters['orders/getOrders'];
        }

        head() {
            return {
                title: 'Orders'
            }
        }

        mounted() {
          this.$store.dispatch('orders/fillOrders');
          this.$store.dispatch('orders/fillFraming');
          this.$store.dispatch('orders/fillProducts');
          this.$store.dispatch('customers/fillAll');
          this.$store.dispatch('matches/getAllMatchesSetToStore');
        }
    }
</script>
