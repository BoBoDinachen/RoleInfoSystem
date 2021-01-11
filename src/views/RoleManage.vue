<template>
  <div>
    <breadcrumb firstTitle="信息管理" secondTitle="式神管理" />
    <div class="roleManage">
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
        max-height="500"
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
          </template>
        </el-table-column>

        <el-table-column label="式神 ID" prop="id" width="80px" align="center">
        </el-table-column>
        <el-table-column
          label="式神名称"
          prop="name"
          width="180px"
          align="center"
        >
          <template slot-scope="scope">
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="6"
                ><el-avatar
                  shape="square"
                  size="medium"
                  :src="avatarUrl[0]"
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
      <el-dialog title="添加式神" :visible.sync="addFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 弹出的添加框 -->
      <!-- 弹出的修改框 -->
      <el-dialog
        title="提示"
        :visible.sync="editDialogVisible"
        width="30%"
        center
      >
        <span>需要注意的是内容是默认不居中的</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/public/Breadcrumb.vue";

export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      addFormVisible: false,
      editDialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      search: "",
      avatarUrl: [
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      ],
      tableData: [
        {
          id: "1", //ID
          name: "妖狐", //名字
          position: "射", //定位
          brief: "拿着扇子的狐妖美男子,又称脸狐....", //简介
          peculiarity: "消耗/持续输出", // 特性
          survival: "B", // 生存能力
          output: "A", // 伤害输出
          agility: "A", // 敏捷能力
          gain: "B", // 增益效果
          difficulty: 3, // 难度
        },
      ],
    };
  },
  methods: {
    // 点击添加式神
    addRoleInfo() {
      // 弹出添加框
      this.addFormVisible = true;
    },
    // 点击编辑
    handleEdit(index, row) {
      console.log(index, row);
      // 弹出编辑框
      this.editDialogVisible = true;
    },
    // 点击删除
    handleDelete(index, rows) {
      this.$confirm("确定删除此式神信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
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
  margin: 0;
  list-style: none;
}
.table-expand li {
  margin-bottom: 10px;
}
.table-expand li > .el-tag {
  margin-right: 15px;
}
/* 评分 */
.el-rate {
  display: inline-block;
}
/* 头像 */
.el-avatar {
  vertical-align: middle;
}
</style>