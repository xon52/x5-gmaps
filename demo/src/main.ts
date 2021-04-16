import Vue from 'vue';
import App from './App.vue';

// ------------------------------
// x5-modal plugin install START
// ------------------------------
import x5GMaps from 'src'; // import from 'x5-gmaps' for plugin
Vue.use(x5GMaps, {
  key: process.env.VUE_APP_GOOGLE_KEY,
  libraries: ['visualization']
});
// ------------------------------
// x5-modal plugin install END
// ------------------------------

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
