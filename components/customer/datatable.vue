<template>
  <div class="customers-data">
    <h2>All customers</h2>
    <v-row>
      <v-col>
        <v-text-field
                v-model="search"
                label="Search"
                append-icon="mdi-magnify"
                single-line
                hide-details
        />
      </v-col>
      <v-col>
        <v-select
                :items="countries"
                label="Country"
                append-icon="mdi-globe-model"
                v-model="country"
        />
      </v-col>
      <v-col cols="2">
        <v-btn width="100%" @click="resetFilters">Reset filters</v-btn>
      </v-col>
    </v-row>
    <v-data-table
            :search="search"
            :headers="headers"
            :items="customers"
            :item-key="customers.id"
            :custom-filter="customSearchFilter"
    >
      <template v-slot:item.creation_date="{ item }">
        {{ formatDate(item.creation_date) }}
      </template>
      <template v-slot:item.forgot_password_date="{ item }">
        {{ formatDate(item.forgot_password_date) }}
      </template>
      <template v-slot:item.email_verified="{ item }">
        <v-simple-checkbox
                v-model="item.email_verified"
                disabled
        />
      </template>
      <template v-slot:item.phone_verified="{ item }">
        <v-simple-checkbox
                v-model="item.phone_verified"
                disabled
        />
      </template>
      <template v-slot:item.payment_verified="{ item }">
        <v-simple-checkbox
                v-model="item.payment_verified"
                disabled
        />
      </template>
      <template v-slot:item.recurring="{ item }">
        <v-simple-checkbox
                v-model="item.recurring"
                disabled
        />
      </template>
      <template v-slot:item.other_club_notifs="{ item }">
        <v-simple-checkbox
                v-model="item.other_club_notifs"
                disabled
        />
      </template>
      <template v-slot:item.email_unsubscribed="{ item }">
        <v-simple-checkbox
                v-model="item.email_unsubscribed"
                disabled
        />
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import ICustomer from "@/types/ICustomer";
import countries from "@/assets/data/countries.json";

@Component
export default class DataTable extends Vue {
  search: string = '';
  country: string = '';

  @Prop({ type: Array, required: true }) readonly customers!: ICustomer[];

  name() {
    return "customers-datatable"
  }

  formatDate(string: string) {
    const date = new Date(string);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    return `${day}-${month}-${year}`;
  }

  get countries() {
    return countries;
  }

  customSearchFilter(value: any, search: string, item: any, filters: any, filter: any) {
    const inName = RegExp(search, 'i').test(item.name);
    const inEmail = RegExp(search, 'i').test(item.email_address);
    const inTelephone = RegExp(search, 'i').test(item.phone_number);
    return inName || inEmail || inTelephone;
  }

  countryFilter(value: any) {
    if (!this.country) return true;
    return value.toLowerCase().includes(this.country.toLowerCase());
  }

  resetFilters() {
    this.search = '';
    this.country = '';
  }

  get headers() {
    return [
      {
        text: 'Id',
        value: 'id',
        divider: true
      },
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: 'Email',
        value: 'email_address'
      },
      {
        text: 'Phone',
        value: 'phone_number'
      },
      {
        text: 'Country',
        value: 'country',
        filter: this.countryFilter
      },
      {
        text: 'Postal Code',
        value: 'postal_code'
      },
      {
        text: 'City',
        value: 'city'
      },
      {
        text: 'Address',
        value: 'address'
      },
      {
        text: 'Company',
        value: 'company'
      },
      {
        text: 'Created',
        value: 'creation_date',
        width: 100
      },
      {
        text: 'currency',
        value: 'currency'
      },
      {
        text: 'Forgot password date',
        value: 'forgot_password_date',
        divider: true,
        width: 100
      },
      {
        text: 'Email unsubscribed',
        value: 'email_unsubscribed'
      },
      {
        text: 'Email verified',
        value: 'email_verified'
      },
      {
        text: 'Other club notifs',
        value: 'other_club_notifs'
      },
      {
        text: 'Payment verified',
        value: 'payment_verified'
      },
      {
        text: 'Phone verified',
        value: 'phone_verified'
      },
      {
        text: 'Recurring',
        value: 'phone_verified'
      },
      {
        text: 'Status',
        value: 'status'
      }
    ];
  }
}
</script>