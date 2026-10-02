<template>
  <gva-card custom-class="col-span-1 lg:col-span-2 top">
    <div class="dashboard-skeleton">
      <el-skeleton :rows="0" animated>
        <template #template>
          <div class="skeleton-header">
            <el-skeleton-item variant="h3" class="skeleton-title" />
          </div>
          <div class="card-grid">
            <div class="stat-card" v-for="index in cardCount" :key="index">
              <el-skeleton-item variant="text" class="card-title" />
              <el-skeleton-item variant="text" class="card-value" />
            </div>
          </div>
          <div class="divider" />
        </template>
      </el-skeleton>
    </div>
  </gva-card>
</template>

<script setup>
  import { GvaCard } from '@/view/dashboard/components'
  
  defineProps({
    cardCount: {
      type: Number,
      default: 4
    }
  })
</script>

<style scoped>
.dashboard-skeleton {
  padding: 20px 0 0;
}

.skeleton-header {
  padding: 0 10px 12px;
  margin-bottom: 18px;
  border-bottom: 1px solid #ccc;
}

.skeleton-title {
  width: 260px;
  height: 32px;
  border-radius: 4px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 0 10px 30px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 90px;
  padding: 15px;
  border-radius: 4px;
  background-color: #f0f0f0;
}

.card-title {
  width: 70%;
  height: 18px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.card-value {
  width: 160px;
  height: 30px;
  border-radius: 4px;
}

.divider {
  width: 100%;
  height: 1px;
  margin: 30px 0;
  border-bottom: 1px dashed #ccc;
}
</style>
