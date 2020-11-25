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
            Status
            <v-checkbox label="Buy it now" hide-details color="orange" />
            <v-checkbox label="Called" hide-details color="orange" />
            <v-checkbox label="Reached" hide-details color="orange" />
            <v-checkbox label="Shirt paid" v-model="order.OrderShirtPaid" hide-details color="orange" />
            <v-checkbox label="Frame paid" v-model="order.OrderFramePaid" hide-details color="orange" />
            <v-select
                label="Framing status"
                outlined
                class="mt-4 mb-4"
                v-model="order.OrderFramingStatus"
                :value="getFramingStatus(order.OrderFramingStatus)"
                :items="getAllFramingStatus()"
            />
            <v-text-field label="Shipping costs (Excl. VAT)" outlined/>
            <v-text-field label="Shipment ID" outlined/>
          </v-col>
          <v-col cols="12" md="6">
            <v-select label="Payment method"  :items="getAllPaymentMethods()" outlined />
            <v-btn @click="invoiceSent = true">Send invoice to request billing</v-btn>
            <v-checkbox label="Invoice sent" v-model="invoiceSent" hide-details />
            <v-checkbox label="Framing (manual field" hide-details />
            <v-text-field
                label="Payment Reminder last template sent"
                v-model="order.OrderPaymentReminder"
                type="number"
                outlined
                class="mt-4"
            />
            <v-text-field label="Address Reminders Sent" v-model="order.OrderAddressReminder" type="number" outlined />
            Shipping status
            <v-radio-group v-model="order.OrderShippingStatus">
              <v-radio v-for="status in getAllShippingStatus()" :label="status.text"></v-radio>
            </v-radio-group>
            <v-text-field label="For whom" outlined />
            <v-text-field label="Shipment tracking number" outlined />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea label="Feedback" outlined />
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
          <v-col cols="12">
            <v-alert color="warning">Use this button to pay for a DHL shipping of 1 to 3 shirts in a single package. Using this button will update the shipping status, cost, and other information on the order part only. If you wish to send a framed shirt, please use the appropriate section below.</v-alert>
            <v-alert color="warning">Watch out! Do not send a package AND a frame! You can see if you ordered any of them by looking at the framing status for example.</v-alert>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from "nuxt-property-decorator";
import {Order} from "~/models/order";
import {FramingStatus} from "~/enums/framingStatus";
import {PaymentMethods} from "~/enums/paymentMethod";
import {ShippingStatusEnum} from "~/enums/shippingStatus";

@Component
export default class OrdersGeneralInfoComponent extends Vue {
  order: Order = new Order();
  invoiceSent: boolean = false;
  @Prop({ required: true }) readonly orderId!: number;

  name(): string {
    return 'orders-general-info-component';
  }

  created() {
    const order = this.$store.getters['orders/getOrder'](this.orderId);
    this.order = Object.assign({}, order);
  }

  getAllFramingStatus() {
    let framingStatus = Object.values(FramingStatus);
    framingStatus = framingStatus.slice(0, framingStatus.length / 2);
    return framingStatus.map((value, key) => ({text: value, value: key}));
  }

  getFramingStatus(status: number) {
    return FramingStatus[status];
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