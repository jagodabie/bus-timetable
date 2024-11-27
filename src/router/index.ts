import { createRouter, createWebHistory } from "vue-router";
import BusLines from "../views/BusLines.vue";
import BusStops from "../views/BusStop.vue";

const routes = [
  {
    path: "/",
    name: "BusLines",
    component: BusLines,
  },
  {
    path: "/stops",
    name: "BusStop",
    component: BusStops,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
