<template>
    <div class="status-group">
        <v-chip
            v-if="order.OrderPaymentReminder === 0"
            x-small
            label
            :color="order.OrderShirtPaid ? 'green' : 'red'"
            text-color="white"
            @click="sendPaymentReminder"
        >
            Paid
        </v-chip>
        <v-badge
            v-if="order.OrderPaymentReminder > 0"
            color="orange"
            class="mr-2"
            :content="order.OrderPaymentReminder"
        >
            <v-chip
                x-small
                label
                :color="order.OrderShirtPaid ? 'green' : 'red'"
                text-color="white"
                @click="sendPaymentReminder"
            >
                Paid
            </v-chip>
        </v-badge>
        <v-chip
            v-if="order.OrderAddressReminder === 0"
            x-small
            label
            text-color="white" :color="order.UserAddress ? 'green' : 'red'"
            class="ml-2"
            @click="sendAddressReminder"
        >
            Address
        </v-chip>
        <v-badge
            v-if="order.OrderAddressReminder > 0"
            :content="order.OrderAddressReminder"
            color="orange"
            class="mr-2"
        >
            <v-chip
                x-small
                label
                text-color="white" :color="order.UserAddress ? 'green' : 'red'"
                class="ml-2"
                @click="sendAddressReminder"
            >
                Address
            </v-chip>
        </v-badge>
        <v-icon v-if="order.OrderNotes" class="ml-2">mdi-note-text</v-icon>
        <confirm-dialog ref="confirm" />
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Order} from "~/models/order";

@Component
export default class OrderStatusComponent extends Vue {
    @Prop({ type: Object, required: true }) readonly order!: Order;

    name(): string {
    return 'order-status-component';
    }

    sendPaymentReminder(): void {
        (this as any).$refs.confirm
            .open('Send reminder?', `Send to ${this.order.UserMail}?`).then((res: boolean) => {
            if (res) {
                this.$store.dispatch('orders/incrementPaymentReminder', this.order);
            }
        })
    }

    sendAddressReminder(): void {
        (this as any).$refs.confirm
            .open('Send reminder?', `Send to ${this.order.UserMail}?`).then((res: boolean) => {
                if (res) {
                    this.$store.dispatch('orders/incrementAddressReminder', this.order);
                }
        })
    }
}
</script>
