<template>
    <div>
        <v-card-title>Products</v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" md="4">
                    <product-card :productId="order.ProductID" />
                </v-col>
            </v-row>
        </v-card-text>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from "nuxt-property-decorator";
    import ProductCardComponent from "~/components/orders/cards/product-card.vue";

    @Component({
        components: {
            'product-card': ProductCardComponent
        }
    })
    export default class OrdersProductsComponent extends Vue {
        @Prop({ required: true }) readonly orderId!: number;

        name(): string {
            return 'orders-products-component';
        }

        get order() {
            return this.$store.getters['orders/getOrder'](this.orderId);
        }
    }
</script>
