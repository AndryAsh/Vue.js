<template>
  <ul class="wrapper-context-menu" v-if="contextShown" :style="styles">
    <li
      class="context-item"
      v-for="(item, idx) in items"
      :key="idx"
      @click="onClick(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ContextMenuTableCosts",
  data() {
    return {
      contextShown: false,
      xPos: 0,
      yPos: 0,
      items: [],
    };
  },
  methods: {
    ...mapMutations(["delDataPaymentList"]),
    onClick(item) {
      item.action();
      this.onHideContextMenu();
    },
    onShowContextMenu({
      itemsContextMenu,
      event /* caller */ /* clickCoord */,
    }) {
      /* console.log(caller); */
      this.items = itemsContextMenu;
      this.setPositon(event /* caller */);
      this.contextShown = true;
    },
    onHideContextMenu() {
      this.contextShown = false;
      this.items = [];
    },
    setPositon(event /* caller */) {
      /* const clickCoord = { x: event.clientX, y: event.clientY }; */
      /* console.log(caller); */
      /* const position = caller.getBoundingClientRect(); */

      this.xPos = event.clientX + 20;
      this.yPos = event.clientY - 50;
      /* this.xPos = position.left;
      this.yPos = position.top; */
    },
  },
  props: {
    settings: {},
  },
  computed: {
    ...mapGetters(["getPaymentsList"]),
    styles() {
      return {
        top: `${this.yPos /*  + 8 */}px`,
        left: `${this.xPos /*  + 16 */}px`,
      };
    },
  },
  mounted() {
    this.$context.EventBus.$on("showContextMenu", this.onShowContextMenu);
    this.$context.EventBus.$on("hideContextMenu", this.onHideContextMenu);
  },
  beforeDestroy() {
    this.$context.EventBus.$off("showContextMenu", this.onShowContextMenu);
    this.$context.EventBus.$off("hideContextMenu", this.onHideContextMenu);
  },
};
</script>

<style lang="scss" scoped>
.wrapper-context-menu {
  width: 15%;
  margin: 0;
  padding: 1rem;
  position: absolute;
  background: #efefef;
}
</style>