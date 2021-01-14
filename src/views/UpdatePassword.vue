<template>
  <div>
    <breadcrumb firstTitle="个人中心" secondTitle="修改密码" />
    <div>
      <el-card class="box-card">
        <el-form
          style="width: 400px; margin-top: 5%; border-left: 2px solid purple"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定修改</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../components/public/Breadcrumb";
import { UserAI, UserAPI } from "../api/api";
export default {
  components: {
    breadcrumb,
  },

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            id: JSON.parse(localStorage["userInfo"]).id,
            pass: this.ruleForm.pass,
          };
          console.log(params);
          UserAPI.updateUserPass(JSON.stringify(params))
            .then((res) => {
              console.log(res.data.content.isUpdate);
              if (res.data.content.isUpdate) {
                this.$notify({
                  title: "密码重置成功",
                  message: "请重新登录",
                  type: 'success',
                  offset: 100,
                });
                window.localStorage.clear();
                // 改变登录状态
                this.$store.commit("changeIsLogin");
                this.$router.push("/");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
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
</style>