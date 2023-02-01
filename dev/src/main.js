import Vue from 'vue';
import App from './App.vue';

// ------------------------------
// x5-modal plugin install START
// ------------------------------
import x5GMaps from 'x5-gmaps';
Vue.use(x5GMaps, {
  key: process.env.VUE_APP_GOOGLE_KEY,
  libraries: ['visualization'],
  callback: () => console.log('Callback working!')
});
// ------------------------------
// x5-modal plugin install END
// ------------------------------

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount('#app');
