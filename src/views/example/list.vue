<template>
  <div class="app-container">
    <div class="wrapper">
      <div class="select">
        <p style="padding-right:10px;">按分类选择话题 </p>
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
      >新增话题</el-button>
    </div>
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
        label-width="70px"
      >
        <el-form-item label="分类" prop="topic_class_id">
          <el-select v-model="addForm.topic_class_id" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="话题" prop="title">
          <el-input v-model="addForm.title" />
        </el-form-item>
        <el-form-item label="封面" prop="titlepic">
          <el-input v-model="addForm.titlepic" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="addForm.desc" />
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
          <img :src="editForm.titlepic" class="avatar">
        </el-form-item>
        <el-form-item label="话题" prop="title">
          <el-input v-model="editForm.title" />
        </el-form-item>
        <el-form-item label="封面" prop="titlepic">
          <el-input v-model="editForm.titlepic" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="editForm.desc" />
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

      <el-table-column width="150px" label="话题">
        <template slot-scope="{row}">
          <router-link :to="'/example/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="封面">
        <template slot-scope="scope">
          <div
            :style="
              'height:60px; width:60px;border-radius: 8px; border:1px gray solid;background: url(' +
                (scope.row.titlepic == null
                  ? scope.row.titlepic
                  : scope.row.titlepic.replace(/\\/g, '/')) +
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

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column> -->

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="240">
        <template slot-scope="scope">

          <el-button type="primary" size="small" icon="el-icon-edit" @click="showEditDialog(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="topicDelete(scope.row.id)">
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
import { getTopicClassList, getTopicList, topicDelete, topicAdd, topicEdit } from '@/api/article'
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
      editForm: {},
      total: 0,
      listLoading: true,
      // 控制添加用户对话框显示与隐藏
      addDialogVisible: false,
      options: [],
      value: '',
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList(1)
    this.getTopicClassList()
    this.addForm.titlepic = 'http://suqiqi.oss-cn-beijing.aliyuncs.com/freeFind/5.png'
  },
  methods: {
    // 编辑话题
    showEditDialog(row) {
      // console.log(row.desc)
      this.editForm.desc = row.desc
      this.editForm.titlepic = row.titlepic
      this.editForm.title = row.title
      this.editDialogVisible = true
    },
    // 提交编辑话题
    editUserInfo(row) {
      // console.log(row)
      topicEdit(row.id, row.title, row.titlepic, row.desc).then(response => {
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
    // 获取所有分类
    getTopicClassList() {
      const _this = this
      var optionItem = {}
      getTopicClassList().then(response => {
        response.data.list.forEach(row => {
          optionItem = {}
          optionItem.value = row.id
          optionItem.label = row.classname
          _this.options.push(optionItem)
        })
        _this.value = _this.options[0].value
      })
    },
    // 话题删除
    async topicDelete(id) {
      // 弹框提示用户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该分类, 是否继续?',
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
      topicDelete(id).then(res => {
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
      topicAdd(this.addForm.desc, this.addForm.title, this.addForm.titlepic, this.addForm.topic_class_id, 1).then(response => {
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
      getTopicList(id).then(response => {
        this.list = response.data.list
        // console.log(this.list)
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
