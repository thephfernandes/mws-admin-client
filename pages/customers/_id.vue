<template>
  <v-card>
    <v-row align="center">
      <v-col cols="12" md="2">
        <v-btn text large @click="goBack"><v-icon>mdi-chevron-left</v-icon>Customers</v-btn>
      </v-col>
      <v-col cols="12" md="10">
        <v-tabs v-model="tab" grow>
          <v-tab v-for="tab in tabs" :key="tab.id">
            <v-icon class="mr-2">{{tab.icon}}</v-icon>
            {{tab.name}}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <general-info :customerId="customerId"/>
      </v-tab-item>
      <v-tab-item>
        <finance />
      </v-tab-item>
      <v-tab-item>
        <product-history />
      </v-tab-item>
      <v-tab-item>
        <notifications />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import GeneralInfoComponent from "~/components/customer/tabs/general-info.vue";
import FinanceComponent from "~/components/customer/tabs/finance.vue";
import ProductHistoryComponent from "~/components/customer/tabs/product-history.vue";
import NotificationComponent from "~/components/customer/tabs/notifications.vue";

@Component({
  components: {
    'general-info': GeneralInfoComponent,
    'finance': FinanceComponent,
    'product-history': ProductHistoryComponent,
    'notifications': NotificationComponent
  }
})
export default class extends Vue {
  public customerId: number = 0;
  private activeTab: number = 0;
  private tabs = [
    {
      id: 0, slug: 'general-info', name: 'General info', icon: 'mdi-account'
    },
    {
      id: 1, slug: 'finance', name: 'Finance', icon: 'mdi-finance'
    },
    {
      id: 2, slug: 'product-history', name: 'Product history', icon: 'mdi-history'
    },
    {
      id: 3, slug: 'notifications', name: 'Notifications', icon: 'mdi-bell'
    }
  ];

  created() {
    this.customerId = parseInt(this.$route.params.id);
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

  goBack(): void {
    this.$router.push({name: 'customers'});
  }

  layout(): string {
    return "mws";
  }
}
</script>
