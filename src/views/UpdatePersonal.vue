<template>
  <div>
    <breadcrumb firstTitle="个人中心" secondTitle="修改个人资料" />
    <div>
      <el-card class="box-card">
        <el-row type="flex" class="row-bg" justify="start">
          <el-col :span="6">
            <el-form
              style="width: 300px"
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="70px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="userName">
                <el-input
                  type="text"
                  v-model="ruleForm.userName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input
                  type="text"
                  v-model="ruleForm.email"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="tel">
                <el-input
                  type="text"
                  v-model="ruleForm.tel"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
              </el-form-item>
              <el-form-item style="margin-left: -100px">
                <el-button
                  type="success"
                  size="medium"
                  @click="submitForm('ruleForm')"
                  :loading="isLoading"
                  >确定修改</el-button
                >
                <el-button size="medium" @click="resetForm('ruleForm')">重新填写</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-tag style="margin-bottom:10px" type="success">修改头像</el-tag>
            <el-upload
              :action="headURL + '/setUserHead'"
              ref="upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :on-success="handleSuccess"
              :limit="1"
              name="file"
              :data="{ id: ruleForm.id }"
              :before-upload="beforeAvatarUpload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
            <el-button
              style="margin-top: 40px"
              size="medium"
              type="success"
              icon="el-icon-upload2"
              @click="submitUpload"
              >上传头像</el-button
            >
          </el-col>
          <el-col :span="6" :offset="1">
            <img src="../assets/images/background1.png" alt="" width="500px" style="border-radius:20px">
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/public/Breadcrumb.vue";
import { UserAPI } from "../api/api";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("必须输入用户名!"));
      }
      let regUserName = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
      if (!regUserName.test(value)) {
        callback(new Error("用户名必须是中文、英文、数字包括下划线！"));
      } else {
        callback();
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱~"));
      }
      let regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!regEmail.test(value)) {
        callback(new Error("请输入正确邮箱！"));
      } else {
        callback();
      }
    };
    let checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请设置电话~"));
      }
      let regTel = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
      if (!regTel.test(value)) {
        callback(new Error("电话格式错误~"));
      } else {
        callback();
      }
    };
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请设置年龄~"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值~"));
      } else {
        if (value < 18) {
          callback(new Error("必须年满18岁"));
        } else {
          callback();
        }
      }
    };
    let checkSex = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择性别~"));
      } else {
        callback();
      }
    };
    return {
      headURL: UserAPI.HeadURL,
      dialogImageUrl: "",
      dialogVisible: false,
      isLoading: false,
      ruleForm: {
        id: "",
        userName: "",
        email: "",
        sex: "",
        age: "",
        tel: "",
      },
      rules: {
        userName: [{ validator: checkName, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        tel: [{ validator: checkTel, trigger: "blur" }],
        sex: [{ validator: checkSex, trigger: "blur" }],
      },
    };
  },
  created() {
    // 初始化加载表单数据
    if (localStorage["userInfo"]) {
      this.getUserInfo();
    }
    
  },
  methods: {
    getUserInfo(){
      UserAPI.findUserByID(JSON.parse(localStorage["userInfo"]).id).then((res)=>{
      console.log(res.data.user);
      localStorage["userInfo"]  = JSON.stringify(res.data.user);
      this.ruleForm = res.data.user;
    }).catch((err)=>{
      console.log(err);
    });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response){
      // console.log(response);
      if (response.content.setUserHead) {
        this.$message({
          message: "头像上传成功~",
          type: "success"
        })
        this.$store.commit('changeShowHead');
      }else{
        this.$message({
          message: "头像上传失败~",
          type: "warning"
        })
      }
    },
    // 上传头像
    submitUpload() {
      this.$confirm('骚年,确定选择此图片作为你的头像吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 上传图片
          this.$refs.upload.submit();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          // 发送修改请求
          UserAPI.updateUserInfo(this.ruleForm)
            .then((res) => {
              // console.log(res.data.content.isUpdate);
              if (res.data.content.isUpdate) {
                this.isLoading = false;
                this.$message({
                  message: "修改成功~",
                  type: "success",
                });
              }
            })
            .catch((err) => {
              this.isLoading = false;
              this.$message({
                message: "网络出现问题啦~",
                type: "warning",
              });
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.el-form{
  border-left: 3px solid purple;
  font-weight: bold;
}
.el-form-item__content {
  margin-left: 0;
}
</style>