import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ToDoPage from "../pages/ToDoPage.vue";
import Form from "../pages/formPage.vue";
import Filter from "../pages/filterPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/todo", name: "ToDo", component: ToDoPage },
  { path: "/form", name: "Form", component: Form },
  { path: "/filter", name: "Filter", component: Filter },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
