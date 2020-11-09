<template>
    <div class="map">
        <h2>Registered accounts per country</h2>
        <div ref="mapSection" class="mapSection"></div>
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
}
</script>
<style scoped lang="scss">
    .mapSection {
        width: 100%;
        height: 500px;
    }
</style>