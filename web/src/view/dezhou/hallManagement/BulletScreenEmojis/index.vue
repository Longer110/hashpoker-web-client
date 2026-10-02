2
<template>
  <div>
    <!-- 原文：注：点击对应要操作的数字，可进行输入，点击回车可进行编辑！ -->
    <warning-bar :title="$t('BulletScreenEmojis.Warning')" />

    <TableSkeleton
      :loading="tableLoading"
      :show-search="true"
      :search-field-count="1"
      :search-button-count="2"
      :row-count="pageSize"
      :show-pagination="true"
      :show-toolbar="true"
      :toolbar-button-count="2"
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
            <!-- 原标签：分组 -->
            <el-form-item :label="$t('BulletScreenEmojis.Search.GroupLabel')" prop="AccountType">
              <el-select
                v-model="searchInfo.nGroupId"
                :placeholder="$t('BulletScreenEmojis.Search.GroupPlaceholder')"
                clearable
                style="width: 240px"
              >
                <!-- 原占位：请选择分组 -->
                <el-option v-for="item in groupOptions" :key="item.GroupId" :label="item.GroupName" :value="item.GroupId" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <!-- 原按钮：查询 -->
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <!-- 原按钮：重置 -->
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <div class="gva-table-box">
        <div class="gva-btn-list" style="display: flex; justify-content: space-between">
          <!-- 原按钮：新增 -->
          <el-button type="primary" icon="plus" @click="openDialog()">{{ $t('BulletScreenEmojis.Buttons.Add') }}</el-button>

          <el-dropdown :hide-on-click="false" style="margin-right: 10px">
            <span class="el-dropdown-link">
              <el-icon :size="20"><Operation /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu style="max-height: 400px">
                <el-dropdown-item v-for="value in tableConfig" :key="value.prop">
                  <el-checkbox
                    v-model="value.show"
                    @change="boxValueChange"
                    :label="columnLabel(value)"
                    size="small"
                  />
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          height="600"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="UserID"
        >
          <!-- 原列名：序号 -->
          <el-table-column align="center" type="index" min-width="80" :label="$t('BulletScreenEmojis.Table.Index')" />

          <el-table-column
            align="center"
            :label="columnLabel(value)"
            min-width="90"
            :prop="value.prop"
            :key="value.prop"
            v-for="value in tableConfigReal"
          >
            <template #default="scope">
              <el-input
                class="customInput"
                v-model.trim="scope.row[value.prop]"
                @input="handleInput(scope.row, value.prop)"
                :placeholder="$t('BulletScreenEmojis.Placeholders.Input')"
                v-if="value.type === 'input'"
                @blur="handleEnter(scope.row, value.prop, scope.row[value.prop], scope.$index)"
              />
              <span v-else>{{
                value.prop === 'nGroupName' ? findeGtoupName(scope.row.nGroupId) : scope.row[value.prop]
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            header-align="center"
            :label="$t('BulletScreenEmojis.Table.Actions')"
            :min-width="120"
          >
            <template #default="scope">
              <el-button icon="delete" type="primary" link @click="deleteApiFunc(scope.row)">
                {{ $t('BulletScreenEmojis.Buttons.Delete') }}
              </el-button>
              <!-- 原按钮：删除 -->
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
    </TableSkeleton>
    <!-- 新增/编辑抽屉 -->
    <AddEditTableDialog
      ref="addEditDialogRef"
      v-model="dialogFormVisible"
      :title="type === 'create' ? t('BulletScreenEmojis.Dialog.CreateTitle') : t('BulletScreenEmojis.Dialog.EditTitle')"
      :type="type"
      @confirm="handleDialogConfirm"
      @close="handleDialogClose"
    />
  </div>
</template>

<script setup>
  import WarningBar from '@/components/warningBar/warningBar.vue'
  import TableSkeleton from '@/components/tableSkeleton/index.vue'
  import { getExpressionList, updateExpression, deleteExpression } from '@/api/dezhou/clubCreateTableList'
  import { parseAndFlattenJSONValue } from '@/utils/format'
  import { getGlobalGroupingApi } from '@/api/dezhou/global'
  import { h, ref, onMounted, nextTick } from 'vue'
  import AddEditTableDialog from './components/AddEditTableDialog.vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  defineOptions({
    name: 'BulletScreenEmojis'
  })

  const { t } = useI18n()

  const tableConfig = ref([
    { labelKey: 'BulletScreenEmojis.Table.Columns.GroupId', lable: '分组id', prop: 'nGroupId', type: 'label', show: true }, // 原列名：分组id
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.GroupName',
      lable: '分组名称',
      prop: 'nGroupName',
      type: 'label',
      show: true
    }, // 原列名：分组名称

    { labelKey: 'BulletScreenEmojis.Table.Columns.Tomato', lable: '番茄', prop: 'nChatId1', type: 'input', show: true }, // 原列名：干杯
    { labelKey: 'BulletScreenEmojis.Table.Columns.BlowKiss', lable: '飞吻', prop: 'nChatId2', type: 'input', show: true }, // 原列名：飞吻
    { labelKey: 'BulletScreenEmojis.Table.Columns.Cheers', lable: '干杯', prop: 'nChatId3', type: 'input', show: true }, // 原列名：点赞
    { labelKey: 'BulletScreenEmojis.Table.Columns.Bomb', lable: '炸弹', prop: 'nChatId4', type: 'input', show: true }, // 原列名：鲜花
    { labelKey: 'BulletScreenEmojis.Table.Columns.CatchChicken', lable: '抓鸡', prop: 'nChatId5', type: 'input', show: true }, // 原列名：加特林
    { labelKey: 'BulletScreenEmojis.Table.Columns.Flowers', lable: '鲜花', prop: 'nChatId6', type: 'input', show: true }, // 原列名：鲨鱼
    { labelKey: 'BulletScreenEmojis.Table.Columns.Gatling', lable: '加特林', prop: 'nChatId14', type: 'input', show: true }, // 原列名：番茄
    { labelKey: 'BulletScreenEmojis.Table.Columns.Shark', lable: '鲨鱼', prop: 'nChatId15', type: 'input', show: true }, // 原列名：抓鸡
    { labelKey: 'nicehand', lable: 'nicehand', prop: 'nChatId16', type: 'input', show: true }, // 原列名：炸弹
    { labelKey: 'BulletScreenEmojis.Table.Columns.Like', lable: '点赞', prop: 'nChatId17', type: 'input', show: true }, // 原列名：点烟
    { labelKey: 'BulletScreenEmojis.Table.Columns.LightCigarette', lable: '抽烟', prop: 'nChatId18', type: 'input', show: true }, // 原列名：摸头

    { labelKey: 'BulletScreenEmojis.Table.Columns.Delay1', lable: '延时1', prop: 'nChatId7', type: 'input', show: true }, // 原列名：延时1
    { labelKey: 'BulletScreenEmojis.Table.Columns.Delay2', lable: '延时2', prop: 'nChatId7_1', type: 'input', show: true }, // 原列名：延时2
    { labelKey: 'BulletScreenEmojis.Table.Columns.Delay3', lable: '延时3', prop: 'nChatId7_2', type: 'input', show: true }, // 原列名：延时3
    { labelKey: 'BulletScreenEmojis.Table.Columns.Delay4', lable: '延时4', prop: 'nChatId7_3', type: 'input', show: true }, // 原列名：延时4
    { labelKey: 'BulletScreenEmojis.Table.Columns.Delay5', lable: '延时5', prop: 'nChatId7_4', type: 'input', show: true }, // 原列名：延时5
    // { labelKey: 'BulletScreenEmojis.Table.Columns.ViewFlop', lable: '看翻牌', prop: 'nChatId8', type: 'input', show: true }, // 原列名：看翻牌
    // { labelKey: 'BulletScreenEmojis.Table.Columns.ViewTurn', lable: '看转牌', prop: 'nChatId9', type: 'input', show: true }, // 原列名：看转牌
    // { labelKey: 'BulletScreenEmojis.Table.Columns.ViewRiver', lable: '看河牌', prop: 'nChatId10', type: 'input', show: true }, // 原列名：看河牌
    // {
    //   labelKey: 'BulletScreenEmojis.Table.Columns.NormalBarrage',
    //   lable: '普通弹幕',
    //   prop: 'nChatId11',
    //   type: 'input',
    //   show: true
    // }, // 原列名：普通弹幕
    // {
    //   labelKey: 'BulletScreenEmojis.Table.Columns.FancyBarrage',
    //   lable: '炫彩弹幕',
    //   prop: 'nChatId12',
    //   type: 'input',
    //   show: true
    // }, // 原列名：炫彩弹幕
    // {
    //   labelKey: 'BulletScreenEmojis.Table.Columns.LuxuryBarrage',
    //   lable: '土豪弹幕',
    //   prop: 'nChatId13',
    //   type: 'input',
    //   show: true
    // }, // 原列名：土豪弹幕
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.InsuranceDelay1',
      lable: '保险延时1',
      prop: 'nChatId19',
      type: 'input',
      show: true
    }, // 原列名：保险延时1
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.InsuranceDelay2',
      lable: '保险延时2',
      prop: 'nChatId19_1',
      type: 'input',
      show: true
    }, // 原列名：保险延时2
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.InsuranceDelay3',
      lable: '保险延时3',
      prop: 'nChatId19_2',
      type: 'input',
      show: true
    }, // 原列名：保险延时3
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.InsuranceDelay4',
      lable: '保险延时4',
      prop: 'nChatId19_3',
      type: 'input',
      show: true
    }, // 原列名：保险延时4
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.InsuranceDelay5',
      lable: '保险延时5',
      prop: 'nChatId19_4',
      type: 'input',
      show: true
    }, // 原列名：保险延时5
    // { labelKey: 'BulletScreenEmojis.Table.Columns.ViewHoleCards', lable: '看手牌', prop: 'nChatId20', type: 'input', show: true }, // 原列名：看手牌
    // { labelKey: 'BulletScreenEmojis.Table.Columns.PaidCut', lable: '付费切牌', prop: 'nChatId21', type: 'input', show: true }, // 原列名：付费切牌
    // { labelKey: 'BulletScreenEmojis.Table.Columns.ViewBoard', lable: '看公牌', prop: 'nChatId22', type: 'input', show: true } // 原列名：看公牌
  ])

  const tableConfigReal = ref([])
  const columnLabel = (item) => (item.labelKey ? t(item.labelKey) : item.lable)

  const addEditDialogRef = ref(null)
  const elSearchFormRef = ref()

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const tableLoading = ref(false)
  let origTableData = [] // 列表原数据，用来数据进行对比
  const searchInfo = ref({})
  const groupOptions = ref([])
  // 在组件挂载后执行
  onMounted(() => {
    const config = localStorage.getItem('emojis')
    if (config) {
      tableConfigReal.value = JSON.parse(config) // 获取配置

      // 初始化box数据
      tableConfig.value.forEach((item) => {
        item.show = tableConfigReal.value.find((i) => i.prop === item.prop) ? true : false
      })
    } else {
      boxValueChange()
    }
    getGroupOptions()
  })
  // 重置
  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }

  const handleInput = (row, prop) => {
    nextTick(() => {
      let value = row[prop].replace(/[^-0-9.]/g, '')
      row[prop] = value
    })
  }
  // 搜索
  const onSubmit = () => {
    elSearchFormRef.value?.validate(async (valid) => {
      if (!valid) return
      page.value = 1
      if (searchInfo.value.AccountType === '') {
        searchInfo.value.AccountType = null
      }
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

  const findeGtoupName = (id) => {
    const item = groupOptions.value.find((val) => val.GroupId === id)
    return item ? item.GroupName : ''
  }
  const getGroupOptions = async () => {
    try {
      const res = await getGlobalGroupingApi()
      if (res.code === 0) {
        groupOptions.value = res.data.list || []
      }
    } catch (error) {
      console.error(t('BulletScreenEmojis.Messages.FetchGroupFailed'), error)
    }
  }
  // input 点击了enter键
  const handleEnter = (item, valProp, val, index) => {
    // 输入值发生了变化
    if (origTableData[index][valProp] !== val) {
      ElMessageBox({
        title: t('Common.Hint'),
        message: h('p', null, [
          h('span', null, t('BulletScreenEmojis.Messages.UpdateConfirmPrefix')), // 是否修改当前数据为
          h('span', { style: 'color: red' }, `${val}`),
          h('span', null, t('BulletScreenEmojis.Messages.UpdateConfirmSuffix')) // ？
        ]),
        showCancelButton: true,
        confirmButtonText: t('Common.Confirm'),
        cancelButtonText: t('Common.Cancel'),
        beforeClose: async (action, instance, done) => {
          item[valProp] = +val

          console.log('action', action)
          Object.keys(item).forEach((i) => (item[i] = +item[i])) // 转数字
          if (action === 'confirm') {
            const res = await updateExpression(item)
            if (res.code === 0) {
              ElMessage.success(t('BulletScreenEmojis.Messages.UpdateSuccess')) // 更新成功!
            } else {
              tableData.value[index][valProp] = origTableData[index][valProp]
            }
          }

          // 取消
          if (action === 'cancel') {
            tableData.value[index][valProp] = origTableData[index][valProp]
          }
          done()
        }
      })
        .then(({ value }) => {})
        .catch(() => {
          console.log('关闭')
        })
    }
  }
  // 查询
  const getTableData = async () => {
    tableLoading.value = true
    try {
      const table = await getExpressionList({
        page: page.value,
        pageSize: pageSize.value,
        ...searchInfo.value
      })
      if (table.code === 0) {
        tableData.value = parseAndFlattenJSONValue(table.data.list || [])
        origTableData = parseAndFlattenJSONValue(table.data.list || [])
        total.value = table.data.total
        page.value = table.data.page
        pageSize.value = table.data.pageSize
      }
    } finally {
      tableLoading.value = false
    }
  }

  getTableData()

  // 获取需要的字典 可能为空 按需保留
  const setOptions = async () => {}

  // 获取需要的字典 可能为空 按需保留
  setOptions()

  // 弹窗控制标记
  const dialogFormVisible = ref(false)

  // 打开弹窗
  const openDialog = () => {
    addEditDialogRef.value?.open()
  }

  // 筛选配置
  const boxValueChange = () => {
    tableConfigReal.value = tableConfig.value.filter((val) => val.show)
    localStorage.setItem('emojis', JSON.stringify(tableConfigReal.value))
  }

  const handleDialogConfirm = () => {
    getTableData()
  }

  const handleDialogClose = () => {
    dialogFormVisible.value = false
  }

  const deleteApiFunc = async (row) => {
    ElMessageBox.confirm(t('BulletScreenEmojis.Messages.DeleteConfirm'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await deleteExpression({ nGroupId: row.nGroupId })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('BulletScreenEmojis.Messages.DeleteSuccess')
        })
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }
</script>

<style lang="scss" scoped>
  :deep(.customInput) {
    --el-input-focus-border-color: #3b82f6;
    --el-input-border-color: transparent;
    --el-input-hover-border-color: transparent;
    background: transparent;
  }
</style>
