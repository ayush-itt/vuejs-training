import Vue from "vue";
import VueRouter from "vue-router";
import DashboardView from "../views/DashboardView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "dashboard",
        component: DashboardView,
    },
    {
        path: "/todo",
        name: "todo",
        component: () => import("../views/TodoView.vue"),
    },
    {
        path: "/settings",
        name: "settings",
        component: () => import("../views/SettingsView.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
