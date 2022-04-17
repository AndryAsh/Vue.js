<template>
  <div class="my-4 text-center">
    <v-pagination
      v-model="page"
      :length="amountPages"
      circle
      color="#25a79a"
    ></v-pagination>
  </div>

  <!-- <div class="costs__pagination" @click="onClickPagination($event)">
    <button
      :disabled="currentPage == 1"
      class="costs__pagination__button"
      data-id="prev"
    >
      &lang;
    </button>
    <a
      href="#"
      v-for="page in amountPages"
      :class="
        page === 1
          ? 'costs__pagination__page selected'
          : 'costs__pagination__page'
      "
      :key="page"
      :data-id="page"
    >
      {{ page }}
    </a>
    <button
      :disabled="currentPage == amountPages"
      class="costs__pagination__button"
      data-id="next"
    >
      &rang;
    </button>
  </div> -->
</template>

<script>
export default {
  name: "CostsPagination",
  data() {
    return {
      page: 1,
    };
  },
  props: {
    dataListSize: {
      type: Number,
    },
    paginationSize: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  computed: {
    amountPages() {
      return Math.ceil(this.dataListSize / this.paginationSize);
    },
    /* pages() {
      const lst = [];
      // const size = Math.ceil(this.dataListSize / this.paginationSize);
      for (let i = 1; i <= this.dataListSize; i++) {
        lst.push(i);
      }
      return lst;
    }, */
  },
  methods: {
    onClickPagination(event) {
      event.preventDefault();
      if (event.target.localName === "button") {
        if (event.target.dataset.id === "prev") {
          this.$emit("prevPage");
        }
        if (event.target.dataset.id === "next") {
          this.$emit("nextPage");
        }
      } else if (event.target.localName === "a") {
        this.$emit("changePage", event.target);
      }
    },
  },
  watch: {
    page(newPage) {
      //console.log(newPage);
      this.$emit("changePage", newPage);
    },
  },
};
</script>
