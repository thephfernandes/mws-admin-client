<template>
  <div>
    <v-card-title>Framing options</v-card-title>
    <v-card-subtitle>
      Framing id: {{ framing.ID }} <br>
      Created at: {{ formatDate(order.OrderCreationDate) }}
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="mb-2">Properties</h3>
          <v-select
              label="Border color"
              outlined
              v-model="framing.BorderColorOptionID"
              :items="getAllFrameBorderColors()"
              :value="getFrameBorderColor(framing.BorderColorOptionID)"
          />
          <v-select
                  label="Passe Partout"
                  outlined
                  v-model="framing.PassePartoutOptionID"
                  :items="getAllPassePartout()"
                  :value="getPassePartoutOption(framing.PassePartoutOptionID)"
          />
          <v-select
                  label="Number of custom pictures"
                  outlined
                  v-model="framing.NumberOfCustomPics"
                  :items="['None', '2 Pictures', '3 Pictures']"
          />
          <v-select
              label="Plate"
              outlined
              v-model="framing.PlateOptionID"
              :items="getAllPlateOptions()"
              :value="getPlateOption(framing.PlateOptionID)"
          />
          Other plate
          <v-checkbox
              v-if="framing"
              v-for="plate of otherFramePlateOptions"
              :key="plate.text"
              :label="plate.text"
              hide-details
              v-model="plate.model"
          />
        </v-col>
        <v-col cols="12" md="6">
          <h3 class="mb-2">Shipping</h3>
          <v-text-field label="Shipment Tracking Number" v-model="framing.StandaloneTrackingNumber" outlined />
          <v-text-field label="Shipment Identification Number" outlined />
          <v-text-field label="Shipping costs" v-model="framing.StandaloneShippingCosts" outlined />
          <label class="mt-4 mb-1 shipping-status__title">Shipping status</label>
          <v-radio-group v-model="framing.OrderFramingStatus">
            <v-radio v-for="status in getAllShippingStatus()" :label="status.text" :key="status.value" hide-details />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-btn color="primary" @click="updateFraming()">Send request to framing</v-btn>
        <v-btn color="secondary">Request shipping</v-btn>
      </v-row>
    </v-card-text>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from "nuxt-property-decorator";
import {Order} from "~/models/order";
import Framing from "~/models/framing";
import {FrameBorderColor} from "~/enums/frameBorderColor";
import {FramePlateOption} from "~/enums/framePlateOption";
import {ShippingStatusEnum} from "~/enums/shippingStatus";
import {FramePassePartout} from "~/enums/framePassePartout";

@Component
export default class OrdersFramingComponent extends Vue {
  order: Order = new Order();
  framing: Framing = new Framing();
  otherFramePlateOptions = [
    {
      text: 'Logo on Plate',
      price: 10,
      model: this.framing.HasLogoOnPlate
    },
    {
      text: 'Logo on Top',
      price: 19,
      model: this.framing.HasLogoOnTop
    },
    {
      text: 'Visible sleeves',
      price: 19,
      model: this.framing.HasVisibleSleeves
    },
    {
      text: 'User has Frame toggled on',
      price: 0
    },
    {
      text: 'Back side on display',
      price: 0,
      model: this.framing.IsBackSide
    }
  ];
  @Prop({ required: true }) readonly orderId!: number;

  name(): string {
    return 'orders-framing-component';
  }

  created() {
    this.order = this.$store.getters['orders/getOrder'](this.orderId);
    const framing = this.$store.getters['orders/getFraming'](this.order.OrderFramingPurchaseOptionsID);
    this.framing = Object.assign({}, framing);
  }

  updateFraming(): void {
    this.$store.dispatch('orders/updateFraming', this.framing);
    this.$router.push({name: 'orders'});
  }

  formatDate(string: string) {
    const date = new Date(string);
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric',
      hour12: false,
      timeZone: 'Europe/Amsterdam'
    };
    return new Intl.DateTimeFormat('nl-NL', options).format(date);
  }

  getAllFrameBorderColors() {
    let frameBorderColors = Object.values(FrameBorderColor);
    frameBorderColors = frameBorderColors.slice(0, frameBorderColors.length / 2);
    return frameBorderColors.map((value, key) => ({text: value, value: key}));
  }

  getFrameBorderColor(color: number) {
    return FrameBorderColor[color];
  }

  getAllPlateOptions() {
    let plateOptions = Object.values(FramePlateOption);
    plateOptions = plateOptions.slice(0, plateOptions.length / 2);
    return plateOptions.map((value, key) => ({text: value, value: key}));
  }

  getPlateOption(option: number) {
    return FramePlateOption[option];
  }

  getAllShippingStatus() {
    let shippingStatus = Object.values(ShippingStatusEnum);
    shippingStatus = shippingStatus.slice(0, shippingStatus.length / 2);
    return shippingStatus.map((value, key) => ({text: value, value: key}));
  }

  getAllPassePartout() {
    let options = Object.values(FramePassePartout);
    options = options.slice(0, options.length / 2);
    return options.map((value, key) => ({text: value, value: key}));
  }

  getPassePartoutOption(option: number) {
    return FramePassePartout[option];
  }
}
</script>
<style lang="scss" scoped>
.shipping-status {
  &__title {
    display: block;
  }
}
</style>