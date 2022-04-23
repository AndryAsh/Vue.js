<template>
  <table class="costs__table">
    <tr>
      <th class="costs__table__th">#</th>
      <th class="costs__table__th">Date</th>
      <th class="costs__table__th">Category</th>
      <th class="costs__table__th">Value</th>
    </tr>
    <tr class="costs__table__tr" v-for="(cost, index) in costs" :key="index">
      <td class="costs__table__td num">{{ cost.id }}</td>
      <td class="costs__table__td date">{{ cost.date }}</td>
      <td class="costs__table__td cat">{{ cost.category }}</td>
      <td class="costs__table__td val">{{ cost.value }}</td>
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
};
</script>
