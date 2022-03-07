<template>
  <div id="app">
    <div class="container">
      <header class="page-header">
        <span class="page-header__title">my personal costs</span>
      </header>
      <main>
        <div class="content">
          <div class="costs">
            <new-cost :sizeCosts="lengthCosts" @addNewPayment="addNewPayment" />
            <costs-table :costs="costs" />
            <div class="costs__pagination"></div>
          </div>
          <div class="graphics"></div>
        </div>
      </main>
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import CostsTable from "./components/CostsTable.vue";
import NewCost from "./components/NewCost.vue";

export default {
  name: "app",
  data() {
    return {
      costs: [],
    };
  },
  methods: {
    fetchCosts() {
      return [
        [11, "28.02.2022", "food", 169],
        [11, "28.02.2022", "food", 169],
        [11, "28.02.2022", "food", 169],
        [11, "28.02.2022", "food", 169],
      ];
    },
    addNewPayment(data) {
      this.costs = [...this.costs, data];
    },
  },
  computed: {
    lengthCosts() {
      return this.costs.length;
    },
  },
  components: {
    CostsTable,
    NewCost,
  },
  created() {
    this.costs = this.fetchCosts();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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
    display: flex;
    position: relative;
  }
  &__add-button {
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
  &__add-form {
    display: flex;
    position: absolute;
    box-sizing: border-box;
    width: 50%;
    top: 3.5rem;
    padding: 2%;
    border: 1px solid $dark-grey;
    border-radius: 0.5rem;
    flex-direction: column;
    align-items: center;
    background-color: $white;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.3);
    &__input {
      display: inline-block;
      margin: 2% 2%;
      width: 85%;
      padding: 1rem;
      border: 1px solid $dark-grey;
      border-radius: 0.5rem;
      box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
    }
  }
  .add-form-button {
    margin-top: 4%;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
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
/* nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
