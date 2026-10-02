<template>
  <!-- 改用 ref 绑定 DOM，避免 getElementById 潜在问题 -->
<div>  <div ref="chartRef" :style="{ width: '1500px', height: '550px' }"></div></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted } from "vue";

// 用 ref 绑定图表容器，替代 getElementById（移除 TS 类型声明）
const chartRef = ref(null);
let myChart = null;
const resizeHandler = () => myChart?.resize();

onMounted(() => {
  if (!chartRef.value) return;

  // 初始化图表，指定 canvas 渲染器（减少默认配置冲突）
  myChart = echarts.init(chartRef.value, undefined, { renderer: 'canvas' });

  // 完整配置：完全显式声明 axisLabel，无任何 textStyle 嵌套（移除 TS 类型）
  const option = {
    // 全局文字样式：统一配置，避免各组件默认 textStyle 冲突
    textStyle: {
      fontSize: 12,
      color: '#333',
      fontFamily: 'sans-serif'
    },
    tooltip: {
      trigger: 'axis',
      // tooltip 的 textStyle 是合法的，无需修改
      textStyle: { color: '#333', fontSize: 12 }
    },
    legend: {
      data: ['用户量', '访问量', '下单量'],
      // 图例文字样式直接配置，不嵌套 textStyle
      textStyle: { color: '#333', fontSize: 12 } // legend 的 textStyle 合法
    },
    // X轴：完全显式配置，彻底移除 textStyle 层级
    xAxis: {
      type: 'category',
      data: ["4-3", "4-4", "4-5", "4-6", "4-7", "4-8", "4-9"],
      // 轴线样式
      axisLine: { lineStyle: { color: '#e6e6e6', width: 1 } },
      // 刻度线样式
      axisTick: { lineStyle: { color: '#e6e6e6', width: 1 } },
      // 坐标轴标签：所有样式直接写在 axisLabel 下，无 textStyle
      axisLabel: {
        color: '#333',        // 文字颜色（直接配置，非 textStyle.color）
        fontSize: 12,         // 字体大小（直接配置）
        fontWeight: 'normal', // 字体粗细（直接配置）
        padding: [0, 0, 0, 0] // 内边距（直接配置）
        // 绝对不写 textStyle: {}，哪怕是空对象
      }
    },
    // Y轴：和 X轴 保持一致的显式配置
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#e6e6e6', width: 1 } },
      axisTick: { lineStyle: { color: '#e6e6e6', width: 1 } },
      splitLine: { lineStyle: { color: '#f5f5f5', width: 1 } },
      // Y轴标签：无 textStyle 层级
      axisLabel: {
        color: '#333',
        fontSize: 12,
        formatter: '{value}',
        fontWeight: 'normal'
      }
    },
    series: [
      {
        name: "用户量",
        type: "line",
        data: [8, 15, 31, 13, 15, 22, 11],
        smooth: false,
        symbol: 'none',
        itemStyle: { color: '#409EFF' },
        // 折线数值标签：直接配置样式，无 textStyle
        label: {
          show: true,
          position: 'top',
          color: '#333',       // 直接配置颜色
          fontSize: 12,        // 直接配置字号
          offset: [0, -5],
          hideOverlap: false,
          showAbove: true,
          formatter: '{c}'
        }
      },
      {
        name: "访问量",
        type: "line",
        data: [25, 42, 58, 36, 45, 60, 38],
        smooth: false,
        symbol: 'none',
        itemStyle: { color: '#67C23A' },
        label: {
          show: true,
          position: 'top',
          color: '#333',
          fontSize: 12,
          offset: [0, -5],
          hideOverlap: false,
          showAbove: true,
          formatter: '{c}'
        }
      },
      {
        name: "下单量",
        type: "line",
        data: [5, 12, 28, 10, 18, 25, 9],
        smooth: false,
        symbol: 'none',
        itemStyle: { color: '#F56C6C' },
        label: {
          show: true,
          position: 'top',
          color: '#333',
          fontSize: 12,
          offset: [0, -5],
          hideOverlap: false,
          showAbove: true,
          formatter: '{c}'
        }
      }
    ]
  };

  myChart.setOption(option);
  window.addEventListener('resize', resizeHandler);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
</script>
