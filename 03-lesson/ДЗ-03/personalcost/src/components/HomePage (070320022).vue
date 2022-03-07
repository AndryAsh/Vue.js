<template>
  <div class="container">
    <header class="page-header">
      <span class="page-header__title">my personal costs</span>
    </header>
    <main class="content">
      <div class="costs">
        <button class="costs__add">add new cost</button>

        <table class="costs__table">
          <tr>
            <th class="costs__table__th">#</th>
            <th class="costs__table__th">Date</th>
            <th class="costs__table__th">Category</th>
            <th class="costs__table__th">Value</th>
          </tr>
          <tr
            class="costs__table__tr"
            v-for="(cost, index) in costs"
            :key="index"
          >
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

        <div class="costs__pagination"></div>
      </div>
      <div class="graphics"></div>
    </main>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  /* props: {
    costs: {
      type: Array,
    },
  }, */
  props: ["costs"],
};
</script>

<style scoped lang="scss">
$grey: #aeaeae;
$lihgt-grey: #dadada;
$dark-grey: #696969;
$green: #25a79a;
$white: #ffffff;

body {
  margin: 0;
  padding: 0;
}
.container {
  max-width: 95%;
  width: 100%;
  margin: 0 auto;
}
.page-header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 2rem;
  &__title {
    text-align: center;
    text-transform: uppercase;
    font-size: 2rem;
    color: $dark-grey;
    font-weight: bold;
  }
}
.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1rem;
}
.costs {
  display: flex;
  flex-direction: column;
  &__add {
    width: 20%;
    height: 3rem;
    text-align: center;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bold;
    color: $white;
    border: 1px solid $green;
    border-radius: 0.3rem;
    background-color: $green;
  }
  &__table {
    margin: 1rem 0;
    border: 1px solid $grey;
    border-collapse: collapse;
    &__th {
      border: 1px solid $grey;
      padding: 0.5rem 0;
      background-color: $dark-grey;
      color: $white;
    }
    &__td {
      border: 1px solid $grey;
      padding: 0.5rem;
    }
    &__tr:nth-child(odd) {
      background-color: $lihgt-grey;
    }
  }
}
.num,
.date,
.cat {
  text-align: center;
}
.val {
  text-align: end;
}
</style>