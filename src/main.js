// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { AlertPlugin, LoadingPlugin, ToastPlugin, dateFormat } from 'vux'

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import './assets/js/rem'

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if(to.meta.title){
      document.title = to.meta.title
  }else{
      document.title = '东湖大数据交易中心'
  }
  next()
})

// 全局注册vux
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
window.dateFormat = dateFormat;

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
