<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ firstTitle }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ secondTitle }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ["firstTitle", "secondTitle"],
};
</script>

<style scoped>
.el-breadcrumb {
  font-size: 17px;
  color: #000;
  margin: 0 0 10px 0px;
  padding-top: 5px;
  border-radius: 3px;
  border-top: 4px solid purple;
  cursor: pointer;
}
.el-breadcrumb__item{
  color: #000;
  font-weight: bold;
}
</style>