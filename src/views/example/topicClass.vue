<template>
  <div class="app-container">
    <div class="wrapper">
      <p>权限列表</p>
      <el-button
        type="primary"
        size="medium"
        @click="addTopicClass"
      >新增分类</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.classname }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          <!-- <span>{{ scope.row.create_time }}</span> -->
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="260">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="topicClassDelete(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分类增加 -->
    <el-dialog
      title="新增分类"
      :append-to-body="true"
      :visible.sync="dialogjurisdiction"
      width="40%"
    >
      <el-form
        ref="jurisdictionAdd"
        :model="jurisdictionAdd"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="classname">
          <el-input v-model="jurisdictionAdd.classname" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="jurisdictionAdd.status" />
        </el-form-item>
        <el-form-item>
          <div class="align">
            <el-button
              type="primary"
              @click="aTopicClass()"
            >确认</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分类编辑 -->
    <el-dialog
      title="分类编辑"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        ref="jurisdictionEditor"
        :model="jurisdictionEditor"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="jurisdictionEditor.classname" />
        </el-form-item>
        <el-form-item label="分类ID" prop="idCode">
          <el-input v-model="jurisdictionEditor.id" disabled />
        </el-form-item>
        <el-form-item>
          <div class="align">
            <el-button
              type="primary"
              @click="editoraffirm('jurisdictionEditor')"
            >确认</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getTopicClassList, topicClassEdit, topicClassAdd, topicClassDelete } from '@/api/article'
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
      dialogVisible: false,
      dialogjurisdiction: false,
      jurisdictionAdd: {},
      jurisdictionID: '',
      jurisdictionName: '',
      jurisdictionEditor: {},
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleEdit(row) {
      this.jurisdictionEditor = row
      this.dialogVisible = true
    },
    // 分类编辑
    editoraffirm(formName) {
      this.listLoading = true
      topicClassEdit(this.jurisdictionEditor.classname, this.jurisdictionEditor.id).then(response => {
        // eslint-disable-next-line eqeqeq
        if (response.code == 20000) {
          this.$message.success('更新成功')
          this.listLoading = false
          this.dialogVisible = false
        }
      })
    },
    // 分类删除
    async topicClassDelete(id) {
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
      topicClassDelete(id).then(res => {
        if (res.code !== 20000) {
          this.$message.error('删除失败')
        }
        this.$message.success('删除成功')
        this.getList()
      })
    },
    // 新增分类
    aTopicClass() {
      // console.log(this.jurisdictionAdd)
      topicClassAdd(this.jurisdictionAdd.classname, this.jurisdictionAdd.status).then(response => {
        // eslint-disable-next-line eqeqeq
        if (response.code == 20000) {
          this.$message.success('添加成功')
          this.dialogjurisdiction = false
          this.getList()
        }
      })
    },
    addTopicClass() {
      // console.log('新增分类')
      this.dialogjurisdiction = true
    },
    getList() {
      // console.log('获取数据')
      this.listLoading = true
      getTopicClassList().then(response => {
        this.list = response.data.list
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
</style>
