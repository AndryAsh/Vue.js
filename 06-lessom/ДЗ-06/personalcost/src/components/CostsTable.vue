<template>
  <table class="costs__table">
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
  </table>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CostsTable",
  props: {
    costs: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations(["delDataPaymentList"]),
    choiceItemTable(event) {
      const clickCoord = { x: event.clientX, y: event.clientY };
      const uuid =
        event.target.parentElement.parentElement.querySelector(
          ".num"
        ).innerText;
      const target = event.target;

      const itemsContextMenu = [
        {
          text: "edit",
          action: () => {
            this.editItem({
              position: clickCoord,
              id: uuid,
            });
          },
        },
        {
          text: "delete",
          action: () => {
            this.deleteItem(uuid);
          },
        },
      ];

      this.$context.showContextMenu(itemsContextMenu, target, clickCoord);
    },
    editItem(payload) {
      this.$context.hideContextMenu();
      const indexItem = this.getPaymentsList.findIndex(
        (el) => el.id === payload.id
      );
      this.$modal.show("NewCost", {
        content: "new-cost",
        title: "change cost",
        id: payload.id,
        descriptionCost: this.getPaymentsList[indexItem].category,
        amountCost: this.getPaymentsList[indexItem].value,
        dateCost: this.getPaymentsList[indexItem].date,
        index: indexItem,
        editCost: true,
      });
    },
    deleteItem(uuid) {
      this.$context.hideContextMenu();
      const indexItem = this.getPaymentsList.findIndex((el) => el.id === uuid);
      this.delDataPaymentList(indexItem);
    },
  },
  computed: {
    ...mapGetters(["getPaymentsList"]),
  },
};
</script>
