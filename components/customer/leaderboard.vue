<template>
  <!-- Todo: Make this component a global datatable component -->
  <v-col>
    <v-card>
      <v-card-title>
        Leaderboard
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="Search"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :items="data"
        :headers="headers"
        loading="true"
        :search="search"
        :items-per-page="5"
      ></v-data-table>
    </v-card>
  </v-col>
</template>
<script lang="ts">
import Vue, { PropOptions } from "vue";
import ICustomer from "@/types/ICustomer";

export default Vue.extend({
  name: "Leaderboard",
  props: {
    data: {
      type: Array,
      required: true,
    } as PropOptions<ICustomer[]>,
  },
  data() {
    return {
      search: "" as string,
    };
  },
  computed: {
    headers() {
      if (this.data.length == 0) return;
      const keys = Object.keys(this.data[0]);
      let headers = [] as Object[];
      keys.forEach((item, index) => headers.push({ text: item, value: item }));
      return headers;
    },
  },
});
</script>