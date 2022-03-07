<template>
  <table class="costs__table">
    <tr>
      <th class="costs__table__th">#</th>
      <th class="costs__table__th">Date</th>
      <th class="costs__table__th">Category</th>
      <th class="costs__table__th">Value</th>
    </tr>
    <tr class="costs__table__tr" v-for="(cost, index) in costs" :key="index">
      <td
        class="costs__table__td num"
        :class="{
          num: index === 0,
          date: index === 1,
          cat: index === 2,
          val: index === 3,
        }"
        v-for="(item, index) in cost"
        :key="index"
      >
        {{ item }}
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
    },
  },
};
</script>
