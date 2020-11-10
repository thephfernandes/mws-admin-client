<template>
    <v-card>
        <v-card-title class="primary darken-1">
            <span class="headline white--text">Customer {{customer.name}}</span>
            <v-spacer />
            <v-btn dark icon @click="editCustomer()">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </v-card-title>
        <v-tabs v-model="tab" grow>
            <v-tab>Info</v-tab>
            <v-tab v-if="note">Note<v-badge color="red" dot class="ml-1" /></v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
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
                <v-divider />
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
                            Other club notifs:
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-simple-checkbox
                                    v-model="customer.other_club_notifs"
                                    disabled
                            />
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            Status:
                        </v-list-item-action>
                        <v-list-item-content>
                            {{customer.status}}
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="customer.currency">
                        <v-list-item-action>
                            Currency:
                        </v-list-item-action>
                        <v-list-item-content>
                            {{customer.currency}}
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider />
                <v-list>
                    <v-list-item>
                        <v-list-item-action class="item-action">
                            <v-row justify="space-between">
                                <v-col>
                                    <v-icon v-if="customer.payment_verified">mdi-credit-card-check</v-icon>
                                    <v-icon v-else>mdi-credit-card-remove</v-icon>
                                    <v-icon v-if="customer.recurring">mdi-account-reactivate</v-icon>
                                    <v-icon v-if="customer.currency == 'GBP'">mdi-currency-gbp</v-icon>
                                    <v-icon v-if="customer.currency == 'EUR'">mdi-currency-eur</v-icon>
                                </v-col>
                                <v-col class="detail-modal__action">
                                    <v-btn>Send guide <v-icon>mdi-send</v-icon></v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-tab-item>
            <v-tab-item v-if="note">
                <v-card-text v-text="note.text" />
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import {Customer} from "~/models/customer";
import Countries from "~/assets/data/countries.json"

@Component
export default class DetailModalCustomer extends Vue {
    @Prop({ type: Object, required: true }) readonly customer!: Customer;
    tab = null;

    name(): string {
        return 'detail-modal-customer';
    }

    editCustomer(): void {
        this.$router.push({name: 'customers-id', params: { id: this.customer.id.toString() }});
    }

    getCountry(code: string): string {
        const country = Countries.find(c => c.value == code.toUpperCase());
        if (country === undefined) return 'Unknown';
        return country.text;
    }

    get note() {
        return this.$store.getters['customers/getNote'](this.customer.id);
    }

    formatDate(string: string): string {
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
<style lang="scss" scoped>
    .item-action {
        width: 100%;
    }
    .detail-modal {
        &__action {
            flex-grow: 0;
        }
    }
</style>