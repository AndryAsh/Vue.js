export default {
    install(Vue) {
        if (this.installed) {
            return
        }
        this.installed = true;
        this.caller = null;

        Vue.prototype.$context = {
            EventBus: new Vue(),
            showContextMenu(name, settings) {
                const caller = settings.target;
                if (caller !== this.caller) {
                    this.caller = caller;
                    this.EventBus.$emit('showContextMenu', { name, ...settings });
                } else {
                    this.hideContextMenu();
                    this.caller = null;
                }
            },
            hideContextMenu() {
                /* console.log('Hidden!'); */
                this.EventBus.$emit('hideContextMenu');
            }
        }
    },
}