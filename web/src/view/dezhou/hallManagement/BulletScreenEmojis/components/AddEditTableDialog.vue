<template>
  <el-drawer v-model="visible" size="70%" :before-close="handleClose" :show-close="false">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">{{ title }}</span>
        <div>
          <!-- 原按钮：确 定 -->
          <el-button :loading="btnLoading" type="primary" @click="handleConfirm">{{ $t('Common.Confirm') }}</el-button>
          <!-- 原按钮：取 消 -->
          <el-button @click="handleClose">{{ $t('Common.Cancel') }}</el-button>
        </div>
      </div>
    </template>
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="150px" :inline="true">
      <!-- 牌桌模板选择 -->
      <!-- 分组 -->
      <el-form-item :label="t('BulletScreenEmojis.Search.GroupLabel')" prop="nGroupId">
        <el-select
          v-model="formData.nGroupId"
          :placeholder="$t('BulletScreenEmojis.Search.GroupPlaceholder')"
          style="width: 240px"
        >
          <el-option v-for="item in groupOptions" :key="item.GroupId" :label="item.GroupName" :value="item.GroupId" />
        </el-select>
      </el-form-item>

      <!-- 原分区标题：表情 -->
      <el-divider content-position="center"
        ><p class="title">{{ $t('BulletScreenEmojis.DialogSections.Emojis') }}</p></el-divider
      >
      <div>
        <el-form-item :label="columnLabel(value)" :prop="value.prop" v-for="value in emojData" :key="value.prop">
          <!-- 原占位：请输入 -->
          <el-input
            @input="handleInput(formData, value.prop)"
            v-model="formData[value.prop]"
            :placeholder="$t('BulletScreenEmojis.Placeholders.Input')"
            style="width: 240px"
            clearable
          />
        </el-form-item>
      </div>

      <!-- 原分区标题：牌桌 -->
      <el-divider content-position="center"
        ><p class="title">{{ $t('BulletScreenEmojis.DialogSections.PokerTable') }}</p></el-divider
      >
      <div>
        <el-form-item :label="columnLabel(value)" :prop="value.prop" v-for="value in pokerTableData" :key="value.prop">
          <!-- 原占位：请输入 -->
          <el-input
            @input="handleInput(formData, value.prop)"
            v-model="formData[value.prop]"
            :placeholder="$t('BulletScreenEmojis.Placeholders.Input')"
            style="width: 240px"
            clearable
          />
        </el-form-item>
      </div>

      <!-- 原分区标题：弹幕 -->
      <!-- <el-divider content-position="center"><p class="title">{{ $t('BulletScreenEmojis.DialogSections.Barrage') }}</p></el-divider>
      <div>
        <el-form-item :label="columnLabel(value)" :prop="value.prop" v-for="value in danMuData" :key="value.prop">

          <el-input
            @input="handleInput(formData, value.prop)"
            v-model="formData[value.prop]"
            :placeholder="$t('BulletScreenEmojis.Placeholders.Input')"
            style="width: 240px"
            clearable
          />
        </el-form-item>
      </div> -->

      <!-- 原分区标题：看牌 -->
      <el-divider content-position="center"
        ><p class="title">{{ $t('BulletScreenEmojis.DialogSections.LookCards') }}</p></el-divider
      >
      <div>
        <el-form-item :label="columnLabel(value)" :prop="value.prop" v-for="value in delayData" :key="value.prop">
          <!-- 原占位：请输入 -->
          <el-input
            @input="handleInput(formData, value.prop)"
            v-model="formData[value.prop]"
            :placeholder="$t('BulletScreenEmojis.Placeholders.Input')"
            style="width: 240px"
            clearable
          />
        </el-form-item>
      </div>
    </el-form>
  </el-drawer>
</template>

<script setup>
  import { ref, computed, nextTick } from 'vue'
  import { ElMessage } from 'element-plus'
  import { getGlobalGroupingApi } from '@/api/dezhou/global'
  import { createExpression } from '@/api/dezhou/clubCreateTableList'
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'confirm', 'close'])

  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  const { t } = useI18n()

  const formRef = ref(null)
  const btnLoading = ref(false)
  const groupOptions = ref([])

  // 输入参数
  const formData = ref({})

  // 表情输入
  const emojData = ref([
    { labelKey: 'BulletScreenEmojis.Table.Columns.Tomato', label: '番茄', prop: 'nChatId1' },
    { labelKey: 'BulletScreenEmojis.Table.Columns.BlowKiss', label: '飞吻', prop: 'nChatId2' },
    { labelKey: 'BulletScreenEmojis.Table.Columns.Cheers', label: '干杯', prop: 'nChatId3' },
    { labelKey: 'BulletScreenEmojis.Table.Columns.Bomb', label: '炸弹', prop: 'nChatId4' },
    { labelKey: 'BulletScreenEmojis.Table.Columns.CatchChicken', label: '抓鸡', prop: 'nChatId5' },
    { labelKey: 'BulletScreenEmojis.Table.Columns.Flowers', label: '鲜花', prop: 'nChatId6' },
    { labelKey: 'BulletScreenEmojis.Table.Columns.Gatling', label: '加特林', prop: 'nChatId14' },
    { labelKey: 'BulletScreenEmojis.Table.Columns.Shark', label: '鲨鱼', prop: 'nChatId15' },
    { label: 'nicehand', prop: 'nChatId16' },
    { labelKey: 'BulletScreenEmojis.Table.Columns.Like', label: '点赞', prop: 'nChatId17' },
    { labelKey: 'BulletScreenEmojis.Table.Columns.LightCigarette', label: '抽烟', prop: 'nChatId18' }
  ])

  const columnLabel = (column) => (column.labelKey ? t(column.labelKey) : column.label)



  // 表情输入
  const pokerTableData = ref([
    { labelKey: 'BulletScreenEmojis.Table.Columns.Delay1', label: '延时1', prop: 'nChatId7' }, // 原标签：延时1
    { labelKey: 'BulletScreenEmojis.Table.Columns.Delay2', label: '延时2', prop: 'nChatId7_1' }, // 原标签：延时2
    { labelKey: 'BulletScreenEmojis.Table.Columns.Delay3', label: '延时3', prop: 'nChatId7_2' }, // 原标签：延时3
    { labelKey: 'BulletScreenEmojis.Table.Columns.Delay4', label: '延时4', prop: 'nChatId7_3' }, // 原标签：延时4
    { labelKey: 'BulletScreenEmojis.Table.Columns.Delay5', label: '延时5', prop: 'nChatId7_4' } // 原标签：延时5
    // { labelKey: 'BulletScreenEmojis.Table.Columns.ViewFlop', label: '看翻牌', prop: 'nChatId8' }, // 原标签：看翻牌
    // { labelKey: 'BulletScreenEmojis.Table.Columns.ViewTurn', label: '看转牌', prop: 'nChatId9' }, // 原标签：看转牌
    // { labelKey: 'BulletScreenEmojis.Table.Columns.ViewRiver', label: '看河牌', prop: 'nChatId10' } // 原标签：看河牌
  ])
  // 弹幕输入
  const danMuData = ref([
    // { labelKey: 'BulletScreenEmojis.Table.Columns.NormalBarrage', label: '普通弹幕', prop: 'nChatId11' }, // 原标签：普通弹幕
    // { labelKey: 'BulletScreenEmojis.Table.Columns.FancyBarrage', label: '炫彩弹幕', prop: 'nChatId12' }, // 原标签：炫彩弹幕
    // { labelKey: 'BulletScreenEmojis.Table.Columns.LuxuryBarrage', label: '土豪弹幕', prop: 'nChatId13' } // 原标签：土豪弹幕
  ])

  const delayData = ref([
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.InsuranceDelay1',
      label: '保险延时1',
      prop: 'nChatId19'
    }, // 原标签：保险延时1
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.InsuranceDelay2',
      label: '保险延时2',
      prop: 'nChatId19_1'
    }, // 原标签：保险延时2
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.InsuranceDelay3',
      label: '保险延时3',
      prop: 'nChatId19_2'
    }, // 原标签：保险延时3
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.InsuranceDelay4',
      label: '保险延时4',
      prop: 'nChatId19_3'
    }, // 原标签：保险延时4
    {
      labelKey: 'BulletScreenEmojis.Table.Columns.InsuranceDelay5',
      label: '保险延时5',
      prop: 'nChatId19_4'
    }, // 原标签：保险延时5
    { labelKey: 'BulletScreenEmojis.Table.Columns.ViewHoleCards', label: '看手牌', prop: 'nChatId20' }, // 原标签：看手牌
    { labelKey: 'BulletScreenEmojis.Table.Columns.PaidCut', label: '付费切牌', prop: 'nChatId21' }, // 原标签：付费切牌
    { labelKey: 'BulletScreenEmojis.Table.Columns.ViewBoard', label: '看公牌', prop: 'nChatId22' } // 原标签：看公牌
  ])
  // 输入校验
  // const rules = ref({
  //   // 请选择分组
  //   nGroupId: [{ required: true, message: t('BulletScreenEmojis.DialogSections.SelectGroupRequired'), trigger: 'blur' }], // 分组ID
  //   // 表情
  //   nChatId1: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], //
  //   nChatId2: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 飞吻
  //   nChatId3: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 干杯
  //   nChatId4: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 炸弹
  //   nChatId5: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 抓鸡
  //   nChatId6: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 鲜花
  //   nChatId14: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 加特林
  //   nChatId15: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 鲨鱼
  //   nChatId16: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 摸头
  //   nChatId17: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 点赞
  //   nChatId18: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 火箭
  //   // 牌桌延时操作
  //   nChatId7: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 延时操作 50(s)
  //   nChatId7_1: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 延时操作 100(s)
  //   nChatId7_2: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 延时操作 200(s)
  //   nChatId7_3: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 延时操作 400(s)
  //   nChatId7_4: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 延时操作 800(s)
  //   nChatId8: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 看翻牌
  //   nChatId9: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 看转牌
  //   nChatId10: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 看河牌
  //   // 弹幕
  //   nChatId11: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 普通弹幕
  //   nChatId12: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], // 炫彩弹幕
  //   nChatId13: [{ required: true, message: 'BulletScreenEmojis.DialogSections.InputRequired', trigger: 'blur' }], // 土豪弹幕

  //   // 保险延迟
  //   nChatId19: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], //保险延时操作1
  //   nChatId19_1: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], //保险延时操作2
  //   nChatId19_2: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], //保险延时操作3

  //   nChatId19_3: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], //保险延时操作4
  //   nChatId19_4: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], //保险延时操作5
  //   nChatId20: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], //看手牌
  //   nChatId21: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }], //付费切牌
  //   nChatId22: [{ required: true, message: t('BulletScreenEmojis.DialogSections.InputRequired'), trigger: 'blur' }] //看公牌
  // })
  const rules = computed(() => {
    const selectMessage = t('BulletScreenEmojis.Messages.SelectGroupRequired')
    const inputMessage = t('BulletScreenEmojis.Messages.InputRequired')
    const createRule = (message) => [{ required: true, message, trigger: 'blur' }]
    const result = {
      nGroupId: createRule(selectMessage)
    }
    const allConfigs = [...emojData.value, ...pokerTableData.value, ...danMuData.value, ...delayData.value]
    allConfigs.forEach((item) => {
      result[item.prop] = createRule(inputMessage)
    })
    return result
  })

  const resetForm = () => {
    formData.value = {
      nGroupId: null, // 分组ID
      // 表情
      nChatId1: null, // 番茄
      nChatId2: null, // 飞吻
      nChatId3: null, // 干杯
      nChatId4: null, // 炸弹
      nChatId5: null, // 抓鸡
      nChatId6: null, // 鲜花
      nChatId14: null, // 加特林
      nChatId15: null, // 鲨鱼
      nChatId16: null, // 摸头
      nChatId17: null, // 点赞
      nChatId18: null, // 抽烟
      // 牌桌延时操作
      nChatId7: null, // 延时操作 50(s)
      nChatId7_1: null, // 延时操作 100(s)
      nChatId7_2: null, // 延时操作 200(s)
      nChatId7_3: null, // 延时操作 400(s)
      nChatId7_4: null, // 延时操作 800(s)
      nChatId8: 0, // 看翻牌
      nChatId9: 0, // 看转牌
      nChatId10: 0, // 看河牌
      // 弹幕
      nChatId11: 0, // 普通弹幕
      nChatId12: 0, // 炫彩弹幕
      nChatId13: 0, // 土豪弹幕

      nChatId19: null, // 保险延时操作1
      nChatId19_1: null, // 保险延时操作2
      nChatId19_2: null, //保险延时操作3
      nChatId19_3: null, //保险延时操作4
      nChatId19_4: null, //保险延时操作5
      nChatId20: 0, //看手牌
      nChatId21: 0, //付费切牌
      nChatId22: 0 //看公牌
    }
    formRef.value?.resetFields()
  }
  const getGroupOptions = async () => {
    try {
      const res = await getGlobalGroupingApi()
      if (res.code === 0) {
        groupOptions.value = res.data.list || []
      }
    } catch (error) {
      console.error('获取分组列表失败:', error)
    }
  }
  const handleClose = () => {
    resetForm()
    emit('update:modelValue', false)
    emit('close')
  }

  const handleConfirm = async () => {
    try {
      await formRef.value?.validate()
      btnLoading.value = true
      const submitData = { ...formData.value }
      Object.keys(submitData).forEach((i) => (submitData[i] = +submitData[i])) // 转数字
      const res = await createExpression(submitData)
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage.success(res.data?.msg || t('BulletScreenEmojis.Messages.CreateSuccess'))
        handleClose()
        emit('confirm')
      }
    } catch (error) {
      btnLoading.value = false
    }
  }
  const handleInput = (row, prop) => {
    nextTick(() => {
      let value = row[prop].replace(/[^-0-9.]/g, '')
      row[prop] = value
    })
  }
  // 打开抽屉
  const open = () => {
    resetForm()
    getGroupOptions()
    visible.value = true
  }

  defineExpose({
    open,
    resetForm
  })
</script>

<style scoped lang="scss">
  ::v-deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  .title {
    color: red;
    font-size: 20px;
  }
</style>
