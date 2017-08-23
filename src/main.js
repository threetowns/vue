// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//注册时，vux必须放在 import Vue from 'vue'; 之前，否侧打包的体积非常大，估计是vux OR vue 抽风了
import { AlertPlugin,LoadingPlugin  } from 'vux'

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// register VUX UI
Vue.use(AlertPlugin); //全局注册alert事件，注册之后，不需要每个页面都import alert
Vue.use(LoadingPlugin );

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
