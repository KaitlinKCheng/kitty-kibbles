import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import StockView from "@/views/StockView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "stock",
        component: StockView
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
