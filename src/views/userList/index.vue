<template>
  <div class="app-container">
    <!--卡片试图区域-->
    <el-card>
      <!--搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="15">
          <el-input
            v-model="queryInfo.query"
            placeholder="请输入内容"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            />
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button
            type="primary"
            @click="addDialogVisible = true"
          >添加用户</el-button>
          <el-button
            type="danger"
            @click="deleteSettleUsers"
          >删除选中</el-button>
        </el-col>
        <!-- <el-col :span="4">
          <el-button
            type="danger"
            @click="deleteSettleUsers"
          >删除选中</el-button>
        </el-col> -->
      </el-row>

      <!--用户列表区域-->
      <el-table
        :data="userList.slice(sliceNumStart, sliceNumEnd)"
        border
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="序号" />
        <el-table-column label="头像">
          <template slot-scope="scope">
            <div
              :style="
                'height:60px; width:60px; border:1px gray solid;border-radius: 50%;background: url(' +
                  (scope.row.userpic == null
                    ? scope.row.userpic
                    : scope.row.userpic.replace(/\\/g, '/')) +
                  ') no-repeat; background-size:cover;'
              "
            /></template>
        </el-table-column>
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="邮箱" prop="email" />
        <el-table-column label="电话" prop="phone" />
        <!-- <el-table-column label="注册时间" prop="create_time" /> -->
        <el-table-column label="注册时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column label="禁用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="userStateChanged(scope.row)"
            />
            <!-- {{scope.row}} -->
          </template>
        </el-table-column>
        <el-table-column label="管理员">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.admin"
              @change="adminSet(scope.row)"
            />
            <!-- {{scope.row}} -->
          </template>
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="{row}">
            <router-link :to="'/userList/userProfile/'+row.id" class="link-type">
              详情
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              effect="dark"
              content="账号信息修改"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                round
                @click="showEditDialog(scope.row.id)"
              />
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              effect="dark"
              content="账号删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                round
                @click="removeUserById(scope.row.id)"
              />
            </el-tooltip>
            <!-- 重置密码 -->
            <el-tooltip
              effect="dark"
              content="密码重置"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-refresh"
                size="mini"
                round
                @click="restPassword(scope.row.id)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!--分页区域-->
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!--添加用户的对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!--主体区域-->
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addForm.phone" />
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改用户对话框-->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editFormRules"
        label-width="70px"
      >
        <el-form-item label="" class="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="http://api.test2.com/api/v1/vue-element-admin/user/userHeadEdit?user_id=18"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="editForm.phone" />
        </el-form-item>
        <el-form-item label="签名" prop="userinfo.job">
          <el-input v-model="editForm.userinfo.job" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editForm.userinfo.sex" placeholder="性别">
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader
            v-model="selectedOptions"
            size="large"
            :options="options"
            @change="handleAreaChange"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editUserInfo(editForm.id)"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// userCreate,
import {
  userList,
  getuserinfo,
  userDelete,
  rsetUserP,
  changeStatusDisable,
  changeStatusAble,
  adminSet,
  adminCancel,
  userEdit
} from '@/api/user'
import { regionDataPlus, CodeToText } from 'element-china-area-data'
export default {
  data() {
    // 校验邮箱
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 校验手机号
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法手机号'))
    }
    return {
      // 分页数据
      sliceNumStart: 0,
      sliceNumEnd: 10,
      pageSize: 10, // 每页显示个数
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示的条数
        pagesize: 2
      },
      imageUrl: '',
      // element-china-area-data数据模板
      options: regionDataPlus,
      selectedOptions: [],
      settleUserList: [],
      userList: [],
      total: 0,
      // 控制添加用户对话框显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        id: '',
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      // 添加表单验证规则对象
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3-10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码的长度在6-15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      // 修改用户对话框
      editDialogVisible: false,
      editForm: {
        email: '',
        password: '',
        phone: '',
        userinfo: {
          job: '',
          sex: '',
          path: ''
        }
      },
      // 修改表单验证对象
      editFormRules: {
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      userList().then(response => {
        // console.log(response.data.list)
        this.userList = response.data.list.reverse()
        //  时间转换
        this.userList.forEach(row => {
          if (!row.status) {
            row.status = true
          } else {
            row.status = false
          }
          if (row.admin) {
            row.admin = true
          } else {
            row.admin = false
          }
          // console.log(row.admin)
        })
        this.total = response.data.list.length
        // console.log(this.userList)
      })
    },

    // element-china-area-data转文字
    handleAreaChange(value) {
      if (value[1] != null && value[2] != null) {
        var dz =
          CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]]
        this.addressid = value[2]
      } else {
        if (value[1] != null) {
          dz = CodeToText[value[0]] + CodeToText[value[1]]
          this.addressid = value[1]
        } else {
          dz = CodeToText[value[0]]
          this.addressid = value[0]
        }
      }
      this.editForm.userinfo.path = dz

      // console.log(dz)
      // console.log(value)
    },
    // 删除选中用户
    async deleteSettleUsers() {
      // console.log(' 删除列表 ' + this.settleUserList)
      // 弹框提示用户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除已选中用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // 发送删除请求
      this.settleUserList.forEach(id => {
        // 发送删除请求
        // console.log(id)
        userDelete(id).then(res => {
          if (res.code !== 20000) {
            this.$message.error('删除用户' + id + '失败')
          }
          // console.log('成功删除' + id)
        })
      })
      this.$message.success('删除成功')
      this.getUserList()
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 用户多选
    handleSelectionChange(selection) {
      this.settleUserList = []
      selection.forEach(row => {
        this.settleUserList.push(row.id)
      })
      // console.log(this.settleUserList)
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.sliceNumStart = 0
      this.sliceNumEnd = newSize
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.sliceNumStart = this.pageSize * (newPage - 1)
      this.sliceNumEnd = this.pageSize * newPage
    },
    // 修改用户禁用状态
    async userStateChanged(row) {
      // console.log(row.id + row.status)
      if (row.status) {
        changeStatusDisable(row.id).then(res => {
          if (res.code !== 20000) {
            this.$message.error('禁用用户' + row.id + '失败')
          } else {
            this.$message({
              message: '成功禁用',
              type: 'warning'
            })
          }
          console.log(res)
        })
      } else {
        changeStatusAble(row.id).then(res => {
          if (res.code !== 20000) {
            this.$message.error('解除禁用用户' + row.id + '失败')
          } else {
            this.$message({
              message: '成功解除禁用',
              type: 'success'
            })
          }
          console.log(res)
        })
      }
    },
    // 修改用户管理员状态
    async adminSet(row) {
      // console.log(row.id + row.status)
      if (row.admin) {
        adminSet(row.id).then(res => {
          if (res.code !== 20000) {
            this.$message.error('设置管理员身份' + row.id + '失败')
          } else {
            this.$message({
              message: '成功将此用户设置为管理员',
              type: 'warning'
            })
          }
          console.log(res)
        })
      } else {
        adminCancel(row.id).then(res => {
          if (res.code !== 20000) {
            this.$message.error('解除管理员身份' + row.id + '失败')
          } else {
            this.$message({
              message: '成功解除该管理员身份',
              type: 'success'
            })
          }
          console.log(res)
        })
      }
    },
    // 监听添加用户对话框的关闭事件
    async addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        console.log(' 添加用户 ')
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        // 添加成功
        this.$message.success(res.meta.msg)
        // 隐藏弹出框
        this.addDialogVisible = false
        // 刷新用户列表
        this.getUserList()
      })
    },
    // 重置密码
    restPassword(id) {
      this.$confirm('确定要重置该账号吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rsetUserP(id).then(res => {
            // console.log(res)
            if (res.code !== 20000) {
              this.$message.error('重置用户' + id + '密码失败')
            } else {
              this.$message({
                message: '密码重置成功，当前密码为123456',
                type: 'success'
              })
            }
            // console.log('成功删除' + id)
          })
        })
        .catch(() => {
          // 几点取消的提示
        })
    },
    // 修改用户
    async showEditDialog(id) {
      console.log(this.selectedOptions)
      getuserinfo(id).then(response => {
        // console.log(response.data)
        this.editForm.id = response.data.id
        this.imageUrl = response.data.userpic
        this.editForm.email = response.data.email
        this.editForm.username = response.data.username
        this.editForm.phone = response.data.phone
        this.editForm.userinfo.job = response.data.userinfo.job
        // 性别判断
        // eslint-disable-next-line eqeqeq
        if (response.data.userinfo.sex != 1) {
          this.editForm.userinfo.sex = '女'
        } else {
          this.editForm.userinfo.sex = '男'
        }
        this.editForm.userinfo.path = response.data.userinfo.path
      })
      // console.log(id + '参数（工作）： ' + this.editForm.userinfo.job + '参数（地址） ' + this.editForm.userinfo.path + '参数（性别） ' + this.editForm.userinfo.sex + '参数（邮箱） ' + this.editForm.email)
      // const { data: res } = await this.$http.get('users/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error(this.meta.msg)
      // }
      // this.editForm = res.data
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo(id) {
      // 性别判断
      // eslint-disable-next-line eqeqeq
      if (this.editForm.userinfo.sex != 1) {
        this.editForm.userinfo.sex = 2
      } else {
        this.editForm.userinfo.sex = 1
      }
      if (!this.editForm.userinfo.job) {
        this.editForm.userinfo.job = ''
      }
      if (!this.editForm.userinfo.path) {
        this.editForm.userinfo.path = ''
      }
      if (!this.editForm.email) {
        this.editForm.email = ''
      }
      // console.log(id + '参数（工作）： ' + this.editForm.userinfo.job + '参数（地址） ' + this.editForm.userinfo.path + '参数（性别） ' + this.editForm.userinfo.sex + '参数（邮箱） ' + this.editForm.email)
      userEdit(
        id,
        this.editForm.userinfo.job,
        this.editForm.userinfo.path,
        this.editForm.userinfo.sex,
        this.editForm.email
      ).then(response => {
        // console.log(response.data)
        if (response.code !== 20000) {
          return this.$message.error(this.meta.msg)
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success('更新成功')
      })
      // this.$refs.editFormRef.validate(async valid => {
      //   if (!valid) return
      //   // 发起修改用户信息的数据请求
      //   const { data: res } = await this.$http.put(
      //     'users/' + this.editForm.id,
      //     {
      //       email: this.editForm.email,
      //       mobile: this.editForm.mobile
      //     }
      //   )
      // })
    },
    // 根据id删除对应的用户信息
    async removeUserById(id) {
      // 弹框提示用户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // 发送删除请求
      userDelete(id).then(res => {
        if (res.code !== 20000) {
          this.$message.error('删除失败')
        }
        this.$message.success('删除成功')
        this.getUserList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  // border: 1px solid red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  // border: 1px solid red;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  // border: 1px solid red;
  // margin-left: 50%;
}
.imageUrl {
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid red;
}
.avatar-uploader {
  width: 182px;
  height: 182px;
  // border: 1px solid red;
  margin-left: -15%;
}
</style>
