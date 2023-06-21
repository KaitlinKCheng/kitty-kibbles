import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import FoodView from "@/views/FoodView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "food",
        component: FoodView
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
