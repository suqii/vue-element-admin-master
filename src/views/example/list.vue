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
        @click="addTopic"
      >新增话题</el-button>
    </div>
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

          <el-button type="primary" size="small" icon="el-icon-edit">
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
import { getTopicClassList, getTopicList, topicDelete } from '@/api/article'
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
      total: 0,
      listLoading: true,
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
  },
  methods: {
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
        this.getList()
      })
    },
    // 话题添加
    addTopic() {
      console.log('添加话题')
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
</style>
