<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="新增用户" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.username }}
      </template>
    </el-table-column>
    <el-table-column label="创建时间" width="195" align="center">
      <template slot-scope="scope"> {{ scope.row.createAt | parseTime('{y}-{m}-{d} {h}:{i}') }} </template>
    </el-table-column>
    <el-table-column label="性别" width="100" align="center">
      <template slot-scope="{ row }">
        <el-tag :type="row.status | statusFilter">

          <div v-if="row.status" class="el-icon-user" />
          <div v-else class="el-icon-user" />
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import { test } from '@/api/remote-search'
// import { newUserList } from '@/api/test'
import {
  newUser
} from '@/api/user'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '',
        2: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // fetchData() {
    //   transactionList().then(response => {
    //     this.list = response.data.items.slice(0, 8)
    //   })
    // }
    fetchData() {
      // newUserList().then(response => {
      //   this.list = response.data.list.slice(0, 8)
      //   console.log(response.data)
      // })
      newUser().then(response => {
        // console.log(response.data.newUserList)
        this.list = response.data.newUserList.slice(0, 8)
      })
    }
  }
}
</script>
