<template>
  <form class="costs__add-form" @submit.prevent="onSaveClick()">
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
      v-show="createCost"
      class="costs__add-button add-form-button"
      type="submit"
      value="add cost"
    />
    <input
      v-show="editCost"
      class="costs__add-button add-form-button"
      type="submit"
      value="save cost"
    />
    <input
      v-show="editCost"
      class="costs__add-button add-form-button"
      type="button"
      value="close form"
    />
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "NewCost",
  props: {
    settings: Object,
  },
  data() {
    return {
      descriptionCost: null,
      dateCost: null,
      amountCost: null,
      createCost: false,
      editCost: false,
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
    categoryList() {
      return this.getCategoryList;
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
  },
  methods: {
    ...mapActions(["fetchCategoryData"]),
    ...mapMutations(["addDataPaymentsList", "changeDataPaymentList"]),
    onSaveClick() {
      if (this.settings.id) {
        const dateCost = this.settings.dateCost;
        const data = {
          index: this.settings.index,
          id: this.settings.id,
          date: dateCost,
          category: this.descriptionCost,
          value: this.amountCost,
          showNewCost: false,
        };
        this.changeDataPaymentList(data);
        this.amountCost = null;
      } else {
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
        this.addDataPaymentsList(data);
        this.amountCost = null;
      }
    },
  },
  async mounted() {
    if (!this.categoryList.length) {
      await this.fetchCategoryData();
    }
    if (this.settings.editCost) {
      this.editCost = this.settings.editCost;
    }

    if (this.settings.createCost) {
      this.createCost = this.settings.createCost;
    }

    if (this.settings.descriptionCost) {
      this.descriptionCost = this.settings.descriptionCost;
    } else {
      this.descriptionCost = this.categoryList[0];
    }

    /* if (this.settings.dateCost) {
      this.dateCost = new Date(Date.parse(this.settings.dateCost))
        .toISOString()
        .slice(0, 10);
    } else {
      this.dateCost = new Date().toISOString().slice(0, 10);
    } */

    this.dateCost = new Date().toISOString().slice(0, 10);
    this.amountCost = this.settings.amountCost;
  },
};
</script>