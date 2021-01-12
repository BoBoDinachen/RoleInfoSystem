<template>
  <div>
    <breadcrumb firstTitle="信息管理" secondTitle="式神管理" />
    <div v-show="!isLogin">
      <el-alert
        title="请先登录！"
        type="warning"
        center
        show-icon>
      </el-alert>
    </div>
    <div class="roleManage" v-show="isLogin">
      <!-- 表格 -->
      <el-button
        @click="addRoleInfo"
        class="btn_add"
        type="success"
        icon="el-icon-edit-outline"
        style=""
        >添加新的式神</el-button
      >
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
        max-height="475"
        show-header
      >
        <!-- 展开行的内容 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <ul class="table-expand">
              <li>
                <el-tag type="info">生存能力</el-tag>
                <span>{{ props.row.survival }}</span>
              </li>
              <li>
                <el-tag type="info">伤害输出</el-tag>
                <span>{{ props.row.output }}</span>
              </li>
              <li>
                <el-tag type="info">敏捷能力</el-tag>
                <span>{{ props.row.agility }}</span>
              </li>
              <li>
                <el-tag type="info">增益效果</el-tag>
                <span>{{ props.row.gain }}</span>
              </li>
              <li>
                <el-tag type="danger">上手难度</el-tag>
                <!-- 星级 -->
                <el-rate
                  v-model="props.row.difficulty"
                  disabled
                  show-text
                  :texts="['容易', '简单', '一般', '较难', '极难']"
                >
                </el-rate>
              </li>
            </ul>
            <!-- 右边的内容 -->
            <div class="table-expand-right">
              <!-- 图片 -->
              <el-image :src="pictureURL+props.row.id" fit="contain">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
              <!-- 式神简介 -->
              <span><el-tag type="success">简介</el-tag> {{props.row.brief}}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="式神 ID" prop="id" width="80px" align="center">
        </el-table-column>
        <el-table-column
          label="式神名称"
          prop="name"
          width="250px"
          align="center"
        >
          <template slot-scope="scope">
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="6"
                ><el-avatar
                  shape="square"
                  size="medium"
                  fit="contain"
                  :src="
                    headURL + scope.row.id + '?' + '/' + Math.random() * 100000
                  "
                ></el-avatar
              ></el-col>
              <el-col :span="6"
                ><span style="display: inline-block; line-height: 36px">{{
                  scope.row.name
                }}</span></el-col
              >
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          label="定位"
          prop="position"
          width="180px"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success" disable-transitions>{{
              scope.row.position
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="特性"
          prop="peculiarity"
          width="190px"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="warning" disable-transitions>{{
              scope.row.peculiarity
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="brief" align="center">
          <template slot-scope="scope">
            <span class="role-describe">{{ scope.row.brief }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              @click.native.prevent="handleSearch(scope.$index, scope.row)"
              v-model="search"
              size="mini"
              placeholder="输入式神名字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click.native.prevent="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click.native.prevent="handleDelete(scope.$index, tableData)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 -->
      <!-- 弹出的添加框 -->
      <el-dialog
        title="添加式神"
        :visible.sync="addFormVisible"
        width="30%"
        center
      >
        <!-- 添加表单 -->
        <el-form
          :status-icon="true"
          :model="AddForm"
          ref="ruleForm"
          :rules="addRules"
          label-width="100px"
          class="edit-ruleForm"
        >
          <el-form-item label="式神名字" prop="name">
            <el-input v-model="AddForm.name"></el-input>
          </el-form-item>
          <el-form-item label="位置" prop="position">
            <el-select v-model="AddForm.position" placeholder="请选择式神位置">
              <el-option label="侍" value="侍"></el-option>
              <el-option label="巫" value="巫"></el-option>
              <el-option label="射" value="射"></el-option>
              <el-option label="忍" value="忍"></el-option>
              <el-option label="守" value="守"></el-option>
              <el-option label="祝" value="祝"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设置头像">
            <el-upload
              class="upload-demo"
              ref="uploadPortrait"
              action="http://localhost:9090/role/setRolePortrait"
              name="file"
              :data="{ roleID: AddForm.id }"
              :limit="1"
              :multiple="false"
              :on-success="handleSuccess"
              :file-list="portrait"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取头像</el-button
              >
              <div slot="tip" class="el-upload__tip" style="float: right">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              class="upload-demo"
              ref="uploadPicture"
              action="http://localhost:9090/role/setRolePicture"
              name="file"
              :data="{ roleID: AddForm.id }"
              :limit="1"
              :multiple="false"
              :on-success="handleSuccess"
              :file-list="picture"
              list-type="picture"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="float: right">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="式神特性" prop="peculiarity">
            <el-input v-model="AddForm.peculiarity"></el-input>
          </el-form-item>
          <el-form-item label="式神简介" prop="brief">
            <el-input type="textarea" v-model="AddForm.brief"></el-input>
          </el-form-item>
          <el-form-item label="生存能力">
            <el-radio-group v-model="AddForm.survival">
              <el-radio label="C"></el-radio>
              <el-radio label="B"></el-radio>
              <el-radio label="A"></el-radio>
              <el-radio label="S"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="伤害输出">
            <el-radio-group v-model="AddForm.output">
              <el-radio label="C"></el-radio>
              <el-radio label="B"></el-radio>
              <el-radio label="A"></el-radio>
              <el-radio label="S"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="敏捷能力">
            <el-radio-group v-model="AddForm.agility">
              <el-radio label="C"></el-radio>
              <el-radio label="B"></el-radio>
              <el-radio label="A"></el-radio>
              <el-radio label="S"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="增益效果">
            <el-radio-group v-model="AddForm.gain">
              <el-radio label="C"></el-radio>
              <el-radio label="B"></el-radio>
              <el-radio label="A"></el-radio>
              <el-radio label="S"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="AddForm.difficulty"
              show-text
              :texts="['容易', '简单', '一般', '较难', '极难']"
            >
            </el-rate>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitAddForm('ruleForm')"
              :loading="isLoading"
              >立即添加</el-button
            >
            <el-button @click="cancelAddForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 弹出的添加框 -->
      <!-- 弹出的修改框 -->
      <el-dialog
        :title="'编辑式神 / ' + EditForm.name"
        :visible.sync="editDialogVisible"
        width="30%"
        center
      >
        <!-- 编辑框 -->
        <el-form
          :status-icon="true"
          :rules="editRules"
          :model="EditForm"
          ref="EditForm"
          label-width="100px"
          class="edit-ruleForm"
        >
          <el-form-item label="位置" prop="position">
            <el-select v-model="EditForm.position" placeholder="请选择式神位置">
              <el-option label="侍" value="侍"></el-option>
              <el-option label="巫" value="巫"></el-option>
              <el-option label="射" value="射"></el-option>
              <el-option label="忍" value="忍"></el-option>
              <el-option label="守" value="守"></el-option>
              <el-option label="祝" value="祝"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设置头像">
            <el-upload
              class="upload-demo"
              ref="uploadPortrait"
              action="http://localhost:9090/role/setRolePortrait"
              name="file"
              :on-success="handleSuccess"
              :data="{ roleID: EditForm.id }"
              :limit="1"
              :multiple="false"
              :file-list="portrait"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取头像</el-button
              >
              <div slot="tip" class="el-upload__tip" style="float: right">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              class="upload-demo"
              ref="uploadPicture"
              action="http://localhost:9090/role/setRolePicture"
              name="file"
              :data="{ roleID:EditForm.id }"
              :limit="1"
              :multiple="false"
              :file-list="picture"
              list-type="picture"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="float: right">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="式神特性" prop="peculiarity">
            <el-input v-model="EditForm.peculiarity"></el-input>
          </el-form-item>
          <el-form-item label="式神简介" prop="brief">
            <el-input
              type="textarea"
              :rows="3"
              v-model="EditForm.brief"
            ></el-input>
          </el-form-item>
          <el-form-item label="生存能力">
            <el-radio-group v-model="EditForm.survival">
              <el-radio label="C"></el-radio>
              <el-radio label="B"></el-radio>
              <el-radio label="A"></el-radio>
              <el-radio label="S"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="伤害输出">
            <el-radio-group v-model="EditForm.output">
              <el-radio label="C"></el-radio>
              <el-radio label="B"></el-radio>
              <el-radio label="A"></el-radio>
              <el-radio label="S"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="敏捷能力">
            <el-radio-group v-model="EditForm.agility">
              <el-radio label="C"></el-radio>
              <el-radio label="B"></el-radio>
              <el-radio label="A"></el-radio>
              <el-radio label="S"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="增益效果">
            <el-radio-group v-model="EditForm.gain">
              <el-radio label="C"></el-radio>
              <el-radio label="B"></el-radio>
              <el-radio label="A"></el-radio>
              <el-radio label="S"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="EditForm.difficulty"
              show-text
              :texts="['容易', '简单', '一般', '较难', '极难']"
            >
            </el-rate>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitEditForm()"
              :loading="isLoading"
              >确定修改</el-button
            >
            <el-button @click="cancelEditForm('EditForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/public/Breadcrumb.vue";
import { RoleAPI } from "../api/api";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    let checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("式神名字不能为空~"));
      } else if (value != "") {
        RoleAPI.checkReName(value)
          .then((res) => {
            if (res.data.content.isExist) {
              callback(new Error("式神名字重复啦~"));
            } else {
              callback();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    let checkPosition = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("式神位置不能为空~"));
      } else {
        callback();
      }
    };
    let checkPeculiarity = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("式神特性不能为空~"));
      } else {
        callback();
      }
    };
    let checkBrief = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("式神介绍不能为空~"));
      }
      callback();
    };
    return {
      isLogin: true,
      isLoading: false, // 按钮加载
      // 式神头像公共路径
      headURL: RoleAPI.ImgURL + "role/getRolePortrait/",
      // 式神图片
      pictureURL: RoleAPI.ImgURL + "role/getRolePicture/",
      portrait: [], // 头像
      picture: [], // 图片地址
      addFormVisible: false,
      editDialogVisible: false,
      addRules: {
        name: [{ validator: checkName, trigger: "blur" }],
        position: [{ validator: checkPosition, trigger: "blur" }],
        peculiarity: [{ validator: checkPeculiarity, trigger: "blur" }],
        brief: [{ validator: checkBrief, trigger: "blur" }],
      },
      AddForm: {
        name: "", //式神名字
        position: "", //式神定位
        // portrait: [], // 头像
        // picture: [], // 图片地址
        brief: "", //介绍
        peculiarity: "", // 特性
        survival: "C", // 生存能力
        output: "C", // 伤害输出
        agility: "C", //敏捷能力
        gain: "C", // 增益效果
        difficulty: 1, // 难度
      },
      editRules: {
        position: [{ validator: checkPosition, trigger: "blur" }],
        peculiarity: [{ validator: checkPeculiarity, trigger: "blur" }],
        brief: [{ validator: checkBrief, trigger: "blur" }],
      },
      EditForm: {
        // id: 1, //id
        // name: "妖狐", //式神名字
        // position: "射", //式神定位
        // brief: "。。。", //介绍
        // peculiarity: "消耗/持续输出", // 特性
        // survival: "B", // 生存能力
        // output: "A", // 伤害输出
        // agility: "B", //敏捷能力
        // gain: "B", // 增益效果
        // difficulty: 4, // 难度
      },
      // 关于编辑表格的
      formLabelWidth: "120px",
      search: "",
      avatarUrl: [
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      ],
      tableData: [
        // {
        //   id: "1", //ID
        //   name: "妖狐", //名字
        //   position: "射", //定位
        //   brief: "拿着扇子的狐妖美男子,又称脸狐....", //简介
        //   peculiarity: "消耗/持续输出", // 特性
        //   survival: "B", // 生存能力
        //   output: "A", // 伤害输出
        //   agility: "A", // 敏捷能力
        //   gain: "B", // 增益效果
        //   difficulty: 3, // 难度
        // },
      ],
    };
  },
  created() {
    // 判断是否登录
    if (localStorage["userToken"] !=null ) {
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
    this.initTableData();
  },
  methods: {
    // 初始化表格数据
    initTableData() {
      RoleAPI.getRolesInfo()
        .then((res) => {
          let roles = res.data.content.roles;
          // console.log(roles);
          // 1.遍历返回的数组
          for (let index = 0; index < roles.length; index++) {
            const role = roles[index];
            // 生成一个数据
            let data = {
              id: 0, //ID
              name: "", //名字
              position: "", //定位
              brief: "", //简介
              peculiarity: "", // 特性
              survival: "", // 生存能力
              output: "", // 伤害输出
              agility: "", // 敏捷能力
              gain: "", // 增益效果
              difficulty: 0, // 难度
            };
            data.id = role.id;
            data.name = role.name;
            data.position = role.position;
            data.brief = role.brief;
            data.peculiarity = role.peculiarity;
            data.survival = role.survival;
            data.output = role.output;
            data.agility = role.agility;
            data.gain = role.gain;
            data.difficulty = role.difficulty;
            // 将数据push到表格数组中
            this.tableData.push(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加框判空与判重复
    isEmptyByAddForm() {
      if (this.AddForm.name != "") {
        RoleAPI.checkReName(this.AddForm.name)
          .then((res) => {
            if (res.data.content.isExist) {
              this.$message({
                message: "式神名字重复啦~",
                type: "warning",
              });
              return true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (this.AddForm.name == "") {
        this.$message({
          message: "你还没有填写式神的名字哦~",
          type: "warning",
        });
        return true;
      } else if (this.AddForm.position == "") {
        this.$message({
          message: "你还没有选择式神的位置哦~",
          type: "warning",
        });
        return true;
      } else if (this.AddForm.peculiarity == "") {
        this.$message({
          message: "你还没有填写式神的特性哦~",
          type: "warning",
        });
        return true;
      } else if (this.EditForm.brief == "") {
        this.$message({
          message: "你还没有填写式神的介绍哦~",
          type: "warning",
        });
        return true;
      } else {
        return false;
      }
    },
    // 提交添加信息
    submitAddForm(formName) {
      let isEmpty = this.isEmptyByAddForm();
      if (!isEmpty) {
        this.isLoading = true; //按钮加载
        if (this.portrait.length != null) {
          // 上传头像
          this.$refs.uploadPortrait.submit();
        }
        if (this.picture.length != null) {
          // 上传图片
          this.$refs.uploadPicture.submit();
        }
        // 发起添加请求
        RoleAPI.addRoleInfo(this.AddForm)
          .then((res) => {
            // 插入成功,重新加载表单数据,隐藏表单框,提示,改变按钮状态
            if (res.data.content.isInsert) {
              this.addFormVisible = false;
              this.isLoading = false; //按钮不加载
              this.tableData = [];
              this.initTableData();
              this.$message({
                message: "添加信息成功~",
                type: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 隐藏添加框
    cancelAddForm(formName) {
      // 重置
      this.$refs[formName].resetFields();
      this.addFormVisible = false;
    },
    // 编辑框判空
    isEmptyByEditForm() {
      if (this.EditForm.peculiarity == "") {
        this.$message({
          message: "你还没有填写式神的特性哦~",
          type: "warning",
        });
        return true;
      } else if (this.EditForm.brief == "") {
        this.$message({
          message: "你还没有填写式神的介绍哦~",
          type: "warning",
        });
        return true;
      } else {
        return false;
      }
    },
    // 文件上传成功之后的回调函数
    handleSuccess(response, file, fileList) {
      console.log(response);
      if (response.content.isUpload) {
        // 上传成功
      }
    },
    // 提交修改信息
    submitEditForm() {
      // 1.先进行值判空
      let isEmpty = this.isEmptyByEditForm();
      if (!isEmpty) {
        this.isLoading = true; //按钮加载
        if (this.portrait.length != null) {
          // 上传头像
          this.$refs.uploadPortrait.submit();
        }
        if (this.picture.length != null) {
          // 上传图片
          this.$refs.uploadPicture.submit();
        }
        // 发送修改请求
        RoleAPI.updateRoleInfo(this.EditForm)
          .then((res) => {
            console.log(res.data);
            if (res.data.content.isChange) {
              // 如果修改成功，隐藏弹出框，并提示,改变按钮加载，清除文件列表
              this.isLoading = false; //按钮不加载
              this.editDialogVisible = false;
              
              this.$message({
                message: "修改成功!",
                type: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 隐藏编辑框
    cancelEditForm(formName) {
      // 重置
      this.$refs[formName].resetFields();
      this.editDialogVisible = false;
    },

    // 点击添加式神
    addRoleInfo() {
      // 弹出添加框
      this.addFormVisible = true;
    },
    // 点击编辑
    handleEdit(index, row) {
      // 让编辑框的内容等于表格的每一行
      this.EditForm = row;
      // 弹出编辑框
      this.editDialogVisible = true;
    },
    // 点击删除
    handleDelete(index, rows) {
      // console.log(rows[index].name);
      this.$confirm("确定删除此式神信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用删除api
          RoleAPI.deleteRoleInfo(rows[index].name)
            .then((res) => {
              console.log(res);
              if (res.data.content.isDelete) {
                rows.splice(index, 1); // 删除表格对应数据
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 搜索
    handleSearch(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style scoped>
.el-tag {
  cursor: pointer;
}
/* 式神管理 */
.roleManage {
  border-left: 5px solid purple;
  text-align: left;
  padding: 0 10px 0 10px;
  height: 100%;
}
/* 添加式神按钮 */
.btn_add {
  margin: 5px 0 10px 0;
}
/* 式神名字 */
/* 展开行 */
.table-expand {
  float: left;
  width: 300px;
  margin: 0;
  list-style: none;
}
.table-expand li {
  width: 300px;
  margin-bottom: 10px;
}
.table-expand li > .el-tag {
  margin-right: 15px;
}
/* 展开行右边 */
.table-expand-right{
  margin-left: 350px;
}
.table-expand-right .el-image {
  width: 300px;
  /* height: 170px; */
  /* 和文字顶部对齐 */
  vertical-align: top; 
}
.table-expand-right  > span{
  display: inline-block;
  margin-left: 40px;
  width: 300px;
  line-height: 25px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold;
  font-size: 15px;
}
/* 评分 */
.el-rate {
  display: inline-block;
}
/* 头像 */
.el-avatar {
  vertical-align: middle;
}
/* 式神描述 */
.role-describe {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>