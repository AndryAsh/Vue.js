<template>
  <form
    id="addCategoryForm"
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
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "NewCategory",
  props: {
    settings: Object,
  },
  data() {
    return {
      newCategory: null,
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
  },
  methods: {
    ...mapMutations(["addCategory"]),
    ...mapActions(["fetchCategoryData"]),
    onSaveClick() {
      this.addCategory(this.newCategory);
      this.newCategory = null;
    },
  },
  async mounted() {
    if (!this.getCategoryList.length) {
      await this.fetchCategoryData();
    }
  },
};
</script>