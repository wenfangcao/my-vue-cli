import App from './App'
import router from './router'
// import './assets/css/reset.less'

var app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
