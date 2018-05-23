
import App from './App'
import router from './router'

// new Vue({
//   el: '#app',
//   router,
//   // store,
//   template: '<App/>',
//   components: { App }
// })
new Vue({
  el: '#app',
  router,  // 注入到根实例中
  render: h => h(App)
})