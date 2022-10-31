import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/administrador',
    component: () => import('../views/admin/home.vue'),
    meta: {
      auth: true
    },
    children: [
      {
        path: '/',
        name: 'admin dashboard',
        component: () => import('../views/admin/dashboard.vue')
      },
      {
        path: 'usuarios',
        name: 'admin usuarios',
        component: () => import('../views/admin/users.vue')
      },
      {
        path: 'equipo',
        name: 'admin equipo',
        component: () => import('../views/admin/equipment.vue')
      },
      {
        path: 'reportes',
        name: 'admin reportes',
        component: () => import('../views/admin/reports.vue')
      }
    ]
  },
  {
    path: '/usuario',
    component: () => import('../views/user/home.vue'),
    meta: {
      auth: true
    },
    children: [
      {
        path: '/',
        name: 'user dashboard',
        component: () => import('../views/user/dashboard.vue')
      },
      {
        path: 'equipo',
        name: 'user equiptment',
        component: () => import('../views/user/equipment.vue')
      },
      {
        path: 'reportes',
        name: 'user report',
        component: () => import('../views/user/reports.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

 
  if(to.name=='home' || to.name=='login'){
      store.commit('shownav')
  }else{
      store.commit('hidenav')
  }

  if(store.state.save && to.name=="home"){
    next('/usuario')
    store.commit('hidenav')
  }

  if (to.matched.some(record => record.meta.auth)) {
    if (store.state.auth) {

      next()

    } else {
      next('/')
    }
  } else {
    next()
  }

})

export default router
