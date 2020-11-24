import {ShippingStatusEnum} from "~/enums/shippingStatus";
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
            <template v-slot:item.Actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                                @click="toOrder(item.OrderID)"
                                small
                                v-bind="attrs"
                                v-on="on"
                        >
                            mdi-pencil
                        </v-icon>
                    </template>
                    <span>Edit order</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                                @click="toShippingDetails"
                                small
                                class="ml-2"
                                v-bind="attrs"
                                v-on="on"
                        >
                            mdi-truck
                        </v-icon>
                    </template>
                    <span>Shipping detail</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                                v-if="!item.UserAddress"
                                @click="reminder = true"
                                small
                                class="ml-2"
                                v-bind="attrs"
                                v-on="on"
                        >
                            mdi-google-maps
                        </v-icon>
                    </template>
                    <span>Send address reminder</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                                v-if="!item.OrderShirtPaid"
                                @click="reminder = true"
                                small
                                class="ml-2"
                                v-bind="attrs"
                                v-on="on"
                        >
                            mdi-credit-card-clock-outline
                        </v-icon>
                    </template>
                    <span>Send payment reminder</span>
                </v-tooltip>
            </template>
            <template v-slot:item.Status="{ item }">
                <div class="status-group">
                    <v-chip small :color="item.OrderShirtPaid ? 'green' : 'red'" text-color="white">Paid</v-chip>
                    <v-chip
                            small
                            text-color="white" :color="item.UserAddress ? 'green' : 'red'"
                            class="ml-2"
                    >
                        Address
                    </v-chip>
                    <v-icon v-if="item.OrderNotes" class="ml-2">mdi-note-text</v-icon>
                </div>
            </template>
            <template v-slot:item.Shipping="{ item }">
                <v-edit-dialog large @save="saveShippingStatus" @open="openShippingStatus(item)">
                    <v-chip-group>
                        <v-chip
                                :color="
                                (item.OrderShippingStatus === 2 || item.OrderShippingStatus === 3) ? 'green'
                                : item.OrderShippingStatus === 4 ? 'red' : 'gray'
                                "
                                :text-color="item.OrderShippingStatus <= 1 ? 'black' : 'white'"
                        >
                            <v-icon class="mr-2">mdi-truck</v-icon>
                            {{getShippingStatus(item.OrderShippingStatus)}}
                        </v-chip>
                    </v-chip-group>
                    <template v-slot:input>
                        <v-select
                                :items="getAllShippingStatus()"
                                single-line
                                prepend-icon="mdi-truck"
                                v-model="order.OrderShippingStatus"
                        />
                    </template>
                </v-edit-dialog>
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
        <v-snackbar v-model="reminder" :timeout="500">
            Reminder sent.
        </v-snackbar>
        <v-snackbar v-model="shippingStatus">
            Shipping status updated to {{getShippingStatus(order.OrderShippingStatus)}}.
        </v-snackbar>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "nuxt-property-decorator";
    import {IOrder} from "../../interfaces/IOrder";
    import Datatable from "~/components/customer/datatable.vue";
    import {ShippingStatusEnum} from "~/enums/shippingStatus.ts";
    import {Order} from "~/models/order";

    @Component({
        components: {Datatable}
    })
    export default class OrdersTableComponent extends Vue {
        footerPropsOptions = {
            'items-per-page-options': [5, 10, 25, 50]
        };
        reminder: boolean = false;
        shippingStatus: boolean = false;
        order: Order = new Order();
        @Prop({ type: Array, required: true }) readonly orders!: IOrder[];


        name(): string {
            return 'orders-table-component'
        }

        toShippingDetails(): void {}

        openShippingStatus(item: Order) {
            this.order = Object.assign({}, item)
        }

        saveShippingStatus() {
            this.$store.dispatch('orders/updateShippingStatus', this.order);
            this.shippingStatus = true;
        }

        getAllShippingStatus() {
            let shippingStatus = Object.values(ShippingStatusEnum);
            shippingStatus = shippingStatus.slice(0, shippingStatus.length / 2);
            return shippingStatus.map((value, key) => ({text: value, value: key}));
        }

        toOrder(orderId: number): void {
            this.$router.push({name: 'orders-id', params: { id: orderId.toString() }});
        }

        getShippingStatus(status: number): string {
            return ShippingStatusEnum[status];
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
                    text: 'Status',
                    value: 'Status'
                },
                {
                    text: 'Shipping',
                    value: 'Shipping'
                },
                {
                    text: 'Actions',
                    value: 'Actions',
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
    .status-group {
        display: flex;
    }
</style>
