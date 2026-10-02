<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="searchForm" :inline="true" :model="searchInfo" @keyup.enter="onSubmit">
        <!-- 俱乐部桌子配置 -->
        <el-form-item :label="$t('ClubTableSetup.Search.GroupLabel')">
          <el-select
            v-model="searchInfo.GroupId"
            clearable
            :placeholder="$t('ClubTableSetup.Search.SelectPlaceholder')"
            style="width: 240px"
          >
            <el-option v-for="item in apiGroupOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 游戏 -->
        <el-form-item :label="$t('ClubTableSetup.Search.GameLabel')">
          <el-select
            v-model="searchInfo.GameId"
            clearable
            :placeholder="$t('ClubTableSetup.Search.SelectPlaceholder')"
            style="width: 240px"
          >
            <el-option
              v-for="item in methodOptions"
              :key="item.value"
              :label="`${item.label}(${item.value})`"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- 查询 -->
          <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
          <!-- 重置 -->
          <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <!-- 新增 -->
        <el-button type="primary" icon="plus" @click="openDialog">{{ $t('ClubTableSetup.Actions.Add') }}</el-button>
        <!-- <el-button icon="delete" :disabled="!apis.length" @click="onDelete"> 删除 </el-button> -->
      </div>
      <div>
        <el-table v-adaptive="{ bottomOffset: 100 }" :data="tableData" @sort-change="sortChange">
          <!-- 序号 -->
          <el-table-column type="index" align="center" :label="$t('ClubTableSetup.Table.Index')" width="70" />
          <!-- 分组 -->
          <el-table-column
            align="center"
            :label="$t('ClubTableSetup.Table.Group')"
            min-width="100"
            prop="GroupID"
            :formatter="(row) => `${apiGroupMap[row.GroupID]}(${row.GroupID})` || row.GroupID"
          />
          <!-- 游戏 -->
          <el-table-column
            align="center"
            :label="$t('ClubTableSetup.Table.Game')"
            min-width="150"
            prop="GameID"
            :formatter="(row) => `${methodOptionsMap[row.GameID]}(${row.GameID})` || row.GameID"
          />

          <!-- <el-table-column align="left" label="人数" min-width="150" prop="arrCapacityOption" />
          <el-table-column align="left" label="房间时长" min-width="150" prop="arrKeepTimeOption"/>
          <el-table-column align="left" label="代入筹码倍数" min-width="150" prop="arrTakeinOption" />
          <el-table-column
            align="left"
            label="入场率"
            min-width="150"
            prop="arrPoolEntryRateOption"
          />

          <el-table-column align="left" label="抽水封顶" min-width="150" prop="arrDWLimitOption" />

          <el-table-column
            align="left"
            label="小盲,大盲,默认带入,前注"
            prop="arrClubAnteOption"
            min-width="280"
            :show-overflow-tooltip="true"
          /> -->
          <!-- 常规保险 -->
          <el-table-column
            align="center"
            :label="$t('ClubTableSetup.Table.OddsTable')"
            min-width="350"
            prop="arrOddsTable"
            :show-overflow-tooltip="true"
          />
          <!-- 操作 -->
          <el-table-column align="center" fixed="right" header-align="center" :label="$t('ClubTableSetup.Table.Actions')" :min-width="120">
            <template #default="scope">
              <!-- 编辑 -->
              <el-button icon="edit" type="primary" link @click="editApiFunc(scope.row)">{{ $t('ClubTableSetup.Actions.Edit') }}</el-button>
              <!-- 删除 -->
              <el-button icon="delete" type="primary" link @click="deleteApiFunc(scope.row)">{{ $t('ClubTableSetup.Actions.Delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="gva-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <!-- 新增/编辑抽屉 -->
    <AddEditDialog
      ref="addEditDialogRef"
      v-model="dialogFormVisible"
      :title="dialogTitle"
      :group-options="apiGroupOptions"
      :game-options="methodOptions"
      :typeVal="type"
      @confirm="handleConfirm"
      @close="handleDialogClose"
    />
  </div>
</template>

<script setup>
  import { getClubTableApi } from '@/api/dezhou/clubTablesetup'
  import { toSQLLine } from '@/utils/stringFun'
  import AddEditDialog from './components/AddEditDialog.vue'
  import { ref, onMounted } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { getGlobalGroupingApi, getGlobalGameApi } from '@/api/dezhou/global'
  import { deleteClubTableConfApi } from '@/api/dezhou/clubTablesetup'
  import { useAppStore } from '@/pinia'
  import { useI18n } from 'vue-i18n'

  defineOptions({
    name: 'tableConfiguration'
  })

  const appStore = useAppStore()
  const { t } = useI18n()

  const methodOptions = ref([])
  const methodOptionsMap = ref({})

  const type = ref('')

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})
  const apiGroupOptions = ref([])
  const apiGroupMap = ref({})

  const getGroup = async () => {
    const res = await getGlobalGroupingApi()
    if (res.code === 0) {
      const groups = res.data.list || []
      apiGroupOptions.value = groups.map((item) => ({
        label: item.GroupName,
        value: item.GroupId
      }))
      apiGroupMap.value = groups.reduce((acc, cur) => {
        acc[cur.GroupId] = cur.GroupName
        return acc
      }, {})
    }
  }
  const getGameList = async () => {
    const res = await getGlobalGameApi()
    if (res.code === 0) {
      const groups = res.data || []
      methodOptions.value = groups
      methodOptionsMap.value = groups.reduce((acc, cur) => {
        acc[cur.value] = cur.label
        return acc
      }, {})
    }
  }
  onMounted(() => {
    getTableData()
    getGroup()
    getGameList()
  })
  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }

  const onSubmit = () => {
    page.value = 1
    getTableData()
  }

  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  // 排序
  const sortChange = ({ prop, order }) => {
    // if (prop) {
    //   if (prop === 'ID') {
    //     prop = 'id'
    //   }
    //   searchInfo.value.orderKey = toSQLLine(prop)
    //   searchInfo.value.desc = order === 'descending'
    // }
    // getTableData()
  }

  // 查询
  const getTableData = async () => {
    const table = await getClubTableApi({
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
  }

  const dialogTitle = ref('新增俱乐部桌子配置')
  const dialogFormVisible = ref(false)
  const addEditDialogRef = ref(null)

  const openDialog = (key) => {
    // 新增俱乐部桌子配置
    dialogTitle.value = t('ClubTableSetup.Dialog.TitleCreate')
    type.value = 'add'
    // 打开子组件
    addEditDialogRef.value?.open()
  }

  const editApiFunc = async (row) => {
    type.value = 'edit'
    // 编辑俱乐部桌子配置
    dialogTitle.value = t('ClubTableSetup.Dialog.TitleEdit')
    // 打开子组件并传递编辑数据
    addEditDialogRef.value?.open(row)
  }

  // 抽屉关闭回调
  const handleDialogClose = () => {}

  const handleConfirm = () => {
    getTableData()
  }

  const deleteApiFunc = async (row) => {
    const params = {
      groupId: row.GroupID,
      gameId: row.GameID
    }
    ElMessageBox.confirm(t('ClubTableSetup.Messages.ConfirmDelete'), t('Common.Hint'), { //此操作将永久删除该配置，是否继续？
      confirmButtonText: t('Common.Confirm'), 
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await deleteClubTableConfApi(params)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('ClubTableSetup.Messages.DeleteSuccess') //删除成功
        })
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        getTableData()
        getGroup()
      }
    })
  }
</script>

<style scoped lang="scss">
  .warning {
    color: #dc143c;
  }
</style>
