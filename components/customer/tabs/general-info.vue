<template>
    <div>
        <div>
            <v-card-title>Edit customer<span v-if="customer.name">: {{customer.name}}</span></v-card-title>
            <v-card-subtitle>Customer id: {{ customerId }}</v-card-subtitle>
            <v-card-text>
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field label="Name" v-model="customer.name" outlined/>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                    label="E-mail"
                                    v-model="customer.email_address"
                                    :rules="emailRules"
                                    required
                                    outlined
                            />
                        </v-col>
                        <v-col cols="12" md="4">
                            <vue-tel-input v-model="customer.phone_number" :maxLen="15" required />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field label="Company" v-model="customer.company" outlined />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field label="Address 1" v-model="customer.address" outlined />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field label="Address 2" v-model="customer.address2" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="Postal code" v-model="customer.postal_code" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="City" v-model="customer.city" outlined />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-divider />
                            <v-checkbox label="Billing address" v-model="hasBillingAddress" color="secondary" />
                        </v-col>
                    </v-row>
                    <v-row v-if="hasBillingAddress">
                        <v-col cols="12" md="3">
                            <v-text-field label="Billing address 1" v-model="customer.billing_address1" solo />
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field label="Billing address 2"  v-model="customer.billing_address2" solo />
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field label="Billing postal code" v-model="customer.billing_postalcode" solo />
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field label="Billing city" v-model="customer.billing_city" solo />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field label="VAT number" v-model="customer.vat_number" outlined />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select label="Country" v-model="customer.country" :items="countries" outlined />
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col>
                            <v-checkbox v-model="customer.email_verified" label="E-mail verified" />
                        </v-col>
                        <v-col>
                            <v-checkbox v-model="customer.phone_verified" label="Phone verified" />
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col>
                            <v-checkbox v-model="customer.email_unsubscribed" label="E-mail unsubscribed" />
                        </v-col>
                        <v-col>
                            <v-checkbox v-model="customer.payment_verified" label="Payment verified" />
                        </v-col>
                    </v-row>
                    <v-row justify="space-between">
                        <v-btn @click="goBack()" color="error">Cancel</v-btn>
                        <v-btn @click="updateCustomer()" color="success" :disabled="!valid">Save</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </div>
        <v-card-title>Notes</v-card-title>
        <v-textarea
                label="Enter some notes"
                solo
                v-model="note.text"
        >
        </v-textarea>
        <v-btn @click="saveNote">Save note</v-btn>
        <v-snackbar v-model="PhoneError" color="red">Phone number must have 10 digits</v-snackbar>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "nuxt-property-decorator";
    import {Customer} from "~/models/customer";
    import Countries from "~/assets/data/countries.json";
    import {Prop} from "~/node_modules/nuxt-property-decorator";

    @Component
    export default class GeneralInfoComponent extends Vue {
        private valid: boolean = true;
        private customer: Customer = new Customer();
        private note: Object = '';
        private PhoneError: boolean = false;
        private hasBillingAddress: boolean = false;

        @Prop({ required: true }) readonly customerId!: number;

        emailRules = [
            (v: string) => !!v || 'E-mail is required',
            (v: string) => /.+@.+/.test(v) || 'E-mail must be valid'
        ];

        name(): string {
            return 'general-info-component';
        }

        created() {
            const customer = this.$store.getters['customers/getCustomer'](this.customerId);
            this.customer = Object.assign({}, customer);
            const note = this.$store.getters['customers/getNote'](this.customerId);
            if (note !== undefined) {
                this.note = Object.assign({}, note);
                return;
            }
            this.note = {id: this.customerId, text: ''};
        }

        updateCustomer(): void {
            if (this.phoneIsValid()) {
                this.$store.dispatch('customers/update', this.customer);
                this.$router.push({name: 'customers'});
            } else {
                this.PhoneError = true;
            }
        }

        phoneIsValid(): boolean {
            return this.customer.phone_number.length >= 10;
        }

        saveNote() {
            const note = this.$store.getters['customers/getNote'](this.customerId);
            if (note === undefined) {
                this.$store.dispatch('customers/addNote', this.note);
                return;
            }
            this.$store.dispatch('customers/updateNote', this.note);
        }

        goBack(): void {
            this.$router.push({name: 'customers'});
        }

        get countries() {
            return Countries.map((c) => {
                return {
                    text: c.text,
                    value: c.value.toLowerCase()
                };
            });
        }

        layout(): string {
            return "mws";
        }
    }
</script>
