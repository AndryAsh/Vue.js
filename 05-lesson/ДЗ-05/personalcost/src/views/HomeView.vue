<template>
  <div id="app">
    <main>
      <div class="content">
        <div class="costs">
          <new-cost
            :categoryList="getCategoryList"
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
    fetchCosts() {
      return [
        { id: 1, date: "28.02.2022", category: "food", value: 169 },
        { id: 2, date: "28.02.2022", category: "food", value: 169 },
        { id: 3, date: "28.02.2022", category: "food", value: 169 },
        { id: 4, date: "28.02.2022", category: "food", value: 169 },
        { id: 5, date: "28.02.2022", category: "food", value: 169 },
        { id: 6, date: "28.02.2022", category: "food", value: 169 },
      ];
    },
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
  async created() {
    /* debugger; */
    if (!this.getDataListSize) {
      await this.fetchFullData();
      await this.fetchCategoryData();
    }
    /* if (!this.getPaymentsListSize) { */
    this.fetchData();
    /* } */
    /* this.$router.push({ name: "home" }); */
    this.currentPage = this.selectPaginationPage;
  },
  mounted() {
    /* debugger; */
  },
  beforeDestroy() {
    this.currentPage = "";
    delete this.currentPage;
  },
};
</script>
