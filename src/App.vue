<template>
  <div
    id="app"
    :class="isDark ? 'app-background-dark' : 'app-background-diurnal'"
  >
    <el-container>
      <el-header>
        <!-- 顶部导航栏 -->
        <TopNav />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <SideBar @changeTabs="addTab($event)" />
        </el-aside>
        <el-container>
          <el-main>
            <!-- 主体部分 -->
            <el-tabs
              v-show="isTabsShow"
              :lazy="true"
              v-model="editableTabsValue"
              type="card"
              closable
              @tab-click="clickTab"
              @tab-remove="removeTab"
              style=""
            >
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :name="item.name"
                :label="item.label"
              >
                <span slot="label" v-html="item.title"></span>
                <!-- 标签页的显示 -->
                <router-view></router-view>
              </el-tab-pane>
            </el-tabs>
            <router-view
              :to="{ name: 'home' }"
              v-show="!isTabsShow"
            ></router-view>
            <!-- <router-view /> -->
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <div class="footer">
      此站点的所有权归作者(XDEcat~)所有
      <span> 邮箱:492697494@qq.com </span>
    </div>
  </div>
</template>
<script>
import TopNav from "./components/TopNav";
import SideBar from "./components/SideBar";
export default {
  data() {
    return {
      isDark: false,
      editableTabsValue: "0",
      tabIndex: 0,
      isTabsShow: false,
      editableTabs: [
        // {
        //   title: "<i class='el-icon-date'></i> 式神信息",
        //   name: "1",
        // },
      ],
    };
  },
  computed: {
    HideTabs() {
      return this.$store.getters.getHideTabs;
    },
    MakeDark() {
      return this.$store.getters.getMakeDark;
    },
    ShowTabs() {
      return this.$store.getters.getShowTabs;
    },
  },
  watch: {
    // 黑夜模式
    MakeDark(newValue, oldValue) {
      // console.log(newValue);
      this.isDark = newValue;
    },
    HideTabs(newValue, oldValue) {
      // console.log(newValue);
      // 隐藏标签页
      this.isTabsShow = false;
      console.log("标签页的显示:" + this.isTabsShow);
    },
    ShowTabs(newValue, oldValue) {
      console.log(newValue);
      // 显示标签页
      if (localStorage["tabsInfo"]) {
        this.isTabsShow = true;
        // 跳转标签页最后一个
        this.goToTabsEnd();
        console.log("标签页的显示:" + this.isTabsShow);
      } else {
        this.isTabsShow = false;
      }
    },
  },
  created() {
    // 刷新重置标签页
    this.resetTbasInfo();
  },
  mounted() {},
  methods: {
    // 重置标签页
    resetTbasInfo() {
      // 如果浏览器刷新，重置数据
      if (localStorage["tabsInfo"] != null) {
        let tabsInfo = JSON.parse(localStorage["tabsInfo"]);
        // 重新设置标签页信息
        if (tabsInfo.editableTabs.length != 0) {
          this.isTabsShow = true;
          this.editableTabs = tabsInfo.editableTabs;
          if (tabsInfo.editableTabs.length == 0) {
            this.tabIndex = tabsInfo.editableTabs.length + 1;
            this.editableTabsValue = tabsInfo.editableTabs.length + 1 + "";
          } else {
            this.tabIndex = tabsInfo.editableTabs.length;
            this.editableTabsValue = tabsInfo.editableTabs.length + "";
          }
          // 跳转最后一个标签页
          this.goToTabsEnd();
        }
      }
    },
    // 增加标签页
    addTab(value) {
      let text = value.title;
      let text2 = value.label;
      // console.log(value);
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: text,
        name: newTabName,
        label: text2,
      });
      this.editableTabsValue = newTabName;
      if (this.editableTabs.length != 0) {
        this.isTabsShow = true;
      }
      // 向localStorage中存入状态信息
      localStorage.setItem(
        "tabsInfo",
        JSON.stringify({
          editableTabs: this.editableTabs,
        })
      );
    },
    // 点击标签,跳转到相应页面
    clickTab(tab) {
      // console.log(tab);
      switch (tab.label) {
        case "式神信息":
          this.$router.push("/showRoleInfo");
          break;
        case "式神装备":
          this.$router.push("/showEquipInfo");
          break;
        case "式神信息管理":
          this.$router.push("/roleManagePage");
          break;
        case "装备信息管理":
          this.$router.push("/equipManagePage");
          break;
      }
    },
    // 跳转到最后一个标签对应的路由
    goToTabsEnd() {
      // 遍历标签页集合，每次选择最后一个标签页路由
      let endTabLabel = this.editableTabs[this.editableTabs.length - 1].label;
      this.editableTabsValue = this.editableTabs[
        this.editableTabs.length - 1
      ].name;
      console.log("当前标签页:" + endTabLabel);
      switch (endTabLabel) {
        case "式神信息":
          this.$router.push("/showRoleInfo");
          break;
        case "式神装备":
          this.$router.push("/showEquipInfo");
          break;
        case "式神信息管理":
          this.$router.push("/roleManagePage");
          break;
        case "装备信息管理":
          this.$router.push("/equipManagePage");
          break;
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);

      // 向localStorage中存入状态信息
      localStorage.setItem(
        "tabsInfo",
        JSON.stringify({
          editableTabs: this.editableTabs,
        })
      );
      // 如果标签页为空，则隐藏标签,并跳转到主页
      if (this.editableTabs.length == 0) {
        //清空localStorage中的tabsInfo
        localStorage.removeItem("tabsInfo");
        this.isTabsShow = false;
        this.$router.push("/");
      } else {
        this.goToTabsEnd();
      }
    },
  },
  components: {
    TopNav,
    SideBar,
  },
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
  // background-image: url("./assets/background2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.el-header {
  padding: 0;
}
// 主体
.el-main {
  padding: 2px 5px 5px 5px;
}
// 黑夜模式
.app-background-dark {
  background-color: lightsteelblue;
}
// 白天模式
.app-background-diurnal {
  background-color: papayawhip;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  height: 100%;
}
/* 页脚 */
.footer {
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  color: aqua;
  width: 100%;
  bottom: 0;
  text-align: center;
  cursor: pointer;
  background-color: #2c3e50;
}
.footer > span {
  position: absolute;
  right: 0;
  color: aqua;
}
/*标签页的header*/
.el-tabs .el-tabs--card {
  border: 0;
  outline: none;
}
.el-tabs__header {
  margin-bottom: 5px;
  border-radius: 20px 0 0 20px;
  background-color: rgba(255, 160, 122, 0.3);
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-radius: 20px;
  border: lightslategrey 3px solid;
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
  border-left: none;
}
.el-tabs__item {
  border-radius: 20px;
  border-bottom-color: unset;
  font-size: 18px;
  font-weight: bold;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #ffd7ba;
}
.el-tabs__item:hover {
  background-color: paleturquoise;
}
</style>

