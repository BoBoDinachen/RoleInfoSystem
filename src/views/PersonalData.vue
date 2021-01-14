<template>
  <div>
    <breadcrumb firstTitle="个人中心" secondTitle="个人资料" />
    <div>
      <el-card class="box-card">
        <ul class="data_list">
          <li>
            <el-avatar shape="square" size="large" :src="squareUrl"></el-avatar>
          </li>
          <li>
            <el-tag type="success"><span>姓名</span></el-tag>
            {{ userInfo.userName }}
          </li>
          <li>
            <el-tag type="success"><span>邮箱</span></el-tag>
            {{ userInfo.email }}
          </li>
          <li>
            <el-tag type="success"><span>电话</span></el-tag>
            {{ userInfo.tel }}
          </li>
          <li>
            <el-tag type="success"><span>性别</span></el-tag>
            {{ userInfo.sex }}
          </li>
          <li>
            <el-tag type="success"><span>年龄</span></el-tag>
            {{ userInfo.age }}
          </li>
          <li>
            <el-button style="margin-top:20px" type="primary" icon="el-icon-edit" @click="goToEdit">去修改信息</el-button>
          </li>
        </ul>
        
        <el-calendar>
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{data}">
            <p :class="data.isSelected ? 'is-selected' : ''">
              
              {{ data.day.split("-").slice(1).join("-") }}
              {{ data.isSelected ? "✔️" : "" }}
            </p>
          </template>
        </el-calendar>
      </el-card>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/public/Breadcrumb.vue";
import {UserAPI} from "../api/api";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      squareUrl: UserAPI.HeadURL+"/getUserHead/"+JSON.parse(localStorage["userInfo"]).id,
      userInfo: {},
    };
  },
  created() {
    this.getUerInfo();
  },
  methods: {
    // 获取用户数据
    getUerInfo() {
      // 发送请求
      UserAPI.findUserByID(JSON.parse(localStorage['userInfo']).id).then((res)=>{
        console.log(res.data.user);
        this.userInfo = res.data.user;
      }).catch((err)=>{
        console.log(err);
      });
    },
    // 去编辑
    goToEdit(){
      this.$router.push("/updatePersonal");
    }
  },
};
</script>

<style scoped>
/* 头像 */
.box-card {
  margin-top: 20px;
}
.box-card .data_list {
  float: left;
  width: 500px;
  list-style: none;
  text-align: left;
}
.box-card .data_list li {
  margin-bottom: 10px;
}
/* 头像 */
.box-card .data_list .el-avatar {
  width: 100px;
  height: 100px;
}
.box-card .data_list li > span:nth-child(1) {
  font-size: 16px;
  font-weight: bold;
}
/* 日历 */
.is-selected {
  color: #1989fa;
}
.el-calendar{
  float: right;
  width: 650px;
  height: 540px;
}
</style>