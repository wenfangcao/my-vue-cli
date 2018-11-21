import App from './App'
import router from './router'
import store from './store/store'
import Vuex from 'vuex'
Vue.use(Vuex)

// import './assets/css/reset.less'
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
