import Vue from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
