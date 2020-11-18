<template>
  <v-card>
    <v-card-title>
      <v-row align="center">
        <v-col cols="12" md="1">
          <v-btn large text @click="goBack"><v-icon>mdi-chevron-left</v-icon>Customers</v-btn>
        </v-col>
        <v-col cols="12" md="11">
          <v-card-title>Add a new customer</v-card-title>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-form
              ref="form"
              v-model="valid"
              lazy-validation
      >
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field label="Name" v-model="customer.name" outlined/>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field label="E-mail" v-model="customer.email_address" :rules="emailRules" required outlined />
          </v-col>
          <v-col cols="12" md="3">
            <vue-tel-input v-model="phone"  required :maxLen="15" @country-changed="onCountryChange" @input="onPhoneChange"/>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field label="Password" outlined value="MWS2020!" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="Company" v-model="customer.company" outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Address 1" v-model="customer.address" outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Address 2" v-model="customer.address2" outlined />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="Postal code" v-model="customer.postal_code" outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="City" v-model="customer.city" outlined />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider />
            <v-checkbox label="Billing address" color="secondary" v-model="hasBillingAddress"/>
          </v-col>
        </v-row>
        <v-row v-if="hasBillingAddress">
          <v-col cols="12" md="3">
            <v-text-field label="Billing address 1" v-model="customer.billing_address1" solo-inverted />
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field label="Billing address 2" v-model="customer.billing_address2" solo-inverted />
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field label="Billing postal code" v-model="customer.postal_code" solo-inverted />
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field label="Billing city" v-model="customer.billing_city" solo-inverted />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select label="Country" v-model="customer.country" :items="countries" outlined />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12" md="6">
            <v-checkbox v-model="customer.payment_verified" label="Payment verified" />
            <v-checkbox v-model="customer.email_unsubscribed" label="E-mail subscribed" />
            <v-checkbox v-model="customer.other_club_notifs" label="Notify other clubs" />
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox required v-model="customer.email_verified" label="E-mail verified" />
            <v-checkbox required v-model="customer.phone_verified" label="Phone verified" />
          </v-col>
        </v-row>
        <v-row justify="space-around">
          <v-btn @click="goBack()" color="error" width="200">
            <v-icon class="mr-2">mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn @click="addCustomer()" color="success" :disabled="!valid" width="200">
            <v-icon class="mr-2">mdi-check</v-icon>
            Add customer
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-title>Notes</v-card-title>
    <v-card-text>
      <v-textarea outlined label="Enter some notes" />
    </v-card-text>
    <v-snackbar v-model="PhoneError" color="red">Phone number must have 10 digits</v-snackbar>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Countries from "@/assets/data/countries.json";
import { Customer } from "~/models/customer";

@Component
export default class extends Vue {
  private valid: boolean = true;
  private customer: Customer = new Customer();
  private phone: string = '';
  private phoneCountry: any = '';
  private PhoneError: boolean = false;
  private hasBillingAddress: boolean = false;
  private emailRules = [
          (v: string) => !!v || 'E-mail is required',
          (v: string) => /.+@.+/.test(v) || 'E-mail must be valid'
  ];

  layout() {
    return "mws";
  }

  onCountryChange(country: any) {
    this.phoneCountry = country;
    this.customer.phone_number = `+${country.dialCode + this.phone}`;
  }

  onPhoneChange(tel: string) {
    this.customer.phone_number = `+${this.phoneCountry.dialCode + tel}`;
  }

  addCustomer() {
    if (this.phoneIsValid()) {
      this.$store.commit("customers/add", this.customer);
      this.$router.push({name: 'customers'});
    } else {
      this.PhoneError = true;
    }
  }

  phoneIsValid(): boolean {
    return this.customer.phone_number.length >= 10;
  }

  goBack() {
    this.$router.push({name: 'customers'});
  }

  get countries() {
    return Countries.map((c) => {
      return {
        text: c.text,
        value: c.value.toLowerCase()
      };
    });
  }
}
</script>
<style lang="scss">
  .vti {
    &__input {
      height: 56px;
    }
  }
</style>