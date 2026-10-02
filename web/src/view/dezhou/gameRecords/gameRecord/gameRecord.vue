<template>
  <div>
    <div class="gva-search-box">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        :model="searchInfo"
        class="demo-form-inline"
        @keyup.enter="onSubmit"
      >
        <!-- 原: 查询区域 -->
        <!-- 原: 牌局ID -->
        <el-form-item :label="$t('GameRecord.PaiJuID')" prop="paiJuId">
          <!-- 原: 请输入牌局ID -->
          <el-input v-model="searchInfo.paiJuId" :placeholder="$t('GameRecord.PlaceholderPaiJuID')" clearable style="width: 240px" />
        </el-form-item>
        <!-- 牌局名称 -->
        <el-form-item :label="$t('GameRecord.PaiJuName')" prop="TableName">
          <el-input v-model="searchInfo.TableName" :placeholder="$t('GameRecord.PlaceholderPaiJuName')" clearable style="width: 240px" />
        </el-form-item>
        <!-- 原: 玩家ID -->
        <el-form-item :label="$t('GameRecord.PlayerID')" prop="userId">
          <!-- 原: 请输入玩家ID -->
          <el-input v-model="searchInfo.userId" :placeholder="$t('GameRecord.PlaceholderPlayerID')" clearable style="width: 240px" />
        </el-form-item>

        <!-- 原: 游戏名称 1.1改为游戏类型-->
        <el-form-item :label="$t('GameRecord.GameType')" prop="gameId">
          <!-- 原: 请选择游戏名称 1.1改为请选择游戏类型-->
          <el-select v-model="searchInfo.gameId" :placeholder="$t('GameRecord.PlaceholderGameType')" clearable style="width: 240px">
            <el-option v-for="(item, index) in gameOptions" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <!-- 游戏类型 -->
        <!-- <el-form-item :label="$t('GameRecord.GameType')" prop="gameType">
          <el-select v-model="searchInfo.gameType" :placeholder="$t('GameRecord.PlaceholderGameType')" clearable style="width: 240px">
            <el-option label="德州扑克" value="Texas" />
            <el-option label="短牌德州" value="ShortDeck" />
          </el-select>
        </el-form-item> -->

        <!-- 牌局结束时间 -->
        <el-form-item :label="$t('GameRecord.GameEndTime')" prop="paiJuEndTimeRange">
          <el-date-picker
            style="width: 300px"
            clearable
            v-model="searchInfo.paiJuEndTimeRange"
            type="daterange"
            :range-separator="$t('GameRecord.RangeSeparator')"
            :start-placeholder="$t('GameRecord.StartTime')"
            :end-placeholder="$t('GameRecord.EndTime')"
          />
        </el-form-item>

        <!-- 原: 操作时间 -->
        <el-form-item :label="$t('GameRecord.OperateTime')" prop="createdAtRange">
          <el-date-picker
            style="width: 300px"
            clearable
            v-model="searchInfo.createdAtRange"
            type="daterange"
            :range-separator="$t('GameRecord.RangeSeparator')"
            :start-placeholder="$t('GameRecord.StartTime')"
            :end-placeholder="$t('GameRecord.EndTime')"
            format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <!-- 原: 查询 -->
          <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
          <!-- 原: 重置 -->
          <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list" style="display: flex; justify-content: space-between;">
        <!-- <el-button type="primary" icon="plus" @click="openDialog()">新增</el-button>
        <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete"
          >删除</el-button
        >-->
        <div>
          <el-button icon="download" type="primary" :disabled="!multipleSelection.length" @click="onDownloadRecord()">导出</el-button>
        </div>
        <el-dropdown :hide-on-click="false" style="margin-right: 10px">
          <span class="el-dropdown-link">
            <el-icon :size="20"><Operation /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu style="max-height: 400px">
              <el-dropdown-item v-for="value in tableConfig" :key="value.prop">
                <el-checkbox v-model="value.show" @change="boxValueChange" :label="value.lable" size="small" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
        <el-table-column align="center" type="selection" width="55" />
        <!-- 原: 序号 -->
        <el-table-column align="center" :label="$t('GameRecord.Index')" type="index" width="70" />
        <el-table-column
          align="center"
          :sortable="value.sortable"
          :min-width="value.width"
          :prop="value.prop"
          :key="value.prop"
          :label="value.lable"
          v-for="value in tableConfigReal"
        >
          <template #default="scope">
            <span
              v-if="value.prop === 'WinLose'"
              :style="{ color: scope.row.WinLose > 0 ? 'red' : scope.row.WinLose < 0 ? 'green' : '#fff' }"
              >{{ Math.round(scope.row.WinLose * 100) / 100 }}</span
            >
            <span v-else-if="value.prop === 'CreatetTime'">{{ formatDate(scope.row.CreatetTime) }}</span>
            <span v-else>{{ scope.row[value.prop] }}</span>
          </template>
        </el-table-column>

        <!-- 原: 操作 -->
        <el-table-column align="center" header-align="center" :label="$t('GameRecord.Actions')" fixed="right" :min-width="120">
          <template #default="scope">
            <!-- 原: 查看 -->
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
              <el-icon style="margin-right: 5px"><InfoFilled /></el-icon>{{ $t('GameRecord.View') }}</el-button>
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

    <!-- 详情抽屉 -->
    <GameDetailDrawer v-if="detailShow" v-model="detailShow" :detail-data="detailForm" @close="closeDetailShow" />
  </div>
</template>

<script setup>
  import { ref, onMounted, watch  } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { formatDate } from '@/utils/format'
  import { getPaiJuRecordList, exportPaiJuWinLoseRecord } from '@/api/dezhou/paiJuWinLoseRecord'
  import { getUserTreasureRecordList } from '@/api/dezhou/propertyRecords'
  import GameDetailDrawer from './components/GameDetailDrawer.vue'
  import { ElMessage } from 'element-plus'

  defineOptions({ name: 'PropertyRecord' })
  const { t, locale  } = useI18n()
  // 控制更多查询条件显示/隐藏状态
  const detailShow = ref(false)
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const multipleSelection = ref([])
  const searchInfo = ref({
    userId: undefined,
    paiJuId: undefined,
    gameId: undefined,
    createdAtRange: []
  })
  const initTableConfig = () => {
    return [
      // 原: 牌局ID
    { lable: t('GameRecord.PaiJuID'), prop: 'PaiJuId', show: true, width: 120, sortable: false },
    // 原: 玩家ID
    { lable: t('GameRecord.PlayerID'), prop: 'UserID', show: true, width: 120, sortable: false },
    // 原: 游戏名称 1.1改为游戏类型
    { lable: t('GameRecord.GameType'), prop: 'GameID', show: true, width: 120, sortable: false },
    // 原: 牌桌名称
    { lable: t('GameRecord.TableName'), prop: 'TableName', show: true, width: 150, sortable: false },
    // 原: 场次
    { lable: t('GameRecord.RoomID'), prop: 'RoomID', show: true, width: 120, sortable: true },
    // 原: 输赢
    { lable: t('GameRecord.WinLose'), prop: 'WinLose', show: true, width: 120, sortable: true },
    // 原: 牌桌ID
    { lable: t('GameRecord.TableId'), prop: 'TableId', show: true, width: 120, sortable: false },
    // 原: 时间
    { lable: t('GameRecord.Time'), prop: 'CreatetTime', show: true, width: 150, sortable: false },
    // 牌局时长
    { lable: t('GameRecord.GameLong'), prop: 'PaiJuDuration', show: true, width: 120, sortable: false },
    // 买入
    { lable: t('GameRecord.BuyIn'), prop: 'XiaZhu', show: true, width: 120, sortable: false },
    // 本局手数
    { lable: t('GameRecord.TurnHands'), prop: 'HandCount', show: true, width: 120, sortable: false },
    // // 各增值费
    // { lable: t('GameRecord.AdditionalFee'), prop: 'AdditionalFee', show: true, width: 120, sortable: false },
    ]
  }

  const tableConfig = ref(initTableConfig())

  watch(locale, () => {
  // 重新初始化tableConfig
  tableConfig.value = initTableConfig()

  // 更新gameOptions
  gameOptions.value = [
    { label: t('GameRecord.GameOptionDeZhou'), value: 125 },
    { label: t('GameRecord.GameOptionShort'), value: 175 }
  ]

  // 重新筛选显示的列
  boxValueChange()
})

  const tableConfigReal = ref([])
  const elSearchFormRef = ref()
  const detailForm = ref({})
  const getTableData = async () => {
    const res = await getPaiJuRecordList({
      page: page.value,
      pageSize: pageSize.value,
      ...searchInfo.value
    })
    if (res.code === 0) {
      if (!res.data.list || res.data.list.length === 0) {
        tableData.value = []
        total.value = 0
        return
      }
      tableData.value = res.data.list.map(item => ({
        ...item,
        PaiJuDuration: item.ClubPlayBackData && typeof item.ClubPlayBackData.PlayBackData === 'string' ? JSON.parse(item.ClubPlayBackData.PlayBackData).nOperateTime : '',
        HandCount: item.ClubPlayBackData && typeof item.ClubPlayBackData.PlayBackData === 'string' ? JSON.parse(item.ClubPlayBackData.PlayBackData).arrEvent ? JSON.parse(item.ClubPlayBackData.PlayBackData).arrEvent.length : '' : '',
      }))
      total.value = res.data.total
    }
  }
import { useRoute } from 'vue-router';

const route = useRoute(); // 获取当前路由信息
  // 在组件挂载后执行
  onMounted(() => {
    const config = localStorage.getItem('gameRecord')
    if (config) {
      tableConfigReal.value = JSON.parse(config) // 获取配置
      // 初始化box数据
      tableConfig.value.forEach((item) => {
        item.show = tableConfigReal.value.find((i) => i.prop === item.prop) ? true : false
      })
    } else {
      boxValueChange()
    }


    // 从牌局过来直接搜索
  const paiJuId = route.query.PaiJuId;
  // 若需要根据参数请求数据
  if (paiJuId) {
   console.log('传递的牌局ID有值:', paiJuId); // 输出传递的 row 值
   searchInfo.value.paiJuId = paiJuId;
    getTableData()
  }
   getTableData()
  })


  
  // 筛选配置
  const boxValueChange = () => {
    tableConfigReal.value = tableConfig.value.filter((val) => val.show)
    localStorage.setItem('gameRecord', JSON.stringify(tableConfigReal.value))
  }

  const gameOptions = ref([
    // 原: 德州
    { label: t('GameRecord.GameOptionDeZhou'), value: 125 },
    // 原: 短牌
    { label: t('GameRecord.GameOptionShort'), value: 175 }
  ])

  const onSubmit = () => getTableData()
  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }
  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }
  const handleSelectionChange = (val) => (multipleSelection.value = val)

  const getDetails = async (row) => {
    detailForm.value = row
    detailShow.value = true
  }
  const closeDetailShow = () => {
    detailShow.value = false
    detailForm.value = {}
  }


  // 导出功能
  const multipleTable = ref(null)
  const onDownloadRecord = () => {
    const ids = multipleSelection.value.map((item) => item.id)
    
    
    exportPaiJuWinLoseRecord({ RecordID: JSON.stringify(ids), isExport: 1 }).then((res) => {
      if (res.code === 0) {
        window.open(`${import.meta.env.VITE_BASE_URl}${res.data.filename}`)
        ElMessage.success('导出成功')
        multipleTable.value.clearSelection()
      }
    }).catch(() => {
      ElMessage.error('导出失败')
    })
  }


</script>

<style scoped>
  .gva-search-box {
    margin-bottom: 20px;
  }
  .gva-btn-list {
    margin-bottom: 10px;
  }
</style>
