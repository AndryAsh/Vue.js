<template>
  <div :class="wrapper" v-if="settings.content">
    <div :class="header">{{ settings.header }}</div>
    <div :class="content">
      <new-cost v-if="settings.content === 'newcost'" />
    </div>
    <!-- <div :class="footer">
      <button @click="onCloseClick">Close</button>
    </div> -->
  </div>
</template>

<script>
import NewCost from "./NewCost.vue";

export default {
  component: {
    NewCost,
  },
  props: {
    settings: Object,
  },
  methods: {
    onCloseClick() {
      this.$emit("close");
    },
  },
};
</script>
