<!-- Using Vue class component with nuxt property decorator -->
<template>
  <div>
    <v-row dense>
      <v-col v-for="(item, key) in jsonData.highlights" :key="key">
        <CustomerCard :title="item.value" :subtitle="item.title" />
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
import CustomerCard from "~/components/customer/customerCard.vue";
import Actions from "~/components/customer/actions.vue";
import DataTable from "~/components/customer/datatable.vue";
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    CustomerCard,
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
    let file = require("~/assets/fakeData.json");
    return file;
  }

  get customers() {
    return this.$store.state.customers.list;
  }

  // Hooks
  mounted() {
    this.$store.dispatch("customers/getAll");
  }
}
</script>