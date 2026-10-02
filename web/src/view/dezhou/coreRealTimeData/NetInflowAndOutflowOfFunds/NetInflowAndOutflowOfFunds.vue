<template>
  <!-- 资金净流入流出 -->
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup>
  import { ref, onMounted, watch, onUnmounted } from 'vue'
  import { init, use } from 'echarts/core'
  import { BarChart } from 'echarts/charts'
  import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'

  use([BarChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer])

  // 定义Props（默认值直接用你的数据）
  const props = defineProps({
    width: { type: String, default: '100%' },
    height: { type: String, default: '450px' },
    barWidth: { type: [String, Number], default: 35 }
  })

  // 你的数据（和示例图完全一致）
  const chartData = {
    xAxisData: ['10月21日', '10月22日', '10月23日', '10月24日', '10月25日', '10月26日', '10月27日'],
    inflowData: [10000, 10000, 10000, 10000, 10000, 10000, 10000], // 流入（红色）
    outflowData: [-8000, -8000, -7500, -8000, -15000, -7500, -15000], // 流出（绿色）
    netFlowData: [2000, 2000, 2500, 2000, -5000, 2500, -5000] // 净流入（橙色）
  }

  const chartRef = ref(null)
  let chartInstance = null

  const initChart = () => {
    if (!chartRef.value) return
    if (chartInstance) chartInstance.dispose()

    chartInstance = init(chartRef.value)
    const option = {
      title: {
        text: '资金',
        left: '10px',
        top: '10px'
      },
      // 顶部合计图例（和示例图一致）
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: '20px',
            style: { text: '流入: 70000', fill: '#c23531', fontSize: 14 }
          },
          {
            type: 'text',
            left: 'center',
            top: '45px',
            style: { text: '流出: 69000', fill: '#2f4554', fontSize: 14 }
          },
          {
            type: 'text',
            left: 'center',
            top: '70px',
            style: { text: '净流入流出: 1000', fill: '#61a0a8', fontSize: 14 }
          },
          {
            type: 'text',
            left: 'center',
            top: '95px',
            style: { text: '2025-10-21 00:00:00 - 2025-10-27 23:59:59', fill: '#666', fontSize: 12 }
          }
        ]
      },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '120px', containLabel: true },
      xAxis: {
        type: 'category',
        data: chartData.xAxisData,
        axisLine: { lineStyle: { color: '#ccc' } }
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#ccc' } },
        min: -16000, // 适配流出最大值-15000
        max: 16000 // 适配流入最大值10000
      },
      series: [
        // 流入（红色，顶部）
        {
          name: '流入',
          type: 'bar',
          barWidth: props.barWidth,
          data: chartData.inflowData,
          itemStyle: { color: '#c23531' }, // 示例图红色
          label: { show: true, position: 'top', formatter: '{c}' }
        },
        // 流出（绿色，底部）
        {
          name: '流出',
          type: 'bar',
          barWidth: props.barWidth,
          data: chartData.outflowData,
          itemStyle: { color: '#2f4554' }, // 示例图绿色
          label: { show: true, position: 'bottom', formatter: '{c}' }
        },
        // 净流入（橙色，中间）
        {
          name: '净流入流出',
          type: 'bar',
          barWidth: props.barWidth,
          data: chartData.netFlowData,
          itemStyle: { color: '#61a0a8' }, // 示例图橙色
          label: { show: true, position: 'top', formatter: '{c}' }
        }
      ]
    }
    chartInstance.setOption(option)
  }

  // 自适应+生命周期
  const resizeChart = () => chartInstance?.resize()
  onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })
  watch([() => props.width, () => props.height], initChart)
  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    chartInstance?.dispose()
  })
</script>

<style scoped>
  .chart-container {
    width: v-bind(width);
    height: v-bind(height);
  }
</style>
