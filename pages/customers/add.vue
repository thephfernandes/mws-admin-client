<template>
  <v-card>
    <v-card-title>Add a customer</v-card-title>
    <v-card-text>
      <v-form
              ref="form"
              v-model="valid"
              lazy-validation
      >
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="Name" v-model="customer.name" outlined/>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="E-mail" v-model="customer.email_address" :rules="emailRules" required outlined />
          </v-col>
          <v-col cols="12" md="4">
            <vue-tel-input v-model="phone"  required :maxLen="10" @country-changed="onCountryChange" @input="onPhoneChange"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="Company" v-model="customer.company" outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Address" v-model="customer.address" outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Postal code" v-model="customer.postal_code" outlined />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="City" v-model="customer.city" outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-select label="Country" v-model="customer.country" :items="countries" outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Password" outlined value="MWS2020!" />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-checkbox required v-model="customer.email_verified" label="E-mail verified" />
          </v-col>
          <v-col>
            <v-checkbox required v-model="customer.phone_verified" label="Phone verified" />
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-btn @click="goBack()" color="error">Cancel</v-btn>
          <v-btn @click="addCustomer()" color="success" :disabled="!valid">Add customer</v-btn>
        </v-row>
      </v-form>
    </v-card-text>
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
    this.$store.commit("customers/add", this.customer);
    this.$router.push({name: 'customers'});
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