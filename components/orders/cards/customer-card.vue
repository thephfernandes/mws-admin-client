<template>
    <v-card tile :to="`/customers/${customerId}`">
        <v-img :src="headerImage" height="200px" width="auto">
            <v-card-title class="white--text">Customer info</v-card-title>
            <v-card-subtitle class="white--text">ID: {{customerId}}</v-card-subtitle>
        </v-img>
        <v-card-text>
            <v-list>
                <v-list-item v-if="customer.name">
                    <v-icon class="mr-2">mdi-account</v-icon> {{customer.name}}
                </v-list-item>
                <v-list-item>
                    <v-icon class="mr-2">
                        {{ customer.email_verified ? 'mdi-email-check' : 'mdi-email-alert' }}
                    </v-icon>
                    {{customer.email_address}}
                </v-list-item>
                <v-list-item>
                    <v-icon class="mr-2">
                        {{ customer.phone_verified ? 'mdi-phone-check' : 'mdi-phone-alert' }}
                    </v-icon>
                    {{customer.phone_number}}
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from "nuxt-property-decorator";

    @Component
    export default class CustomerCardComponent extends Vue {
        @Prop({ required: true }) readonly customerId!: number;

        name(): string {
            return 'customer-card-component';
        }

        get customer() {
            return this.$store.getters['customers/getCustomer'](this.customerId);
        }

        get  headerImage() {
            return 'https://the18.com/sites/default/files/styles/feature_image_with_focal/public/list-item-feature-images/20180326-The18-Image-Amazing-Soccer-Crowd-Chants.jpg?itok=1VaV27px';
        }
    }
</script>
