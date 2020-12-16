<template>
    <div>
        <v-card-title>Shipping details</v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" md="6">
                    Shipping status
                    <v-radio-group v-model="order.OrderShippingStatus">
                        <v-radio v-for="status in getAllShippingStatus()" :label="status.text" :key="status.value" />
                    </v-radio-group>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field label="Shipment tracking number" outlined />
                    <v-text-field label="Shipment ID" outlined/>
                    <v-text-field label="Shipping costs (Excl. VAT)" outlined/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-select label="Shipping from" :items="['Amsterdam', 'London']" clearable outlined />
                </v-col>
                <v-col cols="6">
                    <v-btn block><v-icon class="mr-2">mdi-truck</v-icon>DHL Shipping</v-btn>
                </v-col>
            </v-row>
            <v-row justify="space-around">
                <v-btn color="error" @click="goBack">Cancel</v-btn>
                <v-btn color="success" @click="updateOrder()">Update order</v-btn>
            </v-row>
        </v-card-text>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from "nuxt-property-decorator";
    import {ShippingStatusEnum} from "~/enums/shippingStatus";
    import {Order} from "~/models/order";

    @Component
    export default class OrderShippingDetails extends Vue {
        order: Order = new Order();
        @Prop({ required: true }) readonly orderId!: number;

        created(): void {
            let order = this.$store.getters['orders/getOrder'](this.orderId);
            this.order = Object.assign({}, order);
        }

        getAllShippingStatus() {
            let shippingStatus = Object.values(ShippingStatusEnum);
            shippingStatus = shippingStatus.slice(0, shippingStatus.length / 2);
            return shippingStatus.map((value, key) => ({text: value, value: key}));
        }

        goBack(): void {
            this.$router.back();
        }

    }

</script>