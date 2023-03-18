import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
    routes: [
        {
            path: "/",
            name: "index",
            component: IndexPage,
        },
        {
            path: "/sing-in",
            name: "sign-in-page",
            props: true,
            component: () => import("../pages/SignInPage.vue"),
        },
    ],
});

export default router;
