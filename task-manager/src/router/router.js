import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";

import LoginView from "@/views/LoginView";
import NotFound from "@/views/NotFound";
import DashboardView from "@/views/DashboardView";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "login",
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("@/views/SignupView.vue"),
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
        meta: { requiresAuth: true },
    },
    {
        path: "/tasks",
        name: "tasks",
        component: () => import("@/views/TasksView.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/report",
        name: "report",
        component: () => import("@/views/ReportView.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "*",
        name: "notFound",
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.getters.loggedUser.id) {
            next("/login");
        } else {
            next();
        }
    } else if (store.getters.loggedUser.id) {
        next("/dashboard");
    } else {
        next();
    }
});

export default router;
