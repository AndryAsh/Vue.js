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
export default {
  name: "CostsTable",
  props: {
    costs: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    choiceItemTable(event) {
      const clickCoord = { x: event.clientX, y: event.clientY };
      const uuid =
        event.target.parentElement.parentElement.querySelector(
          ".num"
        ).innerText;

      this.$emit("selectedCost", { position: clickCoord, id: uuid });
    },
  },
};
</script>
