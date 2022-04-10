export default {
    install(Vue) {
        if (this.installed) {
            return
        }
        this.installed = true;
        this.target = null;

        Vue.prototype.$context = {
            EventBus: new Vue(),
            showContextMenu(itemsContextMenu, target, clickCoord) {
                if (target !== this.target) {
                    this.target = target;
                    this.EventBus.$emit('showContextMenu', { itemsContextMenu, clickCoord });
                } else {
                    this.hideContextMenu();
                    this.target = null;
                }
            },
            hideContextMenu() {
                this.target = null;
                this.EventBus.$emit('hideContextMenu');
            }
        }
    },
}