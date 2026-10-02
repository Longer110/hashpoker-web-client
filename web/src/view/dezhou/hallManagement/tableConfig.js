const getTranslator = (t) => (typeof t === 'function' ? t : () => '')

// 游戏选项
const gameOptionsSource = [
  // 原文：德州
  { value: 125, key: 'HallTableDialog.Options.Game.Texas' },
  // 原文：短牌
  { value: 175, key: 'HallTableDialog.Options.Game.Short' }
]

const createGameOptions = (t) => {
  const translate = getTranslator(t)
  return gameOptionsSource.map((item) => ({
    value: item.value,
    label: translate(item.key)
  }))
}

// 房间时长选项
const keepTimeSource = [
  { value: 1800, keySuffix: 'Hours0_5' }, // 原文：0.5小时
  { value: 3600, keySuffix: 'Hours1' }, // 原文：1小时
  { value: 5400, keySuffix: 'Hours1_5' }, // 原文：1.5小时
  { value: 7200, keySuffix: 'Hours2' }, // 原文：2小时
  { value: 9000, keySuffix: 'Hours2_5' }, // 原文：2.5小时
  { value: 10800, keySuffix: 'Hours3' }, // 原文：3小时
  { value: 12600, keySuffix: 'Hours3_5' }, // 原文：3.5小时
  { value: 14400, keySuffix: 'Hours4' }, // 原文：4小时
  { value: 16200, keySuffix: 'Hours4_5' }, // 原文：4.5小时
  { value: 18000, keySuffix: 'Hours5' }, // 原文：5小时
  { value: 43200, keySuffix: 'Hours12' }, // 原文：12小时
  { value: 86400, keySuffix: 'Hours24' } // 原文：24小时
]

const createKeepTimeOptions = (t) => {
  const translate = getTranslator(t)
  return keepTimeSource.map((item) => ({
    value: item.value,
    label: translate(`HallTableDialog.Options.KeepTime.${item.keySuffix}`)
  }))
}

// 前注选项
const preAnteSource = [
  { value: 2 },
  { value: 5 },
  { value: 10 },
  { value: 20 },
  { value: 'custom' } // 原文：自定义
]

const createPreAnteOptions = (t) => {
  const translate = getTranslator(t)
  return preAnteSource.map((item) => ({
    value: item.value,
    label:
      item.value === 'custom'
        ? translate('HallTableDialog.Options.Common.Custom')
        : String(item.value)
  }))
}

// 手数限制选项
const handLimitSource = [
  { value: 50 }, // 原文：50手
  { value: 100 }, // 原文：100手
  { value: 200 }, // 原文：200手
  { value: 300 }, // 原文：300手
  { value: 500 }, // 原文：500手
]

const createHandLimitOptions = (t) => {
  const translate = getTranslator(t)
  return handLimitSource.map((item) => ({
    value: item.value,
    label:
      item.value === 'custom'
        ? translate('HallTableDialog.Options.Common.Custom')
        : translate('HallTableDialog.Options.HandCount', { count: item.value })
  }))
}

// 抽水类型选项
const computeModeSource = [
  { value: 1, key: 'HallTableList.ModeType.Hand' }, // 原文：把抽
  { value: 3, key: 'HallTableList.ModeType.Round' } // 原文：局抽
]

const createComputeModeOptions = (t) => {
  const translate = getTranslator(t)
  return computeModeSource.map((item) => ({
    value: item.value,
    label: translate(item.key)
  }))
}

// 倍率选项
const magnificationSource = [2, 3, 4, 5, 8, 10]

const createMagnificationOptions = (t) => {
  const translate = getTranslator(t)
  return magnificationSource.map((value) => ({
    value,
    label: translate('HallTableDialog.Options.Multiplier', { value }) // 原文：{value}倍
  }))
}

// 玩家数量选项（纯数值，无需翻译）
const playerCountOptions = [2, 3, 4, 5, 6, 7, 8, 9]

// 入池率选项：从20%到65%，递增5%
const poolEntryRateSource = [
  { value: 0, original: '0' },
  { value: 20, original: '20%' },
  { value: 25, original: '25%' },
  { value: 30, original: '30%' },
  { value: 35, original: '35%' },
  { value: 40, original: '40%' },
  { value: 45, original: '45%' },
  { value: 50, original: '50%' },
  { value: 55, original: '55%' },
  { value: 60, original: '60%' },
  { value: 65, original: '65%' }
]

const createPoolEntryRateOptions = (t) => {
  const translate = getTranslator(t)
  return poolEntryRateSource.map((item) => ({
    value: item.value,
    label:
      item.value === 0
        ? '0' // 原文：0
        : translate('HallTableDialog.Options.Common.Percent', { value: item.value })
  }))
}

// 撤码倍数选项
const tabkeOutOddSource = [2, 3, 4, 5, 8]

const createTabkeOutOddOptions = (t) => {
  const translate = getTranslator(t)
  return tabkeOutOddSource.map((value) => ({
    value,
    label: translate('HallTableDialog.Options.Multiplier', { value }) // 原文：{value}倍
  }))
}

// 输钱限制金额倍数选项
const loseMaxAmountSource = [2, 3, 4, 5, 6, 7, 8, 9, 10]

const createLoseMaxAmountOptions = (t) => {
  const translate = getTranslator(t)
  return loseMaxAmountSource.map((value) => ({
    value,
    label: translate('HallTableDialog.Options.Multiplier', { value }) // 原文：{value}倍
  }))
}

// 看牌费用选项
const costSource = [
  { value: 0.25 },
  { value: 0.5 },
  { value: 1 },
  { value: 2 },
  { value: 'custom' } // 原文：自定义
]

const createCostOptions = (t) => {
  const translate = getTranslator(t)
  return costSource.map((item) => ({
    value: item.value,
    label:
      item.value === 'custom'
        ? translate('HallTableDialog.Options.Common.Custom')
        : String(item.value)
  }))
}

// 看牌费用选项1（用于付费切牌）
const costSource1 = [
  { value: 0.5 },
  { value: 1 },
  { value: 1.5 },
  { value: 2 },
  { value: 'custom' } // 原文：自定义
]

const createCostOptions1 = (t) => {
  const translate = getTranslator(t)
  return costSource1.map((item) => ({
    value: item.value,
    label:
      item.value === 'custom'
        ? translate('HallTableDialog.Options.Common.Custom')
        : String(item.value)
  }))
}

// 语音收费选项
const videoFeeSource = [{ value: 0 }, { value: 0.002 }]

const createVideoFeeOptions = (t) => {
  const translate = getTranslator(t)
  return videoFeeSource.map((item) => ({
    value: item.value,
    label: item.value === 0
      ? `${item.value} (${translate('HallTableDialog.Options.VoiceFee.Free')})`
      : String(item.value)
  }))
}

// 看牌配置选项
const cardConfigSource = [
  {
    id: 1,
    labelKey: 'HallTableDialog.CardConfig.Public',
    costLabelKey: 'HallTableDialog.CardConfig.PublicCost' // 原文：付费看公牌 / 付费看公牌额度
  },
  {
    id: 2,
    labelKey: 'HallTableDialog.CardConfig.Hand',
    costLabelKey: 'HallTableDialog.CardConfig.HandCost' // 原文：付费看手牌 / 付费看手牌额度
  },
  {
    id: 3,
    labelKey: 'HallTableDialog.CardConfig.Cut',
    costLabelKey: 'HallTableDialog.CardConfig.CutCost' // 原文：付费切牌 / 付费切牌额度
  }
]

const createCardConfigOptions = (t) => {
  const translate = getTranslator(t)
  return cardConfigSource.map((item) => ({
    id: item.id,
    label: translate(item.labelKey),
    costLabel: translate(item.costLabelKey),
    options: item.id === 3 ? createCostOptions1(translate) : createCostOptions(translate)
  }))
}

export {
  createGameOptions as gameOptions,
  createKeepTimeOptions as nKeepTimeOptions,
  createPreAnteOptions as nPreAnteOptions,
  createHandLimitOptions as nHandLimitOptions,
  createComputeModeOptions as nComputeModeOptions,
  createMagnificationOptions as magnificationOptions,
  playerCountOptions,
  createPoolEntryRateOptions as nPoolEntryRateOptions,
  createTabkeOutOddOptions as nTabkeOutOddOptions,
  createLoseMaxAmountOptions as nLoseMaxAmountOptions,
  createCostOptions as nCostOptions,
  createCostOptions1 as nCostOptions1,
  createVideoFeeOptions as nVideoFeeOptions,
  createCardConfigOptions as cardConfigOptions
}
