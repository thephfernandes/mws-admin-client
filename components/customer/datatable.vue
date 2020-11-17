<template>
  <div class="customers-data">
    <h2>All customers</h2>
    <v-row align="center">
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                    v-model="search"
                    label="Search for name, email & telephone"
                    prepend-icon="mdi-magnify"
                    single-line
                    hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                    :items="countries"
                    label="Country"
                    prepend-icon="mdi-globe-model"
                    v-model="country"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-menu
                    v-model="menuStartDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                        v-model="startDate"
                        label="From created at"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                />
              </template>
              <v-date-picker
                      v-model="startDate"
                      @input="menuStartDate = false"
                      first-day-of-week="1"
                      locale="SORT_GEORGIAN_MODERN"
              />
            </v-menu>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu
                    v-model="menuEndDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                        v-model="endDate"
                        label="To created at"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                />
              </template>
              <v-date-picker
                      v-model="endDate"
                      @input="menuEndDate = false"
                      first-day-of-week="1"
                      locale="SORT_GEORGIAN_MODERN"
              />
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn width="100%" @click="resetFilters" class="mb-1">Reset filters</v-btn>
        <v-btn width="100%" class="mt-1 mb-1" color="success" @click="goToNewCustomer()">
          <v-icon class="pr-2">mdi-account-plus</v-icon>
          New customer
        </v-btn>
        <v-btn width="100%" class="mt-1">
          <v-icon class="pr-2">mdi-download</v-icon>
          Export as CSV
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
            :search="search"
            :sort-desc="['creation_date']"
            :headers="headers"
            :items="customers"
            :item-key="customers.id"
            :custom-filter="customSearchFilter"
            :footer-props="footerPropsOptions"
    >
      <template v-slot:item.phone_number="{ item }">
        <span class="copy" v-clipboard:copy="item.phone_number" v-clipboard:success="onCopy">
          {{item.phone_number}}
        </span>
      </template>
      <template v-slot:item.email_address="{ item }">
        <span class="copy" v-clipboard:copy="item.email_address" v-clipboard:success="onCopy">
          {{item.email_address}}
        </span>
      </template>
      <template v-slot:item.id="{ item }">
        <NuxtLink :to="`/customers/${item.id}`" class="link">{{item.id}}</NuxtLink>
      </template>
      <template v-slot:item.creation_date="{ item }">
        {{ formatDate(item.creation_date) }}
      </template>
      <template v-slot:item.forgot_password_date="{ item }">
        {{ formatDate(item.forgot_password_date) }}
      </template>
      <template v-slot:item.status="{ item }">
        {{ getCustomerStatus(item.status) }}
      </template>
      <template v-slot:item.country="{ item }">
        {{ item.country.toUpperCase() }}
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
                class="mr-2"
                @click="editCustomer(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
                small
                @click="archiveCustomer(item)"
        >
          mdi-archive
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDetail" max-width="500px">
      <detail-modal-customer :customer="customer" />
    </v-dialog>
    <v-dialog v-model="dialogArchive" max-width="500px">
      <v-card>
        <v-card-title class="error">
          <span class="headline white--text">
            Archive
            <span v-if="customer.name">{{customer.name}}?</span>
            <span v-if="!customer.name">customer?</span>
          </span>

        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              Id: {{ customer.id }}
            </v-list-item>
            <v-list-item>
              Email: {{ customer.email_address }}
            </v-list-item>
            <v-list-item>
              Phone: {{ customer.phone_number }}
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogArchive = false">Cancel</v-btn>
          <v-btn color="error" text @click="archiveCustomerConfirm">Archive</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="archived">
      {{customer.email_address}} has been archived
    </v-snackbar>
    <v-snackbar v-model="isCopied" timeout="800" color="green">
      Content copied to clipboard.
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import VueClipboard from "vue-clipboard2";
import { Customer} from "~/models/customer";
import countries from "@/assets/data/countries.json";
import DetailModalCustomer from "~/components/customer/detail-modal.vue";
import { customerStatusEnum } from "~/enums/customerStatus";

Vue.use(VueClipboard);

@Component({
  components: {
    'detail-modal-customer': DetailModalCustomer
  }
})
export default class DataTable extends Vue {
  search: string = '';
  country: string = '';
  dialogDetail: boolean = false;
  dialogArchive: boolean = false;
  customer: Customer = new Customer();
  archived: boolean = false;
  menuStartDate: boolean = false;
  menuEndDate: boolean = false;
  startDate: string = '';
  endDate: string = '';
  isCopied: boolean = false;
  footerPropsOptions = {
    'items-per-page-options': [5, 10, 25, 50]
  };

  @Prop({ type: Array, required: true }) readonly customers!: Customer[];

  name() {
    return "customers-datatable";
  }

  onCopy() {
    this.isCopied = true;
  }

  formatDate(string: string) {
    const date = new Date(string);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${day}-${month}-${year}`;
  }

  get countries() {
    return countries;
  }

  getCustomerStatus(statusCode: number) {
    return customerStatusEnum[statusCode];
  }

  customSearchFilter(value: any, search: string, item: any) {
    const inName = RegExp(search, 'i').test(item.name);
    const inEmail = RegExp(search, 'i').test(item.email_address);
    const inTelephone = RegExp(search, 'i').test(item.phone_number);
    return inName || inEmail || inTelephone;
  }

  goToNewCustomer() {
    this.$router.push({path: '/customers/add'});
  }

  archiveCustomer(customer: Customer): void {
    this.customer = customer;
    this.dialogArchive = true;
  }

  archiveCustomerConfirm(): void {
    this.$store.dispatch('customers/suspend', this.customer);
    this.dialogArchive = false;
    this.archived = true;
  }

  countryFilter(value: any) {
    if (!this.country) return true;
    return value.toLowerCase().includes(this.country.toLowerCase());
  }

  dateFilter(value: string) {
    const date = new Date(value).toISOString().substr(0, 10);
    if (this.startDate == '' && this.endDate == '') {
      return value;
    } else if (date >= this.startDate && date <= this.endDate) {
      return value;
    } else if (date >= this.startDate && this.endDate == '') {
      return value;
    } else if (date <= this.endDate && this.startDate == '') {
      return value;
    }
  }

  resetFilters(): void {
    this.search = '';
    this.country = '';
    this.startDate = '';
    this.endDate = '';
  }

  openCustomer(item: Customer): void {
    this.customer = item;
    this.dialogDetail = true;
  }

  editCustomer(item: Customer) {
    this.$router.push({name: 'customers-id', params: { id: item.id.toString() }});
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
        width: 120
      },
      {
        text: 'Name',
        value: 'name',
        width: 200
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
        text: 'Created',
        value: 'creation_date',
        width: 100,
        filter: this.dateFilter
      },
      {
        text: 'Forgot password date',
        value: 'forgot_password_date',
        width: 100
      },
      {
        text: 'Status',
        value: 'status',
        divider: true
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
      }
    ];
  }
}
</script>
<style lang="scss" scoped>
  .copy {
    text-decoration: underline;
    &:hover {
      cursor: pointer;
      color: $color-primary-1;
    }
  }
  .link {
    text-decoration: none;
  }
</style>
