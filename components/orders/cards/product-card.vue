<template>
    <v-card tile :to="`/products/${productId}`" >
        <v-card-title>Product info</v-card-title>
        <v-card-subtitle>ID: {{productId}}</v-card-subtitle>
        <v-card-text>
            <v-img :src="productImage" height="200px" width="auto" contain/>
        </v-card-text>
        <v-card-text>
            <v-list>
                <v-list-item>
                    <v-icon class="mr-2">mdi-account-box</v-icon>
                    {{product.PlayerName}}
                </v-list-item>
                <v-list-item>
                    <v-icon class="mr-2">mdi-soccer-field</v-icon>
                    {{product.ClubName}}
                </v-list-item>
                <v-list-item>
                    <v-icon class="mr-2">mdi-currency-eur</v-icon>
                    {{product.Price.toFixed(2).replace('.', ',')}}
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from "nuxt-property-decorator";

    @Component
    export default class ProductCardComponent extends Vue {
        @Prop({ required: true }) readonly productId!: number;

        name(): string {
            return 'product-card-component';
        }

        get product() {
            return this.$store.getters['orders/getProduct'](this.productId);
        }

        get productImage() {
            return `https://matchwornshirt.imgix.net/product/${this.productId}/1.png?h=800&w=800&fm=jpg2&auto=format`;
        }
    }
</script>