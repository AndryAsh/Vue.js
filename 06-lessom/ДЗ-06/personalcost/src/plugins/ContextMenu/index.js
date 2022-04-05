export default {
    install(Vue) {
        if (this.installed) {
            return
        }
        this.installed = true;
        Vue.prototype.$context = {
            EventBus: new Vue(),
            showContextMenu(name, settings) {
                /* console.log('Shown!'); */
                this.EventBus.$emit('showContextMenu', { name, ...settings });
            },
            hideContextMenu() {
                /* console.log('Hidden!'); */
                this.EventBus.$emit('hideContextMenu');
            }
        }
    },
}