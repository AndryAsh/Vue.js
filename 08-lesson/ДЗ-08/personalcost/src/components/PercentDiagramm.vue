<template>
  <div>
    <!-- {{ data }} -->
    <!-- {{ category }} -->
    {{ percentageOfCategorySums }}
  </div>
</template>

<script>
/* import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins; */
import { mapGetters } from "vuex";

export default {
  /* extends: Doughnut,
  mixins: [reactiveProp], */
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
            .reduce((sum, item) => sum + item.value, 0);

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
  },
  mounted() {
    /* this.renderChart(this.chartData, this.options); */
  },
};
</script>
