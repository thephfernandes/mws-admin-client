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
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import leaderbord from "~/assets/data/dashboard.json";
import Countries from "~/assets/data/countries.json";

@Component
export default class Leaderbord extends Vue {
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

    get headers() {
        return [
            {
                text: 'Id',
                value: 'ID',
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