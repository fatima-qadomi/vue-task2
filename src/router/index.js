import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ToDoPage from "../pages/ToDoPage.vue";
import Form from "../pages/formPage.vue";
import Filter from "../pages/filterPage.vue";
import Users from "../pages/UsersPage.vue";
import about from "../pages/About.vue";
import counter from "../pages/counterPage.vue";
import prods from "../pages/ProductsPage.vue";
import cart from "../pages/cartPage.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/todo", name: "ToDo", component: ToDoPage },
  { path: "/form", name: "Form", component: Form },
  { path: "/filter", name: "Filter", component: Filter },
  { path: "/users", name: "Users", component: Users },
  { path: "/about", name: "about", component: about },
  { path: "/counter", name: "counter", component: counter },
  { path: "/prods", name: "prods", component: prods },

  {
    path: "/cart",
    name: "cart",
    component: cart,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/form");
  } else {
    next();
  }
});

export default router;
