<template>
  <!-- <home-page :to="{ params: { costs: costs } }" /> -->
  <home-page />
</template>

<script>
// @ is an alias to /src
import HomePage from "@/components/HomePage.vue";

export default {
  name: "HomePageView",
  components: {
    HomePage,
  },
};
</script>
