<template>
  <div class="app-container">
    <div class="wrapper">
      <div class="select">
        <p style="padding-right:10px;">按分类选择轮播图 </p>
        <el-select v-model="value" placeholder="请选择" @change="selectChanged">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button
        type="primary"
        size="medium"
        @click="addDialogVisible = true;addForm.topic_class_id = value;"
      >新增轮播图</el-button>
    </div>
    <!--添加用户的对话框-->
    <el-dialog
      title="添加轮播图"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!--主体区域-->
      <el-form
        ref="addFormRef"
        :model="addForm"
        label-width="70px"
      >
        <el-form-item label="分类" prop="adsensetype">
          <el-select v-model="addForm.adsensetype" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="adsensesrc">
          <el-input v-model="addForm.adsensesrc" />
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改话题对话框-->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        label-width="70px"
      >
        <el-form-item label="" class="imageUrl">
          <img :src="editForm.adsensesrc" class="avatar">
        </el-form-item>
        <el-form-item label="路径" prop="src">
          <el-input v-model="editSrc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editUserInfo(editForm)"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="封面">
        <template slot-scope="scope">
          <div
            :style="
              'height:60px; width:60px;border-radius: 8px; border:1px gray solid;background: url(' +
                (scope.row.src == null
                  ? scope.row.src
                  : scope.row.src.replace(/\\/g, '/')) +
                ') no-repeat; background-size:cover;'
            "
          /></template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          <!-- <span>{{ scope.row.create_time }}</span> -->
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="240">
        <template slot-scope="scope">

          <el-button type="primary" size="small" icon="el-icon-edit" @click="showEditDialog(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="adsenseDelete(scope.row.id)">
            删除
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
// import { fetchList, getTopicList } from '@/api/article'
import { adsenseDelete, adsenseAdd, adsenseEdit, getAdsenseList } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      // 添加用户的表单数据
      addForm: {},
      editDialogVisible: false,
      editForm: {
        adsensesrc: null,
        id: null,
        src: null
      },
      editSrc: null,
      editId: null,
      total: 0,
      listLoading: true,
      // 控制添加用户对话框显示与隐藏
      addDialogVisible: false,
      options: [
        {
          value: '0',
          label: '选项0'
        }, {
          value: '1',
          label: '选项1'
        }
      ],
      value: '0',
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList(0)
    this.addForm.titlepic = 'http://suqiqi.oss-cn-beijing.aliyuncs.com/freeFind/5.png'
  },
  methods: {
    // 编辑话题
    showEditDialog(row) {
      console.log(row)
      this.editSrc = row.src
      this.editForm.adsensesrc = row.src
      this.editId = row.id
      this.editDialogVisible = true
      console.log(this.editForm)
    },
    // 提交编辑话题
    editUserInfo(row) {
      // console.log(row)
      // console.log(this.editForm)
      adsenseEdit(this.editId, this.editSrc).then(response => {
        if (response.code !== 20000) {
          this.$message.error('修改失败')
        }
        this.editDialogVisible = false
        this.$message.success('修改成功')
        this.getList(this.value)
      })
    },
    // 监听添加用户对话框的关闭事件
    async addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.editForm = {}
      this.$refs.editFormRef.resetFields()
    },
    // 选中改变
    selectChanged() {
      this.getList(this.value)
    },

    // 轮播图删除
    async adsenseDelete(id) {
      // 弹框提示用户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该轮播图片, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // 发送删除请求
      adsenseDelete(id).then(res => {
        if (res.code !== 20000) {
          this.$message.error('删除失败')
        }
        this.$message.success('删除成功')
        this.getList(this.value)
      })
    },
    // 话题添加
    addUser() {
      // console.log(this.addForm)
      adsenseAdd(this.addForm.adsensetype, this.addForm.adsensesrc).then(response => {
        if (response.code !== 20000) {
          this.$message.error('添加失败')
        }
        this.addDialogVisible = false
        this.$message.success('添加成功')
        this.getList(this.value)
      })
    },
    // 获取数据
    getList(id) {
      this.listLoading = true
      getAdsenseList(id).then(response => {
        this.list = response.data.list
        // console.log(response.data.list)
        this.total = response.data.list.length
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  box-sizing: border-box;
  align-items: center;
}
.select{
  display: flex;
  justify-content: center;
  align-items: center;
}
.imageUrl img{
  /* background: #000; */
  /* text-align: center; */
  height: 200px;
  margin-right: 60px;
}
.imageUrl{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
