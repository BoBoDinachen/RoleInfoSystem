<template>
  <div id="app">
    <el-container>
      <el-header>
        <!-- 顶部导航栏 -->
        <TopNav />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <!-- 侧边栏 -->
          <SideBar/>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 主体部分 -->
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <div class="footer">
      此站点所有权归作者(XDEcat~)所有
      <span>
        邮箱:492697494@qq.com
      </span>
    </div>
  </div>
</template>

<style lang="less">
*{
  padding: 0;
  margin: 0;
}
html,body{
  height: 100%;
  background-image: url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.el-header{
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
/* 页脚 */
.footer{
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  color:aqua;
  width: 100%;
  bottom: 0;
  text-align: center;
  cursor: pointer;
  background-color: #2c3e50;
}
.footer > span{
  position: absolute;
  right: 0;
  color: aqua;
}
</style>
<script>
import TopNav from "./components/TopNav";
import SideBar from "./components/SideBar";
export default {
  components: {
    TopNav,
    SideBar
  },
};
</script>
