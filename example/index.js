import Vue from 'vue'
import App from './App.vue'
import x5GMaps from '../dist'
// import x5GMaps from '../src'

Vue.use(x5GMaps, { key: 'AIzaSyCL0RSk2kEqUA7I81aaTFpjLC-v8-Ai5xM', libraries: ['geometry', 'places'] })

new Vue({
  el: '#app',
  render: h => h(App),
})
