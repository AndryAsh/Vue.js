<template>
  <v-list class="wrapper-context-menu" v-if="contextShown" :style="styles">
    <v-list-item v-for="(item, idx) in items" :key="idx">
      <v-list-item-title class="item-text" @click="onClick(item)">
        {{ item.text }}
      </v-list-item-title>
    </v-list-item>
  </v-list>

  <!-- <ul class="wrapper-context-menu" v-if="contextShown" :style="styles">
    <li
      class="context-item"
      v-for="(item, idx) in items"
      :key="idx"
      @click="onClick(item)"
    >
      {{ item.text }}
    </li>
  </ul> -->
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
    onShowContextMenu({ itemsContextMenu, event }) {
      this.items = itemsContextMenu;
      this.setPositon(event);
      this.contextShown = true;
    },
    onHideContextMenu() {
      this.contextShown = false;
      this.items = [];
    },
    setPositon(event) {
      this.xPos = event.clientX + 20;
      this.yPos = event.clientY - 50;
    },
  },
  props: {
    settings: {},
  },
  computed: {
    ...mapGetters(["getPaymentsList"]),
    styles() {
      return {
        top: `${this.yPos}px`,
        left: `${this.xPos}px`,
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

<style lang="scss">
$grey: #aeaeae;
$lihgt-grey: #dadada;
$dark-grey: #696969;
$green: #25a79a;
$white: #ffffff;

.wrapper-context-menu {
  margin: 0;
  padding: 0;
  position: absolute;
}
.theme--light.v-list {
  border: 1px solid $dark-grey;
  border-radius: 5%;
}
.v-list-item {
  cursor: pointer;
}
.v-list-item:hover {
  background: $green;
}
.item-text {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  color: $dark-grey;
}
.item-text:hover {
  color: $white;
}
</style>