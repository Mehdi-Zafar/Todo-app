import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import CreateTodo from "./pages/CreateTodo.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as Icons from "oh-vue-icons/icons";

const icons = Object.values({ ...Icons });
addIcons(...icons);

const routes = [
  { path: "/", component: Home },
  { path: "/create-todo", component: CreateTodo },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

const app = createApp(App);

app.use(router);
app.component("v-icon", OhVueIcon);
app.mount("#app");
