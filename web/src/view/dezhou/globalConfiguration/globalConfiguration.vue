<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="0"
      :search-button-count="0"
      :show-toolbar="true"
      :toolbar-button-count="0"
      :row-count="pageSize"
      :show-pagination="true"
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
            <template v-if="showAllQuery">
              <!-- 将需要控制显示状态的查询条件添加到此范围内 -->
            </template>

            <el-form-item>
              <!-- <el-button type="primary" icon="search" @click="onSubmit">查询</el-button> -->
              <!-- <el-button icon="refresh" @click="onReset">重置</el-button>
              <el-button link type="primary" icon="arrow-down" @click="showAllQuery = true" v-if="!showAllQuery"
                >展开</el-button
              >
              <el-button link type="primary" icon="arrow-up" @click="showAllQuery = false" v-else>收起</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- <el-button type="primary" icon="plus" @click="openDialog()">新增</el-button>
          <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete"
            >删除</el-button
          > -->
        </div>
        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <!-- 原label: 序号 -->
          <el-table-column type="index" align="center" :label="$t('GlobalConfiguration.Table.Index')" min-width="55" />
          <!-- <el-table-column align="center" label="ID" prop="id" min-width="50" /> -->
          <!-- 原label: 分类 -->
          <el-table-column align="center" :label="$t('GlobalConfiguration.Table.Category')" prop="name" min-width="100">
            <template #default="scope">
              <!-- 原标签: 昵称修改 -->
              <span
                v-if="
                  scope.row.name == 'ReNameCharge' ||
                  scope.row.name == 'ReNameLoss' ||
                  scope.row.name == 'ReNameHandProfit' ||
                  scope.row.name == 'ReNameTime'
                "
              >
                <el-tag>{{ $t('GlobalConfiguration.Tags.Rename') }}</el-tag>
              </span>
              <!-- 原标签: 内部转币 -->
              <span v-if="scope.row.name == 'TransferOpen'">
                <el-tag type="success">{{ $t('GlobalConfiguration.Tags.Transfer') }}</el-tag>
              </span>
              <!-- 原标签: 局外消耗 -->
              <span v-if="scope.row.name == 'CostConfigs'">
                <el-tag type="danger">{{ $t('GlobalConfiguration.Tags.CostConfig') }}</el-tag>
              </span>

              <!-- 原标签: 链接配置 -->
              <span v-if="scope.row.name == 'LinkConfigs'">
                <el-tag type="info">链接修改</el-tag>
              </span>
            </template>
          </el-table-column>
          <!-- 原label: 配置名称 -->
          <!-- <el-table-column
            align="center"
            :label="$t('GlobalConfiguration.Table.Detail')"
            prop="detail"
            min-width="180"
          /> -->
          <!-- 原label: 配置字段 -->
          <el-table-column align="center" :label="$t('GlobalConfiguration.Table.Field')" prop="name" width="150" />

          <!-- 原label: 发发看 -->
          <el-table-column
            align="center"
            :label="$t('GlobalConfiguration.Table.FaFaKan')"
            prop="content"
            min-width="100"
          >
            <template #default="scope">{{ JSON.parse(scope.row.content).FaFaKan || '--' }}</template>
          </el-table-column>
          <!-- 原label: 偷偷看 -->
          <el-table-column
            align="center"
            :label="$t('GlobalConfiguration.Table.TouTouKan')"
            prop="content"
            min-width="100"
          >
            <template #default="scope">{{ JSON.parse(scope.row.content).TouTouKan || '--' }}</template>
          </el-table-column>
          <!-- 原label: Hash -->
          <el-table-column align="center" :label="$t('GlobalConfiguration.Table.Hash')" prop="content" min-width="100">
            <template #default="scope">{{ JSON.parse(scope.row.content).Hash || '--' }}</template>
          </el-table-column>

          <!-- 原label: Hash -->
          <el-table-column align="center" label="链接" prop="content" min-width="100">
            <template #default="scope">{{ JSON.parse(scope.row.content).tgLink || '--' }}</template>
          </el-table-column>

          <!-- 原label: 修改价格 -->
          <el-table-column align="center" :label="$t('GlobalConfiguration.Table.Price')" prop="content" min-width="100">
            <template #default="scope">{{ JSON.parse(scope.row.content).price || '--' }}</template>
          </el-table-column>

          <!-- 原label: 对应金额 -->
          <el-table-column
            align="center"
            :label="$t('GlobalConfiguration.Table.Amount')"
            prop="content"
            min-width="100"
          >
            <template #default="scope">{{ JSON.parse(scope.row.content).loss || '--' }}</template>
          </el-table-column>

          <!-- 原label: 配置时间(秒) -->
          <el-table-column
            align="center"
            :label="$t('GlobalConfiguration.Table.Interval')"
            prop="content"
            min-width="100"
          >
            <template #default="scope">{{ JSON.parse(scope.row.content).interval || '--' }}</template>
          </el-table-column>

          <!-- 原label: 状态 -->
          <el-table-column
            align="center"
            :label="$t('GlobalConfiguration.Table.Status')"
            prop="content"
            min-width="100"
          >
            <template #default="scope">
              {{
                (() => {
                  const content = JSON.parse(scope.row.content)
                  return content.open !== undefined
                    ? content.open
                      ? $t('GlobalConfiguration.Status.Open')
                      : $t('GlobalConfiguration.Status.Closed')
                    : '--'
                })()
              }}
            </template>
          </el-table-column>
          <!-- 原label: 配置信息 -->
          <el-table-column
            align="center"
            :label="$t('GlobalConfiguration.Table.ConfigInfo')"
            prop="content"
            min-width="350"
          />

          <!-- 原label: 创建时间 -->
          <el-table-column
            align="center"
            :label="$t('GlobalConfiguration.Table.CreatedAt')"
            prop="createdAt"
            min-width="100"
          >
            <template #default="scope">{{ formatDate(scope.row.createdAt) }}</template>
          </el-table-column>
          <!-- 原label: 更新时间 -->
          <el-table-column
            align="center"
            :label="$t('GlobalConfiguration.Table.UpdatedAt')"
            prop="updatedAt"
            min-width="100"
          >
            <template #default="scope">{{ formatDate(scope.row.updatedAt) }}</template>
          </el-table-column>
          <!-- 原label: 操作 -->
          <el-table-column
            align="center"
            :label="$t('GlobalConfiguration.Table.Actions')"
            fixed="right"
            min-width="100"
          >
            <template #default="scope">
              <!-- <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"
                ><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看</el-button
              > -->
              <!-- 原按钮: 设置 -->
              <el-button
                type="primary"
                link
                icon="setting"
                class="table-button"
                @click="updateGlobalConfigFunc(scope.row)"
                >{{ $t('GlobalConfiguration.Actions.Configure') }}</el-button
              >
              <!-- <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el按钮> -->
            </template>
          </el-table-column>
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
    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="dialogFormVisible"
      :show-close="false"
      :before-close="closeDialog"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <!-- 原标题: 新增/编辑 -->
          <span class="text-lg">{{ drawerTitle }}</span>
          <div>
            <!-- 原按钮: 确 定 -->
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">
              {{ $t('Common.Confirm') }}
            </el-button>
            <!-- 原按钮: 取 消 -->
            <el-button @click="closeDialog">{{ $t('Common.Cancel') }}</el-button>
          </div>
        </div>
      </template>

      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="80px">
        <!-- 原标题: 配置名称 -->
        <h4>{{ $t('GlobalConfiguration.Form.ConfigNamePrefix') }} {{ editName }}</h4>

        <!-- 原label: 是否开启该配置: -->
        <el-form-item :label="$t('GlobalConfiguration.Form.EnableConfigLabel')" v-if="isShowOpen">
          <el-switch
            v-model="content.open"
            inline-prompt
            :active-text="$t('GlobalConfiguration.Status.Open')"
            :inactive-text="$t('GlobalConfiguration.Status.Closed')"
            @change="handleSwitchChange"
          />
        </el-form-item>

        <!-- 原label: 价格: -->
        <el-form-item :label="$t('GlobalConfiguration.Form.PriceLabel')" v-if="isShowReNameLoss">
          <el-input
            v-model.number="content.price"
            :clearable="true"
            :placeholder="$t('GlobalConfiguration.Form.PricePlaceholder')"
            type="number"
            :min="7"
          />
        </el-form-item>

        <div v-if="editName == '近X日累计亏损XX改名'">
          <!-- 原label: 亏损: -->
          <el-form-item :label="$t('GlobalConfiguration.Form.LossLabel')" v-if="isShowReNameHandProfit">
            <el-input
              v-model.number="content.loss"
              :clearable="true"
              :placeholder="$t('GlobalConfiguration.Form.HandProfitPlaceholder')"
              type="number"
              min="0"
            />
          </el-form-item>
        </div>

        <div v-if="editName == '近X日手均盈利低于X改名'">
          <!-- 原label: 手均盈利低于: -->
          <el-form-item :label="$t('GlobalConfiguration.Form.HandProfitLabel')" v-if="isShowReNameHandProfit">
            <el-input
              v-model.number="content.loss"
              :clearable="true"
              :placeholder="$t('GlobalConfiguration.Form.HandProfitPlaceholder')"
              type="number"
              min="0"
            />
          </el-form-item>
        </div>
        <div v-if="!editName == '近X日手均盈利低于X改名'">
          <!-- 原label: 亏损金额(正数): -->
          <el-form-item :label="$t('GlobalConfiguration.Form.LossAmountLabel')" v-if="isShowReNameHandProfit">
            <el-input
              v-model.number="content.loss"
              :clearable="true"
              :placeholder="$t('GlobalConfiguration.Form.LossAmountPlaceholder')"
              type="number"
              min="0"
            />
          </el-form-item>
        </div>
        <div v-if="!editName == 'X日/可修改一次改名'">
          <!-- 原label: 对应金额(正数): -->
          <el-form-item :label="$t('GlobalConfiguration.Form.AmountLabel')" v-if="isShowReNameHandProfit">
            <el-input
              v-model.number="content.loss"
              :clearable="true"
              :placeholder="$t('GlobalConfiguration.Form.AmountPlaceholder')"
              type="number"
              min="0"
            />
          </el-form-item>
        </div>

        <!-- 原label: 配置时间(秒): -->
        <el-form-item :label="$t('GlobalConfiguration.Form.IntervalLabel')" v-if="isShowReNameTime">
          <el-input
            v-model.number="content.interval"
            :clearable="true"
            :placeholder="$t('GlobalConfiguration.Form.IntervalPlaceholder')"
            type="number"
            min="0"
          />
        </el-form-item>
        <!-- 消耗配置 -->
        <!-- 原label: 发发看: -->
        <!-- <el-form-item :label="$t('GlobalConfiguration.Form.FaFaKanLabel')" v-if="isShowCostConfigs">
          <el-input
            v-model.number="content.FaFaKan"
            :clearable="true"
            :placeholder="$t('GlobalConfiguration.Form.FaFaKanPlaceholder')"
            type="number"
            min="0"
          />
        </el-form-item> -->
        <!-- 原label: 偷偷看: -->
        <!-- <el-form-item :label="$t('GlobalConfiguration.Form.TouTouKanLabel')" v-if="isShowCostConfigs">
          <el-input
            v-model.number="content.TouTouKan"
            :clearable="true"
            :placeholder="$t('GlobalConfiguration.Form.TouTouKanPlaceholder')"
            type="number"
          />
        </el-form-item> -->

        <!-- 原label: Hash: -->
        <el-form-item :label="$t('GlobalConfiguration.Form.HashLabel')" v-if="isShowCostConfigs">
          <el-input
            v-model.number="content.Hash"
            :clearable="true"
            :placeholder="$t('GlobalConfiguration.Form.HashPlaceholder')"
            type="number"
          />
        </el-form-item>

        <el-form-item label="链接配置:" v-if="isShowLinkConfigs">
          <el-input v-model.number="content.tgLink" :clearable="true" placeholder="请输入" />
        </el-form-item>

        <div style="height: 100px"></div>
        <div class="calculator-card" v-if="isShowReNameTime">
          <!-- 原标题: 天数转秒数 -->
          <h3 class="calculator-title">{{ $t('GlobalConfiguration.Calculator.Title') }}</h3>

          <el-form :model="form" :rules="calculatorRules" ref="formRef" class="calculator-form">
            <!-- 原label: 输入天数 -->
            <el-form-item :label="$t('GlobalConfiguration.Calculator.InputDays')" prop="days">
              <el-input
                v-model.number="form.days"
                type="number"
                :placeholder="$t('GlobalConfiguration.Calculator.DaysPlaceholder')"
                step="0.1"
                class="days-input"
                @input="calculateSeconds"
              />
            </el-form-item>

            <!-- 原label: 转换结果（秒） -->
            <el-form-item :label="$t('GlobalConfiguration.Calculator.ResultLabel')">
              <el-input v-model="form.seconds" type="text" readonly class="result-input" />
            </el-form-item>

            <el-form-item>
              <!-- 原按钮: 重置 -->
              <el-button type="primary" @click="handleReset" class="reset-btn">
                {{ $t('GlobalUniversality.Reset') }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-form>
    </el-drawer>

    <!-- 原标题: 查看 -->
    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="detailShow"
      :show-close="true"
      :before-close="closeDetailShow"
      :title="$t('GlobalConfiguration.Actions.View')"
    >
      <el-descriptions :column="1" border>
        <!-- 原label: id字段 -->
        <el-descriptions-item :label="$t('GlobalConfiguration.Detail.IdField')">
          {{ detailForm.id }}
        </el-descriptions-item>
        <!-- 原label: 配置名称 -->
        <el-descriptions-item :label="$t('GlobalConfiguration.Detail.Name')">
          {{ detailForm.name }}
        </el-descriptions-item>
        <!-- 原label: 配置描述 -->
        <el-descriptions-item :label="$t('GlobalConfiguration.Detail.Description')">
          {{ detailForm.detail }}
        </el-descriptions-item>
        <!-- 原label: 配置信息 -->
        <el-descriptions-item :label="$t('GlobalConfiguration.Detail.Content')">
          {{ detailForm.content }}
        </el-descriptions-item>
        <!-- 原label: createdAt字段 -->
        <el-descriptions-item :label="$t('GlobalConfiguration.Detail.CreatedAtField')">
          {{ detailForm.createdAt }}
        </el-descriptions-item>
        <!-- 原label: updatedAt字段 -->
        <el-descriptions-item :label="$t('GlobalConfiguration.Detail.UpdatedAtField')">
          {{ detailForm.updatedAt }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
  import {
    createGlobalConfig,
    deleteGlobalConfig,
    deleteGlobalConfigByIds,
    updateGlobalConfig,
    findGlobalConfig,
    getGlobalConfigList
  } from '@/api/dezhou/globalConfig'

  // 全量引入格式化工具 请按需保留
  import {
    getDictFunc,
    formatDate,
    formatBoolean,
    filterDict,
    filterDataSource,
    returnArrImg,
    onDownloadFile
  } from '@/utils/format'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, reactive, computed, watch } from 'vue'
  import { useAppStore } from '@/pinia'
  import { useI18n } from 'vue-i18n'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'
  // 根据行索引/数据判断指定行
  const getTargetRowClass = ({ row, rowIndex }) => {
    // 条件1：索引为2、5的行
    if ([2, 5].includes(rowIndex)) return 'target-row'

    // 条件2：配置名称为“价格配置”的行
    if (row.name === '价格配置') return 'target-row'

    return ''
  }
  defineOptions({
    name: 'GlobalConfig'
  })

  // 提交按钮loading
  const btnLoading = ref(false)
  const appStore = useAppStore()
  const { t, locale } = useI18n()

  // 控制更多查询条件显示/隐藏状态
  const showAllQuery = ref(false)
  // 配置名称
  let editName = ref('')
  // 自动化生成的字典（可能为空）以及字段
  const formData = ref({
    id: undefined,
    name: '',
    detail: '',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date()
  })
  let content = ref('')
  let switchValue = ref(false)

  // 验证规则
  const rule = reactive({})

  const elFormRef = ref()
  const elSearchFormRef = ref()
  const loading = ref(false)

  // =========== 表格控制部分 ===========
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})
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
      const table = await getGlobalConfigList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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

  // 删除行
  const deleteRow = (row) => {
    ElMessageBox.confirm(t('GlobalConfiguration.Messages.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(() => {
      deleteGlobalConfigFunc(row)
    })
  }

  // 多选删除
  const onDelete = async () => {
    ElMessageBox.confirm(t('GlobalConfiguration.Messages.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: t('GlobalConfiguration.Messages.SelectDeleteWarning')
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map((item) => {
          ids.push(item.id)
        })
      const res = await deleteGlobalConfigByIds({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('GlobalConfiguration.Messages.DeleteSuccess')
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }

  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('create')
  const drawerTitle = computed(() => {
    locale.value
    return type.value === 'create'
      ? t('GlobalConfiguration.Dialog.TitleCreate')
      : t('GlobalConfiguration.Dialog.TitleEdit')
  })
  let isShowOpen = ref(false)
  let isShowReNameCharge = ref(false) //首次充值改名
  let isShowReNameTime = ref(false) //近X日累计亏损XX改名
  let isShowReNameHandProfit = ref(false) //近X日手均盈利低于X改名

  let isShowReNameLoss = ref(false) //X日/可修改一次改名
  let isShowTransferOpen = ref(false) //内部转币配置

  let isShowCostConfigs = ref(false) // 消耗配置
  let isShowLinkConfigs = ref(false) // 链接配置
  // 更新行
  const updateGlobalConfigFunc = async (row) => {
    isShowOpen.value = false
    isShowReNameCharge.value = false
    isShowReNameTime.value = false
    isShowReNameHandProfit.value = false
    isShowReNameLoss.value = false
    isShowTransferOpen.value = false
    isShowCostConfigs.value = false
    isShowLinkConfigs.value = false
    const res = await findGlobalConfig({ id: row.id })

    type.value = 'update'

    if (res.code === 0) {
      formData.value = res.data
      content.value = JSON.parse(res.data.content)
      if (JSON.parse(res.data.content).open == true) {
        content.value.open = true
      } else {
        content.value.open = false
      }
      // console.log(JSON.parse(res.data.content), formData.value.open)
      editName.value = res.data.detail
      if (res.data.detail == '首次充值改名') {
        console.log('首次充值改名')
        isShowOpen.value = true
        isShowReNameCharge.value = true
        isShowReNameLoss.value = true
        console.log(JSON.parse(formData.value.content).open)
      } else if (res.data.detail == '近X日累计亏损XX改名') {
        console.log('近X日累计亏损XX改名')
        isShowOpen.value = true
        isShowReNameCharge.value = true
        isShowReNameTime.value = true
        isShowReNameHandProfit.value = true
        isShowReNameLoss.value = true
      } else if (res.data.detail == '近X日手均盈利低于X改名') {
        console.log('近X日手均盈利低于X改名')
        isShowOpen.value = true
        isShowReNameCharge.value = true
        isShowReNameTime.value = true
        isShowReNameHandProfit.value = true
        isShowReNameLoss.value = true
      } else if (res.data.detail == 'X日/可修改一次改名') {
        console.log('X日/可修改一次改名')
        isShowOpen.value = true
        isShowReNameCharge.value = true
        isShowReNameTime.value = true
        isShowReNameHandProfit.value = true
        isShowReNameLoss.value = true
      } else if (res.data.detail == '内部转币配置') {
        isShowOpen.value = true
        isShowReNameCharge.value = true
        isShowTransferOpen.value = true
        console.log('内部转币配置')
      } else if (res.data.detail == '消耗配置') {
        isShowOpen.value = false
        isShowCostConfigs.value = true
        console.log('消耗配置')
      } else if (res.data.detail == '链接配置') {
        isShowLinkConfigs.value = true
        console.log('链接配置')
      }

      dialogFormVisible.value = true
    }
  }
  const handleSwitchChange = (ev) => {
    console.log(ev)
    if (ev) {
      console.log(content.value)

      content.value.open = true
    } else {
      content.value.open = false
    }
  }
  // 删除行
  const deleteGlobalConfigFunc = async (row) => {
    const res = await deleteGlobalConfig({ id: row.id })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('GlobalConfiguration.Messages.DeleteSuccess')
      })
      if (tableData.value.length === 1 && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  }

  // 弹窗控制标记
  const dialogFormVisible = ref(false)

  // 打开弹窗
  const openDialog = () => {
    type.value = 'create'
    dialogFormVisible.value = true
  }

  // 关闭弹窗
  const closeDialog = () => {
    dialogFormVisible.value = false
    type.value = 'create'
  }
  // 弹窗确定
  const enterDialog = async () => {
    btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
      let res
      switch (type.value) {
        case 'create':
          res = await createGlobalConfig(formData.value)
          break
        case 'update':
          console.log('点击确定了', formData.value, content.value)
          // 传回参数转换
          if (content.value.open) {
            content.value.open = 1
          } else {
            content.value.open = 0
          }

          if (content.value.loss == '') {
            content.value.loss = 0
          }
          if (content.value.price == '') {
            content.value.price = 0
          }

          if (content.value.interval == '') {
            content.value.interval = 0
          }

          formData.value.content = JSON.stringify(content.value)

          if (formData.value.detail == '首次充值改名') {
            const { loss, FaFaKan, TouTouKan, Hash, ...newObj } = JSON.parse(formData.value.content) // 解构排除
            formData.value.content = JSON.stringify(newObj)
          } else if (formData.value.detail == '近X日累计亏损XX改名') {
            const { FaFaKan, TouTouKan, Hash, ...newObj } = JSON.parse(formData.value.content) // 解构排除
            formData.value.content = JSON.stringify(newObj)
          } else if (formData.value.detail == '近X日手均盈利低于X改名') {
            const { FaFaKan, TouTouKan, Hash, ...newObj } = JSON.parse(formData.value.content) // 解构排除
            formData.value.content = JSON.stringify(newObj)
          } else if (formData.value.detail == 'X日/可修改一次改名') {
            const { loss, FaFaKan, TouTouKan, Hash, ...newObj } = JSON.parse(formData.value.content) // 解构排除
            formData.value.content = JSON.stringify(newObj)
          } else if (formData.value.detail == '内部转币配置') {
            const { loss, price, interval, FaFaKan, TouTouKan, Hash, ...newObj } = JSON.parse(formData.value.content) // 解构排除
            formData.value.content = JSON.stringify(newObj)
          } else if (formData.value.detail == '消耗配置') {
            const { open, loss, price, interval, ...newObj } = JSON.parse(formData.value.content) // 解构排除
            formData.value.content = JSON.stringify(newObj)
          } else if (formData.value.detail == '链接配置') {
            const { open, loss, price, interval, FaFaKan, TouTouKan, Hash, ...newObj } = JSON.parse(
              formData.value.content
            ) // 解构排除
            formData.value.content = JSON.stringify(newObj)
          }
          console.log('上传的数据', formData.value)
          res = await updateGlobalConfig(formData.value)
          break
        default:
          res = await createGlobalConfig(formData.value)
          break
      }
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('GlobalUniversality.OperationSuccessful')
        })
        closeDialog()
        getTableData()
      }
    })
  }

  const detailForm = ref({})

  // 查看详情控制标记
  const detailShow = ref(false)

  // 打开详情弹窗
  const openDetailShow = () => {
    detailShow.value = true
  }

  // 打开详情
  const getDetails = async (row) => {
    // 打开弹窗
    const res = await findGlobalConfig({ id: row.id })
    if (res.code === 0) {
      detailForm.value = res.data
      openDetailShow()
    }
  }

  // 关闭详情弹窗
  const closeDetailShow = () => {
    detailShow.value = false
    detailForm.value = {}
  }

  // 表单数据
  const form = reactive({
    days: '',
    seconds: ''
  })

  // 表单引用
  const formRef = ref(null)

  // 计算表单校验规则
  const calculatorRules = computed(() => {
    locale.value
    return {
      days: [
        { required: true, message: t('GlobalConfiguration.Calculator.ValidateDaysRequired'), trigger: 'blur' },
        {
          type: 'number',
          min: 0,
          message: t('GlobalConfiguration.Calculator.ValidateDaysNonNegative'),
          trigger: ['blur', 'input']
        },
        {
          validator: (_rule, value, callback) => {
            if (value !== '' && !isNaN(value)) {
              callback()
            } else {
              callback(new Error(t('GlobalConfiguration.Calculator.ValidateDaysNumber')))
            }
          },
          trigger: ['blur', 'input']
        }
      ]
    }
  })

  // 计算秒数逻辑（直接输出整数秒数）
  const calculateSeconds = () => {
    if (form.days === '' || isNaN(form.days)) {
      form.seconds = ''
      return
    }
    // 转换公式：天数 × 86400（1天=24×60×60秒），直接取整
    const seconds = Math.floor(form.days * 86400) // 或直接用 form.days * 86400（保留原始计算结果）
    form.seconds = seconds.toString() // 转为字符串显示，避免科学计数法
  }

  // 重置表单
  const handleReset = () => {
    formRef.value.resetFields()
    form.seconds = ''
  }

  // 监听content.price
  watch(
    () => content.value.price,
    (newVal) => {
      if (newVal < 0 || isNaN(newVal)) {
        content.value.price = 0
      }
    }
  )

  // 监听content.value.loss
  watch(
    () => content.value.loss,
    (newVal) => {
      if (newVal < 0 || isNaN(newVal)) {
        content.value.loss = 0
      }
    }
  )

  // 监听content.value.interval
  watch(
    () => content.value.interval,
    (newVal) => {
      if (newVal < 0 || isNaN(newVal)) {
        content.value.interval = 0
      }
    }
  )

  // 监听content.value.FaFaKan
  watch(
    () => content.value.FaFaKan,
    (newVal) => {
      if (newVal < 0 || isNaN(newVal)) {
        content.value.FaFaKan = 0
      }
    }
  )

  // 监听content.TouTouKan
  watch(
    () => content.value.TouTouKan,
    (newVal) => {
      if (newVal < 0 || isNaN(newVal)) {
        content.value.TouTouKan = 0
      }
    }
  )

  // 监听content.Hash
  watch(
    () => content.value.Hash,
    (newVal) => {
      if (newVal < 0 || isNaN(newVal)) {
        content.value.Hash = 0
      }
    }
  )
</script>

<style lang="scss">
  .calculator-card {
    margin: 0 auto;
    width: 520px;

    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .calculator-title {
    text-align: center;
    color: #1989fa;
    margin-bottom: 25px;
    font-size: 18px;
  }

  .calculator-form {
    margin-top: 20px;
  }

  .days-input {
    margin-left: 33px;
    width: 88%;
  }

  .result-input {
    width: 95%;
    background-color: #f0f9ff;
    font-weight: bold;
  }

  .reset-btn {
    width: 100%;
    margin-top: 10px;
  }

  .el-form-item__label {
    font-weight: 500;
  }
</style>
