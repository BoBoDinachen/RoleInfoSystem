<template>
  <div style="">
    <el-menu
      default-active="1-1"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      active-text-color="#ffd04b"
      :collapse-transition="true"
      :style="{height: BarHeight+'px'}"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-grape"></i>
          <span>式神一览</span>
        </template>
        <el-menu-item-group>
          <template slot="title">信息展示</template>
          <el-menu-item index="1-1">
            <i class="el-icon-full-screen"></i>
            <span style="font-size:13px;color:#67C23A">式神信息</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-full-screen"></i>
            <span style="font-size:13px;color:#67C23A">式神装备</span>
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
          <el-menu-item index="2-1">
            <i class="el-icon-full-screen"></i>
            <span style="font-size:13px;color:#67C23A">装备管理</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <i class="el-icon-full-screen"></i>
            <span style="font-size:13px;color:#67C23A">式神管理</span>
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
            <span style="font-size:13px;color:#67C23A">个人资料</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-full-screen"></i>
            <span style="font-size:13px;color:#67C23A">修改资料</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-full-screen"></i>
            <span style="font-size:13px;color:#67C23A">密码修改</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
    <el-tooltip v-if="isShow" class="item" effect="dark" content="展开菜单" placement="right-start">
      <el-button @click="changeShow" type="warning" icon="el-icon-menu" circle></el-button>
    </el-tooltip>
    <el-tooltip v-if="!isShow" class="item" effect="dark" content="收起菜单" placement="right-start">
      <el-button @click="changeShow" type="warning" icon="el-icon-view" circle></el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      isCollapse: false,
      BarHeight: "",
      appHeight: ""
    };
  },
  // 监听app盒子的高度
  watch:{
    appHeight(newHeight,oldHeight){
      this.BarHeight = newHeight - 86;
    }
  },
  mounted() {
    //获取app盒子的高度
    let app = document.getElementById("app");
    this.BarHeight = app.offsetHeight - 86;
    window.onresize =()=>{
      return (() => {
       this.appHeight = document.getElementById("app").offsetHeight;
    })()
    }
    // 设置sidebar的高度
    // let menu = document.querySelector(".el-menu");
    // console.log(menu);
    // menu.style.height = BarHeight + "px";
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 改变菜单的显示
    changeShow(){
      this.isCollapse = !this.isCollapse;
      this.isShow = !this.isShow;
    }
  },
};
</script>

<style scoped>
  .el-menu{
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 16px;
    position: absolute;
  }
  .item{
    float: right;
  }
</style>