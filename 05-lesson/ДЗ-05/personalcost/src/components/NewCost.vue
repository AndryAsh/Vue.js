<template>
  <div class="costs__add">
    <button @click="clickedAddCost()" class="costs__add-button">
      {{ showFormNewCost ? txtBtnClose : txtBtnAdd }}
    </button>
    <button @click="onCategoryClick()" class="costs__add-button">
      {{ showFormNewCategory ? txtBtnClose : "add category" }}
    </button>
    <form action="!#" v-show="showFormNewCost" class="costs__add-form">
      <label for="cost-description">Описание платежа</label>
      <select
        v-model="descriptionCost"
        id="cost-description"
        class="costs__add-form__select"
        type="text"
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
      />
      <label for="cost-amount">Сумма платежа</label>
      <input
        v-model="amountCost"
        id="cost-amount"
        class="costs__add-form__input"
        type="number"
      />
      <button
        @click.stop.prevent="onSaveClick()"
        class="costs__add-button add-form-button"
      >
        add cost
      </button>
    </form>
    <form action="!#" v-show="showFormNewCategory" class="costs__add-form">
      <label for="cost-description">Название новой категории</label>
      <input
        v-model="newCategory"
        id="cost-description"
        class="costs__add-form__input"
        type="text"
      />
      <button
        @click.stop.prevent="onSaveCategory()"
        class="costs__add-button add-form-button"
      >
        add category
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewCost",
  props: {
    categoryList: {
      type: Array,
      /* default: () => [], */
    },
  },
  data() {
    return {
      descriptionCost: "",
      dateCost: "",
      amountCost: "",
      showNewCost: false,
      showNewCategory: false,
      txtBtnAdd: "add new cost",
      txtBtnClose: "close form",
      newCategory: "",
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
  methods: {
    clickedAddCost() {
      this.showNewCost = !this.showNewCost;
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
    },
    onSaveCategory() {
      this.$emit("addNewCategory", this.newCategory);
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
  /* mounted() {
    console.log(this.categoryList);
    this.descriptionCost = this.categoryList[0];
    //this.dateCost = Date.now();
  }, */
};
</script>