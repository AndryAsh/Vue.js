export default {
    install(Vue) {
        if (this.installed) {
            return
        }
        this.installed = true;
        this.caller = null;

        Vue.prototype.$context = {
            EventBus: new Vue(),
            showContextMenu(itemsContextMenu, event/* target, clickCoord */) {
                const caller = event.target;
                if (caller !== this.caller) {
                    this.caller = caller;
                    this.EventBus.$emit('showContextMenu', { itemsContextMenu, event });
                } else {
                    this.hideContextMenu();
                    this.caller = null;
                }
            },
            hideContextMenu() {
                this.caller = null;
                this.EventBus.$emit('hideContextMenu');
            }
        }
    },
}