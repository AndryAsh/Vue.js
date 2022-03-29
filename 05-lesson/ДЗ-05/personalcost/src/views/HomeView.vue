<template>
  <div id="app">
    <main>
      <div class="content">
        <div class="costs">
          <new-cost
            :categoryList="getCategoryList"
            :costData="costData"
            @addNewPayment="addNewPayment"
            @addNewCategory="addNewCategory"
          />

          <costs-table :costs="paginatedData" />
          <costs-pagination
            :pages="pageList"
            :currentPage="pageNumber"
            @prevPage="prevPage"
            @nextPage="nextPage"
            @changePage="changePage"
          />

          <div class="costs-buttons" @click="onCostButton($event)">
            <button id="Food200" class="costs-buttons__template">
              Food 200
            </button>
            <button id="Transport50" class="costs-buttons__template">
              Transport 50
            </button>
            <button id="Entertainment2000" class="costs-buttons__template">
              Entertainment 2000
            </button>
          </div>

          <div class="costs-buttons" @click="onCostButton($event)">
            <button id="Food" class="costs-buttons__template">Food</button>
            <button id="Transport" class="costs-buttons__template">
              Transport
            </button>
            <button id="Entertainment" class="costs-buttons__template">
              Entertainment
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import CostsTable from "@/components/CostsTable.vue";
import NewCost from "@/components/NewCost.vue";
import CostsPagination from "@/components/CostsPagination.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {
      currentPage: "", // текущий элемент пагинации
      costData: null, // данные для передачи в компонент NewCostS
    };
  },
  methods: {
    ...mapActions([
      "fetchData",
      "fetchFullData",
      "changePageNumber",
      "addNewItemFullDataList",
      "fetchCategoryData",
    ]),
    ...mapMutations(["setPaymentListData", "addCategory"]),
    addNewPayment(data) {
      this.addNewItemFullDataList(data);
    },
    addNewCategory(payload) {
      this.addCategory(payload);
    },
    prevPage() {
      const pageNum = this.getPageNumber - 1;
      this.currentPage.classList.remove("selected");
      this.changePageNumber(pageNum);
      this.currentPage = this.selectPaginationPage;
      this.$router.push({
        name: "currentPage",
        params: { id: pageNum },
      });
    },
    nextPage() {
      const pageNum = this.getPageNumber + 1;
      this.currentPage.classList.remove("selected");
      this.changePageNumber(pageNum);
      this.currentPage = this.selectPaginationPage;
      this.$router.push({
        name: "currentPage",
        params: { id: pageNum },
      });
    },
    changePage(newPage) {
      const pageNum = Number(newPage.dataset.id);
      this.currentPage.classList.remove("selected");
      this.changePageNumber(pageNum);
      this.currentPage = this.selectPaginationPage;
      this.$router.push({
        name: "currentPage",
        params: { id: pageNum },
      });
    },
    onCostButton(event) {
      const routes = {
        Food200: "/newcost/payment/Food/200/true",
        Transport50: "/newcost/payment/Transport/50/true",
        Entertainment2000: "/newcost/payment/Entertainment/2000/true",
        Food: "/newcost/payment/Food/true",
        Transport: "/newcost/payment/Transport/true",
        Entertainment: "/newcost/payment/Entertainment/true",
      };
      this.$router.push(routes[event.target.id]);
    },
  },
  computed: {
    ...mapGetters([
      "getPaymentsList",
      "getPaymentsListSize",
      "getFullPaymentsValue",
      "getDataListSize",
      "getPageNumber",
      "getPageData",
      "getCategoryList",
    ]),
    getFPV() {
      /* return this.$store.getters.getFullPaymentsValue; */
      return this.getFullPaymentsValue;
    },
    pageNumber() {
      return this.getPageNumber;
    },
    paginatedData() {
      return this.getPageData;
    },
    pageList() {
      const lst = [];
      for (let i = 1; i <= this.getDataListSize; i++) {
        lst.push(i);
      }
      return lst;
    },
    selectPaginationPage() {
      const el = document.querySelector(
        `.costs__pagination__page[data-id='${this.pageNumber}']`
      );
      el.classList.add("selected");
      return el;
    },
  },
  /* actions: {
    ...mapActions(["fetchData"]),
  }, */
  components: {
    CostsTable,
    NewCost,
    CostsPagination,
  },
  watch: {
    $route(to) {
      // обрабатываем изменение параметров маршрута...
      if (to.name === "newCost" || to.name === "newCostFull") {
        this.costData = to.params;
      }
    },
  },
  async created() {
    /* debugger; */
    if (!this.getDataListSize) {
      await this.fetchFullData();
      await this.fetchCategoryData();
    }
    this.fetchData();
    this.currentPage = this.selectPaginationPage;
  },
  mounted() {
    /* debugger; */
  },
  updated() {},
  beforeDestroy() {
    this.currentPage = "";
    delete this.currentPage;
  },
};
</script>
