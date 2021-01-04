<template>
  <el-row>
    <el-col :span="3">
      <!-- log -->
      <span class="log"></span>
      <span class="title">式神录</span>
    </el-col>
    <el-col :span="10" :offset="3">
      <el-input
        placeholder="请输入式神名字"
        v-model="inputValue"
        class="input-with-select"
      >
        <el-select v-model="selectValue" slot="prepend" placeholder="请选择">
          <el-option label="全部" value="1"></el-option>
          <el-option label="侍" value="2"></el-option>
          <el-option label="巫" value="3"></el-option>
          <el-option label="射" value="4"></el-option>
          <el-option label="忍" value="5"></el-option>
          <el-option label="守" value="6"></el-option>
          <el-option label="祝" value="7"></el-option>
        </el-select>
        <!-- 搜索 -->
        <el-button slot="append"  icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="3" :offset="5">
      <span class="userlogin" v-if="!isLogin">未登录</span>
      <span class="username" v-if="isLogin" :text="username">{{
        username
      }}</span>
      <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      squareUrl: require("../assets/top/head.png"),
      username: "XDEcat",
      inputValue: "",
      selectValue: "",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
    },
  },
};
</script>

<style scoped>
.el-row {
  background-color: palevioletred;
  height: 60px;
}
/* log图标 */
.log {
  display: inline-block;
  width: 90px;
  height: 60px;
  float: left;
  background-image: url(../assets/log.png);
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}
/* title */
.title {
  float: left;
  margin-left: 10px;
  display: inline-block;
  line-height: 60px;
  font-size: 16px;
  font-weight: bold;
  font-style: oblique;
  cursor: pointer;
  transition: all 0.2s linear;
}
.title:hover {
  font-size: 20px;
}
/* 头像 */
.el-avatar {
  float: right;
  margin-right: 5px;
  margin-top: 5px;
  cursor: pointer;
}
/* 用户名 */
.username {
  display: inline-block;
  line-height: 60px;
  border-radius: 30px;
  font-weight: bold;
  /* transform: translateX(20%); */
  cursor: pointer;
}
.userlogin {
  display: inline-block;
  width: 60px;
  line-height: 60px;
  border-radius: 30px;
  font-weight: bold;
  transform: translateX(20%);
  cursor: pointer;
  transition: all 0.2s linear;
}
.userlogin:hover {
  background-color: palegoldenrod;
  color: brown;
  font-size: 15px;
}
.userlogin:active {
  box-shadow: palegreen 0 0 2px 20px;
}
/* 搜索框 */
.input-with-select{
  margin-top: 10px;
  /* transform: translateY(50%); */
}
</style>