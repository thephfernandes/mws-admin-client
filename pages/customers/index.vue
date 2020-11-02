<!-- Using Vue class component with nuxt property decorator -->
<template>
  <div>
    <h1>Customers</h1>
    <v-row dense>
      <v-col>
        <highLightCard :title="totalAccounts" subtitle="Total accounts"></highLightCard>
      </v-col>
      <v-col>
        <highLightCard :title="accountsCreated" subtitle="Accounts created this week"></highLightCard>
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
import { Component, Vue } from "nuxt-property-decorator";
import { mapState } from "vuex";

@Component({
  components: {
    highLightCard,
    Actions,
    DataTable,
  },
})
export default class Index extends Vue {
  // Data

  // Methods
  layout() {
    return "mws";
  }

  // computed
  get jsonData() {
    let file = require("~/assets/menuStructure.json");
    return file;
  }

  get customers() {
    return this.$store.state.customers.list;
  }

  get totalAccounts() {
    return 9;
    return this.$store.getters.customers.totalCustomers;
  }

  get accountsCreated() {
    const rec = this.$store.state.customers.list[0];
    console.log(rec);
    return 9;
  }

  // Hooks
  mounted() {
    this.$store.dispatch("customers/getAll");
  }
}
</script>