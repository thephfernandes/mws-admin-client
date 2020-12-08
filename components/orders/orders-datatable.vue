<template>
    <div class="orders-data">
      <v-card-text>
        <v-row align="center">
            <v-col cols="8" md="10">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-select label="Matches" :items="matchesId" v-model="searchMatch" clearable outlined />
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Search Certificate" v-model="searchCertificate" outlined clearable />
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select label="Shipping from" :items="['Amsterdam', 'London']" clearable outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field label="Search player, customer, etc." v-model="search" outlined clearable />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                                :items="customHeaders"
                                outlined
                                label="Optional columns"
                                multiple
                                hide-details
                                clearable
                                deletable-chips
                                v-model="selectedHeadersList"
                                @change="updateHeaders"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4" md="2">
                <v-row>
                    <v-col cols="12">
                        <v-btn block @click="resetFilters">Reset filters</v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-btn block><v-icon class="mr-2">mdi-download</v-icon>Export as csv</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
      </v-card-text>
        <v-data-table
                :items="orders"
                :headers="headers"
                :footer-props="footerPropsOptions"
                :search="search"
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
                                @click="shippingDetail = true"
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
                                v-if="item.OrderShippingStatus !== 3"
                                small
                                class="ml-2"
                                v-bind="attrs"
                                v-on="on"
                                @click="markAsShipped(item)"
                        >
                            mdi-check-bold
                        </v-icon>
                    </template>
                    <span>Mark as shipped</span>
                </v-tooltip>
            </template>
            <template v-slot:item.Status="{ item }">
                <order-status :order="item" />
            </template>
            <template v-slot:item.Shipping="{ item }">
                <v-edit-dialog large @save="saveShippingStatus" @open="setOrder(item)">
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
                <nuxt-link :to="`/customers/${item.UserID}`" class="link">
                  {{item.UserMail}}
                </nuxt-link>
              ({{ getCountryName(item.UserCountry) }})
            </template>
            <template v-slot:item.OrderCreationDate="{ item }">
                {{ item.OrderCreationDate | dateFormat(true) }}
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
        </v-data-table>
        <v-snackbar v-model="shippingStatus">
            Shipping status updated to {{getShippingStatus(order.OrderShippingStatus)}}.
        </v-snackbar>
        <v-dialog v-model="shippingDetail" max-width="500px">
            <shipping-detail-modal />
        </v-dialog>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";
    import {IOrder} from "~/interfaces/IOrder";
    import {ShippingStatusEnum} from "~/enums/shippingStatus.ts";
    import {Order} from "~/models/order";
    import {FramingStatus} from "~/enums/framingStatus";
    import Country from "~/assets/data/countries.json";

    @Component
    export default class OrdersTableComponent extends Vue {
        footerPropsOptions = {
            'items-per-page-options': [5, 10, 25, 50]
        };
        shippingStatus: boolean = false;
        order: Order = new Order();
        headers: Array<Object> = [];
        customHeaders: Array<Object> = [];
        selectedHeaders: Array<Object> = [];
        selectedHeadersList: [] = [];
        AllHeaders: boolean = false;
        searchCertificate: string = '';
        searchMatch: string = '';
        shippingDetail: boolean = false;
        search: string = '';
        @Prop({ type: Array, required: true }) readonly orders!: IOrder[];


        name(): string {
            return 'orders-table-component'
        }

        created() {
            this.createHeaders();
            this.createCustomHeaders();
        }

        setOrder(item: Order): void {
            this.order = Object.assign({}, item)
        }

        getCountryName(countryCode: string): string {
          const c = Country.find((c) => c.value === countryCode.toUpperCase());
          return c ? c.text : 'Unknown country';
        }

        saveShippingStatus() {
            this.$store.dispatch('orders/updateShippingStatus', this.order);
            this.shippingStatus = true;
        }

        markAsShipped(item: Order) {
            this.setOrder(item);
            this.order.OrderShippingStatus = ShippingStatusEnum.Shipped;
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

        resetFilters(): void {
          this.searchMatch = '';
          this.searchCertificate = '';
          this.search = '';
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
          if (!this.searchMatch) return true;
          if (this.searchMatch.toString() === value.toString()) {
            return value;
          }
        }

        updateHeaders(): void {
            this.createHeaders();
            for (const header of this.customHeaders as any) {
                for (const item of this.selectedHeadersList) {
                    if (header.value === item) {
                        console.log(header);
                        this.headers.push(header);
                    }
                }
            }
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
                    value: 'MatchID',
                    filter: this.matchFilter
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
                    text: 'Club Name',
                    value: 'ClubName',
                    width: 200
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
        align-items: center;
    }
</style>
