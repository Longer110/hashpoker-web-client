<template>
  <!--
长牌德州VS短牌德州 -->
  <div>
    <!-- 饼状图区域 -->

    <div style="display: flex">
      <pie-chart :data="pieData1" />
      <pie-chart :data="pieData2" />
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue'
  import PieChart from '@/view/dezhou/ChartCollection/components/pieChart/index.vue'

  // 在组件挂载后执行
  onMounted(() => {
    setTimeout(() => {

    }, 3000)
  })

  const pieData1 = ref({}) // 第一个饼状图
  const pieData2 = ref({}) //

  // 柱状图数据

    // 饼状图数据
    pieData1.value = {
      title: '长牌德州VS短牌德州流水',
      timeRange: '2015-10-25 - 2015-10-27',
      data: [
        {
          title: '长牌抽水',
          value: 580,
          subTitle: '70%',
          subColor: '#524df2'
        },
        {
          title: '短牌抽水',
          value: 480,
          subTitle: '30%',
          subColor: '#524df2'
        }
      ]
    }

    pieData2.value = {
      title: '长牌德州VS短牌德州抽水',
      timeRange: '2015-10-27 - 2015-10-30',
      data: [
        {
          title: '长牌抽水',
          value: 280,
          subTitle: '20%',
          subColor: '#524df2'
        },
        {
          title: '短牌抽水',
          value: 480,
          subTitle: '80%',
          subColor: '#524df2'
        }
      ],
      rightList: [
        {
          title: '总抽水：',
          value: '335801U'
        },
        {
          title: '长牌抽水：',
          value: '335801U'
        },
        {
          title: '短牌抽水：',
          value: '335801U'
        }
      ]
    }

</script>
