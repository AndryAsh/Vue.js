<template>
  <v-data-table
    class="my-4 costs__table"
    dense
    :headers="headers"
    :items="costs"
    item-key="id"
    item-directive="v-click-count"
    hide-default-footer
  >
    <template v-slot:item="{ item }">
      <tr v-click-count :class="item.id">
        <td class="text-center">{{ item.id }}</td>
        <td class="text-center">{{ item.date }}</td>
        <td class="text-center">{{ item.category }}</td>
        <td class="text-end">{{ item.value }}</td>
        <td class="text-center">
          <v-icon small @click="choiceItemTable(item, $event)">
            settings
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

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
