import Vue from "vue";
import store from "../store/store";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView";
import SignupView from "../views/SignupView";
import DashboardView from "../views/DashboardView.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignupView,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
        meta: { requiresAuth: true },
    },
    {
        path: "/todo",
        name: "todo",
        component: () => import("../views/TodoView.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/settings",
        name: "settings",
        component: () => import("../views/SettingsView.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "*",
        name: "NotFound",
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
        if (!store.getters.profile?.id) {
            next("/login");
        } else {
            next();
        }
    } else if (store.getters.profile?.id) {
        next("/dashboard");
    } else {
        next();
    }
});

export default router;
