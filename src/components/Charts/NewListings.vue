<template>
  <div class="hello" ref="chartdiv">
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { formatDate } from '@/helpers';

am4core.useTheme(am4themesAnimated);

export default {
  name: 'Listings',
  mounted() {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

    chart.paddingRight = 20;

    const data = [];
    let visits = 10;
    for (let i = 1; i < 10; i++) {
      visits = Math.floor((Math.random() * 400));
      const dt = formatDate(new Date(2018, 0, i));
      data.push({
        date: dt, name: `name${i}`, value: visits,
      });
    }
    console.log(data);
    chart.data = data;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.dateFormats.setKey('day', 'dd/MM');
    dateAxis.periodChangeDateFormats.setKey('day', 'dd/MM');
    dateAxis.fontSize = '12';

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    valueAxis.renderer.line.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    // valueAxis.renderer.grid.template.disabled = true;

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';
    series.columns.template.width = am4core.percent(55);

    series.tooltipText = '{valueY.value}';
    chart.cursor = new am4charts.XYCursor();

    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY}';
    labelBullet.label.paddingBottom = '20';
    labelBullet.label.fontSize = '12';

    // const scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    series.fill = am4core.color('#f18c14');
    series.fillOpacity = 0.7;

    this.chart = chart;
  },

  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>
