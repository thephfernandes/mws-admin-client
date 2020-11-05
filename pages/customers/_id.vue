<template>
  <v-card>
    <v-card-title>Edit customer<span v-if="customer.name">: {{customer.name}}</span></v-card-title>
    <v-card-subtitle>Customer id: {{ customerId}}</v-card-subtitle>
    <v-card-text>
      <v-form
              ref="form"
              v-model="valid"
              lazy-validation
      >
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="Name" :value="customer.name" outlined/>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
                    label="E-mail"
                    v-model="customer.email_address"
                    :rules="emailRules"
                    required
                    outlined
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Phone" :value="customer.phone_number" :rules="phoneRules" required outlined />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="Company" :value="customer.company" outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Address" :value="customer.address" outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Postal code" :value="customer.postal_code" outlined />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="City" :value="customer.city" outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-select label="Country" :value="customer.country" :items="countries" outlined />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-checkbox required :value="customer.email_verified" label="E-mail verified" />
          </v-col>
          <v-col>
            <v-checkbox required :value="customer.phone_verified" label="Phone verified" />
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-btn @click="goBack()" color="error">Cancel</v-btn>
          <v-btn @click="addCustomer()" color="success" :disabled="!valid">Save</v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import {Customer} from "~/models/customer";
import Countries from "~/assets/data/countries.json";

@Component
export default class extends Vue {
  private valid: boolean = true;
  private customerId: number = 0;
  private customer: Customer = new Customer();
  emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+/.test(v) || 'E-mail must be valid'
  ];
  phoneRules = [
    (v: string) => !!v || 'Phone is required',
    (v: string) => v.length == 10 || 'Phone number must have 10 digits'
  ];

  created() {
    this.customerId = parseInt(this.$route.params.id);
    this.customer = this.$store.getters['customers/getCustomer'](this.customerId);
  }

  get countries() {
    return Countries.map((c) => {
      return {
        text: c.text,
        value: c.value.toLowerCase()
      };
    });
  }

  layout() {
    return "mws";
  }
}
</script>
