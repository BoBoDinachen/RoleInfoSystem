<template>
  <div style="">
    <el-menu
      id="menu"
      router
      default-active="/info"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#2c3e50"
      text-color="#fff"
      :collapse="isCollapse"
      active-text-color="#ffd04b"
      :collapse-transition="true"
      :style="{ height: BarHeight + 'px' }"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-grape"></i>
          <span>式神一览</span>
        </template>
        <el-menu-item-group>
          <template slot="title">信息展示</template>
          <el-menu-item index="/showRoleInfo">
            <i class="el-icon-full-screen"></i>
            <span style="font-size: 13px; color: #67c23a">式神信息</span>
          </el-menu-item>
          <el-menu-item index="/showEquipInfo">
            <i class="el-icon-full-screen"></i>
            <span style="font-size: 13px; color: #67c23a">式神装备</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-watermelon"></i>
          <span>信息管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">管理</template>
          <el-menu-item index="/roleManagePage">
            <i class="el-icon-full-screen"></i>
            <span style="font-size: 13px; color: #67c23a">式神管理</span>
          </el-menu-item>
          <el-menu-item index="/equipManagePage">
            <i class="el-icon-full-screen"></i>
            <span style="font-size: 13px; color: #67c23a">装备管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-cherry"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item-group>
          <template slot="title">个人</template>
          <el-menu-item index="3-1">
            <i class="el-icon-full-screen"></i>
            <span style="font-size: 13px; color: #67c23a">个人资料</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-full-screen"></i>
            <span style="font-size: 13px; color: #67c23a">修改资料</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-full-screen"></i>
            <span style="font-size: 13px; color: #67c23a">密码修改</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
    <el-tooltip
      v-if="!isShow"
      class="item"
      effect="dark"
      content="展开菜单"
      placement="right-start"
    >
      <el-button
        @click="changeShow"
        type="warning"
        icon="el-icon-plus"
        circle
      ></el-button>
    </el-tooltip>
    <el-tooltip
      v-if="isShow"
      :class="changeStyle ? 'item3' : 'item2'"
      effect="dark"
      content="收起菜单"
      placement="right-start"
    >
      <el-button
        @click="changeShow"
        type="warning"
        icon="el-icon-view"
        circle
      ></el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      changeStyle: false,
      isCollapse: true,
      BarHeight: "", // 侧边栏高度
      appHeight: "", // app窗口高度
      MenuWidth: "",
    };
  },
  // 监听app盒子的高度
  watch: {
    appHeight(newHeight, oldHeight) {
      this.BarHeight = newHeight - 86;
    },
    MenuWidth(newWidth, oldWidth) {
      // console.log("新宽度"+newWidth);
      if (newWidth < 150) {
        // console.log("改变");
        this.changeStyle = true;
      } else {
        // console.log("不改变");
        this.changeStyle = false;
      }
    },
  },
  mounted() {
    //获取app盒子的高度
    let app = document.getElementById("app");
    this.BarHeight = app.offsetHeight - 86;
    // 获取菜单栏的高度
    let menu = document.getElementById("menu");
    let MenuWidth = menu.offsetWidth;
    this.MenuWidth = MenuWidth;
    //监听菜单栏的高度变化
    // 监听窗口页面变化，刷新值
    window.onresize = () => {
      return (() => {
        this.appHeight = document.getElementById("app").offsetHeight;
      })();
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
      switch(key){
        case "/showRoleInfo":
          let data = {
            title: "<i class='el-icon-present'></i> 式神信息",
            label: "式神信息"
          }
          this.addTabs(data);
          break;
        case "/showEquipInfo":
          let data2 = {
            title: "<i class='el-icon-present'></i> 式神装备",
            label: "式神装备"
          }
          this.addTabs(data2);
          break;
        case "/roleManagePage":
          let data3 = {
            title: "<i class='el-icon-present'></i> 式神信息管理",
            label: "式神信息管理"
          }
          this.addTabs(data3);
          break;
        case "/equipManagePage":
          let data4 = {
            title: "<i class='el-icon-present'></i> 装备信息管理",
            label: "装备信息管理"
          }
          this.addTabs(data4);
          break;

      }
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      setTimeout(() => {
        let width = document.getElementById("menu").offsetWidth;
        this.MenuWidth = width;
      }, 430);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
      setTimeout(() => {
        let width = document.getElementById("menu").offsetWidth;
        this.MenuWidth = width;
      }, 430);
    },
    // 增加标签页
    addTabs(data){
      this.$emit("changeTabs",data);
    },
    // 改变菜单的显示
    changeShow() {
      this.isCollapse = !this.isCollapse;
      this.isShow = !this.isShow;
      setTimeout(() => {
        let width = document.getElementById("menu").offsetWidth;
        this.MenuWidth = width;
      }, 450);
    },
  },
};
</script>

<style scoped>
.el-menu {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
  position: absolute;
}
.item {
  position: absolute;
  transform: translateX(-145%);
  bottom: 50%;
  z-index: 999;
}
.item2 {
  position: absolute;
  margin-left: 80px;
  bottom: 50%;
  transition: all 0.3s linear;
  z-index: 999;
}
.item3 {
  position: absolute;
  margin-left: 5px;
  bottom: 50%;
  transition: all 0.3s linear;
  z-index: 999;
}
</style>