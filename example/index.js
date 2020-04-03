import Vue from 'vue'
import App from './App.vue'
import x5GMaps from '../dist'
// import x5GMaps from '../src'

Vue.use(x5GMaps, 'YOUR_GOOGLE_API_KEY')

new Vue({
  el: '#app',
  render: h => h(App),
})
