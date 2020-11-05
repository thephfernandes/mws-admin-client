<template>
  <div class="customers-data">
    <h2>All customers</h2>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
                v-model="search"
                label="Search"
                append-icon="mdi-magnify"
                single-line
                hide-details
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
                :items="countries"
                label="Country"
                append-icon="mdi-globe-model"
                v-model="country"
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-btn width="100%" @click="resetFilters" class="mb-1">Reset filters</v-btn>
        <v-btn width="100%" class="mt-1" color="success" @click="goToNewCustomer()"><v-icon class="pr-2">mdi-account-plus</v-icon>New customer</v-btn>
      </v-col>
    </v-row>
    <v-data-table
            :search="search"
            :sort-desc="['creation_date']"
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
      <template v-slot:item.actions="{ item }">
        <v-icon
                small
                class="mr-2"
                @click="openCustomer(item)"
        >
          mdi-magnify
        </v-icon>
        <v-icon
                small
                @click=""
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDetail" max-width="500px">
      <detail-modal-customer :customer="customer" />
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { Customer} from "~/models/customer";
import countries from "@/assets/data/countries.json";
import DetailModalCustomer from "~/components/customer/detail-modal.vue";

@Component({
  components: {
    'detail-modal-customer': DetailModalCustomer
  }
})
export default class DataTable extends Vue {
  search: string = '';
  country: string = '';
  dialogDetail: boolean = false;
  customer: Customer = new Customer();

  @Prop({ type: Array, required: true }) readonly customers!: Customer[];

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

  goToNewCustomer() {
    this.$router.push({path: '/customers/add'});
  }

  countryFilter(value: any) {
    if (!this.country) return true;
    return value.toLowerCase().includes(this.country.toLowerCase());
  }

  resetFilters() {
    this.search = '';
    this.country = '';
  }

  openCustomer(item: Customer) {
    this.customer = item;
    this.dialogDetail = true;
  }

  get headers() {
    return [
      {
        text: 'Id',
        value: 'id',
      },
      {
        text: 'Actions',
        divider: true,
        value: 'actions',
        sortable: false,
        width: 80
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
        value: 'recurring'
      },
      {
        text: 'Status',
        value: 'status'
      }
    ];
  }
}
</script>