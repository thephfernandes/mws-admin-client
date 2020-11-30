<template>
  <v-card>
    <v-row align="center">
      <v-col cols="12" md="2">
        <v-btn text large @click="goToOrders"><v-icon>mdi-chevron-left</v-icon>Orders</v-btn>
      </v-col>
      <v-col cols="12" md="10">
        <v-tabs v-model="tab" grow>
          <v-tab v-for="tab in tabs" :key="tab.id">
            <v-icon class="mr-2">{{ tab.icon }}</v-icon>
            {{ tab.name }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <general-info-component :orderId="orderId"/>
      </v-tab-item>
      <v-tab-item>
        <framing-component :orderId="orderId"/>
      </v-tab-item>
      <v-tab-item>
        Invoices
      </v-tab-item>
      <v-tab-item>
        Shipping details
      </v-tab-item>
      <v-tab-item>
        <product-component :orderId="orderId" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import OrderGeneralInfoComponent from "~/components/orders/tabs/orders-general-info.vue";
import OrderFramingComponent from "~/components/orders/tabs/orders-framing.vue";
import OrdersProductsComponent from "~/components/orders/tabs/orders-products.vue";

@Component({
  components: {
    'general-info-component': OrderGeneralInfoComponent,
    'framing-component': OrderFramingComponent,
    'product-component': OrdersProductsComponent
  }
})
export default class extends Vue {
  orderId: number = 0;
  private activeTab: number = 0;
  private tabs = [
    {
      id: 0, slug: 'general-info', name: 'General info', icon: 'mdi-clipboard-edit'
    },
    {
      id: 1, slug: 'framing', name: 'Framing', icon: 'mdi-image-filter-frames'
    },
    {
      id: 2, slug: 'invoices', name: 'Invoices', icon: 'mdi-file-document'
    },
    {
      id: 3, slug: 'shipping-details', name: 'Shipping details', icon: 'mdi-truck'
    },
    {
      id: 4, slug: 'products', name: 'Products', icon: 'mdi-tshirt-crew'
    }
  ];

  created() {
    this.orderId = parseInt(this.$route.params.id);
    const tab = this.tabs.find((t) => t.slug == this.$route.query?.tab);
    if (tab === undefined) return;
    this.activeTab = tab.id;
  }

  get tab() {
    return this.activeTab;
  }

  set tab(value) {
    const tab = this.tabs.find((t) => t.id == value);
    if (tab === undefined) return;
    this.activeTab = value;
    this.$router.push({ query: {tab: tab.slug } });
  }

  head() {
    return {
      title: 'Order '+ this.orderId
    }
  }

  goToOrders(): void {
    this.$router.push({name: 'orders'});
  }

  layout(): string {
    return 'mws';
  }
}
</script>
