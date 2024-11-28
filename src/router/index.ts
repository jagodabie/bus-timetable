import { createRouter, createWebHistory } from "vue-router";
import BusLinesView from "../views/BusLinesView.vue";
import BusStopView from "../views/BusStopsView.vue";

const routes = [
  {
    path: "/",
    name: "BusLinesView",
    component: BusLinesView,
  },
  {
    path: "/stops",
    name: "BusStopView",
    component: BusStopView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
