<template>
  <div class="small">
    <bar-chart
      v-if="isReadyForRerender"
      :chartData="data"
      :options="chartOptions"
      :height="30"
    />
  </div>
</template>

<script>
  import BarChart from '@/components/Charts/BarChart.vue';

  export default {
    name: 'StakeComplitionChart',
    components: {
      BarChart,
    },
    props: {
      rounds: Object,
      id: Number,
    },
    data() {
      return {
        data: [],
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
          scales: {
            xAxes: [{ display: false }],
            yAxes: [{ display: false, ticks: { beginAtZero: true } }],
          },
          legend: {
            display: false,
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        },
      };
    },
    watch: {
      id(n, o) {
        if (n !== o) {
          this.fillChart();
        }
      },
    },
    mounted() {
      this.fillChart();
    },
    methods: {
      fillChart() {
        this.isReadyForRerender = false;
        this.arrPositive = [];
        const sortedRounds = Object.entries(this.rounds).sort(
          (a, b) => parseInt(a, 16) - parseInt(b, 16)
        );
        sortedRounds.forEach((round) => {
          this.arrPositive.push({
            date: parseInt(round[1].id, 16),
            total: parseInt(round[1].step, 16) >= 3 ? 1 : 0.1,
          });
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
              data: totals,
              borderColor: borderColor,
              pointBorderColor: pointBorderColor,
              pointBackgroundColor: pointBackgroundColor,
              backgroundColor: backgroundColor,
            },
          ],
        };
        this.isReadyForRerender = true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .small {
    // flex-grow: 1;
    // min-height: 0;
    display: block;
    position: relative;
    width: 90px;
    height: 30px;

    // > div {
    // position: relative;
    // width: 90px;
    // height: 30px;
    // }
  }
</style>
