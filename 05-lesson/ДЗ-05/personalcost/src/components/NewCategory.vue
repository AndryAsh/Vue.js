<template>
  <form
    id="addCategoryForm"
    v-show="showNewCategory"
    class="costs__add-form"
    @submit.prevent="onSaveClick($event)"
  >
    <label for="cost-description">Название новой категории</label>
    <input
      v-model="newCategory"
      id="cost-description"
      class="costs__add-form__input"
      type="text"
      required
    />
    <input
      class="costs__add-button add-form-button"
      type="submit"
      value="add category"
    />
  </form>
</template>

<script>
export default {
  name: "NewCategory",
  props: {
    categoryList: {
      type: Array,
      default: () => [],
    },
    showNewCategory: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      newCategory: null,
    };
  },
  methods: {
    onSaveClick() {
      this.$emit("addNewCategory", this.newCategory);
      this.newCategory = null;
    },
  },
};
</script>