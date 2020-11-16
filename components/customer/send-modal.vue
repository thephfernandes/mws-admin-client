<template>
    <v-card>
        <v-card-title class="primary darken-1" dark>
            <span class="headline white--text">
                Send to
                <span v-if="!customer.name" class="white--text">customer</span>
                <span v-if="customer.name" class="white--text">{{customer.name}}</span>
            </span>
        </v-card-title>
        <v-card-text>
            <v-card-subtitle>
                What would you like to send to {{customer.email_address}}?
            </v-card-subtitle>
            <v-row>
                <v-col>
                    <v-btn>Send guide</v-btn>
                </v-col>
                <v-col>
                    <v-btn>Send payment reminder</v-btn>
                    <v-btn class="mt-4">Send address reminder</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";
    import {Customer} from "~/models/customer";

    @Component
    export default class SendModalComponent extends Vue {
        @Prop({ type: Object, required: true }) readonly customer!: Customer;

        name(): string {
            return 'send-modal-component';
        }
    }

</script>