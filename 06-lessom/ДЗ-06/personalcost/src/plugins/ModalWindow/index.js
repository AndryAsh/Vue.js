export default {
    install(Vue) {
        if (this.installed) {
            return
        }
        this.installed = true;
        Vue.prototype.$modal = {
            EventBus: new Vue(),
            show(name, settings) {
                /* console.log('Shown!'); */
                this.EventBus.$emit('shown', { name, ...settings });
            },
            hide() {
                /* console.log('Hidden!'); */
                this.EventBus.$emit('hide');
            }
        }
    },
}