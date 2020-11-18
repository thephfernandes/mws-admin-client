<template>
    <div class="map">
        <v-card-title>Registered accounts per country</v-card-title>
        <v-card-subtitle>Total accounts registered <v-chip>{{totalRegistered}}</v-chip></v-card-subtitle>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-menu
                            v-model="menuStartDate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="startDate"
                                    label="From created at"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            />
                        </template>
                        <v-date-picker
                                v-model="startDate"
                                @input="menuStartDate = false"
                        />
                    </v-menu>
                </v-col>
                <v-col>
                    <v-menu
                            v-model="menuEndDate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="endDate"
                                    label="To created at"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            />
                        </template>
                        <v-date-picker
                                v-model="endDate"
                                @input="menuEndDate = false"
                        />
                    </v-menu>
                </v-col>
            </v-row>
            <div ref="mapSection" class="mapSection"></div>
        </v-card-text>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import dashboard from "~/assets/data/dashboard.json";

am4core.options.autoDispose = true;

@Component
export default class Map extends Vue {
    startDate: string = '';
    menuStartDate: boolean = false;
    menuEndDate: boolean = false;
    endDate: string = '';
    name(): string {
        return 'map';
    }
    mounted() {
        this.createMap();
    }

    createMap(): void {
        let map = am4core.create("mapSection", am4maps.MapChart);
        map.geodata = am4geodata_worldLow;
        map.projection = new am4maps.projections.Miller();

        const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

        polygonSeries.useGeodata = true;
        polygonSeries.include = this.countries.map((c) => c.id.toUpperCase());
        polygonSeries.data = this.countries;
        polygonSeries.heatRules.push({
            "property": "fill",
            "target": polygonSeries.mapPolygons.template,
            "min": am4core.color("#E8F5E9"),
            "max": am4core.color("#1B5E20")
        });

        const polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value}";
        polygonTemplate.fill = am4core.color("#26A69A");

        const hoverState = polygonTemplate.states.create("hover");
        hoverState.properties.fill = am4core.color("#004D40");
    }

    get countries() {
        return dashboard.num_accounts_per_country.map(({country: label, num: value})=>({id: label.toLocaleUpperCase(), value: value}));
    }

    get totalRegistered() {
        return dashboard.num_total_accounts;
    }
}
</script>
<style scoped lang="scss">
    .mapSection {
        width: 100%;
        height: 500px;
    }
</style>