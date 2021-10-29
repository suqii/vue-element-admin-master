<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="10"><div class="grid-content bg-purple" />
        <h2 style="text-align: center;">后台日志</h2>
        <div class="block">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in vueElAdLog"
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
      </el-col>
      <el-col :span="10"><div class="grid-content bg-purple" />
        <h2 style="text-align: center;">接口日志</h2>
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
        </div></el-col>
    </el-row>

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
      logParm: {},
      freeFindLog: [],
      freeFindTxt: null,
      vueElAdLog: [],
      vueElAdTxt: null
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
        this.vueElAdTxt = response.data.vue_element_admin_log
        // console.log(this.freeFindTxt)
        var matchTime = /[(](.*)[)]/
        var matchCon = /["|'|“](.*)["|'|”]/
        var matchMethed = /[)](.*)[:|"]/
        var matchUser = /[{](.*)[}]/
        const freeFindCode = this.freeFindTxt.split(/[\r\n]+/)
        const vueElAdCode = this.vueElAdTxt.split(/[\r\n]+/)
        // 接口日志
        freeFindCode.forEach((item, index) => {
          this.logParm = {}
          if (!item) {
            freeFindCode.splice(index, 1)
          }
          this.logParm.methed = item.match(matchMethed)[1].trim()
          this.logParm.time = item.match(matchTime)[1]
          this.logParm.con = item.match(matchCon)[1].trim()
          this.logParm.user = item.match(matchUser)[1].trim()
          this.freeFindLog.push(this.logParm)
        })
        // 后台日志
        vueElAdCode.forEach((item, index) => {
          this.logParm = {}
          if (!item) {
            vueElAdCode.splice(index, 1)
          }
          this.logParm.methed = item.match(matchMethed)[1].trim()
          this.logParm.time = item.match(matchTime)[1]
          this.logParm.con = item.match(matchCon)[1].trim()
          this.logParm.user = item.match(matchUser)[1].trim()
          this.vueElAdLog.push(this.logParm)
        })
        // console.log(this.freeFindLog)
      })
    }
  }
}
</script>

<style scoped>

</style>
