<template>
  <el-drawer v-model="visible" size="50%" :before-close="handleClose" :show-close="false">
    <template #header>
      <div class="flex justify-between items-center">
        <!-- 原标题：新增俱乐部桌子配置/编辑俱乐部桌子配置 -->
        <span class="text-lg">{{ drawerTitle }}</span>
        <div>
          <!-- 原按钮文案：确 定 -->
          <el-button type="primary" @click="handleConfirm">{{ $t('Common.Confirm') }}</el-button>
          <!-- 原按钮文案：取 消 -->
          <el-button @click="handleClose">{{ $t('Common.Cancel') }}</el-button>
        </div>
      </div>
    </template>

    <div class="add-edit-dialog">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="160px">
        <!-- 第一行：分组和游戏 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <!-- 原标签：分组 -->
            <el-form-item :label="$t('ClubTableSetup.AddEditDialog.GroupLabel')" prop="GroupID">
              <el-select
                v-model="formData.GroupID"
                :placeholder="$t('ClubTableSetup.AddEditDialog.GroupPlaceholder')"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="item in groupOptions"
                  :key="item.value"
                  :label="`${item.label}(${item.value})`"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 原标签：游戏 -->
            <el-form-item :label="$t('ClubTableSetup.AddEditDialog.GameLabel')" prop="GameID">
              <el-select
                v-model="formData.GameID"
                :placeholder="$t('ClubTableSetup.AddEditDialog.GamePlaceholder')"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="item in gameOptions"
                  :key="item.value"
                  :label="`${item.label}(${item.value})`"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行：人数配置 -->
        <!-- 原标签：人数(2-9) -->
        <el-form-item :label="$t('ClubTableSetup.AddEditDialog.CapacityLabel')" prop="arrCapacityOption">
          <!-- 隐藏输入框用于表单验证 -->
          <el-input v-model="formData.arrCapacityOption" style="display: none" />
          <div class="flex items-start w-full">
            <div class="m-2 flex gap-2">
              <el-button type="primary" icon="plus" circle size="small" @click="addCapacity" />
              <el-button
                type="danger"
                icon="minus"
                circle
                size="small"
                :disabled="capacityList.length <= 1"
                @click="removeCapacity"
              />
            </div>
            <div class="flex-1 flex items-center gap-2 flex-wrap">
              <el-input
                v-for="(item, index) in capacityList"
                :key="index"
                v-model.number="capacityList[index]"
                :min="2"
                :max="9"
                placeholder="2-9"
                class="capacity-input"
                style="width: 80px"
              />
            </div>
          </div>
        </el-form-item>

        <!-- 第三行：房间时长 -->
        <!-- 原标签：房间时长(h) -->
        <el-form-item :label="$t('ClubTableSetup.AddEditDialog.KeepTimeLabel')" prop="arrKeepTimeOption">
          <el-input v-model="formData.arrKeepTimeOption" style="display: none" />
          <div class="flex items-start w-full">
            <div class="m-2 flex gap-2">
              <el-button type="primary" icon="plus" circle size="small" @click="addKeepTime" />
              <el-button
                type="danger"
                icon="minus"
                circle
                size="small"
                :disabled="keepTimeList.length <= 1"
                @click="removeKeepTime"
              />
            </div>
            <div class="flex-1 flex items-center gap-2 flex-wrap">
              <el-input
                v-for="(item, index) in keepTimeList"
                :key="index"
                v-model="keepTimeList[index]"
                :placeholder="$t('ClubTableSetup.AddEditDialog.KeepTimePlaceholder')"
                class="capacity-input"
                style="width: 80px"
              />
            </div>
          </div>
        </el-form-item>

        <!-- 第四行：带入筹码倍数 -->
        <!-- 原标签：带入筹码倍数(BB) -->
        <el-form-item :label="$t('ClubTableSetup.AddEditDialog.TakeinLabel')" prop="arrTakeinOption">
          <el-input v-model="formData.arrTakeinOption" style="display: none" />
          <div class="flex items-start w-full">
            <div class="m-2 flex gap-2">
              <el-button type="primary" icon="plus" circle size="small" @click="addTakein" />
              <el-button
                type="danger"
                icon="minus"
                circle
                size="small"
                :disabled="takeinList.length <= 1"
                @click="removeTakein"
              />
            </div>
            <div class="flex-1 flex items-center gap-2 flex-wrap">
              <el-input
                v-for="(item, index) in takeinList"
                :key="index"
                v-model="takeinList[index]"
                :placeholder="$t('ClubTableSetup.AddEditDialog.TakeinPlaceholder')"
                class="capacity-input"
                style="width: 80px"
              />
            </div>
          </div>
        </el-form-item>

        <!-- 第五行：入场率 -->
        <!-- 原标签：入场率 -->
        <el-form-item :label="$t('ClubTableSetup.AddEditDialog.PoolEntryRateLabel')" prop="arrPoolEntryRateOption">
          <el-input v-model="formData.arrPoolEntryRateOption" style="display: none" />
          <div class="flex items-start w-full">
            <div class="m-2 flex gap-2">
              <el-button type="primary" icon="plus" circle size="small" @click="addPoolEntryRate" />
              <el-button
                type="danger"
                icon="minus"
                circle
                size="small"
                :disabled="poolEntryRateList.length <= 1"
                @click="removePoolEntryRate"
              />
            </div>
            <div class="flex-1 flex items-center gap-2 flex-wrap">
              <el-input
                v-for="(item, index) in poolEntryRateList"
                :key="index"
                v-model="poolEntryRateList[index]"
                :placeholder="$t('ClubTableSetup.AddEditDialog.PoolEntryRatePlaceholder')"
                class="capacity-input"
                style="width: 80px"
              >
              <template v-slot:append>%</template>
              </el-input>
            </div>
          </div>
        </el-form-item>

        <!-- 第六行：抽水封顶 -->
        <!-- 原标签：抽水封顶 -->
        <el-form-item :label="$t('ClubTableSetup.AddEditDialog.DWLimitLabel')" prop="arrDWLimitOption">
          <el-input v-model="formData.arrDWLimitOption" style="display: none" />
          <div class="flex items-start w-full">
            <div class="m-2 flex gap-2">
              <el-button type="primary" icon="plus" circle size="small" @click="addDWLimit" />
              <el-button
                type="danger"
                icon="minus"
                circle
                size="small"
                :disabled="dwLimitList.length <= 1"
                @click="removeDWLimit"
              />
            </div>
            <div class="flex-1 flex items-center gap-2 flex-wrap">
              <el-input
                v-for="(item, index) in dwLimitList"
                :key="index"
                v-model="dwLimitList[index]"
                :placeholder="$t('ClubTableSetup.AddEditDialog.DWLimitPlaceholder')"
                class="capacity-input"
                style="width: 80px"
              />
            </div>
          </div>
        </el-form-item>
        <!-- 原标签：语聊收费价格 -->
        <!-- <el-form-item :label="$t('ClubTableSetup.AddEditDialog.VideoFeeLabel')" prop="VideoFee">
          <el-input
            type="text"
            v-model="formData.VideoFee"
            :placeholder="$t('ClubTableSetup.AddEditDialog.VideoFeePlaceholder')"
            style="width: 200px"
          />
        </el-form-item> -->
        <!-- 原分隔标题：前端创建房间配置 -->
        <el-divider><p class="text-center font-bold text-lg">{{ $t('ClubTableSetup.AddEditDialog.FrontendRoomConfig') }}</p></el-divider>

        <!-- 第七部分：小盲大盲配置 -->
        <el-form-item>
          <div class="ante-config-wrapper">
            <!-- 表头 -->
            <div class="ante-header">
              <!-- 原表头：小盲/底注、小盲 -->
              <span class="ante-header-item">
                {{ isDuanpai ? $t('ClubTableSetup.AddEditDialog.SmallBlindShortDeck') : $t('ClubTableSetup.AddEditDialog.SmallBlind') }}
              </span>
              <span class="ante-header-item"
                ><!-- 原表头：大盲/庄家倍率、大盲 -->
                {{ isDuanpai ? $t('ClubTableSetup.AddEditDialog.BigBlindShortDeck') : $t('ClubTableSetup.AddEditDialog.BigBlind') }}
                <el-tooltip
                  v-if="isDuanpai"
                  raw-content
                  :content="$t('ClubTableSetup.AddEditDialog.Tooltips.ShortDeckBigBlind')"
                  placement="top"
                  effect="dark"
                >
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </span>
              <!-- <span class="ante-header-item">带入记分牌</span> -->
              <span class="ante-header-item-wide"
                ><!-- 原表头：前注 -->
                {{ $t('ClubTableSetup.AddEditDialog.Ante') }}
                <el-tooltip
                  raw-content
                  :content="$t('ClubTableSetup.AddEditDialog.Tooltips.Ante')"
                  placement="top"
                  effect="dark"
                >
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </span>
              <span class="ante-header-item"
                ><!-- 原表头：付费看手牌 -->
                {{ $t('ClubTableSetup.AddEditDialog.HandCost') }}
                <el-tooltip raw-content :content="$t('ClubTableSetup.AddEditDialog.Tooltips.DefaultFirstFour')" placement="top" effect="dark">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </span>
              <span class="ante-header-item"
                ><!-- 原表头：付费看公牌 -->
                {{ $t('ClubTableSetup.AddEditDialog.CommonCost') }}
                <el-tooltip raw-content :content="$t('ClubTableSetup.AddEditDialog.Tooltips.DefaultFirstFour')" placement="top" effect="dark">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </span>
              <span class="ante-header-item"
                ><!-- 原表头：付费切牌 -->
                {{ $t('ClubTableSetup.AddEditDialog.CutCost') }}
                <el-tooltip raw-content :content="$t('ClubTableSetup.AddEditDialog.Tooltips.DefaultFirstFour')" placement="top" effect="dark">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </span>
            </div>
            <div v-for="(row, rowIndex) in anteConfigList" :key="rowIndex" class="ante-row">
              <el-input
                v-model="row.smallBlind"
                class="ante-input"
                :placeholder="$t('ClubTableSetup.AddEditDialog.SmallBlindPlaceholder')"
                @blur="handleSmallBlindBlur(row)"
              />
              <span class="ante-divider">-</span>
              <el-input
                v-model="row.greatBlindness"
                class="ante-input"
                :placeholder="$t('ClubTableSetup.AddEditDialog.BigBlindPlaceholder')"
                @blur="handleGreatBlindBlur(row)"
              />
              <!-- <span class="ante-divider">-</span>
              <el-input v-model="row.scoreboard" class="ante-input" placeholder="带入记分牌" /> -->
              <span class="ante-divider">-</span>
              <el-input
                v-model="row.preNote"
                class="ante-input-wide"
                :placeholder="$t('ClubTableSetup.AddEditDialog.AntePlaceholder')"
                @blur="handleAnteBlur(row)"
              />
              <span class="ante-divider">-</span>
              <el-input
                v-model="row.handCost"
                class="ante-input"
                :placeholder="$t('ClubTableSetup.AddEditDialog.HandCostPlaceholder')"
              />
              <span class="ante-divider">-</span>
              <el-input
                v-model="row.commonCost"
                class="ante-input"
                :placeholder="$t('ClubTableSetup.AddEditDialog.CommonCostPlaceholder')"
              />
              <span class="ante-divider">-</span>
              <el-input
                v-model="row.cutCost"
                class="ante-input"
                :placeholder="$t('ClubTableSetup.AddEditDialog.CutCostPlaceholder')"
              />
            </div>
          </div>
        </el-form-item>
        <!-- 暂时没用，不能删，后面需要直接放开注释即可 -->
        <!-- <el-divider><p class="text-center font-bold text-lg">常规保险outs数</p></el-divider> -->
        <!-- 第八部分：赔率配置 -->
        <!-- <el-form-item label="赔率" prop="arrOddsTable" class="peilv">
          <el-input v-model="formData.arrOddsTable" style="display: none" />
          <div class="odds-btn-group mb-4">
            <el-button type="primary" icon="plus" circle size="small" @click="addOdds" />
            <el-button
              type="danger"
              icon="minus"
              circle
              size="small"
              :disabled="oddsTableList.length <= 1"
              @click="removeOdds"
            />
          </div>
          <div class="odds-config-wrapper">
            <div class="odds-input-list">
              <el-input
                v-for="(value, index) in oddsTableList"
                :key="index"
                v-model="oddsTableList[index]"
                :placeholder="`补${index + 1}张牌赔率`"
                class="odds-input"
              >
                <template #prepend>补牌{{ index + 1 }}</template>
              </el-input>
            </div>
          </div>
        </el-form-item> -->
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup>
  import { ref, watch, computed } from 'vue'
  import { useAppStore } from '@/pinia'
  import { createClubTableConfApi, updateClubTableConfApi } from '@/api/dezhou/clubTablesetup'
  import { ElMessage } from 'element-plus'
  import { DEFAULT_ANTE_CONFIG_LIST, getAnteConfigByGameId } from './defaultConfig'
  import { createFormRules } from './formRules'
  import { useDataTransform } from './useDataTransform'
  import { QuestionFilled } from '@element-plus/icons-vue'
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    typeVal: {
      type: String,
      default: 'add'
    },
    groupOptions: {
      type: Array,
      default: () => []
    },
    gameOptions: {
      type: Array,
      default: () => []
    }
  })

  const emit = defineEmits(['update:modelValue', 'confirm', 'close'])

  const appStore = useAppStore()
  const { t } = useI18n()

  // 抽屉显示状态
  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  // 抽屉尺寸
  const drawerSize = computed(() => appStore.drawerSize)

  const formRef = ref(null)

  const drawerTitle = computed(() => {
    if (props.title) {
      return props.title
    }
    return props.typeVal === 'add'
      ? t('ClubTableSetup.Dialog.TitleCreate')
      : t('ClubTableSetup.Dialog.TitleEdit')
  })

  // 内部表单数据
  const formData = ref({
    GroupID: '',
    GameID: 125,
    // VideoFee: 0.002,
    arrCapacityOption: '2,3,4,5,6',
    arrKeepTimeOption: '1,1.5,2,2.5,3',
    arrTakeinOption: '1,2,3,4,5',
    arrPoolEntryRateOption: '25,30,35,40,45',
    arrDWLimitOption: '1,2,3,4,5',
    arrOddsTable: ''
  })

  // 人数列表
  const capacityList = ref([2, 3, 4, 5, 6])
  // 房间时长列表
  const keepTimeList = ref([1, 1.5, 2, 2.5, 3])
  // 带入筹码倍数列表
  const takeinList = ref([1, 2, 3, 4, 5])
  // 入场率列表
  const poolEntryRateList = ref([25, 30, 35, 40, 45])
  // 抽水封顶列表
  const dwLimitList = ref([1, 2, 3, 4, 5])
  // 赔率列表（默认20个值）
  const oddsTableList = ref([31, 16, 10, 8, 6, 5, 4, 3.5, 3, 2.5, 2.2, 2.1, 1.8, 1.6, 1.4, 1.3, 1.2, 1.1, 1, 0.8])

  // 小盲大盲配置列表（6行，每行2组数据）
  const anteConfigList = ref(JSON.parse(JSON.stringify(DEFAULT_ANTE_CONFIG_LIST)))

  // 表单验证规则
  const rules = createFormRules(
    {
      capacityList,
      keepTimeList,
      takeinList,
      poolEntryRateList,
      dwLimitList,
      oddsTableList
    },
    t
  )

  // 监听人数列表变化，更新表单数据
  watch(
    capacityList,
    (newVal) => {
      formData.value.arrCapacityOption = newVal.join(',')
      formRef.value?.validateField('arrCapacityOption')
    },
    { deep: true }
  )

  // 监听房间时长列表变化，更新表单数据
  watch(
    keepTimeList,
    (newVal) => {
      formData.value.arrKeepTimeOption = newVal.join(',')
      formRef.value?.validateField('arrKeepTimeOption')
    },
    { deep: true }
  )

  // 监听带入筹码倍数列表变化，更新表单数据
  watch(
    takeinList,
    (newVal) => {
      formData.value.arrTakeinOption = newVal.join(',')
      formRef.value?.validateField('arrTakeinOption')
    },
    { deep: true }
  )

  // 监听入场率列表变化
  watch(
    poolEntryRateList,
    (newVal) => {
      formData.value.arrPoolEntryRateOption = newVal.join(',')
      formRef.value?.validateField('arrPoolEntryRateOption')
    },
    { deep: true }
  )

  // 监听抽水封顶列表变化
  watch(
    dwLimitList,
    (newVal) => {
      formData.value.arrDWLimitOption = newVal.join(',')
      formRef.value?.validateField('arrDWLimitOption')
    },
    { deep: true }
  )

  watch(
    oddsTableList,
    (newVal) => {
      const oddsArray = newVal.map((value, index) => [index + 1, value])
      formData.value.arrOddsTable = JSON.stringify(oddsArray)
      formRef.value?.validateField('arrOddsTable')
    },
    { deep: true, immediate: true }
  )

  const isDuanpai = computed(() => formData.value.GameID === 175)
  watch(
    () => formData.value.GameID,
    (newGameId) => {
      if (!newGameId) return
      const anteConfig = getAnteConfigByGameId(newGameId)
      anteConfigList.value.forEach((row, index) => {
        if (anteConfig[index]) {
          row.preNote = anteConfig[index]
        }
      })
    }
  )

  // 数据转换 Hook
  const { loadEditData, prepareSubmitData } = useDataTransform({
    formData,
    capacityList,
    keepTimeList,
    takeinList,
    poolEntryRateList,
    dwLimitList,
    oddsTableList,
    anteConfigList
  })

  const addCapacity = () => {
    if (capacityList.value.length >= 6) {
      return
    }
    capacityList.value.push(2)
  }

  const removeCapacity = () => {
    if (capacityList.value.length > 1) {
      capacityList.value.pop()
    }
  }

  const addKeepTime = () => {
    keepTimeList.value.push(1)
  }

  const removeKeepTime = () => {
    if (keepTimeList.value.length > 1) {
      keepTimeList.value.pop()
    }
  }

  const addTakein = () => {
    takeinList.value.push(1)
  }

  const removeTakein = () => {
    if (takeinList.value.length > 1) {
      takeinList.value.pop()
    }
  }

  const addPoolEntryRate = () => {
    poolEntryRateList.value.push(25)
  }

  const removePoolEntryRate = () => {
    if (poolEntryRateList.value.length > 1) {
      poolEntryRateList.value.pop()
    }
  }

  const addDWLimit = () => {
    dwLimitList.value.push(1)
  }

  const removeDWLimit = () => {
    if (dwLimitList.value.length > 1) {
      dwLimitList.value.pop()
    }
  }

  const handleAnteBlur = (rowData) => {
    if (!rowData.preNote || rowData.preNote.trim() === '') {
      rowData.preNote = '[]'
    }
  }

  // 验证大盲必须比小盲值大
  const handleSmallBlindBlur = (rowData) => {
    // 如果大盲已经有值，需要验证大盲是否大于小盲
    if (rowData.greatBlindness && String(rowData.greatBlindness).trim() !== '') {
      handleGreatBlindBlur(rowData)
    }
  }
  // 大盲失焦时验证
  const handleGreatBlindBlur = (rowData) => {
    const smallBlind = rowData.smallBlind
    const greatBlindness = rowData.greatBlindness
    if (!smallBlind || String(smallBlind).trim() === '') {
      ElMessage({
        type: 'warning',
        message: t('ClubTableSetup.AddEditDialog.Messages.SmallBlindFirst') // 原提示：请先输入小盲
      })
      rowData.greatBlindness = ''
      return
    }
    if (!greatBlindness || String(greatBlindness).trim() === '') {
      return
    }
    const smallBlindNum = Number(smallBlind)
    const greatBlindnessNum = Number(greatBlindness)
    if (isNaN(smallBlindNum) || isNaN(greatBlindnessNum)) {
      return
    }
    if (greatBlindnessNum <= smallBlindNum) {
      ElMessage({
        type: 'warning',
        message: t('ClubTableSetup.AddEditDialog.Messages.BigBlindGreater') // 原提示：大盲必须大于小盲
      })
      rowData.greatBlindness = ''
    }
  }

  const addOdds = () => {
    oddsTableList.value.push(0.8)
  }

  const removeOdds = () => {
    if (oddsTableList.value.length > 1) {
      oddsTableList.value.pop()
    }
  }

  const resetForm = () => {
    formData.value = {
      GroupID: '',
      GameID: 125,
      // VideoFee: 0.002,
      arrCapacityOption: '2,3,4,5,6',
      arrKeepTimeOption: '1,1.5,2,2.5,3',
      arrTakeinOption: '1,2,3,4,5',
      arrPoolEntryRateOption: '25,30,35,40,45',
      arrDWLimitOption: '1,2,3,4,5',
      arrOddsTable: JSON.stringify([
        [1, 31],
        [2, 16],
        [3, 10],
        [4, 8],
        [5, 6],
        [6, 5],
        [7, 4],
        [8, 3.5],
        [9, 3],
        [10, 2.5],
        [11, 2.2],
        [12, 2.1],
        [13, 1.8],
        [14, 1.6],
        [15, 1.4],
        [16, 1.3],
        [17, 1.2],
        [18, 1.1],
        [19, 1],
        [20, 0.8]
      ])
    }
    capacityList.value = [2, 3, 4, 5, 6]
    keepTimeList.value = [1, 1.5, 2, 2.5, 3]
    takeinList.value = [1, 2, 3, 4, 5]
    poolEntryRateList.value = [25, 30, 35, 40, 45]
    dwLimitList.value = [1, 2, 3, 4, 5]
    oddsTableList.value = [31, 16, 10, 8, 6, 5, 4, 3.5, 3, 2.5, 2.2, 2.1, 1.8, 1.6, 1.4, 1.3, 1.2, 1.1, 1, 0.8]
    anteConfigList.value = JSON.parse(JSON.stringify(DEFAULT_ANTE_CONFIG_LIST))
    formRef.value?.resetFields()
  }

  const handleClose = () => {
    resetForm()
    emit('update:modelValue', false)
    emit('close')
  }

  const handleConfirm = async () => {
    try {
      await formRef.value?.validate()
      const submitData = prepareSubmitData()
      // submitData.VideoFee = parseFloat(submitData.VideoFee)
      if (props.typeVal === 'add') {
        const res = await createClubTableConfApi(submitData)
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: t('ClubTableSetup.Messages.CreateSuccess') // 原提示：新增成功
          })
          handleClose()
          emit('confirm')
        }
      } else {
        const res = await updateClubTableConfApi(submitData)
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: t('ClubTableSetup.Messages.EditSuccess') // 原提示：编辑成功
          })
          handleClose()
          emit('confirm')
        }
      }
    } catch (error) {
      console.log('Form validation failed:', error)
    }
  }

  const open = (data = {}) => {
    if (data && Object.keys(data).length > 0) {
      loadEditData(data)
    } else {
      resetForm()
    }
    visible.value = true
  }

  defineExpose({
    open,
    resetForm
  })
</script>

<style scoped lang="scss">
  .add-edit-dialog {
    padding: 20px 0;

    .capacity-input {
      margin-bottom: 8px;
      ::v-deep(.el-input-group__append) {
        padding: 0 10px;
      }
    }
  }
  ::v-deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  .ante-config-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .ante-header {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 0;
    }

    .ante-header-item {
      width: 110px;
      text-align: center;
      font-weight: 600;
      color: #606266;
      font-size: 14px;
    }

    .ante-header-item-wide {
      width: 160px;
      text-align: center;
      font-weight: 600;
      color: #606266;
      font-size: 14px;
    }

    .ante-row {
      display: flex;
      align-items: center;
      gap: 0;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .ante-input {
      width: 110px;
    }

    .ante-input-wide {
      width: 160px;
    }

    .ante-divider {
      color: #606266;
      font-weight: 500;
    }
  }
  .peilv {
    ::v-deep(.el-form-item__label) {
      width: 70px !important;
    }
  }

  .odds-config-wrapper {
    width: 100%;
    margin-left: -40px;
    ::v-deep(.el-input-group__prepend) {
      padding: 0 10px !important;
    }
    .odds-btn-group {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .odds-input-list {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }

    .odds-input {
      width: 100%;
    }
  }
</style>
