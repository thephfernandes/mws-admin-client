<template>
    <div>
        <h1>Finance: Dashboard</h1>
        <div ref="chartdiv" class="chartdiv"></div>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component
export default class DashboardPage extends Vue {
    chart: any = am4core.create("chartdiv", am4charts.XYChart);

    layout(): string {
        return 'mws';
    }

    get chartData() {
        return [
            {
                "year": "July 2020",
                "Setup fee": 21850.75,
                "21% fee": 28050.06,
                "Handling costs": 23180.30
            }
        ];
    }

    created(): void {
        this.createChart();
    }

    createChart(): void {
        // Create axes
        let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        categoryAxis.renderer.grid.template.location = 0;

        let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inside = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.min = 0;

        this.createSeries("europe", "Europe");
        this.createSeries("namerica", "North America");
        this.createSeries("asia", "Asia-Pacific");
        this.createSeries("lamerica", "Latin America");
        this.createSeries("meast", "Middle-East");
        this.createSeries("africa", "Africa");

        this.chart.legend = new am4charts.Legend();
    }

    // Create series
    createSeries(field, name) {

        // Set up series
        let series = this.chart.series.push(new am4charts.ColumnSeries());
        series.name = name;
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "year";
        series.sequencedInterpolation = true;

        // Make it stacked
        series.stacked = true;

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

        // Add label
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.locationY = 0.5;
        labelBullet.label.hideOversized = true;

        return series;
    }
}
</script>
