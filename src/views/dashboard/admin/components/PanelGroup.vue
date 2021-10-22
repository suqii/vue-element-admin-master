<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <panel-lottie
          :animation-data-path="animationDataPath10"
          :h="100"
          :w="100"
          :autoplay="false"
          :class-name="1"
          :loop="true"
          :title="'新增用户'"
          :number="cardNumber.newVisitisNumber"
        />
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <panel-lottie
          :animation-data-path="animationDataPath6"
          :h="100"
          :w="100"
          :autoplay="false"
          :class-name="1"
          :loop="true"
          :title="'新增文章'"
          :number="cardNumber.messagesNumber"
        />
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <panel-lottie
          :animation-data-path="animationDataPath1"
          :h="100"
          :w="100"
          :autoplay="false"
          :class-name="1"
          :loop="true"
          :title="'话题'"
          :number="cardNumber.purchasesNumber"
        />
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <panel-lottie
          :animation-data-path="animationDataPath2"
          :h="100"
          :w="100"
          :autoplay="false"
          :class-name="1"
          :loop="true"
          :title="'分类'"
          :number="cardNumber.shoppingsNumber"
        />
      </div>
    </el-col>
    <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Messages
          </div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col> -->
    <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Purchases
          </div>
          <count-to
            :start-val="0"
            :end-val="9280"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col> -->
    <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Shoppings
          </div>
          <count-to
            :start-val="0"
            :end-val="13600"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col> -->
  </el-row>
</template>

<script>
// import CountTo from 'vue-count-to'
import { lineChartDataGet } from '@/api/test'
import panelLottie from '../../../../components/lottie/panelLottie.vue'
export default {
  components: {
    // CountTo,
    panelLottie
  },
  data() {
    return {
      // 导入lottie动画json
      animationDataPath1: require('../../../../assets/lottie_json/design.json'),
      animationDataPath2: require('../../../../assets/lottie_json/education.json'),
      animationDataPath3: require('../../../../assets/lottie_json/landing-page.json'),
      animationDataPath4: require('../../../../assets/lottie_json/marketing.json'),
      animationDataPath5: require('../../../../assets/lottie_json/people-around-the-world.json'),
      animationDataPath6: require('../../../../assets/lottie_json/writting.json'),
      animationDataPath7: require('../../../../assets/lottie_json/compass.json'),
      animationDataPath8: require('../../../../assets/lottie_json/message.json'),
      animationDataPath9: require('../../../../assets/lottie_json/people.json'),
      animationDataPath10: require('../../../../assets/lottie_json/persons.json'),
      cardNumber: {
        newVisitisNumber: 0,
        messagesNumber: 0,
        purchasesNumber: 0,
        shoppingsNumber: 999
      }
    }
  },
  created() {
    this.getLineChartData()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getLineChartData() {
      lineChartDataGet().then(response => {
        // console.log(response.data.PostData.totalNum)
        // 新增用户数
        this.cardNumber.newVisitisNumber = response.data.UserData.totalNum
        // 新增文章数
        this.cardNumber.messagesNumber = response.data.PostData.totalNum
        // 话题数
        this.cardNumber.purchasesNumber = response.data.TopicData.totalNum
        // console.log(this.cardNumber)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    // border: 1px red solid;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .card-panel {
        transition: transform 0.5s;
        transform: translateY(-5px);
        box-shadow: 0 1px 18px rgba(0, 0, 0, 0.1),
          0 5px 30px rgba(0, 0, 0, 0.09);
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.card-panel:hover {
  transition: transform 0.5s;
  transform: translateY(-5px);
  box-shadow: 0 1px 18px rgba(0, 0, 0, 0.1), 0 5px 30px rgba(0, 0, 0, 0.09);
}

.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
}

.admin-about {
  padding: 32px;
  background-color: rgba(240, 242, 245, 1);
}

.lottie {
  height: 100%;
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
