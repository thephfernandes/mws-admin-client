<template>
    <v-card flat>
        <v-card-title class="text-h3" v-text="product.name"></v-card-title>
        <v-card-subtitle class="text-h4 my-2" v-text="product.team"></v-card-subtitle>
        <v-form>
            <v-row>
                <v-col cols="12" md="4">
                    <v-card-text class="text-h5">Product Id: {{product.productId}}</v-card-text>
                </v-col>
                <v-col cols="12" md="4">
                    <v-select label="winning bid id" v-model="winningBidId" :items="getProductBids()"></v-select>
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
    bids!: any[];

    layout(): string {
        return "mws";
    }

    beforeCreate() {
        this.productId = parseInt(this.$route.params.id);
        const p = this.$store.getters["products/getSelectedProduct"];
        if (p.id !== undefined) {
            this.product = p;
        } else {
            //in case user tries to access /products/:id without going through /products first
            this.product = this.$store.getters["products/getProducts"].find((product: any) => product.productId == this.productId);
            console.log(this.product)
            this.$store.commit("products/setSelectedProduct", this.product);
        }
        
    }

    getProductBids() {
        let arr = [];
            for (let i = 0; i < this.product.bids.length; i++) {
            arr[i] = this.product.bids[i].id;
            }
        return arr;
    }

    get winningBidId() {
        return this.product.winningBidId;
    }

    set winningBidId(value) {
        this.$store.commit("products/updateProductWinningBid", value);
    }
    
}
</script>