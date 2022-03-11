<template>
  <BarChart :chartData="chartsData" :options="options" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default defineComponent({
  name: 'Home',
  components: {
    BarChart,
  },
  props: {
    backgroundColor: {
      type: String,
      required: true,
      default: '#123E6B',
    },
  },
  setup(props) {
    const chartsData = {
      labels: ['01/01', '03/01', '05/01', '07/01', '09/01'],
      datasets: [
        {
          labels: 'label test',
          data: [30, 40, 60, 70, 110],
          backgroundColor: props.backgroundColor,
        },
      ],
    };

    const options = ref({
      responsive: true,
      maintainAspectRatio: true,
      height: 400,
      plugins: {
        legend: {
          display: false,
          position: 'top',
        },
      },
    });

    return {
      chartsData,
      options,
    };
  },
});
</script>
