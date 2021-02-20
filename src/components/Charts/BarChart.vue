<script>
  import { Bar, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;
  export default {
    extends: Bar,
    mixins: [reactiveProp],
    props: {
      chartData: {
        type: Object,
      },
      options: {
        type: Object,
      },
    },
    mounted() {
      this.createChart();
    },
    methods: {
      createChart() {
        this.renderChart(this.chartData, this.options);
      },
    },
  };
</script>
