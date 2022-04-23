<template>
  <div id="app">
    <home-page :costs="costs" />
    <router-view />
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";

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
        [11, "28.02.2022", "food", 169],
        [11, "28.02.2022", "food", 169],
        [11, "28.02.2022", "food", 169],
        [11, "28.02.2022", "food", 169],
        [11, "28.02.2022", "food", 169],
      ];
    },
  },
  components: {
    HomePage,
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

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
