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
import monthlyData from "~/assets/data/finance/monthly-tabledata.json";

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

    get monthlyData() {
      return monthlyData;
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
}
</script>
