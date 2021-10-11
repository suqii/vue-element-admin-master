<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="用户" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.username }}
      </template>
    </el-table-column>
    <el-table-column label="创建时间" width="195" align="center">
      <template slot-scope="scope"> {{ scope.row.createAt }} </template>
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
    // 时间戳转换
    transitionTime(time) {
      // 时间戳转换
      // 获得当前运行环境时间
      let data
      // eslint-disable-next-line eqeqeq
      if (time.toString().length != 13) {
        data = time * 1000
      } else {
        data = time
      }
      const nowData = new Date(data)
      // 算得时区
      var time_zone = -nowData.getTimezoneOffset() / 60
      if (time_zone < 0) {
        // 西区 西区应该用时区绝对值加京八区
        time_zone = Math.abs(time_zone) + 8
        data = data + time_zone * 60 * 60 * 1000
      } else {
        time_zone -= 8
        data = data - time_zone * 60 * 60 * 1000
      }
      const now = new Date(data)
      const year = now.getFullYear() // 年
      const month = now.getMonth() + 1 // 月
      const day = now.getDate() // 日
      let clock = year + '-'
      if (month < 10) {
        clock += '0'
      }
      clock += month + '-'
      if (day < 10) {
        clock += '0'
      }
      clock += day + ' '
      // eslint-disable-next-line eqeqeq
      if (time.toString().length == 13) {
        const hh = now.getHours() // 时
        const mm = now.getMinutes() // 分
        const ss = now.getSeconds() // 秒
        if (hh < 10) {
          clock += '0'
        }
        clock += hh + ':'
        if (mm < 10) clock += '0'
        clock += mm + ':'
        if (ss < 10) clock += '0'
        clock += ss
      }
      return clock
    },
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
        this.list.forEach((row) => {
          // console.log(row.status)
          // console.log(this.transitionTime(row.create_time))
          row.createAt = this.transitionTime(row.createAt)
        })
      })
    }
  }
}
</script>
