import Vue from 'vue'
import App from './App.vue'

// ------------------------------
// x5-modal plugin install START
// ------------------------------
import x5GMaps from '../src'
Vue.use(x5GMaps, process.env.VUE_APP_GOOGLE_KEY)
// ------------------------------
// x5-modal plugin install END
// ------------------------------

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
