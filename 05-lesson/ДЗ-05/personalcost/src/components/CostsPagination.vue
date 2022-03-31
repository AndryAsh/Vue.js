<template>
  <!-- <div> -->
  <div class="costs__pagination" @click="onClickPagination($event)">
    <button
      :disabled="currentPage == 1"
      class="costs__pagination__button"
      data-id="prev"
    >
      &lang;
    </button>
    <a
      href="#"
      v-for="(page, index) in pages"
      :class="
        index === 0
          ? 'costs__pagination__page selected'
          : 'costs__pagination__page'
      "
      :key="index"
      :data-id="page"
    >
      {{ page }}
    </a>
    <button
      :disabled="currentPage == pages.length"
      class="costs__pagination__button"
      data-id="next"
    >
      &rang;
    </button>
  </div>
</template>

<script>
export default {
  name: "CostsPagination",
  props: {
    dataListSize: {
      type: Number,
    },
    paginationSize: {
      type: Number,
    },
    /* pages: {
      type: Array,
      required: true,
    }, */
    currentPage: {
      type: Number,
    },
  },
  computed: {
    pages() {
      const lst = [];
      /* const size = Math.ceil(this.dataListSize / this.paginationSize); */
      for (let i = 1; i <= this.dataListSize; i++) {
        lst.push(i);
      }
      return lst;
    },
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
};
</script>
