<template>
    <div>
        <v-toolbar-title class="mb-4">Monthly overview</v-toolbar-title>
        <v-data-table :headers="headers" :items="monthlyData">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-menu
                        ref="menuStart"
                        v-model="menuStart"
                        :close-on-content-click="false"
                        :return-value.sync="dateStart"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateStart"
                                label="From date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            />
                        </template>
                        <v-date-picker
                            v-model="dateStart"
                            type="month"
                            no-title
                            scrollable
                        >
                            <v-spacer/>
                            <v-btn
                                text
                                color="primary"
                                @click="menuStart = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menuStart.save(dateStart)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-spacer />
                    <v-menu
                        ref="menuEnd"
                        v-model="menuEnd"
                        :close-on-content-click="false"
                        :return-value.sync="dateEnd"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateEnd"
                                label="To date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            />
                        </template>
                        <v-date-picker
                            v-model="dateEnd"
                            type="month"
                            no-title
                            scrollable
                        >
                            <v-spacer />
                            <v-btn
                                text
                                color="primary"
                                @click="menuEnd = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menuEnd.save(dateEnd)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-spacer />
                    <v-btn>Export as CSV</v-btn>
                </v-toolbar>
            </template>
            <template v-slot:item.date="{item}">
                {{formatDate(item.date)}}
            </template>
            <template v-slot:item.setupFee="{item}">
                &euro; {{formatCurrency(item.setupFee)}}
            </template>
            <template v-slot:item.vatFee="{item}">
                &euro; {{formatCurrency(item.vatFee)}}
            </template>
            <template v-slot:item.handlingCosts="{item}">
                &euro; {{formatCurrency(item.handlingCosts)}}
            </template>
            <template v-slot:item.totalProceeds="{item}">
                &euro; {{formatCurrency(item.totalProceeds)}}
            </template>
            <template v-slot:item.avgProcPerEvent="{item}">
                &euro; {{formatCurrency(item.avgProcPerEvent)}}
            </template>
            <template v-slot:item.avgMWSRevPerEvent="{item}">
                &euro; {{formatCurrency(item.avgMWSRevPerEvent)}}
            </template>
            <template v-slot:item.totalMWSRev="{item}">
                &euro; {{formatCurrency(item.totalMWSRev)}}
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class proceedsDatatableComponent extends Vue {
    menuStart: boolean = false;
    menuEnd: boolean = false;
    dateStart: string = new Date().toISOString().substr(0, 7);
    dateEnd: string = new Date().toISOString().substr(0, 7);

    formatDate(date: string): string {
        const fullDate = new Date(date);
        if (fullDate.toDateString() == 'Invalid Date') return date;
        const month = fullDate.toLocaleString('default', { month: 'long' });
        const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
        return `${monthCapitalized} ${fullDate.getFullYear()}`;
    }

    formatCurrency(price: number): string {
        return price.toFixed(2).replace('.', ',');
    }

    get headers() {
        return [
            {
                text: 'Date',
                value: 'date',
                divider: true,
            },
            {
                text: 'Setup Fee',
                value: 'setupFee'
            },
            {
                text: '21% Fee',
                value: 'vatFee'
            },
            {
                text: 'Handling Costs',
                value: 'handlingCosts'
            },
            {
                text: 'Total Proceeds',
                value: 'totalProceeds'
            },
            {
                text: 'Events',
                value: 'numOfEvents'
            },
            {
                text: 'Average proceed per event',
                value: 'avgProcPerEvent'
            },
            {
                text: 'Average MWS revenue per event',
                value: 'avgMWSRevPerEvent'
            },
            {
                text: 'Total MWS revenue',
                value: 'totalMWSRev'
            }
        ];
    }

    get monthlyData() {
        return [
            {
                date: '2020-07-01',
                setupFee: 21860.75,
                vatFee: 28050.06,
                handlingCosts: 23180.30,
                totalProceeds: 205401.00,
                numOfEvents: 40,
                avgProcPerEvent: 5135.03,
                avgMWSRevPerEvent: 1247.77,
                totalMWSRev: 49910.81
            },
            {
                date: '2020-08-01',
                setupFee: 7499.19,
                vatFee: 7305.92,
                handlingCosts: 3528.90,
                totalProceeds: 39257.00,
                numOfEvents: 5,
                avgProcPerEvent: 7851.40,
                avgMWSRevPerEvent: 2961.02,
                totalMWSRev: 14805.11
            },
            {
                date: '2020-09-01',
                setupFee: 18500.00,
                vatFee: 19772.85,
                handlingCosts: 9523.40,
                totalProceeds: 107069.00,
                numOfEvents: 12,
                avgProcPerEvent: 5135.03,
                avgMWSRevPerEvent: 1247.77,
                totalMWSRev: 49910.81
            },
            {
                date: 'Totals',
                setupFee: 47859.94,
                vatFee: 55128.83,
                handlingCosts: 36232.60,
                totalProceeds: 351727.00,
                numOfEvents: 57,
                avgProcPerEvent: 5135.03,
                avgMWSRevPerEvent: 1247.77,
                totalMWSRev: 49910.81
            }
        ];
    }
}
</script>