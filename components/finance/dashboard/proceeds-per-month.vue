<template>
    <div>
        <div ref="proceedsPerMonthChart" class="proceedsPerMonthChart"></div>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import monthlyData from "~/assets/data/finance/monthly-chartdata.json";
am4core.useTheme(am4themes_animated);

@Component
export default class ProceedsPerMonthComponent extends Vue {
    chart: any = null;

    name(): string {
        return 'proceeds-per-month-component';
    }

    get chartData() {
        return monthlyData;
    }

    mounted(): void {
        this.createChart();
    }

    beforeDestroy(): void {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    defaultZoom(categoryAxis: am4charts.CategoryAxis): void {
        this.chart.events.on('ready', function () {
            categoryAxis.zoomToCategories('July 2020', 'November 2020');
        });
    }

    createChart(): void {
        this.chart = am4core.create(this.$refs.proceedsPerMonthChart as HTMLElement, am4charts.XYChart);
        this.chart.data = this.chartData;

        // Create axes
        let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "date";
        categoryAxis.renderer.grid.template.location = 0;

        this.defaultZoom(categoryAxis);

        let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Amount in euro's";
        valueAxis.extraMax = 0.1;
        valueAxis.calculateTotals = true;
        valueAxis.min = 0;

        this.createSeries("setupFee", "Setup Fee");
        this.createSeries("21Fee", "21% Fee");
        this.createSeries("handlingCosts", "Handling Costs");
        this.createSeries("clubPayout", "Club Payout");

        this.createTotalSeries();

        this.chart.legend = new am4charts.Legend();

        // Add horizotal scrollbar with preview
        let scrollbarX = new am4charts.XYChartScrollbar();
        this.chart.scrollbarX = scrollbarX;
    }

    // Create series
    createSeries(field: string, name: string) {
        // Set up series
        let series = this.chart.series.push(new am4charts.ColumnSeries());
        series.name = name;
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "date";
        series.sequencedInterpolation = true;

        // Make it stacked
        series.stacked = true;

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: € {valueY.formatNumber('#,###.00')}";

        // Add label
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "€ {valueY.formatNumber('#,###.00')}";
        labelBullet.locationY = 0.5;
        labelBullet.fontSize = 12;
        labelBullet.label.hideOversized = true;

        return series;
    }

    createTotalSeries(): void {
        let totalSeries = this.chart.series.push(new am4charts.ColumnSeries());
        totalSeries.dataFields.valueY = "none";
        totalSeries.dataFields.categoryX = "date";
        totalSeries.stacked = true;
        totalSeries.hiddenInLegend = true;
        totalSeries.columns.template.strokeOpacity = 0;

        // total label
        let totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
        totalBullet.dy = -20;
        totalBullet.label.text = "€ {valueY.total.formatNumber('#,###.00')}";
        totalBullet.label.hideOversized = false;
        totalBullet.label.fontSize = 12;
        totalBullet.label.background.fill = totalSeries.stroke;
        totalBullet.label.background.fillOpacity = 0.2;
        totalBullet.label.padding(5, 10, 5, 10);
    }

}
</script>
<style lang="scss" scoped>
.proceedsPerMonthChart {
    height: 500px;
}
</style>
