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
                                clearable
                                v-bind="attrs"
                                v-on="on"
                            />
                        </template>
                        <v-date-picker
                            v-model="dateStart"
                            type="month"
                            @input="menuStart = false"
                            no-title
                            scrollable
                        />
                    </v-menu>
                    <v-spacer />
                    <v-menu
                        ref="menuEnd"
                        v-model="menuEnd"
                        :close-on-content-click="false"
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
                                clearable
                                v-bind="attrs"
                                v-on="on"
                            />
                        </template>
                        <v-date-picker
                            v-model="dateEnd"
                            type="month"
                            @input="menuEnd = false"
                            no-title
                            scrollable
                        />
                    </v-menu>
                    <v-spacer />
                    <v-btn color="success">Export as CSV</v-btn>
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
    dateStart: string = '';
    dateEnd: string = '';

    filterDate(value: string) {
      if (!this.dateStart && !this.dateEnd) return true;
      if (value >= this.dateStart && value <= this.dateEnd) return value;
    }

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
                filter: this.filterDate,
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
                text: 'Club payout',
                value: 'clubPayout'
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
                text: 'Revenue/proceeds ratio',
                value: 'rpRatio'
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
                date: '2020-07',
                setupFee: 14250.00,
                vatFee: 13331.34,
                handlingCosts: 7123.72,
                totalProceeds: 109825.00,
                clubPayout: 75119.94,
                numOfEvents: 40,
                avgProcPerEvent: 2745.63,
                avgMWSRevPerEvent: 689.53,
                rpRatio: 25.11,
                totalMWSRev: 27581.34
            },
            {
                date: '2020-08',
                setupFee: 10999.19,
                vatFee: 9849.83,
                handlingCosts: 2603.38,
                totalProceeds: 50950.00,
                clubPayout: 27497.60,
                numOfEvents: 5,
                avgProcPerEvent: 10190.00,
                avgMWSRevPerEvent: 4169.80,
                rpRatio: 40.92,
                totalMWSRev: 20849.02,
            },
            {
                date: '2020-09',
                setupFee: 18500.00,
                vatFee: 19687.14,
                handlingCosts: 6325.67,
                totalProceeds: 102432.00,
                clubPayout: 57919.19,
                numOfEvents: 10,
                avgProcPerEvent: 10243.20,
                avgMWSRevPerEvent: 3818.71,
                rpRatio: 37.28,
                totalMWSRev: 38187.14
            },
            {
              date: '2020-10',
              setupFee: 16450.00,
              vatFee: 12445.22,
              handlingCosts: 6132.09,
              totalProceeds: 68046.00,
              clubPayout: 33018.69,
              numOfEvents: 13,
              avgProcPerEvent: 5234.31,
              avgMWSRevPerEvent: 2222.71,
              rpRatio: 42.46,
              totalMWSRev: 28895.22
            },
            {
              date: '2020-11',
              setupFee: 32250.00,
              vatFee: 166136.87,
              handlingCosts: 7702.04,
              totalProceeds: 856796.00,
              clubPayout: 650707.09,
              numOfEvents: 70,
              avgProcPerEvent: 12239.94,
              avgMWSRevPerEvent: 2834.10,
              rpRatio: 23.15,
              totalMWSRev: 198386.87
            },
            {
              date: '2020-12',
              setupFee: 12610.75,
              vatFee: 17283.20,
              handlingCosts: 3254.23,
              totalProceeds: 88536.00,
              clubPayout: 55387.82,
              numOfEvents: 7,
              avgProcPerEvent: 12648.00,
              avgMWSRevPerEvent: 4270.56,
              rpRatio: 33.76,
              totalMWSRev: 29893.95
            },
            {
                date: 'Totals',
                setupFee: 105059.94,
                vatFee: 238733.60,
                handlingCosts: 33141.13,
                totalProceeds: 1276585.00,
                clubPayout: 899650.33,
                numOfEvents: 145,
                avgProcPerEvent: 8804.03,
                avgMWSRevPerEvent: 2370.99,
                rpRatio: 26.93,
                totalMWSRev: 343793.54
            }
        ];
    }
}
</script>
