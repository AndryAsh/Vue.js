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

          <!-- <costs-table :costs="paginatedData" /> -->
          <costs-table :costs="paymentsList" />
          <costs-pagination
            :dataListSize="getDataListSize"
            :currentPage="pageNumber"
            :paginationSize="getPaginationSize"
            @prevPage="prevPage"
            @nextPage="nextPage"
            @changePage="changePage"
          />

          <div class="costs-buttons">
            <button
              @click="
                onCostButton({
                  name: 'newCostFull',
                  params: { category: 'Food', value: 200, show: true },
                })
              "
              class="costs-buttons__template"
            >
              Food 200
            </button>
            <button
              @click="
                onCostButton({
                  name: 'newCostFull',
                  params: { category: 'Transport', value: 50, show: true },
                })
              "
              class="costs-buttons__template"
            >
              Transport 50
            </button>
            <button
              @click="
                onCostButton({
                  name: 'newCostFull',
                  params: {
                    category: 'Entertainment',
                    value: 2000,
                    show: true,
                  },
                })
              "
              class="costs-buttons__template"
            >
              Entertainment 2000
            </button>
          </div>

          <div class="costs-buttons">
            <button
              @click="
                onCostButton({
                  name: 'newCost',
                  params: { category: 'Food', show: true },
                })
              "
              class="costs-buttons__template"
            >
              Food
            </button>
            <button
              @click="
                onCostButton({
                  name: 'newCost',
                  params: { category: 'Transport', show: true },
                })
              "
              class="costs-buttons__template"
            >
              Transport
            </button>
            <button
              @click="
                onCostButton({
                  name: 'newCost',
                  params: { category: 'Entertainment', show: true },
                })
              "
              class="costs-buttons__template"
            >
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
      currentPage: null,
      pageNumber: 1,
      costData: null, // данные для передачи в компонент NewCosts
    };
  },
  methods: {
    ...mapActions([
      "fetchData",
      "fetchFullData",
      "addNewItemFullDataList",
      "fetchCategoryData",
    ]),
    ...mapMutations(["addCategory"]),
    addNewPayment(data) {
      this.addNewItemFullDataList(data);
    },
    addNewCategory(payload) {
      this.addCategory(payload);
    },
    prevPage() {
      const pageNum = this.pageNumber - 1;
      this.currentPage.classList.remove("selected");
      this.pageNumber = pageNum;
      this.currentPage = this.selectPaginationPage;
      this.fetchData(pageNum);
      this.$router.push({
        name: "currentPage",
        params: { id: pageNum },
      });
    },
    nextPage() {
      const pageNum = this.pageNumber + 1;
      this.currentPage.classList.remove("selected");
      this.pageNumber = pageNum;
      this.currentPage = this.selectPaginationPage;
      this.fetchData(pageNum);
      this.$router.push({
        name: "currentPage",
        params: { id: pageNum },
      });
    },
    changePage(newPage) {
      const pageNum = Number(newPage.dataset.id);
      if (pageNum !== Number(this.currentPage.dataset.id)) {
        this.currentPage.classList.remove("selected");
        this.pageNumber = pageNum;
        this.currentPage = this.selectPaginationPage;
        this.fetchData(pageNum);
        this.$router.push({
          name: "currentPage",
          params: { id: pageNum },
        });
      }
    },
    onCostButton(query) {
      if (!this.getCategoryList.includes(query.params.category)) {
        this.addNewCategory(query.params.category);
      }
      this.$router.push(query);
    },
  },
  computed: {
    ...mapGetters([
      /* "getPaymentsList", */
      "getPaymentsListSize",
      /* "getFullPaymentsValue", */
      "getDataListSize",
      "getCategoryList",
      "getPaginationSize",
      "getPaymentsList",
    ]),
    // Количество строк на странице
    paginationSize() {
      return this.getPaginationSize;
    },
    paymentsList() {
      return this.getPaymentsList;
    },
    /* getFPV() {
      // return this.$store.getters.getFullPaymentsValue;
      return this.getFullPaymentsValue;
    }, */
    /* pageNumber() {
      return this.getPageNumber;
    }, */
    /* paginatedData() {
      return this.getPageData;
    }, */
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
    this.fetchData(this.pageNumber);
    this.currentPage = this.selectPaginationPage;
    /* if (this.$route.name === "currentPage") {
      this.pageNumber = Number(this.$route.params.id);
      this.currentPage.classList.remove("selected");
    } */
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
