<template>
  <!--   <div> -->
  <button @click="clickedAddCost()" class="costs__add-button">
    {{ showNewCost ? txtBtnClose : txtBtnAdd }}
  </button>
  <!-- <button @click="onCategoryClick()" class="costs__add-button">
      {{ showFormNewCategory ? txtBtnClose : "add category" }}
    </button> -->
  <!--   </div> -->
</template>

<script>
export default {
  name: "AddCostButton",
  props: {
    showNewCost: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      /* showNewCost: false, */
      txtBtnAdd: "add new cost",
      txtBtnClose: "close form",
    };
  },
  methods: {
    clickedAddCost() {
      /* this.showNewCost = !this.showNewCost; */
      /* this.descriptionCost = null;
      this.dateCost = null;
      this.amountCost = null; */
      this.$emit("newCostManage", {
        showNewCost: !this.showNewCost,
        /* descriptionCost: null,
        dateCost: null, */
        amountCost: null,
      });
      /* this.$router.push("/"); */
    },
    /* onCategoryClick() {
      this.showNewCategory = !this.showNewCategory;
    }, */
  },
};
</script>
