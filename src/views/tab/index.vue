<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :span="6" :xs="24">
        <el-card style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span>关于分类</span>
          </div>

          <div class="user-profile">
            <el-select v-model="value" placeholder="请选择" @change="selectChanged">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div class="user-bio">
            <div class="user-education user-bio-section">
              <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>分类</span></div>
              <div class="user-bio-section-body">
                <div class="text-muted">
                  天气会很冷吗
                </div>
              </div>
            </div>

            <div class="user-skills user-bio-section">
              <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>技能</span></div>
              <div class="user-bio-section-body">
                <div class="progress-item">
                  <span>Vue</span>
                  <el-progress :percentage="70" />
                </div>
                <div class="progress-item">
                  <span>JavaScript</span>
                  <el-progress :percentage="18" />
                </div>
                <div class="progress-item">
                  <span>Css</span>
                  <el-progress :percentage="12" />
                </div>
                <div class="progress-item">
                  <span>ESLint</span>
                  <el-progress :percentage="100" status="success" />
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="18" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="动态" name="activity" class="user-activity">
              <!-- <activity /> -->
              <div
                v-for="(item, index) in data1"
                :key="index"
                v-loading="listLoading"
                class="post"
              >
                <div class="user-block">
                  <img class="img-circle" :src="item.img">
                  <span class="username">{{ item.username }}</span>
                  <span class="description">{{ item.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  <!-- <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
                </div>
                <!-- 文案 -->
                <p v-if="item.content">
                  {{ item.content }}
                </p>
                <!-- 图片 -->
                <div v-if="item.carouselImages.length " class="user-images">
                  <el-carousel :interval="6000" type="card" height="220px">
                    <!-- eslint-disable-next-line vue/no-template-shadow -->
                    <el-carousel-item v-for="(it, index) in item.carouselImages" :key="index">
                      <!-- <img :src="it+carouselPrefix" class="image"> -->
                      <!-- {{ it }} -->
                      <img :src="(it.url)" class="image">
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <!-- 图标 -->
                <ul class="list-inline">
                  <li><span class="link-black text-sm"><i class="el-icon-share" /> 分享 {{ item.share_num }}</span></li>
                  <li><span class="link-black text-sm"><i class="el-icon-star-on" /> 喜欢 {{ item.like_num }}</span></li>
                  <li><span class="link-black text-sm"><i class="el-icon-star-off" /> 踩 {{ item.dislike_num }}</span></li>
                  <li><span class="link-black text-sm"><i class="el-icon-chat-line-square" /> 评论 {{ item.comment_num }}</span></li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import {
  getuserinfo
} from '@/api/user'
import { getTopicClassList, getPostClassList } from '@/api/article'
export default {
  name: 'UserProfile',
  // eslint-disable-next-line vue/no-unused-components

  data() {
    return {
      data1: [],
      dataParm: {},
      list: null,
      options: [],
      selectId: null,
      listLoading: true,
      total: 0,
      value: '',
      user: {
        name: '',
        email: '',
        avatar: '',
        role: ''
      },
      activeTab: 'activity'
    }
  },
  computed: {
  },
  created() {
    // const id = 402
    // console.log(id)
    // this.getSelectUinfo(id)
    this.getSelectUNews(1)
    this.getTopicClassList()
  },
  methods: {
    selectChanged(value) {
      // console.log(value)
      this.data1 = []
      this.getSelectUNews(value)
    },
    // 获取用户信息
    getSelectUinfo(id) {
      getuserinfo(id).then(response => {
        // console.log(response)
        this.user.name = response.data.username
        this.user.avatar = response.data.userpic == null ? '' : response.data.userpic
      })
    },
    // 获取所有分类
    getTopicClassList() {
      const _this = this
      var optionItem = {}
      getTopicClassList().then(response => {
        // console.log(response.data)
        response.data.list.forEach(row => {
          optionItem = {}
          optionItem.value = row.id
          optionItem.label = row.classname
          _this.options.push(optionItem)
        })
        _this.value = _this.options[0].value
      })
    },
    // 获取动态
    getSelectUNews(id) {
      this.listLoading = true
      getPostClassList(id).then(response => {
        // console.log(response.data.data)
        response.data.list.forEach(row => {
          this.dataParm = {}
          // this.imagesList = {}
          if (row.user) {
            this.dataParm.username = row.user.username
            this.dataParm.img = row.user.userpic
          } else {
            this.dataParm.username = '暂无'
            // this.dataParm.img = row.user.userpic
          }
          this.dataParm.dislike_num = row.cai_count
          this.dataParm.share_num = row.sharenum
          this.dataParm.comment_num = row.comment_count
          this.dataParm.like_num = row.ding_count
          this.dataParm.time = row.create_time
          this.dataParm.content = row.content
          this.dataParm.carouselImages = row.images
          this.data1.push(this.dataParm)
        })
        this.listLoading = false
        // console.log(this.data1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
// 动态
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      // width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>

