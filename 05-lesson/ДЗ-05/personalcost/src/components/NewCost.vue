<template>
  <div>
    <div class="costs__add">
      <button @click="clickedAddCost()" class="costs__add-button">
        {{ showFormNewCost ? txtBtnClose : txtBtnAdd }}
      </button>
      <button @click="onCategoryClick()" class="costs__add-button">
        {{ showFormNewCategory ? txtBtnClose : "add category" }}
      </button>
      <form
        v-show="showFormNewCost"
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
      <form
        id="addCategoryForm"
        v-show="showFormNewCategory"
        class="costs__add-form"
        @submit.prevent="onSaveCategory($event)"
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
    </div>
  </div>
</template>

<script>
export default {
  name: "NewCost",
  props: {
    categoryList: {
      type: Array,
      default: () => [],
    },
    costData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      descriptionCost: null,
      dateCost: null,
      amountCost: null,
      showNewCost: false,
      showNewCategory: false,
      txtBtnAdd: "add new cost",
      txtBtnClose: "close form",
      newCategory: null,
    };
  },
  computed: {
    showFormNewCost() {
      return this.showNewCost;
    },
    showFormNewCategory() {
      return this.showNewCategory;
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
        this.showNewCost = Boolean(newValue.show);
      }
    },
  },
  methods: {
    clickedAddCost() {
      this.showNewCost = !this.showNewCost;

      this.descriptionCost = null;
      this.dateCost = null;
      this.amountCost = null;

      this.$router.push("/");
    },
    onCategoryClick() {
      this.showNewCategory = !this.showNewCategory;
    },
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
      };
      this.$emit("addNewPayment", data);

      this.descriptionCost = null;
      this.dateCost = null;
      this.amountCost = null;

      if (this.$route.params.name === "newCost") {
        this.$router.push("/");
      }
      this.showNewCost = false;
    },
    onSaveCategory(/* event */) {
      /* console.log(event.target.parentElement.id); */
      this.$emit("addNewCategory", this.newCategory);
      this.newCategory = null;
    },
  },
  /* created() {
    const paramsRoute = this.$route.params;
    this.showNewCost = Boolean(paramsRoute.show);
    this.descriptionCost = paramsRoute.category;
    this.amountCost = paramsRoute.value;
    //console.log(this.$route.params);
    //{category: 'Food', value: '200', show: 'true'}
  }, */
  mounted() {
    /* console.log(this.$route.params); */
    this.descriptionCost = "";
    this.dateCost = "" /* new Date().toLocaleDateString() */;
  },
};
</script>