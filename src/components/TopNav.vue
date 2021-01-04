<template>
  <div>
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
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3" :offset="5">
        <span
          class="userlogin"
          v-if="!isLogin"
          @click="dialogFormVisible = true"
          >未登录</span
        >
        <span class="username" v-if="isLogin" :text="username">{{
          username
        }}</span>
        <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
      </el-col>
    </el-row>
    <!-- 登录与注册框 -->
    <el-dialog
      title="用户登录"
      :visible.sync="dialogFormVisible"
      width="450px"
      :center="true"
      style="font-weight: bold"
    >
      <el-form :model="loginForm">
        <el-form-item
          label="账号/邮箱"
          :label-width="formLabelWidth"
        >
          <el-input
            suffix-icon="el-icon-user"
            placeholder="请输入账号或者邮箱"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            suffix-icon="el-icon-unlock"
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <JcRange
        status="status"
        :successFun="changeStatus"
        :key="timer"
      ></JcRange>
      <el-link class="goRegister" type="success" @click="toggleDialogForm"
        >去注册账号</el-link
      >
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userLogin">登录</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 注册 -->
    <el-dialog
      title="用户注册"
      :visible.sync="dialogFormVisible2"
      width="500px"
      :center="true"
      style="font-weight: bold;"
    >
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules2"
        ref="registerForm"
      >
        <el-form-item
          label="设置用户名:"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input placeholder="设置您的用户名" type="text" v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="你的邮箱:"
          :label-width="formLabelWidth"
          prop="email"
        >
          <el-input placeholder="设置您的邮箱地址" type="text" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="性别:" :label-width="formLabelWidth" prop="sex">
          <el-radio-group v-model="registerForm.sex">
            <el-radio label="男生♂"></el-radio>
            <el-radio label="女生♀"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄:" :label-width="formLabelWidth" prop="age">
          <el-input placeholder="朋友你多大啦~" v-model.number="registerForm.age"></el-input>
        </el-form-item>

        <el-form-item label="密码:" :label-width="formLabelWidth" prop="pass">
          <el-input
            placeholder="告诉我你的密码~"
            type="password"
            v-model="registerForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码:"
          :label-width="formLabelWidth"
          prop="oncePass"
        >
          <el-input
            placeholder="在告诉一次~"
            type="password"
            v-model="registerForm.oncePass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRegForm('registerForm')"
          >注册</el-button
        >
        <el-button @click="resetRegForm('registerForm')">重置</el-button>
      </div>
    </el-dialog>
    <!--  -->
  </div>
</template>

<script>
// 导入滑块验证组件
import JcRange from "@/components/public/JcRange.vue";
export default {
  components: {
    JcRange,
  },
  data() {
    // 自定义表单验证
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("必须输入用户名!"));
      }
      setTimeout(() => {
        let regUserName = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
        if (!regUserName.test(value)) {
          callback(new Error("用户名必须是中文、英文、数字包括下划线！"));
        } else {
          // 用户名查重
          callback();
        }
      }, 500);
    };
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("必须输入邮箱!"));
      }
      let regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!regEmail.test(value)) {
        callback(new Error("请输入正确邮箱！"));
      } else {
        callback();
      }
    };
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入年龄!"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
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
        return callback(new Error("请选择性别!"));
      }
    };
    let checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码!"));
      } else {
        let regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
        if (this.registerForm.oncePass !== "") {
          this.$refs.registerForm.validateField("oncePass");
        }
        if (!regPass.test(value)) {
          callback(new Error("密码必须包含大小写字母和数字,长度在8-10之间"));
        }
        callback();
      }
    };
    let checkOncePass = (rule, value, callback) => {
      if (!value) {
        console.log(value);
        callback(new Error("请再次输入密码"));
      } else {
        if (value != this.registerForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        }
        callback();
      }
    };
    return {
      // 是否已登录
      isLogin: false,
      squareUrl: require("../assets/top/head.png"),
      // 用户名
      username: "XDEcat",
      // 输入框
      inputValue: "",
      selectValue: "",
      // 显示弹出框
      dialogFormVisible: false,
      dialogFormVisible2: false,
      // 登录表单
      loginForm: {
        username: "",
        password: "",
      },
      // 注册表单
      registerForm: {
        username: "", // 用户名
        email: "", // 邮箱
        age: "", //年龄
        sex: "", //性别
        pass: "", // 密码
        oncePass: "", //确认密码
      },
      // 表单验证
      rules: {},
      rules2: {
        username: [{ validator: checkName, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        sex: [{ validator: checkSex, trigger: "blur" }],
        pass: [{ validator: checkPass, trigger: "blur" }],
        oncePass: [{ validator: checkOncePass, trigger: "blur" }],
      },
      formLabelWidth: "100px",
      // 验证
      status: false,
      timer: "",
    };
  },
  // 监听数据的变化
  watch: {
    dialogFormVisible(newValue, oldValue) {
      // 重新设置验证码
      // console.log("变化");
      this.status = false;
      this.timer = new Date().getTime();
    },
  },
  created() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
    },
    changeStatus(value) {
      this.status = value;
    },
    // 用户登录
    userLogin() {
      this.dialogFormVisible = false;
      console.log(this.status);
    },
    // 切换注册窗口
    toggleDialogForm() {
      //
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = true;
    },
    // 注册
    submitRegForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过，发送请求
          alert("submit!");
        } else {
          // 验证失败,通知
          this.$notify({
            title: "警告",
            message: "请填写正确的信息！",
            type: "warning",
          });
          return false;
        }
      });
    },
    //重置
    resetRegForm(formName) {
      this.$refs[formName].resetFields();
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
.input-with-select {
  margin-top: 10px;
  /* transform: translateY(50%); */
}
/* 表单-按钮 */
.dialog-footer .el-button {
  width: 100px;
  margin: 0 20px 0 20px;
}
.goRegister {
  position: absolute;
  margin: auto;
  margin-top: 10px;
  right: 15px;
}
/* 表单标签 */

</style>