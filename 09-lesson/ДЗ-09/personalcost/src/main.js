import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import modal from './plugins/ModalWindow'
import context from '@/plugins/ContextMenu'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VComp from "@vue/composition-api";

Vue.config.productionTip = false;
Vue.use(modal);
Vue.use(context);
Vue.use(Vuelidate);
Vue.use(VComp);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.directive('click-count', {
  bind: function (el) {
    let clickCount = 0;
    el.clickEvent = function (event) {
      if (el.contains(event.target)) {
        clickCount++;
        console.log(`${clickCount} clicked`);
      }
    };
    document.body.addEventListener('click', el.clickEvent);
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickEvent);
  },
})
