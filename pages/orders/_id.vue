<template>
  <v-card>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-autocomplete
            dense
            hide-details
            outlined
            label="Quick search order by player or user mail"
            :items="orders"
            @change="goToOrder"
        />
      </v-col>
    </v-row>
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
        <orders-invoice :orderId="orderId"></orders-invoice>
      </v-tab-item>
      <v-tab-item>
        <orders-shipping-details :orderId="orderId"></orders-shipping-details>
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
import OrdersShippingDetails from "~/components/orders/tabs/orders-shipping-details.vue";
import OrdersInvoice from "~/components/orders/tabs/orders-invoice.vue";
import {Order} from "~/models/Order";
import { IMatch } from "~/interfaces/v1.0/IMatch";

@Component({
  components: {
    OrdersInvoice,
    OrdersShippingDetails,
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
      id: 0, name: 'General info', icon: 'mdi-clipboard-edit'
    },
    {
      id: 1, name: 'Framing', icon: 'mdi-image-filter-frames'
    },
    {
      id: 2, name: 'Invoices', icon: 'mdi-file-document'
    },
    {
      id: 3, name: 'Shipping details', icon: 'mdi-truck'
    },
    {
      id: 4, name: 'Products', icon: 'mdi-tshirt-crew'
    }
  ];

  created() {
    this.orderId = parseInt(this.$route.params.id);
  }

  get tab() {
    return this.activeTab;
  }

  set tab(value) {
    const tab = this.tabs.find((t) => t.id == value);
    if (tab === undefined) return;
    this.activeTab = value;
  }

  head() {
    return {
      title: 'Order '+ this.orderId
    }
  }

  goToOrders(): void {
    this.$router.push({name: 'orders'});
  }

  get orders() {
    const orders: Order[] = this.$store.getters['orders/getOrders'];
    const orderItems: any = [];

    orders.forEach((order) => {
      const orderObj = {
        text: `${order.PlayerName} (${order.UserMail})`,
        value: order.OrderID,
        matchId: order.MatchID
      };
      if (orderItems.length === 0) {
        orderItems.push([orderObj]);
      } else {
        orderItems.forEach((value: any, valueIndex: number) => {
          if (order.MatchID === value[0].matchId) {
            orderItems[valueIndex].push(orderObj);
          }
        });
        orderItems.push([orderObj]);
      }
    });
    return this.flattenArray(orderItems);
  }

  flattenArray(orderItems: any) {
    const list: any = [];
    orderItems.forEach((item: any) => {
      const match: IMatch = this.$store.getters['matches/getMatchById'](item[0].matchId);
      const header = {
        header: `${match.HomeClubName} - ${match.VisitingClubName}`,
        value: item[0].matchId
      };
      const activeHeader = list.find((i: any) => i.header === header.value);
      if (!activeHeader) {
        list.push(header);
      }

      item.forEach((value: any) => {
        list.push(value);
      });
    });
    return list;
  }

  goToOrder(orderId: any) {
    this.$router.push({name: 'orders-id', params: {id: orderId}});
  }

  layout(): string {
    return 'mws';
  }
}
</script>
