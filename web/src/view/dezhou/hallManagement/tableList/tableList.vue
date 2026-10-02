<template>
  <div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <!-- 原按钮：新增 -->
        <el-button type="primary" icon="plus" @click="openDialog()">{{ $t('HallTableList.Actions.Create') }}</el-button>
      </div>
      <el-icon :size="20" style="float: right; font-size: 33px" class="show-col-btn">
        <el-popover placement="bottom" trigger="hover" width="80">
          <template #reference>
            <el-icon :size="20"><Operation /></el-icon>
          </template>
          <div>
            <!-- 原列：分组ID、游戏ID、牌桌名称、牌桌ID、小盲、大盲、前注、抽水类型、抽水方式、玩家数量、当前机器人数 -->
            <el-checkbox-group v-model="checkedColumns" @change="watchCheckedColumns" class="checkbox-wrap">
              <el-checkbox
                size="large"
                style="display: block"
                v-for="item in checkBoxGroup"
                :key="item.key"
                :label="item.key"
              >
                {{ $t(item.labelKey) }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-popover>
      </el-icon>

      <el-table
        v-adaptive="{ bottomOffset: 100 }"
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="UserID"
        @selection-change="handleSelectionChange"
      >
        <!-- 原列：序号 -->
        <el-table-column align="center" type="index" width="70" :label="$t('HallTableList.Table.Index')" />
        <!-- <el-table-column type="selection" width="55" /> -->
        <!-- 原列：对局状态-->
        <el-table-column
          v-if="colData[5].istrue"
          sortable
          align="center"
          key="Math.random()"
          label="对局状态"
          min-width="100"
          prop="nBigBlind"
        >
          <template #default="scope">
       -
          </template>
        </el-table-column>

        <!-- 原列：分组ID -->
        <el-table-column
          v-if="colData[0].istrue"
          align="center"
          key="Math.random()"
          :label="$t('HallTableList.Table.GroupId')"
          prop="nGroupId"
          min-width="100"
        />
        <!-- 原列：游戏ID -->
        <el-table-column
          v-if="colData[1].istrue"
          align="center"
          key="Math.random()"
          :label="$t('HallTableList.Table.GameId')"
          prop="nGameId"
          min-width="100"
        />
        <!-- 原列：牌桌名称 -->
        <el-table-column
          v-if="colData[2].istrue"
          align="center"
          key="Math.random()"
          :label="$t('HallTableList.Table.TableName')"
          prop="sTableName"
          min-width="200"
        >
          <template #default="scope">
            <span>{{ $decodeBase64(scope.row.sTableName) }}</span>
          </template>
        </el-table-column>
        <!-- 原列：牌桌ID -->
        <el-table-column
          v-if="colData[3].istrue"
          align="center"
          key="Math.random()"
          :label="$t('HallTableList.Table.TableId')"
          prop="sTableId"
          min-width="200"
        >
        </el-table-column>
        <!-- 原列：小盲 -->
        <el-table-column
          v-if="colData[4].istrue"
          sortable
          align="center"
          key="Math.random()"
          :label="$t('HallTableList.Table.SmallBlind')"
          min-width="100"
          prop="nSmallBlind"
        />
        <!-- 原列：大盲 -->
        <el-table-column
          v-if="colData[5].istrue"
          sortable
          align="center"
          key="Math.random()"
          :label="$t('HallTableList.Table.BigBlind')"
          min-width="100"
          prop="nBigBlind"
        />
        <!-- 原列：前注 -->
        <el-table-column
          v-if="colData[6].istrue"
          sortable
          align="center"
          key="Math.random()"
          :label="$t('HallTableList.Table.PreAnte')"
          min-width="100"
          prop="nPreAnte"
        />
        <!-- 原列：抽水类型 -->
        <el-table-column
          v-if="colData[7].istrue"
          sortable
          align="center"
          key="Math.random()"
          :label="$t('HallTableList.Table.ModeType')"
          min-width="150"
          prop="nModeType"
        >
          <template #default="scope">
            {{ formatModeType(scope.row.nModeType) }}
          </template>
        </el-table-column>
        <!-- 原列：抽水方式 -->
        <el-table-column
          v-if="colData[8].istrue"
          align="center"
          key="Math.random()"
          :label="$t('HallTableList.Table.ComputeMode')"
          min-width="150"
          prop="nComputeMode"
        >
          <template #default="scope">
            {{ formatComputeMode(scope.row.nComputeMode) }}
          </template>
        </el-table-column>

        <!-- 原列：玩家数量 -->
        <el-table-column
          v-if="colData[9].istrue"
          align="center"
          key="Math.random()"
          sortable
          :label="$t('HallTableList.Table.UsersCount')"
          prop="nUsersCnt"
          min-width="120"
        />
        <!-- 原列：当前机器人数 -->
        <el-table-column
          v-if="colData[10].istrue"
          align="center"
          key="Math.random()"
          sortable
          :label="$t('HallTableList.Table.AndroidCount')"
          prop="nAndroidCnt"
          min-width="150"
        />
        <!-- 新增列：是否机器人桌 -->
        <el-table-column
          v-if="colData[11].istrue"
          align="center"
          key="Math.random()"
          :label="$t('HallTableList.Table.IsRobotTable')"
          prop="isRobotTable"
          min-width="120"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.isRobotTable" type="warning" size="small">
              {{ $t('HallTableList.Table.RobotTableYes') }}
            </el-tag>
            <el-tag v-else type="info" size="small">
              {{ $t('HallTableList.Table.RobotTableNo') }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 原列：操作 -->
        <el-table-column align="center" :label="$t('HallTableList.Table.Actions')" fixed="right" min-width="280">
          <template #default="scope">
            <!-- 原操作：详情 -->
            <el-button type="primary" link icon="view" @click="handleDetail(scope.row)">{{ $t('HallTableList.Actions.ViewDetail') }}</el-button>
            <!-- 新增操作：查看牌局 -->
            <el-button type="primary" link icon="Tickets" @click="handleViewGamePlays(scope.row)">{{ $t('HallTableList.Actions.ViewGamePlays') }}</el-button>
            <!-- 原操作：关闭牌桌 -->
            <el-button type="primary" link icon="CircleCloseFilled" @click="deleteRow(scope.row)">{{
              $t('HallTableList.Actions.CloseTable')
            }}</el-button>
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
    <!-- 新增/编辑抽屉 -->
    <!-- 原标题：新增/编辑 -->
    <AddEditTableDialog
      ref="addEditDialogRef"
      v-model="dialogFormVisible"
      :title="type === 'create' ? $t('HallTableList.Dialog.CreateTitle') : $t('HallTableList.Dialog.EditTitle')"
      :type="type"
      @confirm="handleDialogConfirm"
      @close="handleDialogClose"
    />

    <DetailTableDialog
      ref="detailDialogRef"
      v-model="detailDialogVisible"
      :title="detailDialogTitle"
      @close="handleDetailDialogClose"
    />

    <GamePlaysList ref="gamePlaysListRef" />

    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="detailShow"
      :show-close="true"
      :before-close="closeDetailShow"
      title="查看"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item label="用户ID">
          {{ detailForm.UserID }}
        </el-descriptions-item>
        <el-descriptions-item label="用户账号">
          {{ detailForm.Accounts }}
        </el-descriptions-item>
        <el-descriptions-item label="密码">
          {{ detailForm.Password }}
        </el-descriptions-item>
        <el-descriptions-item label="昵称">
          {{ detailForm.NickName }}
        </el-descriptions-item>
        <el-descriptions-item label="头像">
          {{ detailForm.FaceID }}
        </el-descriptions-item>
        <el-descriptions-item label="性别  0：男，1: 女">
          {{ detailForm.Sex }}
        </el-descriptions-item>
        <el-descriptions-item
          label="账号类型   1、普通账号(输入账号密码登陆的)
2 测试账号、0 游客、4观察账号"
        >
          {{ detailForm.AccountType }}
        </el-descriptions-item>
        <el-descriptions-item label="登入机型">
          {{ detailForm.PhoneType }}
        </el-descriptions-item>
        <el-descriptions-item label="操作系统版本号	记录玩家系统版本">
          {{ detailForm.SysVersion }}
        </el-descriptions-item>
        <el-descriptions-item label="机器码	登入机器的机器码(俱乐部2.3版本用作推广码)">
          {{ detailForm.Models }}
        </el-descriptions-item>
        <el-descriptions-item
          label="账号注册渠道
1.官网；2AppStore；3应用宝；4….预留扩展其他渠道，如小米应用商城，华为应用商城
"
        >
          {{ detailForm.RegistChannel }}
        </el-descriptions-item>
        <el-descriptions-item
          label="登录渠道
1.官网；2AppStore；3应用宝；4….预留扩展其他渠道，如小米应用商城，华为应用商城
"
        >
          {{ detailForm.LogonChannel }}
        </el-descriptions-item>
        <el-descriptions-item label="分店id(渠道id)：  该id 是获取 群组中的游戏配置">
          {{ detailForm.ShopID }}
        </el-descriptions-item>
        <el-descriptions-item
          label="登入IP ：
最近登陆的时间，另外这个变化可以在用户登陆日志（后台可查）中查出最近3个月的登陆记录或者最近100条登陆记录（ID，昵称，登入渠道，登入机型，机器码，IP，时间）
"
        >
          {{ detailForm.LogongIP }}
        </el-descriptions-item>
        <el-descriptions-item label="注册IP">
          {{ detailForm.RegistIP }}
        </el-descriptions-item>
        <el-descriptions-item label="注册时间">
          {{ detailForm.RegisTime }}
        </el-descriptions-item>
        <el-descriptions-item
          label="登入时间	最近登陆的时间，另外这个变化可以在用户登陆日志（后台可查）中查出最近3个月的登陆记录或者最近100条登陆记录（ID，昵称，登入渠道，登入机型，机器码，IP，时间）
"
        >
          {{ detailForm.LogonTime }}
        </el-descriptions-item>
        <el-descriptions-item label="绑定手机：预留">
          {{ detailForm.BinDingPHone }}
        </el-descriptions-item>
        <el-descriptions-item label="实名认证： 0 :未认证，>0 ,认证ID（后台根据ID查询身份证和姓名）">
          {{ detailForm.RealName }}
        </el-descriptions-item>
        <el-descriptions-item label="在应用下的唯一ID">
          {{ detailForm.WeiXinOpenID }}
        </el-descriptions-item>
        <el-descriptions-item label="用户在我们公司账号下的全局唯一ID">
          {{ detailForm.WeiXinUnionID }}
        </el-descriptions-item>
        <el-descriptions-item label="头像Url">
          {{ detailForm.HeadUrl }}
        </el-descriptions-item>
        <el-descriptions-item label="是否机器人  0:不是  1是">
          {{ detailForm.IsAndroid }}
        </el-descriptions-item>
        <el-descriptions-item label="银行密码">
          {{ detailForm.SafePassWord }}
        </el-descriptions-item>
        <el-descriptions-item label="分店账号">
          {{ detailForm.ShopAccount }}
        </el-descriptions-item>
        <el-descriptions-item label="渠道id">
          {{ detailForm.ChannelID }}
        </el-descriptions-item>
        <el-descriptions-item label="0 普通用户   1001 主播">
          {{ detailForm.UserMark }}
        </el-descriptions-item>
        <el-descriptions-item label="登录的经纬度 json格式 [经度,纬度]">
          {{ detailForm.LogonPos }}
        </el-descriptions-item>
        <el-descriptions-item label="客户端版本号">
          {{ detailForm.ClientVersion }}
        </el-descriptions-item>
        <el-descriptions-item label="服务端版本号">
          {{ detailForm.ServerVersion }}
        </el-descriptions-item>
        <el-descriptions-item label="设备型号">
          {{ detailForm.DeviceModel }}
        </el-descriptions-item>
        <el-descriptions-item label="上次登录的真实外网ip">
          {{ detailForm.LogonRealIP }}
        </el-descriptions-item>
        <el-descriptions-item label="邀请码">
          {{ detailForm.InviteCode }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          {{ detailForm.Mail }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
  import { findAccountsInFo } from '@/api/dezhou/accountsInFo'

  import {
    getClubCreateTableListApi,
    updateClubTableConfigEditApi,
    closeClubRoomApi
  } from '@/api/dezhou/clubCreateTableList'
  import { parseAndFlattenJSONValue } from '@/utils/format'

  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, reactive, computed, onMounted, watch } from 'vue'
  import { useAppStore } from '@/pinia'
  import AddEditTableDialog from './components/AddEditTableDialog.vue'
  import DetailTableDialog from './components/DetailTableDialog.vue'
  import GamePlaysList from './components/GamePlaysList.vue'
  import { useI18n } from 'vue-i18n'

  defineOptions({
    name: 'tableList'
  })

  const appStore = useAppStore()
  const { t, locale } = useI18n()

  const addEditDialogRef = ref(null)
  const detailDialogRef = ref(null)
  const gamePlaysListRef = ref(null)
  const elSearchFormRef = ref()

  const detailDialogVisible = ref(false)
  const detailDialogTitle = ref(t('HallTableList.Dialog.DetailTitle')) // 查看牌桌详情

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

  const formatModeType = (type) => {
    const typeMap = {
      0: t('HallTableList.ModeType.None'),
      1: t('HallTableList.ModeType.Hand'),
      3: t('HallTableList.ModeType.Round')
    }
    return typeMap[type] || type
  }

  const formatComputeMode = (mode) => {
    const modeMap = {
      0: t('HallTableList.ComputeMode.Pot'),
      1: t('HallTableList.ComputeMode.Profit')
    }
    return modeMap[mode] || mode
  }

  // 查询
  const getTableData = async () => {
    const table = await getClubCreateTableListApi({
      page: page.value,
      pageSize: pageSize.value,
      ...searchInfo.value
    })
    if (table.code === 0) {
      tableData.value = parseAndFlattenJSONValue(table.data.list || [])
      total.value = table.data.total
      page.value = table.data.page
      pageSize.value = table.data.pageSize
    }
  }



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
    ElMessageBox.confirm(t('HallTableList.Messages.DeleteConfirm'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(() => {
      deleteAccountsInFoFunc(row)
    })
  }


  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('')

  // 删除行
  const deleteAccountsInFoFunc = async (row) => {
    console.log(row)

    const res = await closeClubRoomApi({
      sTableId: row.sTableId,
      nGroupId: row.nGroupId
    })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('HallTableList.Messages.DeleteSuccess')
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
    addEditDialogRef.value?.open()
  }

  const handleDialogConfirm = () => {
    getTableData()
  }

  const handleDialogClose = () => {
    dialogFormVisible.value = false
  }

  const handleDetail = (row) => {
    detailDialogTitle.value = t('HallTableList.Dialog.DetailTitle')
    detailDialogRef.value?.open(row)
  }

  const handleDetailDialogClose = () => {
    detailDialogVisible.value = false
  }

  // 查看牌局
  const handleViewGamePlays = (row) => {
    gamePlaysListRef.value?.open(row)
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
    const res = await findAccountsInFo({ UserID: row.UserID })
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

  //用于存放随机数用于key属性的绑定
  var reload = ref()

  // 多选框的列表，列出表格的每一列
  const columnDefinitions = [
    { key: 'groupId', labelKey: 'HallTableList.Table.GroupId' },
    { key: 'gameId', labelKey: 'HallTableList.Table.GameId' },
    { key: 'tableName', labelKey: 'HallTableList.Table.TableName' },
    { key: 'tableId', labelKey: 'HallTableList.Table.TableId' },
    { key: 'smallBlind', labelKey: 'HallTableList.Table.SmallBlind' },
    { key: 'bigBlind', labelKey: 'HallTableList.Table.BigBlind' },
    { key: 'preAnte', labelKey: 'HallTableList.Table.PreAnte' },
    { key: 'modeType', labelKey: 'HallTableList.Table.ModeType' },
    { key: 'computeMode', labelKey: 'HallTableList.Table.ComputeMode' },
    { key: 'usersCount', labelKey: 'HallTableList.Table.UsersCount' },
    { key: 'androidCount', labelKey: 'HallTableList.Table.AndroidCount' },
    { key: 'isRobotTable', labelKey: 'HallTableList.Table.IsRobotTable' }
  ]

  const legacyTitleToKey = {
    分组ID: 'groupId',
    游戏ID: 'gameId',
    牌桌名称: 'tableName',
    牌桌ID: 'tableId',
    小盲: 'smallBlind',
    大盲: 'bigBlind',
    前注: 'preAnte',
    抽水类型: 'modeType',
    抽水方式: 'computeMode',
    玩家数量: 'usersCount',
    当前机器人数: 'androidCount',
    是否机器人桌: 'isRobotTable'
  }

  // 当前选中的多选框，代表当前展示的列
  const checkedColumns = ref(columnDefinitions.map((col) => col.key))

  // colData中列出表格中的每一列，默认都展示
  const colData = reactive(columnDefinitions.map((col) => ({ ...col, istrue: true })))

  const checkBoxGroup = computed(() => colData.map((col) => ({ key: col.key, labelKey: col.labelKey })))

  // 监听checkedColumns的变化，当checkedColumns发生变化时，重新渲染表格
  const watchCheckedColumns = () => {
    colData.forEach((item) => {
      item.istrue = checkedColumns.value.includes(item.key)
    })
    localStorage.setItem('tableList', JSON.stringify(colData.map((item) => ({ key: item.key, istrue: item.istrue })))) // 保存列表

    // 重新渲染表格
    reload.value = Math.random()
  }

  // 在组件挂载后执行
  onMounted(() => {
    const config = localStorage.getItem('tableList')
    if (config) {
      try {
        const parsed = JSON.parse(config)
        if (Array.isArray(parsed) && parsed.length) {
          const visibleKeys = parsed
            .map((item) => {
              if (typeof item === 'string') {
                return legacyTitleToKey[item] || item
              }
              if (item && typeof item === 'object') {
                if (item.key) {
                  return item.key
                }
                if (item.title) {
                  return legacyTitleToKey[item.title]
                }
              }
              return null
            })
            .filter((key) => key && columnDefinitions.some((col) => col.key === key))

          if (visibleKeys.length) {
            colData.forEach((item) => {
              item.istrue = visibleKeys.includes(item.key)
            })
            checkedColumns.value = colData.filter((item) => item.istrue).map((item) => item.key)
          }
        }
      } catch (error) {
        console.warn('Failed to parse tableList config', error)
      }
    }

    watchCheckedColumns()

    getTableData()
  })

  watch(
    () => locale.value,
    () => {
      detailDialogTitle.value = t('HallTableList.Dialog.DetailTitle')
    }
  )
</script>

<style></style>
