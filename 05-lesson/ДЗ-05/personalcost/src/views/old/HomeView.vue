<template>
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
</template>

<script>
// @ is an alias to /src
import CostsTable from "@/components/CostsTable.vue";
import NewCost from "@/components/NewCost.vue";
import CostsPagination from "@/components/CostsPagination.vue";

export default {
  name: "HomeView",
  components: {
    CostsTable,
    NewCost,
    CostsPagination,
  },
};
</script>
