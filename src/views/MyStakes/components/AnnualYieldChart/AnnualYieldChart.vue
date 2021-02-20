<template>
  <div class="small">
    <line-chart
      v-if="isReadyForRerender"
      :chartData="data"
      :options="chartOptions"
      :height="200"
    />
    <div
      v-else
      class="skeleton-box"
      style="display: box; width: 100%; height: 200px"
    ></div>
  </div>
</template>

<script>
  import { formatDate } from '@/core/utils';
  import LineChart from '@/components/Charts/LineChart.vue';

  export default {
    name: 'AnnualYieldChart',
    components: {
      LineChart,
    },
    data() {
      return {
        arrPositive: [],
        isReadyForRerender: false,
        positiveChartColors: {
          borderColor: '#077187',
          pointBorderColor: '#0E1428',
          pointBackgroundColor: '#AFD6AC',
          backgroundColor: '#74A57F',
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    },
    methods: {
      async fillChart() {
        try {
          this.isReadyForRerender = false;
          const dataRes = await fetch(
            `${process.env.VUE_APP_HOST}/api/depools-statistics`
          );
          const data = await dataRes.json();
          data.forEach((d) => {
            const date = formatDate(d.utime).dateString;
            this.arrPositive.push({ date, total: d.annualYield.toFixed(2) });
          });

          const dates = this.arrPositive.map((d) => d.date);
          const totals = this.arrPositive.map((d) => d.total);
          const {
            borderColor,
            pointBorderColor,
            pointBackgroundColor,
            backgroundColor,
          } = this.positiveChartColors;

          this.data = {
            labels: dates,
            datasets: [
              {
                label: this.$t('annualYield') + '(%)',
                data: totals,
                borderColor: borderColor,
                pointBorderColor: pointBorderColor,
                pointBackgroundColor: pointBackgroundColor,
                backgroundColor: backgroundColor,
              },
            ],
          };
          this.isReadyForRerender = true;
        } catch (e) {
          console.error(e);
        }
      },
    },
    created() {
      this.fillChart();
    },
  };
</script>

<style>
  .small {
    /* max-width: 600px; */
    display: block;
    width: 100%;
    height: 200px;
    position: relative;
  }
</style>
