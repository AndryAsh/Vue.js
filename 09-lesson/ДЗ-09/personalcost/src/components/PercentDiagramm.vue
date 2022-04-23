<template>
  <v-col cols="8">
    <Doughnut :chart-data="chartData" :chartOptions="options" />
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";
import { Doughnut } from "vue-chartjs/legacy";

import { Chart as ChartJS, registerables, ArcElement } from "chart.js";
ChartJS.register(...registerables);
ChartJS.register(ArcElement);

export default {
  name: "PercentDiagramm",
  data() {
    return {
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Percent Diagramm from Payments",
          },
        },
      },
    };
  },
  components: {
    /* Bar, */
    Doughnut,
  },
  computed: {
    ...mapGetters([
      "getCategoryList",
      "getPaymentsList",
      "getFullPaymentsValue",
    ]),
    payments() {
      return Array.from(this.getPaymentsList);
    },
    category() {
      return Array.from(this.getCategoryList);
    },
    fullSumPauments() {
      return this.getFullPaymentsValue;
    },
    percentageOfCategorySums() {
      if (this.payments.length && this.category.length) {
        const sumCategoriesItems = [];
        this.category.forEach((category) => {
          const sumCategoriesItem = this.payments
            .filter((item) => item.category === category)
            .reduce((sum, item) => sum + Number(item.value), 0);

          sumCategoriesItems.push(sumCategoriesItem);
        });

        const percentSummCategory = sumCategoriesItems.map(
          (item) => (item * 100) / this.fullSumPauments
        );

        return percentSummCategory;
      } else {
        return [];
      }
    },
    chartData() {
      return {
        labels: this.category,
        datasets: [
          {
            label: "Percent Diagramm from Payments",
            data: this.percentageOfCategorySums,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(184, 255, 51)",
              "rgb(255, 51, 255)",
              "rgb(51, 246, 255)",
            ],
            hoverOffset: 4,
          },
        ],
      };
    },
  },
  /* watch: {
    category(newCategory) {
      this.chartData.labels = newCategory;
    },
    payments() {
      this.chartData.datasets[0].data = this.percentageOfCategorySums;
    },
  }, */
  /*  mounted() {
    this.chartData.labels = [...this.category];
    this.chartData.datasets[0].data = [...this.percentageOfCategorySums];
  }, */
};
</script>
