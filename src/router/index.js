import Vue from 'vue';
import VueRouter from 'vue-router';
// 式神信息
import RoleInfoView from "../views/RoleInfo"
// 装备信息
import EquipInfoView from "../views/EquipInfo"
// 主页
import HomePage from "../views/Home"
// 错误页
import Error from "../views/Error"
// 装备管理和式神管理
import RoleManage from "../views/RoleManage"
import EquipManage from "../views/EquipManage"
Vue.use(VueRouter);

// 重写了原型上的push方法，统一的处理了错误信息,避免重复跳转路由
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    component: HomePage,
    name: "home"
  },
  {
    path: "/showRoleInfo",
    component: RoleInfoView
  },
  {
    path: "/showEquipInfo",
    component: EquipInfoView
  },
  {
    path: "/error",
    component: Error
  },
  // 式神和装备管理页面
  {
    path: "/roleManagePage",
    component: RoleManage
  },
  {
    path: "/equipManagePage",
    component: EquipManage
  }
];

const router = new VueRouter({
  routes,
});

export default router;
