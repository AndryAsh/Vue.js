import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true,
  },
  {
    path: '/page/:id',
    name: 'currentPage',
    component: HomeView,
    props: true,
  },
  {
    path: '/newcost/payment/:category/:show',
    name: 'newCost',
    component: HomeView,
    props: true,
  },
  {
    path: '/newcost/payment/:category/:value/:show',
    name: 'newCostFull',
    component: HomeView,
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Предотвращение возникновения ошибки избыточной маршрутизации.
// keep original function
/* const _push = router.__proto__.push

// then override it
router.__proto__.push = function push(...args) {
  return _push.call(this, ...args)
    .catch(error => {
      // avoid NavigationDuplicated
      if (error.name !== 'NavigationDuplicated') throw error
    })
} */

export default router
