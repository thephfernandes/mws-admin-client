import {ShippingStatusEnum} from "~/enums/shippingStatus";
<template>
    <div class="orders-data">
        <v-row>
            <v-col cols="12" md="8">
                <v-card-title>Filter</v-card-title>
                {{searchMatch}}
                <v-card-text>
                    <v-select label="Matches" :items="matchesId" v-model="searchMatch" clearable />
                    <v-text-field label="Certificates" v-model="searchCertificate" clearable />
                    <v-select label="Shipping from" :items="['Amsterdam', 'London']" clearable />
                    <v-text-field label="Search" outlined clearable />
                    <v-btn>Reset</v-btn>
                </v-card-text>
            </v-col>
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-title>Choose optional columns</v-card-title>
                    <v-card-text>
                        <v-switch
                                :label="AllHeaders ? 'Deselect all' : 'Select all'"
                                hide-details
                                v-model="AllHeaders"
                        />
                        <v-checkbox
                                v-for="header in customHeaders"
                                :key="header.value"
                                v-model="selectedHeaders"
                                :label="header.text"
                                :value="selectedHeaders.length ===  0 ? header : header"
                                @click="updateHeaders"
                                hide-details
                        />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
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
            <template v-slot:item.UserCountry="{ item }">
                {{item.UserCountry.toUpperCase()}}
            </template>
            <template v-slot:item.ProductPrice="{ item }">
                &euro; {{item.ProductPrice.toFixed(2).replace('.', ',')}}
            </template>
            <template v-slot:item.OrderFraming="{ item }">
                <v-chip :color="item.OrderFraming ? 'green' : 'red'">
                    <v-icon>mdi-image-frame</v-icon>
                    <span
                            v-if="item.OrderFraming"
                            class="ml-2"
                    >
                        {{ getFramingStatus(item.OrderFramingStatus) }}
                    </span>
                </v-chip>
            </template>
            <template v-slot:item.OrderAddressReminder="{ item }">
                <v-chip small>
                    <v-icon small class="mr-2">mdi-google-maps</v-icon>
                    {{item.OrderAddressReminder}}
                </v-chip>
                <v-chip small class="mt-1">
                    <v-icon small class="mr-2">mdi-credit-card-clock-outline</v-icon>
                    {{item.OrderPaymentReminder}}
                </v-chip>
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
    import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";
    import {IOrder} from "~/interfaces/IOrder";
    import Datatable from "~/components/customer/datatable.vue";
    import {ShippingStatusEnum} from "~/enums/shippingStatus.ts";
    import {Order} from "~/models/order";
    import {FramingStatus} from "~/enums/framingStatus";

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
        headers: Array<Object> = [];
        customHeaders: Array<Object> = [];
        selectedHeaders: Array<Object> = [];
        AllHeaders: boolean = false;
        searchCertificate: string = '';
        searchMatch: string = '';
        @Prop({ type: Array, required: true }) readonly orders!: IOrder[];


        name(): string {
            return 'orders-table-component'
        }

        created() {
            this.createHeaders();
            this.createCustomHeaders();
        }

        toShippingDetails(): void {}

        openShippingStatus(item: Order) {
            this.order = Object.assign({}, item)
        }

        saveShippingStatus() {
            this.$store.dispatch('orders/updateShippingStatus', this.order);
            this.shippingStatus = true;
        }

        @Watch('AllHeaders')
        onAllHeadersChange(val: boolean) {
            this.selectedHeaders = [];
            if (val) {
                this.customHeaders.forEach((c) => {
                    this.selectedHeaders.push(c);
                })
            }
            this.updateHeaders();
        }

        getAllShippingStatus() {
            let shippingStatus = Object.values(ShippingStatusEnum);
            shippingStatus = shippingStatus.slice(0, shippingStatus.length / 2);
            return shippingStatus.map((value, key) => ({text: value, value: key}));
        }

        getFramingStatus(status: number): string {
            return FramingStatus[status];
        }

        toOrder(orderId: number): void {
            this.$router.push({name: 'orders-id', params: { id: orderId.toString() }});
        }

        getShippingStatus(status: number): string {
            return ShippingStatusEnum[status];
        }

        get matchesId() {
            return this.$store.getters['orders/getMatchesId'];
        }

        certificateFilter(value: number) {
            if (!this.searchCertificate) return true;
            return value.toString().includes(this.searchCertificate);
        }

        matchFilter(value: number) {

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

        updateHeaders(): void {
            this.createHeaders();
            this.headers = this.headers.concat(this.selectedHeaders);
        }

        createHeaders() {
            this.headers = [
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
                    width: 150,
                    divider: true
                },
                {
                    text: 'Certificate #',
                    value: 'OrderCertificateNumber',
                    filter: this.certificateFilter
                },
                {
                    text: 'MatchId',
                    value: 'MatchID'
                },
                {
                    text: 'Player',
                    value: 'PlayerName',
                    width: 150
                },
                {
                    text: 'Customer',
                    value: 'UserMail'
                },
                {
                    text: 'Order date',
                    value: 'OrderCreationDate',
                    width: 150
                }
            ]
        }

        createCustomHeaders(): void {
            this.customHeaders = [
                {
                    text: 'Cub name',
                    value: 'ClubName',
                    width: 200
                },
                {
                    text: 'User Country',
                    value: 'UserCountry'
                },
                {
                    text: 'Price',
                    value: 'ProductPrice',
                    width: 100
                },
                {
                    text: 'Customer Phone',
                    value: 'UserPhoneNumber'
                },
                {
                    text: 'Framing',
                    value: 'OrderFraming'
                },
                {
                    text: 'Opponent',
                    value: 'Opponent'
                },
                {
                    text: 'Reminder',
                    value: 'OrderAddressReminder'
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
