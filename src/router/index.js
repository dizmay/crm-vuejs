import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { layout: "auth" },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/categories",
    name: "Categories",
    meta: { layout: "main" },
    component: () => import("@/views/Categories.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
