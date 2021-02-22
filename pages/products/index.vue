<template>
    <div class="products-wrapper">
        <h1>Products</h1>
        <v-data-table :items="products" :headers="headers">
            <template v-slot:item.productId="{ item }">
                <nuxt-link :to="`/products/${item.productId}`" @click.native="setProduct(item)">{{item.productId}}</nuxt-link>
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
@Component
export default class ProductsIndex extends Vue {
    layout() {
        return "mws";
    }

    get products() {
        return this.$store.getters["products/getProducts"];
    }

    get headers() {
        return [
            {
                text: 'Id',
                width: 80,
                value: 'productId',
            },
            {
                text: 'Player',
                value: 'name',
                width: 150,
            },
            {
                text: 'Winning Bid Id',
                value: 'winningBidId',
                width: 80,
            }
        ]
    }

    setProduct(item: any) {
        this.$store.commit("products/setSelectedProduct", item);
    }
}
</script>