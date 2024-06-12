import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PrivacyPolicy from "../views/PrivacyPolicy";
import PageNotFound from "../views/PageNotFound";
import Dashboard from "../views/Dashboard";
import About from "../views/About";

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
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
