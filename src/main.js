import Vue from 'vue';
import App from './App';
import router from './router';
import 'common/stylus/index.styl';
import VueLazyLoad from 'vue-lazyload';

// Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  error: require('common/image/default.png'),
  loading: require('common/image/default.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
