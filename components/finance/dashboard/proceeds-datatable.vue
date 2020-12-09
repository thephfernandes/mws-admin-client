<template>
    <div>
        <v-toolbar-title class="mb-4">Monthly overview</v-toolbar-title>
        <v-data-table :headers="headers" :items="monthlyData">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-menu
                        ref="menu"
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
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="dateStart"
                            type="month"
                            no-title
                            scrollable
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(dateStart)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-spacer />
                    <v-menu
                        ref="menu"
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
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="dateEnd"
                            type="month"
                            no-title
                            scrollable
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(dateEnd)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-spacer />
                    <v-btn>Export as CSV</v-btn>
                </v-toolbar>
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
    get headers() {
        return [
            {
                text: 'Date',
                value: 'date'
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
                totalProceeds: 205401.00
            },
            {
                date: '2020-08-01',
                setupFee: 7499.19,
                vatFee: 7305.92,
                handlingCosts: 3528.90,
                totalProceeds: 39257.00
            },
            {
                date: '2020-09-01',
                setupFee: 18500.00,
                vatFee: 19772.85,
                handlingCosts: 9523.40,
                totalProceeds: 107069.00
            },
            {
                date: 'Totals',
                setupFee: 47859.94,
                vatFee: 55128.83,
                handlingCosts: 36232.60,
                totalProceeds: 351727.00
            }
        ];
    }
}
</script>