<template>
  <div>
    <h5>평균 시세: {{ avg | numberUnit }}</h5>
    <h6>최저 시세: {{ min | numberUnit }}, 최고 시세: {{ max | numberUnit }}</h6>
    <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
import { mapState } from "vuex";

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      min: 0,
      max: 0,
      avg: 0,
    };
  },
  computed: {
    ...mapState("apartStore", ["apartDeals"]),
  },
  watch: {
    apartDeals() {
      let aptLabel = [];
      let aptPrice = [];
      for (let apartDeal of this.apartDeals) {
        aptLabel.unshift(apartDeal.dealYear + "." + apartDeal.dealMonth + "." + apartDeal.dealDay);
        let dealAmount = apartDeal.dealAmount.replace(",", "");
        aptPrice.unshift(parseInt(dealAmount) * 10000);
      }

      this.min = Math.min(...aptPrice);
      this.max = Math.max(...aptPrice);
      this.avg = aptPrice.reduce((p, c) => p + c, 0) / aptPrice.length;

      this.chartData = {
        labels: aptLabel,
        datasets: [
          {
            label: "거래 가격",
            backgroundColor: "#aaaaaa",
            data: aptPrice,
          },
        ],
      };
    },
  },
  filters: {
    numberUnit(value) {
      return (value / 100000000).toFixed(2) + "억원";
    },
  },
};
</script>
