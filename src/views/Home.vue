<template>
  <div>
    <el-header>
      <el-tooltip
        class="item"
        effect="dark"
        size="medium"
        content="显示标签页"
        placement="right-start"
        v-show="isShow"
      >
        <el-button @click="showTabs" icon="el-icon-caret-bottom" circle></el-button>
      </el-tooltip>
    </el-header>
    <h3>这是主页</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: localStorage["tabsInfo"] ? true : false,
    };
  },
  created() {
    // 进入主页时，隐藏标签页
    this.$store.commit("changeHideTabs");
  },
  methods: {
    // 显示标签页
    showTabs() {
      this.$store.commit("changeShowTabs");
    },
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>