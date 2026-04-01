import Vue from "vue";
import Router from "vue-router";
import RecruitmentPortal from "../views/RecruitmentPortal.vue";
import CompanyHub from "../views/CompanyHub.vue";
import DeliveryCenter from "../views/DeliveryCenter.vue";
import DataDashboard from "../views/DataDashboard.vue";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "portal",
      component: RecruitmentPortal,
      meta: { title: "招聘广场" }
    },
    {
      path: "/companies",
      name: "companies",
      component: CompanyHub,
      meta: { title: "企业专区" }
    },
    {
      path: "/delivery",
      name: "delivery",
      component: DeliveryCenter,
      meta: { title: "投递管理" }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DataDashboard,
      meta: { title: "数据大屏" }
    }
  ]
});

router.afterEach((to) => {
  document.title = `${to.meta.title || "招聘系统"} - 智聘云台`;
});

export default router;
