<template>
    <v-card class="leaderbord">
        <v-card-title>
            Leaderbord
        </v-card-title>
        <v-card-subtitle>
            Leaderbord show top 5 customers with highest total money spent.
        </v-card-subtitle>
        <v-card-text>
            <v-data-table
                    :items="leaderbord"
                    :headers="headers"
                    :sort-desc="['TotalSpent']"
                    hide-default-footer
            >
                <template v-slot:item.Country="{ item }">
                    {{getCountry(item.Country)}}
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                            small
                            class="mr-2"
                            @click="openCustomer(item.ID)"
                    >
                        mdi-magnify
                    </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
        <v-dialog v-model="dialogDetail" max-width="500px">
            <detail-modal-customer :customer="customer" />
        </v-dialog>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import leaderbord from "~/assets/data/dashboard.json";
import Countries from "~/assets/data/countries.json";
import DetailModalCustomer from "~/components/customer/detail-modal.vue";
import {Customer} from "~/models/customer";

@Component({
    components: {
        'detail-modal-customer': DetailModalCustomer
    }
})
export default class Leaderbord extends Vue {
    private customer: Customer = new Customer();
    private dialogDetail: boolean = false;
    name(): string {
        return 'leader-bord';
    }

    get leaderbord() {
        return leaderbord.Leaderboards;
    }

    getCountry(code: string): string {
        const c = Countries.find((c) => c.value === code.toUpperCase());
        if (c === undefined) return 'Unknown country';
        return c.text;
    }

    openCustomer(id: number) {
        this.customer = this.$store.getters['customers/getCustomer'](id);
        this.dialogDetail = true;
    }

    get headers() {
        return [
            {
                text: 'Id',
                value: 'ID'
            },
            {
                text: 'Actions',
                value: 'actions',
                divider: true
            },
            {
                text: 'Name',
                value: 'Name'
            },
            {
                text: 'Email',
                value: 'Emailaddress'
            },
            {
                text: 'Country',
                value: 'Country'
            },
            {
                text: 'Total spent',
                value: 'TotalSpent'
            }
        ];
    }
}
</script>