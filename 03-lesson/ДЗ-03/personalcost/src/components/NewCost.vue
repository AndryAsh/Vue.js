<template>
  <div class="costs__add">
    <button @click="clickedAddCost()" class="costs__add-button">
      {{ showFormNewCost ? txtBtnClose : txtBtnAdd }}
    </button>
    <form action="!#" v-show="showFormNewCost" class="costs__add-form">
      <label for="cost-description">Описание платежа</label>
      <input
        v-model="descriptionCost"
        id="cost-description"
        class="costs__add-form__input"
        type="text"
      />
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
        add
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewCost",
  props: {
    sizeCosts: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      descriptionCost: "",
      dateCost: "",
      amountCost: "",
      showNewCost: false,
      txtBtnAdd: "add new cost",
      txtBtnClose: "close form",
    };
  },
  computed: {
    showFormNewCost() {
      return this.showNewCost;
    },
  },
  methods: {
    clickedAddCost() {
      this.showNewCost = !this.showNewCost;
    },
    onSaveClick() {
      const d = this.dateCost.split("-");
      [d[0], d[2]] = [d[2], d[0]];
      this.dateCost = d.join(".");
      const data = {
        id: this.sizeCosts + 1,
        date: this.dateCost,
        category: this.descriptionCost,
        value: this.amountCost,
      };
      this.$emit("addNewPayment", data);
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
};
</script>