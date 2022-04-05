<template>
  <div
    class="wrapper-context-menu"
    v-if="settings.content"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
  >
    <div class="form-content">
      <component :is="settings.content" :settings="settings" />
    </div>
    <div class="form-footer">
      <!-- <button class="costs__add-button add-form-button" @click="onCloseClick()">
        add cost
      </button> -->
    </div>
  </div>
</template>

<script>
import ContextMenuTableCosts from "../components/ContextMenuTableCosts.vue";

export default {
  name: "ModalWindowContextMenu",
  components: {
    ContextMenuTableCosts,
    //ContextMenuTableCosts: () =>
    //  import(
    //    /* webpackChunkName: "NewCost" */ "@/components/ContextMenuTableCosts.vue"
    //  ),
  },
  /* data() {
    return {
      position: Object,
    }
  }, */
  methods: {
    /* onCloseClick() {
      this.$emit("close");
    }, */
  },
  props: {
    settings: {},
  },
  computed: {
    position() {
      return this.settings.position;
    },
  },
  updated: {},
};
</script>

<style lang="scss" scoped>
.wrapper-context-menu {
  width: 15%;
  padding: 1rem;
  position: absolute;
  /* top: 20%;
  left: 6%; */
  background: #efefef;
}
</style>
