<template>
    <div>
        <v-card>
            <v-card-title>Shipping detail</v-card-title>
            <v-card-text>
                <v-select
                        :items="getAllShippingStatus()"
                        v-model="localOrder.OrderShippingStatus"
                        :value="getShippingStatus(localOrder.OrderShippingStatus)"
                        @change="saveShippingStatus"
                        single-line
                        prepend-icon="mdi-truck"
                />
                <v-row>
                    <v-col cols="6">
                        <v-btn block @click="printLabel">
                            <v-icon class="mr-2">mdi-printer</v-icon>
                            Shipping label
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn @click="markShipped" color="success" block>
                            <v-icon class="mr-2">mdi-check</v-icon>
                            Shipped
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator";
    import {ShippingStatusEnum} from "~/enums/shippingStatus";
    import {Order} from "~/models/order";
    import {Prop} from "~/node_modules/nuxt-property-decorator";

    @Component
    export default class ShippingDetailModalComponent extends Vue {
        localOrder: Order = new Order();
        @Prop({ type: Object, required: true }) readonly order!: Order;


        name(): string {
            return 'shipping-detail-modal-component';
        }

        created(): void {
            this.localOrder = Object.assign({}, this.order);
        }

        getAllShippingStatus() {
            let shippingStatus = Object.values(ShippingStatusEnum);
            shippingStatus = shippingStatus.slice(0, shippingStatus.length / 2);
            return shippingStatus.map((value, key) => ({text: value, value: key}));
        }

        saveShippingStatus() {
            this.$store.dispatch('orders/updateShippingStatus', this.localOrder);
            this.$emit('closeShippingModal');
        }

        getShippingStatus(status: number): string {
            return ShippingStatusEnum[status];
        }

        printLabel(): void {
            this.localOrder.OrderShippingStatus = 3;
            this.saveShippingStatus();
            this.$emit('closeShippingModal');
        }

        markShipped(): void {
            this.localOrder.OrderShippingStatus = 3;
            this.saveShippingStatus();
            this.$emit('closeShippingModal');
        }
    }
</script>
