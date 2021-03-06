<template>
    <v-card class="leaderboard">
        <v-card-title>
            <v-icon class="mr-2">mdi-trophy</v-icon>
            Leaderboard
        </v-card-title>
        <v-card-subtitle>
            Leaderboard show top 5 customers with highest total money spent.
        </v-card-subtitle>
        <v-card-text>
            <v-data-table
                    :items="leaderboard"
                    :headers="headers"
                    :sort-desc="['TotalSpent']"
                    hide-default-footer
            >
                <template v-slot:item.Emailaddress="{ item }">
                    <span class="copy" v-clipboard:copy="item.Emailaddress" v-clipboard:success="onCopy">
                        {{item.Emailaddress}}
                    </span>
                </template>
                <template v-slot:item.ID="{ item }">
                    <NuxtLink :to="`/customers/${item.ID}`" class="link">{{item.ID}}</NuxtLink>
                </template>
                <template v-slot:item.Country="{ item }">
                    {{getCountry(item.Country)}}
                </template>
                <template v-slot:item.TotalSpent="{ item }">
                    &euro; {{ currencyFormat(item.TotalSpent) }}
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="openCustomer(item.ID)"
                                    v-bind="attrs"
                                    v-on="on"
                            >
                                mdi-magnify
                            </v-icon>
                        </template>
                        <span>Preview customer</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="editCustomer(item.ID)"
                                    v-bind="attrs"
                                    v-on="on"
                            >
                                mdi-pencil
                            </v-icon>
                        </template>
                        <span>Edit customer</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                    small
                                    @click="openSendModal(item.ID)"
                                    v-bind="attrs"
                                    v-on="on"
                            >
                                mdi-send
                            </v-icon>
                        </template>
                        <span>Send customer ...</span>
                    </v-tooltip>
                </template>
            </v-data-table>
        </v-card-text>
        <v-dialog v-model="dialogDetail" max-width="500px">
            <detail-modal-customer :customer="customer" />
        </v-dialog>
        <v-dialog v-model="dialogSend" max-width="500px">
            <send-modal-customer :customer="customer" />
        </v-dialog>
        <v-snackbar color="green" timeout="800" v-model="isCopied">
            Content copied to clipboard.
        </v-snackbar>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import VueClipboard from "vue-clipboard2";
import leaderboard from "~/assets/data/dashboard.json";
import Countries from "~/assets/data/countries.json";
import DetailModalCustomer from "~/components/customer/detail-modal.vue";
import SendModalComponent from "~/components/customer/send-modal.vue";
import {Customer} from "~/models/customer";

Vue.use(VueClipboard);

@Component({
    components: {
        'detail-modal-customer': DetailModalCustomer,
        'send-modal-customer': SendModalComponent,
    }
})
export default class Leaderboard extends Vue {
    private customer: Customer = new Customer();
    private dialogDetail: boolean = false;
    private dialogSend: boolean = false;
    private isCopied: boolean = false;
    name(): string {
        return 'leader-board';
    }

    get leaderboard() {
        return leaderboard.Leaderboards;
    }

    onCopy() {
        this.isCopied = true;
    }

    currencyFormat(amount: string): string {
        let totalSpent = parseFloat(amount).toFixed(2);
        totalSpent = totalSpent.replace('.', ',');
        return totalSpent;
    }

    getCountry(code: string): string {
        const c = Countries.find((c) => c.value === code.toUpperCase());
        if (c === undefined) return 'Unknown country';
        return c.text;
    }

    openCustomer(id: number) {
        this.setCustomer(id);
        this.dialogDetail = true;
    }

    setCustomer(id: number) {
        this.customer = this.$store.getters['customers/getCustomer'](id);
    }

    openSendModal(id: number): void {
        this.setCustomer(id);
        this.dialogSend = true;
    }

    editCustomer(customerId: number) {
        this.$router.push({name: 'customers-id', params: { id: customerId.toString() }});
    }

    get headers() {
        return [
            {
                text: 'Id',
                value: 'ID'
            },
            {
                text: 'Actions',
                value: 'actions',
                divider: true
            },
            {
                text: 'Name',
                value: 'Name'
            },
            {
                text: 'Email',
                value: 'Emailaddress'
            },
            {
                text: 'Country',
                value: 'Country'
            },
            {
                text: 'Total spent',
                value: 'TotalSpent'
            }
        ];
    }
}
</script>
<style lang="scss" scoped>
    .copy {
        text-decoration: underline;
    &:hover {
         cursor: pointer;
         color: $color-primary-1;
     }
    }
    .link {
        text-decoration: none;
    }
</style>
