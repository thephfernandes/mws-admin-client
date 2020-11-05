<template>
    <v-card>
        <v-card-title class="primary darken-1">
            <span class="headline white--text">Customer {{customer.name}}</span>
            <v-spacer></v-spacer>
            <v-btn dark icon>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </v-card-title>
        <v-list>
            <v-list-item>
                <v-list-item-action>
                    <v-icon v-if="customer.email_verified">mdi-email-check</v-icon>
                    <v-icon v-else>mdi-email-remove</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{customer.email_address}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-action>
                    <v-icon v-if="customer.phone_verified">mdi-phone-check</v-icon>
                    <v-icon v-else>mdi-phone-remove</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{customer.phone_number}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="customer.company">
                <v-list-item-action>
                    <v-icon>mdi-office-building</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{customer.company}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-map-marker</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title v-if="customer.address">{{getCountry(customer.country)}}, {{customer.city}}, {{customer.address}}</v-list-item-title>
                    <v-list-item-title v-else>{{getCountry(customer.country)}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item>
                <v-list-item-action>
                    Account created:
                </v-list-item-action>
                <v-list-item-content>
                    {{formatDate(customer.creation_date)}}
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-action>
                    Forgot password date:
                </v-list-item-action>
                <v-list-item-content>
                    {{formatDate(customer.forgot_password_date)}}
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-action>
                    Email unsubscribed:
                </v-list-item-action>
                <v-list-item-content>
                    <v-simple-checkbox
                            v-model="customer.email_unsubscribed"
                            disabled
                    />
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-action>
                    Currency:
                </v-list-item-action>
                <v-list-item-content>
                    {{customer.currency}}
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item>
                <v-list-item-action>
                    <v-row>
                        <v-col>
                            <v-icon v-if="customer.payment_verified">mdi-credit-card-check</v-icon>
                            <v-icon v-else>mdi-credit-card-remove</v-icon>
                            <v-icon v-if="customer.recurring">mdi-account-reactivate</v-icon>
                            <v-icon v-if="customer.currency == 'GBP'">mdi-currency-gbp</v-icon>
                            <v-icon v-if="customer.currency == 'EUR'">mdi-currency-eur</v-icon>
                        </v-col>
                    </v-row>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import {Customer} from "~/models/customer";
import Countries from "~/assets/data/countries.json"

@Component
export default class DetailModalCustomer extends Vue {
    @Prop({ type: Object, required: true }) readonly customer!: Customer;

    name() {
        return 'detail-modal-customer';
    }

    getCountry(code: string): string {
        const country = Countries.find(c => c.value == code.toUpperCase());
        if (country === undefined) return 'Unknown';
        return country.text;
    }

    formatDate(string: string) {
        const date = new Date(string);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDay();
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${day}-${month}-${year} ${hour}:${minute}`;
    }
}
</script>