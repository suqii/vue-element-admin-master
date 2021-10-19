<template>
  <div class="app-container">
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in freeFindLog"
          :key="index"
          :timestamp="item.time"
          placement="top"
        >
          <el-card>
            <h4 v-if="item.methed == 'fix'" style="color:red;">修复</h4>
            <h4 v-if="item.methed == 'feat'" style="color:red;">新功能</h4>
            <h4 v-if="item.methed == 'docs'" style="color:red;">文档</h4>
            <h4 v-if="item.methed == 'style'" style="color:red;">格式</h4>
            <h4 v-if="item.methed == 'refactor'" style="color:red;">重构</h4>
            <h4 v-if="item.methed == 'test'" style="color:red;">增加测试</h4>
            <h4 v-if="item.methed == 'chore'" style="color:red;">构建过程或辅助工具的变动</h4>
            <h4>{{ item.con }}</h4>
            <p>{{ item.user }} 提交于 {{ item.time }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
// import { fetchList, getTopicList } from '@/api/article'
import { getGitLog } from '@/api/article'

export default {
  name: 'ArticleList',
  components: { },
  data() {
    return {
      freeFindLog: [],
      logParm: {},
      freeFindTxt: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取数据
    getList() {
      getGitLog().then(response => {
        this.freeFindTxt = response.data.freeFind_api_log
        // console.log(this.freeFindTxt)
        var matchTime = /[(](.*)[)]/
        var matchCon = /["|'](.*)["|']/
        var matchMethed = /[)](.*)[:]/
        var matchUser = /[{](.*)[}]/
        const code = this.freeFindTxt.split(/[\r\n]+/)
        code.forEach((item, index) => {
          this.logParm = {}
          if (!item) {
            code.splice(index, 1)
          }
          this.logParm.methed = item.match(matchMethed)[1].trim()
          this.logParm.time = item.match(matchTime)[1]
          this.logParm.con = item.match(matchCon)[1].trim()
          this.logParm.user = item.match(matchUser)[1].trim()
          // console.log(this.logParm)
          this.freeFindLog.push(this.logParm)
        })
        // console.log(this.freeFindLog)
      })
    }
  }
}
</script>

<style scoped>

</style>
