<template>
  <v-form @submit.prevent="onSaveClick($event)">
    <v-container fluid>
      <v-col class="d-flex" cols="12">
        <v-text-field
          class="p-0 m-0"
          :class="{ hasError: $v.newCategory.$invalid }"
          type="text"
          v-model="$v.newCategory.$model"
          label="Название новой категории"
          single-line
          outlined
          required
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12">
        <v-btn
          type="submit"
          color="teal"
          dark
          x-large
          class="font-weight-bold p-0"
        >
          add category
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-container>
  </v-form>
  <!-- <form
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
  </form> -->
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

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
  validations: {
    newCategory: { required },
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
  },
  methods: {
    ...mapMutations(["addCategory"]),
    ...mapActions(["fetchCategoryData"]),
    onSaveClick() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
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

<style lang="scss">
.v-application .d-flex {
  padding: 0;
}
</style>