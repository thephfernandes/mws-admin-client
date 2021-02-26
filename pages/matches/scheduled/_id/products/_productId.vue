<template>
    <v-card flat>
        <v-card-title class="text-h3">{{product.player.name}}</v-card-title>
        <v-card-subtitle class="text-h4 my-2 outline">{{match.teams}}</v-card-subtitle>
        <v-form class="ml-5">
            <v-row >
                <v-col cols="12" md="4">
                    <v-select label="winning bid" :disabled="createNewBid" v-model="selectedBid" @change="handleBidSelectChange($event)" :items="bids"></v-select>
                </v-col>
                <v-col cols="12" md="4" v-if="selectedBid">
                    <v-text-field type="number" :disabled="createNewBid" outlined label="bid amount in €" v-model="selectedBidValue">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="my-0">
                <v-checkbox class="ml-2" v-model="createNewBid" label="Create new bid"></v-checkbox>
            </v-row>
            <div class="new-bid-form-wrapper" v-if="createNewBid">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" outlined label="user id" v-model="newBid.userId">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" outlined label="bid amount in €" v-model.number="newBid.amountInEur">
                        </v-text-field>
                    </v-col>
                </v-row>
            </div>
            <v-row v-if="!createNewBid">
                <v-btn class="ml-2" @click="updateWinningBid()">update winning bid</v-btn>
            </v-row>
            <v-row v-else>
                <v-btn class="ml-2" @click="publishNewBid()">publish bid</v-btn>
            </v-row>
        </v-form>
    </v-card>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
@Component
export default class ProductDetailsPage extends Vue {
    productId !: number
    product!: any;
    bidDict!: any[];
    createNewBid: boolean = false;
    newBid = {userId: 6047, amountInEur: 0, bidPlacedInCurrency: "EUR"};
    selectedBid: string = "";
    selectedBidId!: number;
    selectedBidValue!: number;

    layout(): string {
        return "mws";
    }

    async created() { 
        this.productId = parseInt(this.$route.params.productId);
        await this.handleState();
    }

    async handleState() {
        if(this.$store.getters["products/getSelectedProduct"].id !== this.productId) {
            this.$store.commit("products/setSelectedProduct", this.$store.getters["products/getProducts"].find((product: any) => product.id == this.productId));
        }
        this.product = this.$store.getters["products/getSelectedProduct"];
        await this.$store.dispatch("matches/getMatchSetToStore", this.product.matchId);
        await this.$store.dispatch("bids/fetchBids");
    }

    get bidObjects() {
        let arr: any[] = []
        this.$store.getters["bids/getBids"].forEach((item: any) => {
            const dict = {
                id: item.id,
                value: this.reformatName(item.user.name) + "\t" + this.reformatDate(item.date.slice(0,10)) + "\t" + item.date.slice(11,16)
            }
            arr.push(dict);
        })
        return arr;
    }

    get bids() {
        const values = Object.keys(this.bidObjects).map((key: any) => {
            return this.bidObjects[key].value;
        })
        return values;
    }

    get match() {
        return this.$store.getters["matches/getMatch"];
    }

    reformatName(name: string) {
        return name != null ? name : 'guest';
    }

    reformatDate(date: string) {
        const arr = date.split("-");
        return arr[2] + "/" + arr[1] + "/" + arr[0].substring(2);
    }

    handleBidSelectChange(bidDetails: string) {
        if(bidDetails.length > 0) {
            const bidIndex = parseInt(Object.keys(this.bidObjects).find((key: string) => this.bidObjects[parseInt(key)].value == bidDetails) || '0');
            const bidId = this.bidObjects[bidIndex].id;
            this.selectedBidId = bidId
            this.$store.commit("bids/setSelectedBid", this.$store.getters["bids/getBids"].find((item: any) => item.id === bidId))
            this.selectedBidValue = this.$store.getters["bids/getSelectedBid"].amountInEur;
        }
    }

    async updateWinningBid() {
        const selectedBid = this.$store.getters["bids/getSelectedBid"];
        selectedBid.amountInEur = this.selectedBidValue;

        await this.$store.dispatch("bids/createBid", {matchId: this.product.matchId, productId: this.product.id, bid: selectedBid})
        await this.handleState();
    }

    async publishNewBid() {
        await this.$store.dispatch("bids/createBid", {matchId: this.product.matchId, productId: this.product.id, bid: this.newBid});
    }
}
</script>
