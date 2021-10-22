<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import { lineChartDataGet } from '@/api/test'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

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
      xAxisData: null,
      seriesData: {
        pageA: null,
        pageB: null,
        pageC: null
      }
    }
  },
  mounted() {
    this.getLineChartData()
    // this.$nextTick(() => {
    //   this.initChart()
    // })
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
      lineChartDataGet().then(response => {
        // xAxisData数据
        this.xAxisData = response.data.barChartData.xAxisData
        // pageA数据
        this.seriesData.pageA = response.data.barChartData.seriesData.pageA
        // pageB数据
        this.seriesData.pageB = response.data.barChartData.seriesData.pageB
        // pageC数据
        this.seriesData.pageC = response.data.barChartData.seriesData.pageC
        this.initChart()
        console.log(response.data.barChartData)
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
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '新增用户',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.seriesData.pageA,
            animationDuration
          },
          {
            name: '新增文章',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.seriesData.pageB,
            animationDuration
          },
          {
            name: 'pageC',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.seriesData.pageC,
            animationDuration
          }
        ]
      })
    }
  }
}
</script>
