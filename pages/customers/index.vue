<template>
  <div>
    <v-row dense>
      <v-col v-for="item in overview" :key="item[1]">
        <CustomerCard :title="item[1]" :subtitle="item[0]" />
      </v-col>
    </v-row>
    <Leaderbord />
    <Actions />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import CustomerCard from "~/components/customer/customerCard.vue";
import Leaderbord from "~/components/customer/leaderbord.vue";
import Actions from "~/components/customer/actions.vue";

@Component({
  components: {
    CustomerCard,
    Leaderbord,
  },
})
export default class Customers extends Vue {
  private overview: Array<[string, number]> = [
    ["Accounts created this week", 101],
    ["Total accounts", 11883],
    ["Returning customers", 2872],
  ];
  layout() {
    return "mws";
  }
}
</script>