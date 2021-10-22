<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import { charData } from '@/api/test'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      indicatorData: null,
      legendData: null,
      seriesData: null
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initChart()
    // })
    this.getLineChartData()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getLineChartData() {
      charData().then(response => {
        // indicatorData数据
        this.indicatorData = response.data.raddarChartData.indicatorData
        // number数据
        this.seriesData = response.data.raddarChartData.seriesData
        // 注释块数据
        this.legendData = response.data.raddarChartData.legendData
        this.initChart()
        console.log(response.data.raddarChartData)
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: this.indicatorData
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.legendData
        },
        series: [
          {
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              }
            },
            data: this.seriesData,
            animationDuration: animationDuration
          }
        ]
      })
    }
  }
}
</script>
