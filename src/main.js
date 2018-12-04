import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import VueRouter from 'vue-router'
import Routers from './router'

const router = new VueRouter({
  routes: Routers // (缩写) 相当于 routes: routes
})

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
