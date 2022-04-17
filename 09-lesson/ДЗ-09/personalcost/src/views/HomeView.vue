<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5 text-sm-h3 pb-3">My personal costs</div>

        <add-cost-button
          :showNewCost="showNewCost"
          @newCostManage="clickedAddCost"
        />
        <!-- <v-spacer></v-spacer> -->
        <add-category-button
          :showNewCategory="showNewCategory"
          @newCategoryManage="clickedAddCategory"
        />

        <costs-table :costs="currentElements" />

        <costs-pagination
          :dataListSize="getPaymentsListSize"
          :currentPage="pageNumber"
          :paginationSize="paginationSize"
          @changePage="changePage"
        />

        <v-container>
          <v-row>
            <v-col cols="4" align-self="center">
              <v-btn
                color="teal"
                dark
                block
                x-large
                class="font-weight-bold costs-template"
                @click="
                  onCostButton({
                    name: 'newCostFull',
                    params: { category: 'Food', value: 200, show: true },
                  })
                "
              >
                Food 200 <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4" align-self="center">
              <v-btn
                color="teal"
                dark
                block
                x-large
                class="font-weight-bold costs-buttons-template"
                @click="
                  onCostButton({
                    name: 'newCostFull',
                    params: { category: 'Transport', value: 50, show: true },
                  })
                "
              >
                Transport 50 <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4" align-self="center">
              <v-btn
                color="teal"
                dark
                block
                x-large
                class="font-weight-bold costs-template"
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
              >
                Entertainment 2000 <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row>
            <v-col cols="4" align-self="center">
              <v-btn
                color="teal"
                dark
                block
                x-large
                class="font-weight-bold costs-template"
                @click="
                  onCostButton({
                    name: 'newCost',
                    params: { category: 'Food', show: true },
                  })
                "
              >
                Food<v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4" align-self="center">
              <v-btn
                color="teal"
                dark
                block
                x-large
                class="font-weight-bold costs-template"
                @click="
                  onCostButton({
                    name: 'newCost',
                    params: { category: 'Transport', show: true },
                  })
                "
              >
                Transport<v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4" align-self="center">
              <v-btn
                color="teal"
                dark
                block
                x-large
                class="font-weight-bold costs-template"
                @click="
                  onCostButton({
                    name: 'newCost',
                    params: { category: 'Entertainment', show: true },
                  })
                "
              >
                Entertainment<v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col align="center">
        <percent-diagramm />
      </v-col>
    </v-row>

    <transition name="fade" key="ModalAddCost">
      <modal-window-add-payment-form v-if="modalShown" :settings="settings" />
    </transition>

    <transition name="fade" key="ModalContextMenu">
      <context-menu-table-costs />
    </transition>
  </v-container>
</template>

<script>
import CostsTable from "@/components/CostsTable.vue";
import CostsPagination from "@/components/CostsPagination.vue";

import { mapGetters, mapMutations, mapActions } from "vuex";

import AddCostButton from "@/components/AddCostButton.vue";
import AddCategoryButton from "@/components/AddCategoryButton.vue";
import PercentDiagramm from "@/components/PercentDiagramm.vue";

export default {
  name: "app",
  data() {
    return {
      currentPage: null, //
      pageNumber: 1, // Номер текущей страницы
      paginationSize: 5, // Количество записей на странице
      costData: null, // данные для передачи в компонент NewCosts
      showNewCost: false,
      showNewCategory: false,
      modalShown: false, // Флаг управления модальным окном
    };
  },
  methods: {
    ...mapActions(["fetchData", "fetchCategoryData"]),
    ...mapMutations(["addCategory", "addDataPaymentsList"]),
    changePage(newPage) {
      this.pageNumber = newPage;
    },
    addNewCategory(payload) {
      this.addCategory(payload);
    },
    onCostButton(query) {
      if (!this.getCategoryList.includes(query.params.category)) {
        this.addNewCategory(query.params.category);
      }
      this.showNewCost = query.params.show;
      if (this.showNewCost) {
        this.$modal.show("NewCost", {
          content: "new-cost",
          title: "add new cost",
          descriptionCost: query.params.category,
          amountCost: query.params.value,
          createCost: true,
        });
      }
    },
    clickedAddCost(payment) {
      this.showNewCost = payment.showNewCost;

      // Вызов модального окна с формой
      if (this.showNewCost) {
        this.$modal.show("NewCost", {
          content: "new-cost",
          title: "add new cost",
          descriptionCost: payment.descriptionCost,
          amountCost: payment.amountCost,
          createCost: true,
        });
      } else {
        this.$modal.hide();
      }
    },
    clickedAddCategory(payment) {
      this.showNewCategory = payment.showNewCategory;

      // Вызов модального окна с формой
      if (this.showNewCategory) {
        this.$modal.show("NewCategory", {
          content: "new-category",
          title: "add new category",
        });
      } else {
        this.$modal.hide();
      }
    },
    onShow(settings) {
      this.modalShown = true;
      this.settings = settings;
    },
    onHide() {
      this.modalShown = false;
      this.settings = {};
    },
  },
  computed: {
    ...mapGetters([
      "getPaymentsListSize",
      "getCategoryList",
      "getPaymentsList",
    ]),
    paymentsList() {
      return this.getPaymentsList;
    },
    categoryList() {
      return this.getCategoryList;
    },
    currentElements() {
      return this.paymentsList.slice(
        this.paginationSize * (this.pageNumber - 1),
        this.paginationSize * (this.pageNumber - 1) + this.paginationSize
      );
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
      return el;
    },
  },
  components: {
    CostsTable,
    CostsPagination,
    AddCostButton,
    AddCategoryButton,
    PercentDiagramm,
    ModalWindowAddPaymentForm: () =>
      import(
        /* webpackChunkName: "ModalComponent" */ "@/components/ModalWindowAddPaymentForm.vue"
      ),
    ContextMenuTableCosts: () =>
      import(
        /* webpackChunkName: "ModalComponent" */ "@/components/ContextMenuTableCosts.vue"
      ),
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
    if (!this.getPaymentList) {
      await this.fetchData();
    }
    if (!this.categoryList.length) {
      await this.fetchCategoryData();
    }
    this.currentPage = this.selectPaginationPage;
  },
  mounted() {
    /* debugger; */
    this.$modal.EventBus.$on("shown", this.onShow);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
  updated() {},
  beforeDestroy() {
    this.currentPage = "";
    delete this.currentPage;

    this.$modal.EventBus.$off("shown", this.onShow);
    this.$modal.EventBus.$off("hide", this.onHide);
  },
};
</script>

<style type="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.v-btn.costs-template {
  max-width: 100%;
  width: 100%;
}
</style>
