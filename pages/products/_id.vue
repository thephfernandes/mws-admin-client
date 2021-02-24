<template>
    <v-card flat>
        <v-card-title class="text-h3">{{product.id}}</v-card-title>
        <v-card-subtitle class="text-h4 my-2">Product from match {{product.matchId}}</v-card-subtitle>
        <v-form>
            <v-row>
                <v-col cols="12" md="4">
                    <v-select class="ml-5" label="winning bid" :items="bids"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-btn class="ml-5">save</v-btn>
            </v-row>
            
        </v-form>
    </v-card>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
@Component
export default class ProductDetailsPage extends Vue {
    productId !: number
    product!: any;

    layout(): string {
        return "mws";
    }

    async beforeCreate() {
        this.productId = parseInt(this.$route.params.id);
        const p = this.$store.getters["products/getSelectedProduct"];
        if (p.id !== undefined) {
            this.product = p;
        } else {
            //in case user tries to access /products/:id without going through /products first
            this.product = this.$store.getters["products/getProducts"].find((product: any) => product.id == this.productId);
            this.$store.commit("products/setSelectedProduct", this.product);
        }
        await this.$store.dispatch("bids/fetchBids");

        
    }

    get bids() {
        let arr = [];
        for(let i = 0; i <this.$store.getters["bids/getBids"].length; i++) {
            let bid = this.$store.getters["bids/getBids"][i];
            arr[i] = this.reformatName(bid.user.name) + "\t" + this.reformatDate(bid.date.slice(0,10)) + "\t" + bid.date.slice(11,16);
        }
        return arr;
    }

    reformatName(name: string) {
        return name != null ? name : 'guest';
    }

    reformatDate(date: string) {
        const arr = date.split("-");
        return arr[2] + "/" + arr[1] + "/" + arr[0].substring(2);
    }

    // get winningBidId() {
    //     return this.product.winningBidId;
    // }

    // set winningBidId(value) {
    //     this.$store.commit("products/updateProductWinningBid", value);
    // }   
}
</script>
<style scoped>
.winningBidSelect {
    text-align: center;
}
</style>