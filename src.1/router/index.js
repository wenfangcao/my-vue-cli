import index from '../components/Index'
import next from '../components/next'
const router = new VueRouter({
  //mode: "history",
  routes: [
    {
      path:'/',
      name:'index',
      meta: {
        auth: true,
        title:'index'
      },
      component: index
    },
    {
      path:'/next',
      name:'next',
      meta: {
        auth: true,
        title:'next'
      },
      component: next
    }
  ]
})

export default  router ;
