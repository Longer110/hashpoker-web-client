// 检查值是否已填充
const isValueFilled = (val) => {
  if (typeof val === 'number') return !Number.isNaN(val)
  return String(val ?? '').trim() !== ''
}

// 检查是否为整数
const isInteger = (val) => {
  const num = Number(val)
  return !Number.isNaN(num) && Number.isInteger(num)
}

// 检查小数位数是否不超过指定位数
const checkDecimalPlaces = (val, maxPlaces) => {
  const num = Number(val)
  if (Number.isNaN(num)) return false
  const str = String(val)
  const decimalIndex = str.indexOf('.')
  if (decimalIndex === -1) return true
  const decimalPlaces = str.length - decimalIndex - 1
  return decimalPlaces <= maxPlaces
}

// 检查值是否在指定范围内
const checkRange = (val, min, max) => {
  const num = Number(val)
  if (Number.isNaN(num)) return false
  return num >= min && num <= max
}

// 检查值是否大于0
const checkGreaterThanZero = (val) => {
  const num = Number(val)
  if (Number.isNaN(num)) return false
  return num > 0
}

// 创建表单验证规则
export const createFormRules = (lists, t) => {
  const { capacityList, keepTimeList, takeinList, poolEntryRateList, dwLimitList, oddsTableList } = lists

  return {
    GroupID: [{ required: true, message: t('ClubTableSetup.AddEditDialog.Validation.GroupRequired'), trigger: 'change' }],
    GameID: [{ required: true, message: t('ClubTableSetup.AddEditDialog.Validation.GameRequired'), trigger: 'change' }],
    VideoFee: [{ required: true, message: t('ClubTableSetup.AddEditDialog.Validation.VideoFeeRequired'), trigger: 'change' }],
    arrCapacityOption: [
      {
        validator: (_rule, _value, callback) => {
          const arr = capacityList.value
          if (!arr.length || arr.some((v) => !isValueFilled(v))) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.CapacityRequired')))
          }
          // 验证是否都是整数
          const notIntegerIndex = arr.findIndex((v) => !isInteger(v))
          if (notIntegerIndex !== -1) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.CapacityInteger')))
          }
          // 验证范围是否在2-9之间
          const outOfRangeIndex = arr.findIndex((v) => !checkRange(v, 2, 9))
          if (outOfRangeIndex !== -1) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.CapacityRange')))
          }
          callback()
        },
        trigger: ['change', 'blur']
      }
    ],
    arrKeepTimeOption: [
      {
        validator: (_rule, _value, callback) => {
          const arr = keepTimeList.value
          if (!arr.length || arr.some((v) => !isValueFilled(v))) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.KeepTimeRequired')))
          }
          // 验证是否大于0
          const notPositiveIndex = arr.findIndex((v) => !checkGreaterThanZero(v))
          if (notPositiveIndex !== -1) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.KeepTimePositive')))
          }
          // 验证小数位数不超过2位
          const invalidIndex = arr.findIndex((v) => !checkDecimalPlaces(v, 2))
          if (invalidIndex !== -1) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.KeepTimeDecimal')))
          }
          callback()
        },
        trigger: ['change', 'blur']
      }
    ],
    arrTakeinOption: [
      {
        validator: (_rule, _value, callback) => {
          const arr = takeinList.value
          if (!arr.length || arr.some((v) => !isValueFilled(v))) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.TakeinRequired')))
          }
          const notIntegerIndex = arr.findIndex((v) => !isInteger(v))
          if (notIntegerIndex !== -1) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.TakeinInteger')))
          }
          callback()
        },
        trigger: ['change', 'blur']
      }
    ],
    arrPoolEntryRateOption: [
      {
        validator: (_rule, _value, callback) => {
          const arr = poolEntryRateList.value
          if (!arr.length || arr.some((v) => !isValueFilled(v))) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.PoolEntryRateRequired')))
          }
          // 验证是否大于0
          const notPositiveIndex = arr.findIndex((v) => !checkGreaterThanZero(v))
          if (notPositiveIndex !== -1) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.PoolEntryRatePositive')))
          }
          // 验证小数位数不超过2位
          const invalidIndex = arr.findIndex((v) => !checkDecimalPlaces(v, 2))
          if (invalidIndex !== -1) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.PoolEntryRateDecimal')))
          }
          callback()
        },
        trigger: ['change', 'blur']
      }
    ],
    arrDWLimitOption: [
      {
        validator: (_rule, _value, callback) => {
          const arr = dwLimitList.value
          if (!arr.length || arr.some((v) => !isValueFilled(v))) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.DWLimitRequired')))
          }
          const invalidIndex = arr.findIndex((v) => !checkDecimalPlaces(v, 2))
          if (invalidIndex !== -1) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.DWLimitDecimal')))
          }
          callback()
        },
        trigger: ['change', 'blur']
      }
    ],

    arrOddsTable: [
      {
        validator: (_rule, _value, callback) => {
          const arr = oddsTableList.value
          if (!arr.length || arr.some((v) => !isValueFilled(v))) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.OddsRequired')))
          }
          const invalidIndex = arr.findIndex((v) => !checkDecimalPlaces(v, 2))
          if (invalidIndex !== -1) {
            return callback(new Error(t('ClubTableSetup.AddEditDialog.Validation.OddsDecimal')))
          }
          callback()
        },
        trigger: ['change', 'blur']
      }
    ]
  }
}
