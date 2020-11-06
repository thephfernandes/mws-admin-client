<template>
  <div>
    <h1>Customers</h1>
    <v-row dense>
      <v-col>
        <highlight-card :title="totalCustomers" subtitle="Total accounts" />
      </v-col>
      <v-col>
        <highlight-card :title="accountsCreated" subtitle="Accounts created this week" />
      </v-col>
      <v-col>
        <highlight-card :title="getTotalRecurring" subtitle="Returning customers" />
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
    <Actions />
  </div>
</template>
<script lang="ts">
import highLightCard from "~/components/shared/highlight-card.vue";
import Actions from "~/components/customer/actions.vue";
import DataTable from "~/components/customer/datatable.vue";
import Leaderboard from "~/components/customer/leaderboard.vue";
import {Component, Vue} from "nuxt-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {
    'highlight-card': highLightCard,
    'leader-board': Leaderboard,
    Actions,
    DataTable,
  },
  computed: {
    ...mapGetters('customers', [
            'totalCustomers',
            'getTotalRecurring',
    ])
  }
})
export default class Index extends Vue {
  // Data

  // Methods
  layout() {
    return "mws";
  }

  // computed
  get customers() {
    return this.$store.state.customers.list;
  }

  get accountsCreated() {
    return 10;
  }

  // Hooks
  mounted() {
    this.$store.dispatch("customers/fillAll");
  }
}
</script>