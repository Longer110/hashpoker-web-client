<template>
  <div class="table-skeleton-wrapper">
    <transition name="fade" mode="out-in">
      <el-skeleton v-if="loading" :animated="animated">
        <template #template>
          <div class="table-skeleton">
            <div v-if="showSearch" class="table-skeleton__search">
              <div class="table-skeleton__search-fields">
                <el-skeleton-item
                  v-for="index in searchFieldCount"
                  :key="`search-field-${index}`"
                  variant="text"
                  class="table-skeleton__search-field"
                />
              </div>
              <div class="table-skeleton__search-actions">
                <el-skeleton-item
                  v-for="index in searchButtonCount"
                  :key="`search-btn-${index}`"
                  variant="button"
                  class="table-skeleton__search-button"
                />
              </div>
            </div>
            <div class="table-skeleton__table">
              <div v-if="showToolbar" class="table-skeleton__toolbar">
                <el-skeleton-item
                  v-for="index in toolbarButtonCount"
                  :key="`toolbar-btn-${index}`"
                  variant="button"
                  class="table-skeleton__toolbar-button"
                />
              </div>
              <el-skeleton-item
                v-for="index in rowCount"
                :key="`table-line-${index}`"
                variant="p"
                class="table-skeleton__line"
              />
              <div v-if="showPagination && showPaginationSkeleton" class="table-skeleton__pagination">
                <el-skeleton-item variant="text" class="table-skeleton__pagination-text" />
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
      <div v-else class="table-skeleton__content">
        <div v-if="showSearch && hasSearchSlot" class="table-skeleton__search-slot">
          <slot name="search" />
        </div>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { toRefs, computed, useSlots } from 'vue'

const props = defineProps({
  // 是否展示骨架层
  loading: { type: Boolean, default: false },
  // 显示搜索表单占位
  showSearch: { type: Boolean, default: false },
  // 搜索项占位数量
  searchFieldCount: { type: Number, default: 3 },
  // 搜索按钮占位数量
  searchButtonCount: { type: Number, default: 2 },
  // 表格行占位数量
  rowCount: { type: Number, default: 10 },
  // 是否显示分页区域
  showPagination: { type: Boolean, default: true },
  // 分页区域占位是否开启
  showPaginationSkeleton: { type: Boolean, default: true },
  // 开启动画效果
  animated: { type: Boolean, default: true },
  // 显示表格上方工具栏占位
  showToolbar: { type: Boolean, default: false },
  // 工具栏按钮占位数量
  toolbarButtonCount: { type: Number, default: 2 }
})

const {
  loading,
  showSearch,
  searchFieldCount,
  searchButtonCount,
  rowCount,
  showPagination,
  showPaginationSkeleton,
  animated,
  showToolbar,
  toolbarButtonCount
} = toRefs(props)

const slots = useSlots()
const hasSearchSlot = computed(() => Boolean(slots.search))
</script>

<style scoped>
.table-skeleton-wrapper {
  width: 100%;
}

.table-skeleton,
.table-skeleton__content {
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
}

.table-skeleton__search {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-top: 7px;
  margin-bottom: 20px;
  padding: 14px;
  border-radius: 4px;
  background-color: var(--el-fill-color-blank, #fff);
}

.table-skeleton__search-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  flex: 1 1 auto;
  min-width: 240px;
}

.table-skeleton__search-field {
  width: 240px;
  height: 34px;
  border-radius: 4px;
}

.table-skeleton__search-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
}

.table-skeleton__search-button {
  width: 100px;
  height: 36px;
  border-radius: 4px;
}

.table-skeleton__table {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border-radius: 4px;
  background-color: var(--el-fill-color-blank, #fff);
}

.table-skeleton__toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  min-height: 40px;
}

.table-skeleton__toolbar-button {
  width: 110px;
  height: 36px;
  border-radius: 4px;
}

.table-skeleton__line {
  width: 100%;
  height: 48px;
  border-radius: 4px;
}

.table-skeleton__pagination {
  display: flex;
  justify-content: flex-end;
}

.table-skeleton__pagination-text {
  margin-top: 28px;
  width: 400px;
  height: 32px;
  border-radius: 4px;
}

.table-skeleton__search-slot {
  /* margin-bottom: 20px; */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
