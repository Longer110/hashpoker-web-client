<template>
  <div ref="bar" style="width: 500px; height: 300px"></div>
</template>

<script setup>
  import * as echarts from 'echarts'
  import { ref, onMounted, nextTick } from 'vue'
  const bar = ref(null)
  const props = defineProps({
    /****
     * 数据格式
     * {
      topTitle: '2015-10-27 - 2015-10-30 ',
      xTitle: '盈利额度',
      yTitle: '人数',
      color: 'red',
      data: [
        { title: 'Mon', value: 120 }
      ]
    }
     * ****/
    data: {
      type: Object,
      default: () => {}
    }
  })

  onMounted(() => {
    nextTick(() => {
      setEchart()
    })
  })

  // 渲染echart
  const setEchart = () => {
    let xData = []
    let YData = []
    if (props.data && props.data.data) {
      for (let index = 0; index < props.data.data.length; index++) {
        const item = props.data.data[index]
        xData.push(item.title)
        YData.push({ value: item.value, label: { show: true, position: 'top', color: props.data.color } })
      }
    }

    let myChart = echarts.init(bar.value)
    let option = {
      title: {
        text: '',
        subtext: props.data.topTitle,
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: xData,
        name: props.data.xTitle,
        nameGap: -25,
        nameLocation: 'middle',
        nameTextStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          padding: [50, 0, 0, 420]
        },
        axisLine: {
          symbol: ['none', 'arrow'],
          symbolOffset: [0, 10],
          lineStyle: {
            color: '#333',
            width: 1.5
          }
        },
        axisLabel: {
          interval: 0, //强制文字产生间隔
          // rotate: 45, //文字逆时针旋转45°
          textStyle: {
            //文字样式
            color: '#333',
            fontSize: 12,
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: props.data.yTitle,
        nameTextStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        axisLine: {
          show: true,
          symbol: ['none', 'arrow'],
          symbolOffset: [0, 10],
          lineStyle: {
            color: '#333',
            width: 1.5
          }
        }
      },
      series: [
        {
          data: YData,
          type: 'bar',
          barMaxWidth: 50
        }
      ],
      color: props.data.color
    }

    option && myChart.setOption(option)
  }
</script>

<style scoped lang="scss">
  .pei-chart {
    display: flex;
    align-items: center;
  }
</style>
