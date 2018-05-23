import index from '../components/Index'
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
    }
  ]
})

export default  router ;
