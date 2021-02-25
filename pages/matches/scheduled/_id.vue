<template>
  <div>
    <MatchEditor :create="create" />
    <v-data-table :items="products" :headers="headers">
            <template v-slot:item.id="{ item }">
                <nuxt-link :to="`/products/${item.id}`" @click.native="setProduct(item)">{{item.id}}</nuxt-link>
            </template>
        </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import MatchEditor from "@/components/matches/MatchEditor.vue";

@Component({
  components: {
    MatchEditor,
  },
})
export default class extends Vue {
    private create = false;

    layout() {
        return "mws";
    }

    async created() {
        await this.$store.dispatch("products/fetchProducts", this.$route.params.id);
    }

    get products() {
        return this.$store.getters["products/getProducts"];
    }

    get headers() {
        return [
        {
            text: "Id",
            value: "id",
            width: 80,
        },
        {
            text: "Product",
            value: "player.name",
            width: 120
        },
        {
            text: "Published",
            value: "published",
            width: 80
        },
        {
            text: "Paid",
            value: "paid",
            width: 80,
        },
        {
            text: "Featured",
            value: "featured",
            width: 80
        },
        {
            text: "Finished",
            value: "finished",
            width: 80
        },
        {
            text: "Latest Bid Id",
            value: "latestBidId",
            width: 80,
        },
        ];
    }

    setProduct(item: any) {
        this.$store.commit("products/setSelectedProduct", item);        
    }
}
</script>
