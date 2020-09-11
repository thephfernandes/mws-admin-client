<!-- Using Vue class component with nuxt property decorator -->
<template>
  <div>
    <v-row dense>
      <v-col v-for="(item, key) in jsonData.highlights" :key="key">
        <CustomerCard :title="item.value" :subtitle="item.title" />
      </v-col>
    </v-row>
    <v-row>
      <Leaderbord :data="customers" />
    </v-row>
    <Actions />
  </div>
</template>
<script lang="ts">
import CustomerCard from "~/components/customer/customerCard.vue";
import Leaderbord from "~/components/customer/leaderbord.vue";
import Actions from "~/components/customer/actions.vue";
import axios from "axios";
import ICustomer from "~/components/customer/ICustomer";
import { Component, Vue } from "nuxt-property-decorator";
import { mapState } from "vuex";

@Component({
  components: {
    CustomerCard,
    Leaderbord,
    Actions,
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
    return this.$store.state.customer.list;
  }

  // Hooks
  mounted() {
    this.$store.dispatch("customer/getAll");
  }
}
</script>