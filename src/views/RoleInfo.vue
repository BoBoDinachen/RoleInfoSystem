<template>
  <div>
    <Breadcrumb firstTitle="信息展示" secondTitle="式神信息" />
    <div id="role">
      <!-- 轮播图 -->
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in images" :key="index">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
      <!-- 热门式神 -->
      <el-tag type="success" effect="dark">热门式神</el-tag>
      <ul class="hot-roles">
        <li v-for="(item, index) in roleAvatar" :key="index">
          <el-avatar size="large" :src="item"></el-avatar>
        </li>
      </ul>
      <!-- 式神列表 -->
      <ul class="badge_list">
        <li><el-tag type="success" effect="dark">式神列表</el-tag></li>
        <li>
          <el-badge :value="roleCount.count1" class="item" type="success">
            <el-button size="small" plain @click="getAllRoleInfo">全部式神</el-button>
          </el-badge>
        </li>
        <li>
          <el-badge :value="roleCount.count2" class="item" type="success">
            <el-button size="small" round plain @click="getRoleInfoByType('侍')">侍</el-button>
          </el-badge>
        </li>
        <li>
          <el-badge :value="roleCount.count3" class="item" type="success">
            <el-button size="small" round plain @click="getRoleInfoByType('巫')">巫</el-button>
          </el-badge>
        </li>
        <li>
          <el-badge :value="roleCount.count4" class="item" type="success">
            <el-button size="small" round plain @click="getRoleInfoByType('射')">射</el-button>
          </el-badge>
        </li>
        <li>
          <el-badge :value="roleCount.count5" class="item" type="success">
            <el-button size="small" round plain @click="getRoleInfoByType('忍')">忍</el-button>
          </el-badge>
        </li>
        <li>
          <el-badge :value="roleCount.count6" class="item" type="success">
            <el-button size="small" round plain @click="getRoleInfoByType('守')">守</el-button>
          </el-badge>
        </li>
        <li>
          <el-badge :value="roleCount.count7" class="item" type="success">
            <el-button size="small" round plain @click="getRoleInfoByType('祝')">祝</el-button>
          </el-badge>
        </li>
      </ul>
      <div class="role_list">
        <el-card
          v-for="(role, index) in rolesInfo"
          :key="index"
          class="role_card"
          :body-style="{ padding: '0px' }"
        >
          <img :src="headURL+role.id" class="image" />
          <div style="padding: 14px">
            <span style="font-weight: bold">{{ role.name }}</span>
            <!-- 式神信息 -->
            <ul class="bottom clearfix">
              <li>
                <span><label>位置:</label>{{ role.position }}</span>
              </li>
              <li>
                <span><label>式神特性:</label>{{ role.peculiarity }}</span>
              </li>
              <li>
                <el-button type="text" class="button">式神详情</el-button>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "../components/public/Breadcrumb";
// 引入api
import { RoleAPI } from "../api/api";
export default {
  data() {
    return {
      // 式神头像公共路径
      headURL: RoleAPI.ImgURL + "role/getRolePortrait/",
      // 式神图片
      pictureURL: RoleAPI.ImgURL + "role/getRolePicture/",
      images: [
        require("../assets/images/img1.jpg"),
        require("../assets/images/img2.jpg"),
        require("../assets/images/img3.jpg"),
        require("../assets/images/img4.jpg"),
      ],
      roleAvatar: [
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      ],
      // 式神类别的个数
      roleCount:{
        count1: "",
        count2: "",
        count3: "",
        count4: "",
        count5: "",
        count6: "",
        count7: "",
      },
      // 式神信息
      rolesInfo: [],
    };
  },
  components: {
    Breadcrumb,
  },
  created() {
    // 初始化数据
    this.getAllRoleInfo();
  },
  mounted() {},
  methods: {
    // 加载所有标签的值
    setRoleCount(){
      let type_list = ["侍","巫","射","忍","守","祝"];
      for (let index = 0; index < type_list.length; index++) {
        this.getRoleInfoToNum(type_list[index]);
      }
    },
    // 获取role式神信息
    getAllRoleInfo() {
      RoleAPI.getRolesInfo()
        .then((res) => {
          console.log(res.data);
          // 拿到数据~
          this.rolesInfo = res.data.content.roles;
          this.roleCount.count1 = res.data.content.roles.length+'';
          // 加载标签的值
         this.setRoleCount();
        })
        .catch((err) => {
          console.log(err);
        });
      
    },
    // 分类获取式神信息
    getRoleInfoByType(type){
      // 调用api~
      RoleAPI.getRolesInfoByType(type).then((res) => {
        // 拿到数据~
        console.log(res.data);
        this.rolesInfo = res.data.content.roles;
      }).catch((err) => {
        console.log(err);
      })
    },
    // 获取对应类型的式神个数
    getRoleInfoToNum(type){
      // 调用api~
      RoleAPI.getRolesInfoByType(type).then((res) => {

        // 拿到数据~
        switch(type){
          case "侍":
            this.roleCount.count2 = res.data.content.roles.length;
            break;
          case "巫":
            this.roleCount.count3 = res.data.content.roles.length;
            break;
          case "射":
            this.roleCount.count4 = res.data.content.roles.length;
            break;
          case "忍":
            this.roleCount.count5 = res.data.content.roles.length;
            break;
          case "守":
            this.roleCount.count6 = res.data.content.roles.length;
            break;
          case "祝":
            this.roleCount.count7 = res.data.content.roles.length;
            break;
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  },
};
</script>

<style scoped>
#role {
  padding: 0;
  padding-left: 3px;
  margin: 0;
  width: 100%;
  height: 800px;
  text-align: left;
  overflow: auto;
  border-left: 5px solid purple;
}
/* 滚动条样式 */
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 15px;
  background-color: whitesmoke;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: skyblue;
}
/* 轮播图 */
.el-carousel__item {
  color: #475669;
  font-size: 14px;
  line-height: 200px;
  border-radius: 15px;
  margin: 0;
}
/* 图片 830x250 */
.el-carousel__item > img {
  border-radius: 15px;
  width: 830px;
  height: 250px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* 标签 */
.el-tag {
  cursor: pointer;
  margin-bottom: 5px;
}

/* 热门式神列表 */
.hot-roles {
  list-style: none;
  margin: 0 5px 15px 0;
  padding-left: 20px;
  height: 100px;
  border-radius: 5px;
  background-color: rgba(128, 128, 128, 0.5);
}
.hot-roles li {
  display: inline-block;
  cursor: pointer;
  margin: 10px 20px 20px 10px;
}

.hot-roles .el-avatar--large {
  width: 80px;
  height: 80px;
}
.hot-roles .el-avatar--large:hover {
  box-shadow: 0 0 10px 10px powderblue;
}
/* 式神列表 */
/* 标签 */
.badge_list{
  list-style: none;
  display: flex;
  justify-content: flex-start;

}
.badge_list li {
  /* width: 200px; */
  margin-right: 2%;
}
.role_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  /* height: 1100px; */
  border-radius: 5px;
  /* padding-top: 10px; */
  padding: 10px 10px 190px 10px;
  background-color: rgba(128, 128, 128, 0.5);
}
.role_card {
  text-align: center;
  margin-right: 20px;
  width: 250px;
  height: 320px;
  margin-bottom: 20px;
}
.role_card .image {
  width: 230px;
  height: 200px;
}
.role_card .bottom {
  list-style: none;
}
</style>