<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import { wordCloudCount } from '@/api/test'
import * as echarts from 'echarts'
import resize from './mixins/resize'
import 'echarts-wordcloud/dist/echarts-wordcloud'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    // data: {
    //   type: Array,
    //   // eslint-disable-next-line vue/require-valid-default-prop
    //   default: []
    // },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      cloudCountTxt: null,
      cloudCountParm: {},
      wordCloudData: [
      ]
    }
  },
  mounted() {
    // this.initChart()
    this.getChartsData()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getChartsData() {
      wordCloudCount().then(response => {
        // console.log(response.data.wordCloud)
        this.cloudCountTxt = response.data.wordCloud
        var matchName = /[{](.*)[}]/
        var matchValue = /[(](.*)[)]/
        const cloudCountCode = this.cloudCountTxt.split(/[\r\n]+/)
        // console.log(cloudCountCode)
        // 接口日志
        cloudCountCode.slice(0, cloudCountCode.length - 1).forEach((item, index) => {
          this.cloudCountParm = {}
          if (!item) {
            cloudCountCode.splice(index, 1)
          }
          this.cloudCountParm.value = item.match(matchValue)[1]
          this.cloudCountParm.name = item.match(matchName)[1]
          this.wordCloudData.push(this.cloudCountParm)
          // console.log(this.cloudCountParm)
        })
        // this.wordCloudData = response.data.wordCloud
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const option = {
        title: {
          text: this.title,
          x: 'center'
        },
        backgroundColor: '#fff',
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: 'wordCloud',
            // 用来调整词之间的距离
            gridSize: 20,
            // 用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [20, 100],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            // 用来调整词的旋转方向，，[0,0]--表明着没有角度，也就是词为水平方向，须要设置角度参考注释内容
            rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            // rotationRange: [0, 0],
            // 随机生成字体颜色
            // maskImage: '../../assets/wordcloud/',
            textStyle: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              // Color can be a callback function or a color string
              color: function() {
                // Random color
                return 'rgb(' + [
                  Math.round(Math.random() * 255),
                  Math.round(Math.random() * 255),
                  Math.round(Math.random() * 255)
                ].join(',') + ')'
              }
            },
            // 位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '200%',
            height: '200%',
            // 数据
            data: this.wordCloudData
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.chartsClass {
  padding-left: 1.2rem;
}
</style>
