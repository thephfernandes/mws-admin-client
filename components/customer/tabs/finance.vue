<template>
    <div>
        <v-card-title>Finance</v-card-title>
        <v-card-text>
            <v-form>

            </v-form>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field label="Maximum pending orders" :value="customer.maxPendingOrders || 3" type="number" outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field label="Maximum pending amount" :value="customer.maxPendingAmount || 500" type="number" outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn @click="updateCustomer()" color="success" width="200" class="mt-1" height="45">
                        <v-icon class="mr-2">mdi-check</v-icon>
                        Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider />
        <v-card-title>Invoices</v-card-title>
        <v-card-title>Purchase history</v-card-title>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "nuxt-property-decorator";
import { Customer } from "~/models/customer";

    @Component
    export default class FinanceComponent extends Vue {
        private customer: Customer = new Customer();

        name(): string {
            return 'finance-component';
        }

        created() {
            const id = this.$route.params.id
            const customer = this.$store.getters['customers/getCustomer'](id);
            this.customer = Object.assign({}, customer);
        }

        updateCustomer(): void {
            this.$store.dispatch('customers/update', this.customer);
            this.$router.push({name: 'customers'});
        }
    }
</script>