import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/theme/theme-67da9a/index.css'
import api from './http/index'
import i18n from './i18n'
import store from './store'

Vue.use(ElementUI)
Vue.use(api)

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});