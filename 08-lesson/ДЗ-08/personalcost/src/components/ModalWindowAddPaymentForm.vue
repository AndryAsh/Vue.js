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

<style lang="scss">
$grey: #aeaeae;

.wrapper {
  width: 30%;
  padding: 1rem;
  position: absolute;
  top: 25%;
  left: 3.8%;
  background: #ffffff;
  border: 1px solid $grey;
  border-radius: 1%;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
}
.form-header {
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
