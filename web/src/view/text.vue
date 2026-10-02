<template>
  <el-table
    class="sort-el-table"
    row-key="id"
    v-loading="loading"
    :data="btnTableList"
  >
    <!-- table中拖拽排序列 -->
    <el-table-column label="拖拽排序" fixed width="120px" align="center">
      <template #default="scope">
        <el-icon class="sort-icon" style="cursor: pointer">
          <Rank />
        </el-icon>
      </template>
    </el-table-column>
    <el-table-column
      label="按钮文字"
      align="left"
      prop="name"
      min-width="220"
      show-overflow-tooltip
      fixed
    >
    </el-table-column>
  </el-table>
</template>

<script setup>
  import Sortablejs from 'sortablejs' //使用前先安装库
  import { ref, reactive, onMounted, watch, nextTick } from 'vue'

  const btnTableList = ref([
    {
      id: '1',
      name: '文本1',

      address: '链接'
    },
    {
      id: '2',
      name: '文本2',

      address: '链接'
    },
    {
      id: '3',
      name: '文本3',

      address: '链接'
    }
  ])

  watch(
    (v) => {
      // ...省略其他代码...
      nextTick(() => {
        // 进入页面后就开启表格拖拽排序
        const el = document.querySelector(
          '.sort-el-table .el-table__body-wrapper  table tbody'
        ) //  querySelector 方法选取页面上指定的元素。这里的选择器 '.sort-el-table .el-table__body-wrapper  table tbody' 定位到一个表格的 tbody 部分

        // 创建了一个 Sortable.js 实例，将 el 作为容器，用于拖拽排序
        Sortablejs.create(el, {
          animation: 150,
          ghostClass: 'blue-background-class',
          handle: '.sort-icon', // 指定了拖拽手柄的类名，如果需要点击某个图标拖拽的话需要吧那个图标的class写在这里
          onEnd: function (evt) {
            // 拖拽动作结束时触发
            let newIndex = evt.newIndex // 排序后的索引位置
            let oldIndex = evt.oldIndex // 排序前的索引位置
            if (newIndex !== oldIndex) {
              // 如果 newIndex 和 oldIndex 不相等，说明元素的位置发生了变化
              let currRow = btnTableList.value.splice(oldIndex, 1)[0] // 从数组中移除原来位置的元素，并返回被移除的元素obj
              console.log('currRow:', currRow)
              btnTableList.value.splice(newIndex, 0, currRow) // 将被移除的该元素插入到新的位置
            }
          }
        })
      })
    },
    { immediate: true }
  )

  // 提交表格数据（根据表格顺序加index属性）
  function nextStep() {
    btnTableList.value.forEach((item, index) => {
      item.index = index
    })
    console.log('btnTableList', btnTableList.value)
    return
  }
</script>
