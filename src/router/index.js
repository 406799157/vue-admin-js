import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "Layout",
    component: () => import("../views/layout/Index.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/account/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/account/Register.vue")
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/account/Test.vue")
  }
];

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

export default router;
