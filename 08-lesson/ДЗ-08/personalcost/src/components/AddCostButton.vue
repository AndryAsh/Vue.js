<template>
  <v-btn
    color="teal"
    dark
    x-large
    class="my-4 font-weight-bold"
    @click="clickedAddCost()"
    ml-4
  >
    {{ showNewCost ? txtBtnClose : txtBtnAdd }} <v-icon>mdi-plus</v-icon>
  </v-btn>
  <!-- <button @click="clickedAddCost()" class="costs__add-button">
    {{ showNewCost ? txtBtnClose : txtBtnAdd }}
  </button> -->
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
      this.$emit("newCostManage", {
        showNewCost: !this.showNewCost,
        descriptionCost: null,
        // dateCost: null,
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
