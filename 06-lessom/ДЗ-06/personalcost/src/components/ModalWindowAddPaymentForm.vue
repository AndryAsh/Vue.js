<template>
  <div class="wrapper" v-if="settings.content">
    <div class="form-header">{{ settings.title }}</div>
    <div class="form-content">
      <component :is="settings.content" :settings="settings" />
      <!-- <new-cost v-if="settings.content === 'new-cost'" :settings="settings" /> -->
    </div>
  </div>
</template>

<script>
/* import NewCost from "@/components/NewCost"; */

export default {
  name: "ModalWindowAddPaymentForm",
  components: {
    NewCost: () =>
      import(/* webpackChunkName: "NewCost" */ "@/components/NewCost.vue"),
    NewCategory: () =>
      import(/* webpackChunkName: "NewCost" */ "@/components/NewCategory.vue"),
  },
  methods: {
    /* onCloseClick() {
      this.$emit("close");
    }, */
  },
  props: {
    settings: Object,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 15%;
  padding: 1rem;
  position: absolute;
  top: 20%;
  left: 6%;
  background: #efefef;
}
</style>
