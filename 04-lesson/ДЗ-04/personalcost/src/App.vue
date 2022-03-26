<template>
  <div id="app">
    <div class="container">
      <header class="page-header">
        <span class="page-header__title">my personal costs</span>
      </header>
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
          <div class="graphics"></div>
        </div>
      </main>
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import CostsTable from "./components/CostsTable.vue";
import NewCost from "./components/NewCost.vue";
import CostsPagination from "./components/CostsPagination.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {
      /* costs: [], */
      paginationSize: 5, // Шаг пагинации
      /* pageNumber: 1, // Номер страницы пагинации */
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
      this.currentPage.classList.remove("selected");
      this.changePageNumber(this.getPageNumber - 1);
      this.currentPage = this.selectPaginationPage;
    },
    nextPage() {
      this.currentPage.classList.remove("selected");
      this.changePageNumber(this.getPageNumber + 1);
      this.currentPage = this.selectPaginationPage;
    },
    changePage(newPage) {
      this.currentPage.classList.remove("selected");
      this.changePageNumber(Number(newPage.dataset.id));
      this.currentPage = this.selectPaginationPage;
    },
  },
  computed: {
    ...mapGetters([
      "getPaymentsList",
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
    await this.fetchFullData();
    await this.fetchCategoryData();
    this.fetchData();
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
$grey: #aeaeae;
$lihgt-grey: #dadada;
$dark-grey: #696969;
$green: #25a79a;
$white: #ffffff;

body {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.container {
  max-width: 95%;
  width: 100%;
  margin: 0 auto;
}
.page-header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 2rem;
  &__title {
    text-align: center;
    text-transform: uppercase;
    font-size: 2rem;
    color: $dark-grey;
    font-weight: bold;
  }
}
.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1rem;
}
.costs {
  display: flex;
  flex-direction: column;
  &__add {
    display: flex;
    justify-content: flex-start;
    gap: 2%;
    position: relative;
  }
  &__add-button {
    width: 20%;
    height: 3rem;
    text-align: center;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bold;
    color: $white;
    border: 1px solid $green;
    border-radius: 0.3rem;
    background-color: $green;
  }
  &__add-form {
    display: flex;
    position: absolute;
    box-sizing: border-box;
    width: 50%;
    top: 3.5rem;
    padding: 2%;
    border: 1px solid $dark-grey;
    border-radius: 0.5rem;
    flex-direction: column;
    align-items: center;
    background-color: $white;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.3);
    &__input,
    &__select {
      display: inline-block;
      margin: 2% 2%;
      width: 85%;
      padding: 1rem;
      border: 1px solid $dark-grey;
      border-radius: 0.5rem;
      box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
    }
    &__select {
      width: 95%;
      background-color: $white;
    }
    &__manage {
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
  }
  .add-form-button {
    width: 45%;
    margin-top: 4%;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
  }
  &__table {
    margin: 1rem 0;
    border: 1px solid $grey;
    border-collapse: collapse;
    &__th {
      border: 1px solid $grey;
      padding: 0.5rem 0;
      background-color: $dark-grey;
      color: $white;
    }
    &__td {
      border: 1px solid $grey;
      padding: 0.5rem;
    }
    &__tr:nth-child(odd) {
      background-color: $lihgt-grey;
    }
  }
  &__pagination {
    &__button {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0 0.2rem;
      color: $dark-grey;
      cursor: pointer;
      background-color: $white;
      border: none;
    }
    &__page {
      color: $dark-grey;
    }
  }
}
.selected {
  font-weight: bold;
  color: $green;
}
.num,
.date,
.cat {
  text-align: center;
}
.val {
  text-align: end;
}
/* nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
