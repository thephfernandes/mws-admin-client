<template>
    <div class="orders-data">
      <v-card-text>
        <v-row align="center">
            <v-col cols="8" md="10">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-select label="Matches" :items="matchesName" v-model="searchMatch" clearable outlined />
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
            <template v-slot:item.club="{ item }">
                {{ getClubName(item.MatchID) }}
            </template>
            <template v-slot:item.Opponent="{ item }">
                {{ getOpponent(item.MatchID) }}
            </template>
            <template v-slot:item.Actions="{ item }">
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
                <v-icon v-if="item.OrderFraming" dense color="warning">mdi-image-frame</v-icon>
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
                <nuxt-link :to="`/events/${item.MatchID}`" class="link">
                    {{ getMatch(item.MatchID) }}
                </nuxt-link>
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
            <template v-slot:item.MatchDate="{ item }">
                {{ item.MatchDate | dateFormat(true) }}
            </template>
            <template v-slot:item.UserCountry="{ item }">
                {{item.UserCountry.toUpperCase()}}
            </template>
            <template v-slot:item.ProductPrice="{ item }">
                &euro; {{item.ProductPrice.toFixed(2).replace('.', ',')}}
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
    import {IMatch} from "~/interfaces/v1.0/IMatch";

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

        created(): void {
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

        getShippingStatus(status: number): string {
            return ShippingStatusEnum[status];
        }

        get matchesName(): string {
            const matches = this.$store.getters['matches/getAllMatches'];
            const listMatches = matches.map((m: IMatch) => ({
                text: `${m.FeaturedClubName} (${m.HomeClubName} - ${m.VisitingClubName})`,
                value: m.ID
            }));
            return listMatches.reverse();
        }

        get matches() {
            return this.$store.getters['matches/getMatches'];
        }

        getClubName(id: number): string {
            const match: IMatch = this.$store.getters['matches/getMatchById'](id);
            return match.FeaturedClubName;
        }

        getOpponent(matchId: number): string {
            const match: IMatch = this.$store.getters['matches/getMatchById'](matchId);
            console.log(match);
            if (!match) return 'Unknown';
            return match.FeaturedClubID === match.HomeClubID ? match.VisitingClubName : match.HomeClubName;
        }

        getMatch(id: number): string {
            const match: IMatch = this.$store.getters['matches/getMatchById'](id);
            if (!match) return 'Unknown';
            const opponent = match.FeaturedClubID === match.HomeClubID ? match.VisitingClubName : match.HomeClubName;
            return `${match.FeaturedClubName} - ${opponent}`;
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
                    text: 'Player',
                    value: 'PlayerName',
                    width: 150
                },
                {
                    text: 'Price',
                    value: 'ProductPrice',
                    width: 120
                },
                {
                    text: 'Match',
                    value: 'MatchID',
                    filter: this.matchFilter,
                    width: 290
                },
                {
                    text: 'Customer',
                    value: 'UserMail'
                }
            ]
        }

        createCustomHeaders(): void {
            this.customHeaders = [
                {
                    text: 'Club',
                    value: 'club',
                    width: 200
                },
                {
                    text: 'Opponent',
                    value: 'Opponent',
                    width: 200
                },
                {
                    text: 'Match date',
                    value: 'MatchDate',
                    width: 150
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
