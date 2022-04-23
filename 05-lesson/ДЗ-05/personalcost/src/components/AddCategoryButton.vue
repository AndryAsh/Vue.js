<template>
  <button @click="clickedAddCategory()" class="costs__add-button">
    {{ showNewCategory ? txtBtnClose : txtBtnAdd }}
  </button>
</template>

<script>
export default {
  name: "AddCategoryButton",
  props: {
    showNewCategory: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      txtBtnAdd: "add category",
      txtBtnClose: "close form",
    };
  },
  methods: {
    clickedAddCategory() {
      this.$emit("newCategoryManage", {
        showNewCategory: !this.showNewCategory,
      });
      /* this.showNewCategory = !this.showNewCategory; */
    },
  },
};
</script>