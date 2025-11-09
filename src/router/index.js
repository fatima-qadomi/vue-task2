import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ToDoPage from "../pages/ToDoPage.vue";
import Form from "../pages/formPage.vue";
import Filter from "../pages/filterPage.vue";
import Users from "../pages/UsersPage.vue";
import about from "../pages/About.vue";
import counter from "../pages/counterPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/todo", name: "ToDo", component: ToDoPage },
  { path: "/form", name: "Form", component: Form },
  { path: "/filter", name: "Filter", component: Filter },
  { path: "/users", name: "Users", component: Users },
  { path: "/about", name: "about", component: about },
  { path: "/counter", name: "counter", component: counter },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
