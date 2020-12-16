<template>
  <div>
    <div>
      <v-card-title>Edit order {{order.PlayerName}}</v-card-title>
      <v-card-subtitle>Order id: {{orderId}}</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                label="Certificate number"
                v-model="order.OrderCertificateNumber"
                outlined
                type="number"
            />
            <v-text-field label="Payment costs (Excl. VAT)" v-model="order.OrderPaymentCosts" outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-select label="Payment method"  :items="getAllPaymentMethods()" outlined />
            <v-btn @click="invoiceSent = true">Send invoice to request billing</v-btn>
            <v-checkbox label="Invoice sent" v-model="invoiceSent" hide-details />
            <v-checkbox label="Framing (manual field)" hide-details />
            <v-text-field
                label="Payment Reminder last template sent"
                v-model="order.OrderPaymentReminder"
                type="number"
                outlined
                class="mt-4"
            />
            <v-text-field label="Address Reminders Sent" v-model="order.OrderAddressReminder" type="number" outlined />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
                label="Notes"
                outlined
                v-model="order.OrderNotes"
                :background-color="order.OrderNotes ? 'amber lighten-5' : ''"
            />
          </v-col>
          <v-col cols="12">
            <v-row justify="space-around">
              <v-btn color="error" @click="goBack">Cancel</v-btn>
              <v-btn color="success" @click="updateOrder()">Update order</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" v-if="order">
          <event-card :eventId="order.MatchID" />
        </v-col>
        <v-col cols="12" md="6">
          <customer-card :customerId="order.UserID" />
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from "nuxt-property-decorator";
import {Order} from "~/models/order";
import {FramingStatus} from "~/enums/framingStatus";
import {PaymentMethods} from "~/enums/paymentMethod";
import {ShippingStatusEnum} from "~/enums/shippingStatus";
import CustomerCardComponent from "~/components/orders/cards/customer-card.vue";
import EventCardComponent from "~/components/orders/cards/event-card.vue";

@Component({
  components: {
    'customer-card': CustomerCardComponent,
    'event-card': EventCardComponent
  }
})
export default class OrdersGeneralInfoComponent extends Vue {
  order: Order = new Order();
  invoiceSent: boolean = false;
  @Prop({ required: true }) readonly orderId!: number;

  name(): string {
    return 'orders-general-info-component';
  }

  created() {
    let order = this.$store.getters['orders/getOrder'](this.orderId);
    this.order = Object.assign({}, order);
  }

  getAllPaymentMethods() {
    let paymentMethods = Object.values(PaymentMethods);
    paymentMethods = paymentMethods.slice(0, paymentMethods.length / 2);
    return paymentMethods.map((value, key) => ({text: value, value: key}));
  }

  getAllShippingStatus() {
    let shippingStatus = Object.values(ShippingStatusEnum);
    shippingStatus = shippingStatus.slice(0, shippingStatus.length / 2);
    return shippingStatus.map((value, key) => ({text: value, value: key}));
  }

  updateOrder(): void {
    this.$store.dispatch('orders/updateOrder', this.order);
    this.$router.push({name: 'orders'});
  }

  goBack(): void {
    this.$router.back();
  }
}
</script>
