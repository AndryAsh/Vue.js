<template>
  <ul>
    <li>
      <a href="#" class="context-menu" @click="onChangeCost">Редактировать</a>
    </li>
    <li>
      <a href="#" class="context-menu" @click="onDeleteCost">Удалить</a>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ContextMenuTableCosts",
  methods: {
    ...mapMutations(["delDataPaymentList"]),
    onChangeCost() {
      this.$context.hideContextMenu();
      this.$modal.show("NewCost", {
        content: "new-cost",
        title: "change cost",
        id: this.settings.uuid,
        descriptionCost: this.getPaymentsList[this.settings.index].category,
        amountCost: this.getPaymentsList[this.settings.index].value,
        dateCost: this.getPaymentsList[this.settings.index].date,
        index: this.settings.index,
        editCost: true,
      });
    },
    onDeleteCost() {
      this.$context.hideContextMenu();
      this.delDataPaymentList(this.settings);
    },
  },
  props: {
    settings: {},
  },
  computed: {
    ...mapGetters(["getPaymentsList"]),
  },
};
</script>