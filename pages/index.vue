<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card-title class="text-h3 mb-5"
        >Welcome to the MatchWornShirt admin client
      </v-card-title>
      <v-card-subtitle class="py-0">
        <p class="text-h4">Here is a quick overview of what's possible</p>
      </v-card-subtitle>
      <v-card  v-if="exists('Content Management')" class="my-5" id="content-management-card">
        <v-card-title class="text-h4">Content Management</v-card-title>
        <v-card-text>
          <p class="text-h6">
            This section is responsible for controlling the displayed content on
            <a href="https://matchwornshirt.com">matchwornshirt</a>. Included
            items are:
          </p>
          <ul>
            <li>
              <v-card-subtitle class="text-h5">Slider Images</v-card-subtitle>
              <p class="text-h6 ml-5">
                The banner images on the landing page and their order
              </p>
            </li>
            <li>
              <v-card-subtitle class="text-h5"
                >Featured Matches</v-card-subtitle
              >
              <p class="text-h6 ml-5">
                The matches to be displayed on the homepage and their order
              </p>
            </li>
            <li>
              <v-card-subtitle class="text-h5">News</v-card-subtitle>
              <p class="text-h6 ml-5">
                The selected articles, their content and their current status
              </p>
            </li>
            <li>
              <v-card-subtitle class="text-h5">Charities</v-card-subtitle>
              <p class="text-h6 ml-5">
                Overview of charities and their descriptions
              </p>
            </li>
          </ul>
        </v-card-text>
      </v-card>
      <v-card v-if="exists('Customers')" class="my-5" id="customers-card">
        <v-card-title class="text-h4">Customers</v-card-title>
        <v-card-text>
          <p class="text-h6">Provides an overview of all customers, and access to relevant information such as their general info, purchase history, current bids, etc. </p>
        </v-card-text>
      </v-card>
      <v-card v-if="exists('Orders')" class="my-5" id="orders-card">
        <v-card-title class="text-h4">Orders</v-card-title>
        <v-card-text>
          <p class="text-h6">This item displays an dashboard including order statistics and a rich exportable data table of all matchwornshirt orders</p>
        </v-card-text>
      </v-card>
      <v-card v-if="exists('Finance')" class="my-5" id="finance-card">
        <v-card-title class="text-h4">Finance</v-card-title>
        <v-card-text>
          <v-card-subtitle v-if="exists('Dashboard')" class="text-h6">Dashboard</v-card-subtitle>
          <v-card-subtitle v-if="exists('Sellers')" class="text-h6">Sellers</v-card-subtitle>
          <v-card-subtitle v-if="exists('Invoice Agreements')" class="text-h6">Invoice Agreements</v-card-subtitle>
          <v-card-subtitle v-if="exists('Club Invoices')" class="text-h6">Club Invoices</v-card-subtitle>
        </v-card-text>
      </v-card>
      <v-card v-if="exists('Matches')" class="my-5" id="matches-card">
        <v-card-title class="text-h4">Matches</v-card-title>
        <v-card-text>
          <p class="text-h6">Overview and management of all currently scheduled matches, plus creation of new items.</p>
          <v-card-subtitle class="text-h6">Scheduled</v-card-subtitle>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  layout() {
    return "mws";
  }

  exists(item: string): boolean {
    return document.getElementById(item + ' nav item') !== null;
  }

  //DO NOT REMOVE: important otherwise cards wont render properly, im guessing race conditions?
  created() {
    this.exists('Finance');
  }
}
</script>
