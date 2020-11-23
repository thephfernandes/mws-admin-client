<template>
  <div>
    <h1>Customers</h1>
    <v-row dense>
      <v-col>
        <highlight-card :title="totalCustomers.toString()" subtitle="Total accounts" />
      </v-col>
      <v-col>
        <highlight-card :title="accountsCreated.toString()" subtitle="Accounts created this week" />
      </v-col>
      <v-col>
        <highlight-card :title="totalAmountSpent" subtitle="Total amount spent" :currency="0" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <leader-board />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DataTable :customers="customers" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Map />
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import HighlightCardComponent from "~/components/shared/highlight-card.vue";
import DataTable from "~/components/customer/datatable.vue";
import Leaderboard from "~/components/customer/leaderboard.vue";
import Map from "~/components/customer/map.vue";
import Dashboard from "~/assets/data/dashboard.json";
import {Component, Vue} from "nuxt-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {
    'highlight-card': HighlightCardComponent,
    'leader-board': Leaderboard,
    DataTable,
    Map,
  },
  computed: {
    ...mapGetters('customers', [
            'totalCustomers',
            'getTotalRecurring',
    ])
  }
})
export default class Index extends Vue {
  layout() {
    return "mws";
  }

  get customers() {
    return this.$store.state.customers.list;
  }

  get accountsCreated() {
    return 10;
  }

  get totalAmountSpent(): string {
    const totalAmountSpent = Dashboard.Leaderboards.reduce((total, currentValue) => (total + currentValue.TotalSpent), 0);
    const formatted = totalAmountSpent.toFixed(2);
    return `€ ${formatted.replace('.', ',')}`;
  }

  mounted() {
    this.$store.dispatch("customers/fillAll");
  }
}
</script>