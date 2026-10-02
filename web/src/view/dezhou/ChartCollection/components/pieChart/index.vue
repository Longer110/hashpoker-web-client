<template>
  <div>
    <div class="pei-chart">
      <div>
        <div ref="pie" style="width: 300px; height: 300px" />
        <p class="bottomTitle">{{ data.timeRange }}</p>
      </div>

      <div class="right" v-if="data.rightList && data.rightList.length > 0">
        <p v-for="item in data.rightList" :key="item.title">
          {{ item.title }}：<span>{{ item.value }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts'
  import { ref, onMounted, nextTick } from 'vue'
  const pie = ref(null)
  const pieBackGroundColors = ['#fb6666', '#f0d4c8', '#169bd5', '#16d519', '#a2c36c', '##f0d4c8']
  const props = defineProps({
    /****
     * 数据格式
     * [
      {
        title: '长牌抽水',
        value: 280,
        subTitle: '20%',
        subColor: '#524df2'
      }
    ]
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
    // 饼图
    let myChartPie = echarts.init(pie.value)

    // 组装 data数据
    let data = []
    for (let index = 0; index < props.data.data.length; index++) {
      const item = props.data.data[index]
      data.push({
        value: item.value,
        label: {
          formatter: [`{a|${item.title}}`, `{b|${item.subTitle}}`].join('\n'),
          rich: {
            a: {
              color: '#333',
              lineHeight: 20,
              fontSize: 15,
              fontWeight: 'bold'
            },
            b: {
              color: item.subColor ? item.subColor : '#333',
              lineHeight: 15,
              fontSize: 16,
              fontWeight: 'bold'
            }
          }
        },
        itemStyle: {
          color: pieBackGroundColors[index]
        }
      })
    }

    // echart所需数据
    let optionPie = {
      title: {
        text: props.data.title,
        subtext: ' ',
        left: 'center'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: data,
          label: {
            position: 'inner'
          },
          labelLine: {
            show: false
          }
        }
      ]
    }

    optionPie && myChartPie.setOption(optionPie)
  }
</script>

<style scoped lang="scss">
  .pei-chart {
    display: flex;
    align-items: center;
    p {
      line-height: 25px;
      font-size: 18px;
      font-weight: bold;
      span {
        color: #f40000;
      }
    }

    .bottomTitle {
      text-align: center;
      font-size: 15px;
      font-weight: normal !important;
      margin-top: -40px;
    }
  }
</style>
