import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PrivacyPolicy from "../views/PrivacyPolicy";
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
