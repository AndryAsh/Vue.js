<template>
  <div class="costs__pagination" @click="onClickPagination($event)">
    <button
      :disabled="currentPage == 1"
      class="costs__pagination__button"
      data-id="prev"
    >
      &lang;
    </button>
    <a
      href="!#"
      class="costs__pagination__page"
      v-for="(page, index) in pages"
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
    pages: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
    },
  },
  methods: {
    onClickPagination(event) {
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
