<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" type="card">
      <el-tab-pane label="赢钱排行" name="赢钱排行">
        <TableSkeletonWrapper
          :loading="loading"
          :show-search="true"
          :search-field-count="2"
          :search-button-count="2"
          :show-toolbar="true"
          :toolbar-button-count="2"
          :row-count="pageSize"
        >
          <template #search>
            <div class="gva-search-box">
              <el-form
                ref="elSearchFormRef"
                :inline="true"
                :model="searchInfo"
                class="demo-form-inline"
                @keyup.enter="onSubmit"
              >
                <!-- 用户昵称 -->
                <el-form-item label="用户昵称" prop="UserId">
                  <el-input
                    v-model.number="searchInfo.UserId"
                    clearable
                    :placeholder="$t('ClubUser.Search.Placeholder')"
                    style="width: 240px"
                  />
                </el-form-item>

                <!-- 用户ID -->
                <el-form-item label="用户ID" prop="ClubId">
                  <el-input
                    v-model.number="searchInfo.ClubId"
                    clearable
                    :placeholder="$t('ClubUser.Search.Placeholder')"
                    style="width: 240px"
                  />
                </el-form-item>
                <!-- 原: 级别-->
                <el-form-item label="级别" prop="playerId">
                  <el-select
                    v-model="searchInfo.playerId"
                    :placeholder="$t('PaiJuWinLoseRecord.PlaceholderUserID')"
                    style="width: 240px"
                  >
                    <el-option
                      v-for="(item, index) in selectOptions"
                      :key="index"
                      :label="`${item.label}(${item.value})`"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="排行类型" prop="playerId">
                  <el-select
                    v-model="searchInfo.playerId"
                    :placeholder="$t('PaiJuWinLoseRecord.PlaceholderUserID')"
                    style="width: 240px"
                  >
                    <el-option
                      v-for="(item, index) in selectOptions"
                      :key="index"
                      :label="`${item.label}(${item.value})`"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <!-- 原: 时间 -->
                <el-form-item :label="$t('PaiJuWinLoseRecord.Time')">
                  <el-date-picker
                    v-model="searchInfo.createdAtRange"
                    style="width: 350px"
                    type="datetimerange"
                    :range-separator="$t('PaiJuWinLoseRecord.RangeSeparator')"
                    :start-placeholder="$t('PaiJuWinLoseRecord.StartTime')"
                    :end-placeholder="$t('PaiJuWinLoseRecord.EndTime')"
                    :clearable="false"
                  />
                </el-form-item>

                <el-form-item>
                  <!-- 查询 -->
                  <el-button type="primary" icon="search" @click="onSubmit">{{
                    $t('GlobalUniversality.Query')
                  }}</el-button>
                  <!-- 重置 -->
                  <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </template>
          <div class="gva-table-box">
            <el-table
              v-adaptive="{ bottomOffset: 100 }"
              ref="multipleTable"
              style="width: 100%"
              tooltip-effect="dark"
              :data="tableData"
              row-key="id"
              @selection-change="handleSelectionChange"
            >
              <!-- 序号 -->
              <el-table-column align="center" type="index" min-width="50" :label="$t('ClubUser.Table.Index')" />
              <el-table-column label="赢钱额度" prop="TablePower" min-width="150" align="center" sortable>
                <template #default="scope"> </template>
              </el-table-column>
              <el-table-column align="center" label="账号ID" prop="ClubId" min-width="150" />
              <el-table-column align="center" label="用户昵称" prop="ClubId" min-width="150" />
              <el-table-column align="center" label="牌局数" prop="ClubId" min-width="150" sortable />
              <el-table-column align="center" label="用户分层标签" prop="ClubId" min-width="150" sortable />
              <el-table-column align="center" label="最后登录时间" prop="ClubId" min-width="150" />
            </el-table>
            <div class="gva-pagination">
              <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="page"
                :page-size="pageSize"
                :page-sizes="[10, 30, 50, 100]"
                :total="total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              />
            </div>
          </div>
        </TableSkeletonWrapper>
      </el-tab-pane>
      <el-tab-pane label="输钱排行榜" name="输钱排行榜">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  import {
    createClubUser,
    deleteClubUser,
    deleteClubUserByIds,
    updateClubUser,
    findClubUser,
    getClubUserList
  } from '@/api/dezhou/clubUser'

  // 全量引入格式化工具 请按需保留
  import { formatDate } from '@/utils/format'
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue'
  import { useAppStore } from '@/pinia'
  import { useI18n } from 'vue-i18n'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'winningAndLosingRanking'
  })
  const { t } = useI18n()
  const activeName = ref('赢钱排行')

  const handleClick = (tab, event) => {
    console.log(tab, event)
  }

  // 提交按钮loading
  const btnLoading = ref(false)
  const appStore = useAppStore()
  // 自动化生成的字典（可能为空）以及字段
  const formData = ref({
    id: undefined,
    UserId: undefined,
    ClubId: undefined,
    JoinTime: new Date(),
    Identify: undefined,
    MemberPower: undefined,
    ClubGoldPower: undefined,
    TablePower: undefined
  })

  const selectOptions = [
    {
      value: '4',
      label: 'Option1'
    },
    {
      value: '7',
      label: 'Option2'
    }
  ]

  const elSearchFormRef = ref()

  // =========== 表格控制部分 ===========
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})
  const loading = ref(false)

  // 重置
  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }

  // 搜索
  const onSubmit = () => {
    elSearchFormRef.value?.validate(async (valid) => {
      if (!valid) return
      page.value = 1
      getTableData()
    })
  }

  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  // 修改页面容量
  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getClubUserList({
        page: page.value,
        pageSize: pageSize.value,
        ...searchInfo.value
      })
      if (table.code === 0) {
        tableData.value = table.data.list
        total.value = table.data.total
        page.value = table.data.page
        pageSize.value = table.data.pageSize
      }
    } finally {
      loading.value = false
    }
  }

  getTableData()

  // ============== 表格控制部分结束 ===============

  // 获取需要的字典 可能为空 按需保留
  const setOptions = async () => {}

  // 获取需要的字典 可能为空 按需保留
  setOptions()

  // 多选数据
  const multipleSelection = ref([])
  // 多选
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('')
</script>

<style lang="scss" scoped>
  .demo-tabs {
    margin-top: 10px;
  }
</style>
