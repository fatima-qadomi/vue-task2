import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ToDoPage from "../pages/ToDoPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/todo", name: "ToDo", component: ToDoPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
