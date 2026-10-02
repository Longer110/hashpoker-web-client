// 数据转换 Hook
export const useDataTransform = (formDataRefs) => {
  const {
    formData,
    capacityList,
    keepTimeList,
    takeinList,
    poolEntryRateList,
    dwLimitList,
    oddsTableList,
    anteConfigList
  } = formDataRefs

  // 从编辑数据加载到表单
  const loadEditData = (data) => {
    if (!data || Object.keys(data).length === 0) {
      return false
    }

    // 基础数据
    formData.value.GroupID = data.GroupID || ''
    formData.value.GameID = data.GameID || ''
    formData.value.VideoFee = data.VideoFee || 0.002

    // 解析人数配置
    if (data.arrCapacityOption) {
      try {
        const arr = JSON.parse(data.arrCapacityOption)
        if (arr.length > 0 && arr.every((num) => !isNaN(num))) {
          capacityList.value = arr
          formData.value.arrCapacityOption = data.arrCapacityOption
        }
      } catch (error) {
        console.error('解析人数配置失败:', error)
      }
    }

    // 解析房间时长配置
    if (data.arrKeepTimeOption) {
      try {
        const arr = JSON.parse(data.arrKeepTimeOption)
        if (arr.length > 0) {
          keepTimeList.value = arr
          formData.value.arrKeepTimeOption = data.arrKeepTimeOption
        }
      } catch (error) {
        console.error('解析房间时长配置失败:', error)
      }
    }

    // 解析带入筹码倍数配置
    if (data.arrTakeinOption) {
      try {
        const arr = data.arrTakeinOption.toString().slice(1, -1).split(',').map(Number)
        if (arr.length > 0) {
          takeinList.value = arr
          formData.value.arrTakeinOption = data.arrTakeinOption
        }
      } catch (error) {
        console.error('解析带入筹码倍数配置失败:', error)
      }
    }

    // 解析入场率配置
    if (data.arrPoolEntryRateOption) {
      try {
        const arr = data.arrPoolEntryRateOption.toString().slice(1, -1).split(',').map(Number)
        if (arr.length > 0) {
          poolEntryRateList.value = arr
          formData.value.arrPoolEntryRateOption = data.arrPoolEntryRateOption
        }
      } catch (error) {
        console.error('解析入场率配置失败:', error)
      }
    }

    // 解析抽水封顶配置
    if (data.arrDWLimitOption) {
      try {
        const arr = data.arrDWLimitOption.toString().slice(1, -1).split(',').map(Number)
        if (arr.length > 0) {
          dwLimitList.value = arr
          formData.value.arrDWLimitOption = data.arrDWLimitOption
        }
      } catch (error) {
        console.error('解析抽水封顶配置失败:', error)
      }
    }

    // 解析小盲大盲配置
    if (
      data.arrLittleBlind &&
      data.arrScoreboard &&
      data.arrPreNote &&
      data.arrGreatBlindness &&
      data.arrHandCost &&
      data.arrCommonCost &&
      data.arrCutCost
    ) {
      try {
        const littleBlind = JSON.parse(data.arrLittleBlind)
        const greatBlindness = JSON.parse(data.arrGreatBlindness)
        const scoreboard = JSON.parse(data.arrScoreboard)
        const preNote = JSON.parse(data.arrPreNote)
        const handCost = JSON.parse(data.arrHandCost)
        const commonCost = JSON.parse(data.arrCommonCost)
        const cutCost = JSON.parse(data.arrCutCost)

        // 重新组装配置列表
        const newAnteConfigList = []
        const maxLength = Math.max(
          littleBlind.length,
          greatBlindness.length,
          scoreboard.length,
          preNote.length,
          handCost.length,
          commonCost.length,
          cutCost.length
        )

        for (let i = 0; i < maxLength; i++) {
          newAnteConfigList.push({
            smallBlind: littleBlind[i] !== undefined ? String(littleBlind[i]) : '',
            greatBlindness: greatBlindness[i] !== undefined ? String(greatBlindness[i]) : '',
            scoreboard: scoreboard[i] !== undefined ? String(scoreboard[i]) : '',
            preNote: preNote[i] !== undefined ? JSON.stringify(preNote[i]) : '',
            handCost: handCost[i] !== undefined ? String(handCost[i]) : '',
            commonCost: commonCost[i] !== undefined ? String(commonCost[i]) : '',
            cutCost: cutCost[i] !== undefined ? String(cutCost[i]) : ''
          })
        }
        anteConfigList.value = newAnteConfigList
      } catch (error) {
        console.error('解析小盲大盲配置失败:', error)
      }
    }

    // 解析赔率配置
    if (data.arrOddsTable) {
      try {
        const oddsTable = JSON.parse(data.arrOddsTable)
        // 二维数组格式 [[1,31],[2,16],...] 提取第二列的值
        oddsTableList.value = oddsTable.map((item) => item[1])
      } catch (error) {
        console.error('解析赔率配置失败:', error)
      }
    }

    return true
  }

  // 收集提交数据
  const prepareSubmitData = () => {
    const arrLittleBlind = []
    const arrGreatBlindness = []
    const arrScoreboard = []
    const arrPreNote = []
    const arrHandCost = []
    const arrCommonCost = []
    const arrCutCost = []

    anteConfigList.value.forEach((row) => {
      arrLittleBlind.push(row.smallBlind)
      arrGreatBlindness.push(row.greatBlindness)
      arrScoreboard.push(row.scoreboard)
      arrPreNote.push(JSON.parse(row.preNote))
      arrHandCost.push(row.handCost)
      arrCommonCost.push(row.commonCost)
      arrCutCost.push(row.cutCost)
    })

    // 转换赔率为二维数组格式 [[1,31],[2,16],...]
    const arrOddsTable = oddsTableList.value.map((value, index) => [index + 1, value]).map((item) => item.map(Number))

    return {
      ...formData.value,
      arrCapacityOption: JSON.stringify(capacityList.value.map(Number)),
      arrKeepTimeOption: JSON.stringify(keepTimeList.value.map(Number)),
      arrTakeinOption: JSON.stringify(takeinList.value.map(Number)),
      arrPoolEntryRateOption: JSON.stringify(poolEntryRateList.value.map(Number)),
      arrDWLimitOption: JSON.stringify(dwLimitList.value.map(Number)),
      arrLittleBlind: JSON.stringify(arrLittleBlind.map(Number)),
      arrGreatBlindness: JSON.stringify(arrGreatBlindness.map(Number)),
      arrScoreboard: JSON.stringify(arrScoreboard.map(Number)),
      arrPreNote: JSON.stringify(arrPreNote),
      arrHandCost: JSON.stringify(arrHandCost.map(Number)),
      arrCommonCost: JSON.stringify(arrCommonCost.map(Number)),
      arrCutCost: JSON.stringify(arrCutCost.map(Number)),
      arrOddsTable: JSON.stringify(arrOddsTable)
    }
  }

  return {
    loadEditData,
    prepareSubmitData
  }
}
