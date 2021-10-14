<template>
  <div class="user-activity">
    <div
      v-for="(item, index) in data1"
      :key="index"
      class="post"
    >
      <div class="user-block">
        <img class="img-circle" :src="item.img+avatarPrefix">
        <span class="username">{{ item.username }}</span>
        <span class="description">{{ item.time }}</span>
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
        <li><span class="link-black text-sm"><i class="el-icon-star-off" /> 喜欢 {{ item.like_num }}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'
import { getUserPostList } from '@/api/article'
export default {
  data() {
    return {
      // 动态数据
      data1: [],
      dataParm: {},
      imagesList: [],
      data: [
        {
          username: '用户名',
          img: 'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg',
          time: 'Posted 4 photos - 2 days ago',
          content: ' Lorem ipsum represents a long-held tradition for designers,',
          carouselImages: null
        },
        {
          username: '用户名',
          img: 'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg',
          time: '时间',
          content: '我是文案',
          carouselImages: [
            'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
            'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
            'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
            'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
          ]
        }
      ],
      avatarPrefix,
      carouselPrefix
    }
  },
  created() {
    this.getUserPostList(402)
  },
  methods: {
    // 获取指定用户动态列表
    getUserPostList(user_id) {
      getUserPostList(user_id).then(response => {
        console.log(response.data.data)
        response.data.data.forEach(row => {
          this.dataParm = {}
          // this.imagesList = {}
          this.dataParm.username = row.user.username
          this.dataParm.dislike_num = row.cai_count
          this.dataParm.share_num = row.sharenum
          this.dataParm.comment_num = row.comment_count
          this.dataParm.like_num = row.ding_count
          this.dataParm.img = row.user.userpic
          this.dataParm.time = row.create_time
          this.dataParm.content = row.content
          this.dataParm.carouselImages = row.images
          this.data1.push(this.dataParm)
        })
        console.log(this.data1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
      width: 100%;
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
