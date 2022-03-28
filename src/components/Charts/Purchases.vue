<template>
  <div>
    <apexcharts :options="options" :series="series"></apexcharts>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
  name: 'Chart',
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    backgroundColor: {
      type: String,
      required: true,
      default: '#123E6B',
    },
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const dataLabels = ref([]);
    const dataDatasetsData = ref([]);
    props.data.forEach((element) => {
      dataLabels.value.push(dayjs(element.day).format('MM/DD'));
      dataDatasetsData.value.push(element.value);
    });
    console.log('data', props.data);
    console.log('dataLabels', dataLabels.value);
    console.log('dataDatasetsData', dataDatasetsData.value);

    const options = ref({
      chart: {
        id: 'vuechart-example',
        type: 'bar',
      },
      colors: ['#0F77F0'],
      fill: {
        type: ['gradient'],
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.25,
          opacityFrom: 0.8,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      xaxis: {
        categories: dataLabels.value,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: '10px',
          colors: ['#304758'],
        },
      },
    });

    const series = ref([{
      name: 'series-1',
      data: dataDatasetsData.value,
    }]);

    return {
      options,
      series,
    };
  },
});
</script>
