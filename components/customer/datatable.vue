<template>
  <!-- Todo: Make this component a global datatable component -->
  <div class="customers-data">
    <h2>All customers</h2>
    <v-text-field
        v-model="search"
        label="Search"
        append-icon="mdi-magnify"
        single-line
        hide-details
    ></v-text-field>
    <v-data-table
        :search="search"
        :headers="headers"
        :items="customers"
        :item-key="customers.id"
    >
      <template v-slot:item.creation_date="{ item }">
        {{ formatDate(item.creation_date) }}
      </template>
      <template v-slot:item.forgot_password_date="{ item }">
        {{ formatDate(item.forgot_password_date) }}
      </template>
      <template v-slot:item.email_verified="{ item }">
        <v-chip
            :color="item.email_verified ? 'green' : 'red'"
        >
          {{ item.email_verified ? 'Yes' : 'No'}}
        </v-chip>
      </template>
      <template v-slot:item.phone_verified="{ item }">
        <v-chip
                :color="item.phone_verified ? 'green' : 'red'"
        >
          {{ item.phone_verified ? 'Yes' : 'No'}}
        </v-chip>
      </template>
      <template v-slot:item.payment_verified="{ item }">
        <v-chip
                :color="item.payment_verified ? 'green' : 'red'"
        >
          {{ item.payment_verified ? 'Yes' : 'No'}}
        </v-chip>
      </template>
      <template v-slot:item.recurring="{ item }">
        <v-chip
                :color="item.recurring ? 'green' : 'red'"
        >
          {{ item.recurring ? 'Yes' : 'No'}}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from "vue";
import ICustomer from "@/types/ICustomer";

export default Vue.extend({
  name: "customers-datatable",
  props: {
    customers: {
      type: Array,
      required: true,
    } as PropOptions<ICustomer[]>,
  },
  data() {
    return {
      search: "" as string,
    };
  },
  methods: {
    formatDate(string: string) {
      const date = new Date(string);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDay();
      return `${day}-${month}-${year}`;
    },
  },
  computed: {
    headers() {
      if (this.customers.length == 0) return;
      const keys = Object.keys(this.customers[0]);
      let headers = [] as Object[];
      keys.forEach((item, index) => headers.push({ text: item, value: item }));
      return headers;
    },
  },
});
</script>