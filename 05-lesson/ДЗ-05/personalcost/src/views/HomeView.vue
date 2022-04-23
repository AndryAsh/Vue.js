<template>
  <div id="app">
    <main>
      <div class="content">
        <div class="costs">
          <div class="costs__add">
            <add-cost-button
              :showNewCost="showNewCost"
              @newCostManage="clickedAddCost"
            />
            <add-category-button
              :showNewCategory="showNewCategory"
              @newCategoryManage="clickedAddCategory"
            />
            <new-cost
              :showNewCost="showNewCost"
              :costManage="costManage"
              :costData="costData"
              @addNewPayment="addNewPayment"
            />
            <new-category
              :showNewCategory="showNewCategory"
              @addNewCategory="addNewCategory"
            />
          </div>

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

import AddCostButton from "@/components/AddCostButton.vue";
import AddCategoryButton from "@/components/AddCategoryButton.vue";
import NewCategory from "@/components/NewCategory.vue";

export default {
  name: "app",
  data() {
    return {
      currentPage: null,
      pageNumber: 1,
      costData: null, // данные для передачи в компонент NewCosts
      showNewCost: false,
      showNewCategory: false,
      costManage: null,
      categoryManage: null,
    };
  },
  methods: {
    ...mapActions(["fetchData", "fetchFullData", "addNewItemFullDataList"]),
    ...mapMutations(["addCategory"]),
    addNewPayment(data) {
      this.showNewCost = data.showNewCost;
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
      this.showNewCost = query.params.show;
      this.$router.push(query);
    },
    clickedAddCost(payment) {
      this.showNewCost = payment.showNewCost;
      this.costManage = payment;
    },
    clickedAddCategory(payment) {
      this.showNewCategory = payment.showNewCategory;
      this.categoryManage = payment;
    },
  },
  computed: {
    ...mapGetters([
      "getPaymentsListSize",
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
  components: {
    CostsTable,
    NewCost,
    NewCategory,
    CostsPagination,
    AddCostButton,
    AddCategoryButton,
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
    }
    this.fetchData(this.pageNumber);
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
