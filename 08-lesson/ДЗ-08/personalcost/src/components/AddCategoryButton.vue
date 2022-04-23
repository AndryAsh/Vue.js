<template>
  <v-btn
    color="teal"
    dark
    x-large
    class="ml-2 my-4 font-weight-bold"
    @click="clickedAddCategory()"
  >
    {{ showNewCategory ? txtBtnClose : txtBtnAdd }} <v-icon>mdi-plus</v-icon>
  </v-btn>
  <!-- <button @click="clickedAddCategory()" class="costs__add-button">
    {{ showNewCategory ? txtBtnClose : txtBtnAdd }}
  </button> -->
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