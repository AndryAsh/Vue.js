<template>
  <v-form @submit.prevent="onSaveClick()">
    <v-container fluid>
      <v-col class="d-flex" cols="12">
        <v-select
          :items="categoryList"
          v-model="descriptionCost"
          label="Category of payment"
          outlined
        >
        </v-select>
      </v-col>
      <v-col class="d-flex" cols="12">
        <v-text-field
          class="p-0 m-0"
          :class="{ hasError: $v.dateCost.$error }"
          type="date"
          v-model="dateCost"
          label="Date of payment"
          single-line
          outlined
          required
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12">
        <v-text-field
          class="p-0 m-0"
          :class="{ hasError: $v.amountCost.$error }"
          type="number"
          v-model="amountCost"
          label="Amount of payment"
          @input="$v.amountCost.$touch()"
          @blur="$v.amountCost.$touch()"
          single-line
          outlined
          clearable
          required
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12">
        <v-btn
          v-show="createCost"
          type="submit"
          color="teal"
          dark
          x-large
          class="font-weight-bold p-0"
        >
          add cost
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn
          v-show="editCost"
          type="submit"
          color="teal"
          dark
          x-large
          class="font-weight-bold p-0"
        >
          save cost
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn
          v-show="editCost"
          @click="onCloseForm"
          color="teal"
          dark
          x-large
          class="font-weight-bold p-0 ml-4"
        >
          close form
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-container>
  </v-form>
  <!-- <form class="costs__add-form" @submit.prevent="onSaveClick()">
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
      @click="onCloseForm"
      class="costs__add-button add-form-button"
      type="button"
      value="close form"
    />
  </form> -->
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
/* import { validationMixin } from "vuelidate"; */
import { required, between } from "vuelidate/lib/validators";

export default {
  name: "NewCost",
  props: {
    settings: Object,
  },
  data() {
    return {
      descriptionCost: null,
      dateCost: null,
      amountCost: 0,
      createCost: false,
      editCost: false,
    };
  },
  /* mixins: [validationMixin], */
  validations: {
    descriptionCost: { required },
    dateCost: { required },
    amountCost: { between: between(1, 10000) },
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
        /* this.descriptionCost = this.categoryList[0]; */
      } else {
        this.descriptionCost = newValue;
      }
    },
  },
  methods: {
    ...mapActions(["fetchCategoryData"]),
    ...mapMutations(["addDataPaymentsList", "changeDataPaymentList"]),
    onSaveClick() {
      this.$v.$touch();
      if (this.$v.$error) return;

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
        this.$context.caller = null;
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
    onCloseForm() {
      this.$modal.hide();
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

<style lang="scss">
.v-application .d-flex {
  padding: 0;
}
</style>