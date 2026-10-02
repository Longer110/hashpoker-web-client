<template>
  <div>
    <!-- 柱状图图区域 -->
    <div style="display: flex">
      <bar-chart :data="barData1" />
      <bar-chart :data="barData2" />
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue'

  import BarChart from '@/view/dezhou/ChartCollection/components/barChart/index.vue'
  defineOptions({
    name: 'playerProfit'
  })
  // 在组件挂载后执行
  onMounted(() => {
    setEchart()
  })

  const barData1 = ref({}) //第一个柱状图
  const barData2 = ref({}) //

  // 柱状图数据
  const setEchart = () => {
    barData1.value = {
      topTitle: '2015-10-27 - 2015-10-30 ',
      xTitle: '盈利额度',
      yTitle: '人数',
      color: 'red',
      data: [
        { title: '0<盈利<10', value: 100 },
        { title: '10<盈利<50', value: 90 },
        { title: '50<盈利<100', value: 70 },
        { title: '盈利>100', value: 120 }
      ]
    }

    barData2.value = {
      topTitle: '2015-10-27 - 2015-10-30 ',
      xTitle: '亏损额度',
      yTitle: '人数',
      color: '#65df2e',
      data: [
        { title: '0<盈利<10', value: 120 },
        { title: '10<盈利<50', value: 70 },
        { title: '50<盈利<100', value: 50 },
        { title: '盈利>100', value: 150 }
      ]
    }
  }
</script>

