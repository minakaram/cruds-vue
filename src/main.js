import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import Dashboard from "./components/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: LoginPage },
    { path: "/Dashboard", component: Dashboard },
  ],
});

createApp(App).use(router).mount("#app");
