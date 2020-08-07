import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ThreeMap.vue")
  },
  {
    path: "/echarts",
    name: "Echarts",
    component: () =>
      import("../views/Echarts.vue")
  },
  {
    path: "/vcharts",
    name: "Vcharts",
    component: () =>
      import("../views/Vcharts.vue")
  },
  {
    path: "/openlayer",
    name: "OpenLayer",
    component: () =>
      import("../views/OpenLayer.vue")
  },
  {
    path: "/threeMap",
    name: "ThreeMap",
    component: () =>
      import("../views/ThreeMap.vue")
  },
  
 
];

const router = new VueRouter({
  routes
});

export default router;
