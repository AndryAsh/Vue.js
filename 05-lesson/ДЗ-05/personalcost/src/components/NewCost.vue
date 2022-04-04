<template>
  <form
    v-if="showFormNewCost"
    class="costs__add-form"
    @submit.prevent="onSaveClick()"
  >
    <label for="cost-description">Описание платежа</label>
    <select
      v-model="descriptionCost"
      id="cost-description"
      class="costs__add-form__select"
      required
    >
      <option v-for="(item, index) in categoryList" :key="index">
        {{ item }}
      </option>
    </select>
    <label for="cost-date">Дата платежа</label>
    <input
      v-model="dateCost"
      id="cost-date"
      class="costs__add-form__input"
      type="date"
      required
    />
    <label for="cost-amount">Сумма платежа</label>
    <input
      v-model="amountCost"
      id="cost-amount"
      class="costs__add-form__input"
      type="number"
      required
    />
    <input
      class="costs__add-button add-form-button"
      type="submit"
      value="add cost"
    />
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NewCost",
  props: {
    showNewCost: {
      type: Boolean,
      default: () => false,
    },
    costData: {
      type: Object,
      default: () => null,
    },
    costManage: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      descriptionCost: null,
      dateCost: null,
      amountCost: null,
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
    categoryList() {
      return this.getCategoryList;
    },
    showFormNewCost() {
      return this.showNewCost;
    },
  },
  watch: {
    descriptionCost: function (newValue) {
      if (!newValue) {
        this.descriptionCost = this.categoryList[0];
      } else {
        this.descriptionCost = newValue;
      }
    },
    dateCost: function (newValue) {
      if (!newValue) {
        this.dateCost = new Date().toISOString().slice(0, 10);
      }
    },
    costManage: function (newValue) {
      this.descriptionCost = newValue.descriptionCost;
      this.dateCost = newValue.dateCost;
      this.amountCost = newValue.amountCost;
    },
    costData: function (newValue) {
      // Если все данные есть
      if (newValue.category && newValue.value && this.dateCost) {
        this.descriptionCost = newValue.category;
        this.amountCost = newValue.value;

        // Создаем запись автоматически, не открывая формы
        this.onSaveClick();
        // Возвращаемся в HomeView
        this.$router.push("/");
        // Если какие-то данные отсутствуют, открываем форму, заполняем и ждем
      } else {
        this.descriptionCost = newValue.category;
        this.amountCost = newValue.value;
      }
    },
  },
  methods: {
    ...mapActions(["fetchCategoryData"]),
    onSaveClick() {
      const d = this.dateCost.split("-");
      [d[0], d[2]] = [d[2], d[0]];
      const dateCost = d.join(".");
      const data = {
        id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            let r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
        ),
        date: dateCost,
        category: this.descriptionCost,
        value: this.amountCost,
        showNewCost: false,
      };
      this.$emit("addNewPayment", data);

      this.descriptionCost = null;
      this.dateCost = null;
      this.amountCost = null;

      if (this.$route.params.name === "newCost") {
        this.$router.push("/");
      }
    },
    onSaveCategory() {
      this.$emit("addNewCategory", this.newCategory);
      this.newCategory = null;
    },
  },
  async mounted() {
    if (!this.categoryList.length) {
      await this.fetchCategoryData();
      this.descriptionCost = this.categoryList[0];
    }
    this.dateCost = "";
  },
};
</script>