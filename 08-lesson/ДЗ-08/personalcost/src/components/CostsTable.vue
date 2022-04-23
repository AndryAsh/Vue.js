<template>
  <v-data-table
    class="my-4 costs__table"
    dense
    :headers="headers"
    :items="costs"
    item-key="id"
    hide-default-footer
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="choiceItemTable(item, $event)"> settings </v-icon>
    </template>
  </v-data-table>
</template>

  <!-- <table class="costs__table">
    <tr>
      <th class="costs__table__th">#</th>
      <th class="costs__table__th">Date</th>
      <th class="costs__table__th">Category</th>
      <th class="costs__table__th">Value</th>
    </tr>
    <tr class="costs__table__tr" v-for="(cost, id) in costs" :key="id">
      <td class="costs__table__td num">{{ cost.id }}</td>
      <td class="costs__table__td date">{{ cost.date }}</td>
      <td class="costs__table__td cat">{{ cost.category }}</td>
      <td class="costs__table__td val">{{ cost.value }}</td>
      <td class="costs__table__td btn">
        <a href="#" class="cost-item-btn" @click="choiceItemTable($event)">{{
          "..."
        }}</a>
      </td>
    </tr>
  </table> -->
<!-- </template> -->

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CostsTable",
  data() {
    return {
      headers: [
        { text: "#", align: "center", value: "id", sortable: false },
        { text: "Date", align: "center", value: "date", sortable: false },
        {
          text: "Category",
          align: "center",
          value: "category",
          sortable: false,
        },
        { text: "Value", align: "center", value: "value", sortable: false },
        { text: "", align: "center", value: "actions", sortable: false },
      ],
    };
  },
  props: {
    costs: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations(["delDataPaymentList"]),
    choiceItemTable(item, event) {
      const itemsContextMenu = [
        {
          text: "edit",
          action: () => {
            this.editItem(item.id);
          },
        },
        {
          text: "delete",
          action: () => {
            this.deleteItem(item.id);
          },
        },
      ];

      this.$context.showContextMenu(itemsContextMenu, event);
    },
    editItem(id) {
      this.$context.hideContextMenu();
      const indexItem = this.getPaymentsList.findIndex((el) => el.id === id);
      this.$modal.show("NewCost", {
        content: "new-cost",
        title: "change cost",
        id: id,
        descriptionCost: this.getPaymentsList[indexItem].category,
        amountCost: this.getPaymentsList[indexItem].value,
        dateCost: this.getPaymentsList[indexItem].date,
        index: indexItem,
        editCost: true,
      });
    },
    deleteItem(id) {
      this.$context.hideContextMenu();
      const indexItem = this.getPaymentsList.findIndex((el) => el.id === id);
      this.delDataPaymentList(indexItem);
    },
  },
  computed: {
    ...mapGetters(["getPaymentsList"]),
  },
};
</script>

<style lang="scss">
$grey: #aeaeae;
$lihgt-grey: #dadada;
$dark-grey: #696969;
$white: #ffffff;

.v-data-table {
  margin: 1rem 0;
  border: 1px solid $grey;
  border-collapse: collapse;
}
.v-data-table-header th {
  font-weight: bold;
  background-color: $dark-grey;
}
.v-data-table-header th > span {
  font-size: 1rem;
  color: $white;
}
.v-data-table td {
  font-size: 1rem !important;
  border: 1px solid $grey;
}
.v-data-table tr:nth-child(even) {
  background-color: $lihgt-grey;
}
</style>
