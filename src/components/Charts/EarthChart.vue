<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>
<script>
// import 'jquery'
import $ from 'jquery'
import population_data from './earthData/data-1573131280684-B3_8BYdo.json'
import { charts } from '@/api/test'
import * as echarts from 'echarts'
import 'echarts-gl'
import resize from './mixins/resize'

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
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      population: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
    this.population = population_data
    // console.log(this.population)
  },
  methods: {
    getChartsData() {
      charts().then(response => {
        console.log(response.data.wordCloud)
        this.wordCloudData = response.data.wordCloud
        this.initChart()
      })
    },
    initChart() {
      const _this = this
      this.chart = echarts.init(document.getElementById(this.id))
      var population_data = '../earthData/data-1573131280684-B3_8BYdo.json'
      // console.log(_this.population)
      // console.log(_this.population)
      // console.log('获取数据a')
      $.getJSON(population_data, function(data) {
        // console.log('获取数据b')
        data = data
          .filter(function(dataItem) {
            return dataItem[2] > 0
          })
          .map(function(dataItem) {
            return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])]
          })
        console.log(data)
        const canvas = document.createElement('canvas')
        const mapChart = echarts.init(canvas, null, {
          width: 4096,
          height: 2048
        })

        // 世界人口分布气泡图
        _this.chart.setOption({
          // backgroundColor: '#333',
          title: {
            text: '世界景点热度图',
            subtext: '趣寻-freedFind',
            sublink:
              'https://www.echartsjs.com/examples/data-gl/asset/data/population.json',
            top: 10, //  与顶部的距离
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: 60,
            type: 'continuous',
            seriesIndex: 0,
            inRange: {
              symbolSize: [1.0, 10.0]
            }
          },
          globe: {
            baseTexture: '../earthData/data-1565167424629-_VRUzTZn2.jpg', // 底图
            heightTexture: '../earthData/data-1491889019097-rJQYikcpl.jpg', // 纹理（高度）贴图
            // heightTexture: '../earthData/data-1573130275525-nUJPfdWG.jpg',  // 纹理（高度）贴图
            displacementScale: 0.04,
            displacementQuality: 'high',
            globeOuterRadius: 120, // 数据半径（数据值 与 地心的距离）
            // baseColor: '#000',           // 地表颜色
            shading: 'realistic',
            environment: '../earthData/data-1491837999815-H1_44Qtal.jpg',
            realisticMaterial: {
              roughness: 0.9
              // metalness: 0
            },
            postEffect: {
              enable: true
              // depthOfField: {                              // 景深（模糊处理）
              //     focalRange: 15,
              //     enable: true,
              //     focalDistance: 100
              // }
            },
            temporalSuperSampling: {
              enable: true
            },
            light: {
              main: {
                color: '#fff', // 光照颜色
                intensity: 1.2, // 光照强度
                shadow: false // 是否显示纹理的阴影
              }
              // ambientCubemap: { // 背景光照调节
              //     // texture: ROOT_PATH + 'data-gl/asset/pisa.hdr',
              //     // exposure: 1,
              //     // specularIntensity: 2,
              //     diffuseIntensity: 0.2
              // }
            },
            viewControl: {
              projection: 'perspective',
              alpha: 90,
              beta: 0,
              center: [0, 0, 0], // 距离地轴的位置[左、上、右]
              targetCoord: [120, 38], // 旋转的水平面的起点坐标
              autoRotate: true,
              autoRotateAfterStill: 20, // 暂停20秒后会自动旋转
              distance: 200 // 视距
            },
            layers: [
              {
                type: 'blend',
                texture: mapChart
              }
            ]
          },
          series: {
            type: 'scatter3D', // 可视化类型
            coordinateSystem: 'globe', // 坐标系统
            blendMode: 'lighter',
            symbolSize: 2,
            itemStyle: {
              // color: 'rgb(255,255, 255)',
              color: 'rgb(138,138,0)', // 数据颜色
              opacity: 1
            },
            data: data
            // data: []
          }
        })
      })
    }
  }
}
</script>
