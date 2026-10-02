<template>
  <div class="dashboard-skeleton">
    <gva-card v-if="showTopSection" custom-class="col-span-1 lg:col-span-2 ">
      <el-skeleton :loading="true" animated>
        <template #template>
          <div class="skeleton-header">
            <el-skeleton-item variant="text" class="skeleton-title" />
            <el-skeleton-item variant="text" class="skeleton-tip" />
          </div>
          <div class="search-bar">
            <div class="search-label">
              <el-skeleton-item variant="text" class="skeleton-label" />
            </div>
            <el-skeleton-item variant="text" class="skeleton-date" />
            <div class="search-actions">
              <el-skeleton-item
                v-for="index in searchButtonCount"
                :key="`search-btn-${index}`"
                variant="button"
                class="skeleton-button"
              />
            </div>
          </div>
          <div class="card-grid">
            <div class="stat-card" v-for="index in topCardCount" :key="`top-card-${index}`">
              <el-skeleton-item variant="text" class="skeleton-card-title" />
              <el-skeleton-item variant="text" class="skeleton-card-value" />
              <el-skeleton-item variant="text" class="skeleton-card-average" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </gva-card>
    <gva-card v-if="showBottomSection" custom-class="col-span-1 lg:col-span-2 ">
      <el-skeleton :loading="true" animated>
        <template #template>
          <div class="card-grid">
            <div class="stat-card" v-for="index in bottomCardCount" :key="`bottom-card-${index}`">
              <el-skeleton-item variant="text" class="skeleton-card-title" />
              <el-skeleton-item variant="text" class="skeleton-card-value" />
              <el-skeleton-item variant="text" class="skeleton-card-average" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </gva-card>
  </div>
</template>

<script setup>
import { GvaCard } from '@/view/dashboard/components'

defineProps({
  topCardCount: { type: Number, default: 4 },
  bottomCardCount: { type: Number, default: 18 },
  searchButtonCount: { type: Number, default: 2 },
  showTopSection: { type: Boolean, default: true },
  showBottomSection: { type: Boolean, default: true }
})
</script>

<style scoped>
.dashboard-skeleton {
  display: contents;
}

.skeleton-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

.skeleton-title {
  width: 200px;
  height: 32px;
  border-radius: 4px;
}

.skeleton-tip {
  width: 180px;
  height: 18px;
  border-radius: 4px;
  align-self: flex-end;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.search-label {
  display: flex;
  align-items: center;
}

.skeleton-label {
  width: 120px;
  height: 18px;
  border-radius: 4px;
}

.skeleton-date {
  width: 350px;
  height: 40px;
  border-radius: 4px;
}

.search-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.skeleton-button {
  width: 100px;
  height: 36px;
  border-radius: 4px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.stat-card {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 4px;
}

.skeleton-card-title,
.skeleton-card-value,
.skeleton-card-average {
  display: block;
  border-radius: 4px;
}

.skeleton-card-title {
  width: 70%;
  height: 24px;
  margin-bottom: 10px;
}

.skeleton-card-value {
  width: 65%;
  height: 32px;
  margin-bottom: 15px;
}

.skeleton-card-average {
  width: 80%;
  height: 18px;
}
</style>
