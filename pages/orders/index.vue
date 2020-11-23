<template>
    <div>
        <h1>Orders</h1>
        <v-row>
            <v-col>
                <highlight-card :title="totalNumOfShirtsWon.toString()" subtitle="Total number of shirts won" />
            </v-col>
            <v-col>
                <highlight-card :title="mostValWinner.email" subtitle="Most valuable winner" :text="mostValWinner.amount" />
            </v-col>
            <v-col>
                <highlight-card :title="mostLoyalWinner.email" subtitle="Most loyal winner" :text="mostLoyalWinner.amount.toString()" />
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator";
    import OrdersDashboard from "~/assets/data/orders-dashboard.json";
    import HighlightCardComponent from "~/components/shared/highlight-card.vue";


    @Component({
        components: {
            'highlight-card': HighlightCardComponent
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

        head() {
            return {
                title: 'Orders'
            }
        }
    }
</script>