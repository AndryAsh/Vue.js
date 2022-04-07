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
          </div>

          <costs-table :costs="currentElements" @selectedCost="selectedCost" />

          <costs-pagination
            :dataListSize="getPaymentsListSize"
            :currentPage="pageNumber"
            :paginationSize="paginationSize"
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

    <transition name="fade" key="Modal">
      <modal-window-add-payment-form v-if="modalShown" :settings="settings" />
      <modal-window-context-menu v-if="contextShown" :settings="settings" />
    </transition>
  </div>
</template>

<script>
import CostsTable from "@/components/CostsTable.vue";
import CostsPagination from "@/components/CostsPagination.vue";

import { mapGetters, mapMutations, mapActions } from "vuex";

import AddCostButton from "@/components/AddCostButton.vue";
import AddCategoryButton from "@/components/AddCategoryButton.vue";

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
      categoryManage: null,
      modalShown: false, // Флаг управления модальным окном
      contextShown: false,
    };
  },
  methods: {
    ...mapActions(["fetchData"]),
    ...mapMutations(["addCategory", "addDataPaymentsList"]),
    prevPage() {
      const pageNum = this.pageNumber - 1;
      this.currentPage.classList.remove("selected");
      this.pageNumber = pageNum;
      this.currentPage = this.selectPaginationPage;
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
        this.$router.push({
          name: "currentPage",
          params: { id: pageNum },
        });
      }
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
      /* console.log(payment); */
      this.showNewCategory = payment.showNewCategory;
      /* this.categoryManage = payment; */

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
    onShowContextMenu(settings) {
      this.contextShown = true;
      this.settings = settings;
    },
    onHideContextMenu() {
      this.contextShown = false;
      this.settings = {};
    },
    selectedCost(payload) {
      const costIndex = this.getPaymentsList.findIndex(
        (el) => el.id === payload.id
      );
      this.$context.showContextMenu("ContextMenuTableCosts", {
        content: "ContextMenuTableCosts",
        index: costIndex,
        uuid: payload.id,
        position: payload.position,
      });
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
    currentElements() {
      return this.paymentsList.slice(
        this.paginationSize * (this.pageNumber - 1),
        this.paginationSize * (this.pageNumber - 1) + this.paginationSize
      );
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
    CostsPagination,
    AddCostButton,
    AddCategoryButton,
    ModalWindowAddPaymentForm: () =>
      import(
        /* webpackChunkName: "ModalComponent" */ "@/components/ModalWindowAddPaymentForm.vue"
      ),
    ModalWindowContextMenu: () =>
      import(
        /* webpackChunkName: "ModalComponent" */ "@/components/ModalWindowContextMenu.vue"
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
    this.currentPage = this.selectPaginationPage;
  },
  mounted() {
    /* debugger; */
    this.$modal.EventBus.$on("shown", this.onShow);
    this.$modal.EventBus.$on("hide", this.onHide);

    this.$context.EventBus.$on("showContextMenu", this.onShowContextMenu);
    this.$context.EventBus.$on("hideContextMenu", this.onHideContextMenu);
  },
  updated() {},
  beforeDestroy() {
    this.currentPage = "";
    delete this.currentPage;

    this.$modal.EventBus.$off("shown", this.onShow);
    this.$modal.EventBus.$off("hide", this.onHide);

    this.$context.EventBus.$off("showContextMenu", this.onShowContextMenu);
    this.$context.EventBus.$off("hideContextMenu", this.onHideContextMenu);
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
