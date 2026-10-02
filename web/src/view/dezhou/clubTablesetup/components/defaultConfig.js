// 默认小盲大盲配置列表（12行，每行7列数据）
export const DEFAULT_ANTE_CONFIG_LIST = [
  {
    smallBlind: '1',
    greatBlindness: '2',
    scoreboard: '200',
    preNote: '[0,1,2]',
    handCost: '1',
    commonCost: '2',
    cutCost: '1'
  },
  {
    smallBlind: '2',
    greatBlindness: '4',
    scoreboard: '400',
    preNote: '[0,1,2,4]',
    handCost: '2',
    commonCost: '4',
    cutCost: '2'
  },
  {
    smallBlind: '5',
    greatBlindness: '10',
    scoreboard: '1000',
    preNote: '[0,1,2,5,10]',
    handCost: '5',
    commonCost: '10',
    cutCost: '5'
  },
  {
    smallBlind: '10',
    greatBlindness: '20',
    scoreboard: '2000',
    preNote: '[0,1,2,5,10,20]',
    handCost: '10',
    commonCost: '20',
    cutCost: '10'
  },
  {
    smallBlind: '20',
    greatBlindness: '40',
    scoreboard: '4000',
    preNote: '[0,5,10,20,40]',
    handCost: '20',
    commonCost: '40',
    cutCost: '20'
  },
  {
    smallBlind: '25',
    greatBlindness: '50',
    scoreboard: '5000',
    preNote: '[0,5,10,25,50]',
    handCost: '25',
    commonCost: '50',
    cutCost: '25'
  },
  {
    smallBlind: '50',
    greatBlindness: '100',
    scoreboard: '10000',
    preNote: '[0,10,25,50,100]',
    handCost: '50',
    commonCost: '100',
    cutCost: '50'
  },
  {
    smallBlind: '100',
    greatBlindness: '200',
    scoreboard: '20000',
    preNote: '[0,25,50,100,200]',
    handCost: '100',
    commonCost: '200',
    cutCost: '100'
  },
  {
    smallBlind: '200',
    greatBlindness: '400',
    scoreboard: '40000',
    preNote: '[0,50,100,200,400]',
    handCost: '200',
    commonCost: '400',
    cutCost: '200'
  },
  {
    smallBlind: '300',
    greatBlindness: '600',
    scoreboard: '60000',
    preNote: '[0,75,150,300,600]',
    handCost: '300',
    commonCost: '600',
    cutCost: '300'
  },
  {
    smallBlind: '500',
    greatBlindness: '1000',
    scoreboard: '100000',
    preNote: '[0,125,250,500,1000]',
    handCost: '500',
    commonCost: '1000',
    cutCost: '500'
  },
  {
    smallBlind: '1000',
    greatBlindness: '2000',
    scoreboard: '200000',
    preNote: '[0,250,500,1000,2000]',
    handCost: '1000',
    commonCost: '2000',
    cutCost: '1000'
  }
]

// 不同游戏类型的前注配置
export const GAME_ANTE_CONFIG = {
  // 德州和奥马哈前注配置
  default: [
    '[0,1,2]',
    '[0,1,2,4]',
    '[0,1,2,5,10]',
    '[0,1,2,5,10,20]',
    '[0,5,10,20,40]',
    '[0,5,10,25,50]',
    '[0,10,25,50,100]',
    '[0,25,50,100,200]',
    '[0,50,100,200,400]',
    '[0,75,150,300,600]',
    '[0,125,250,500,1000]',
    '[0,250,500,1000,2000]'
  ],
  // 短牌的前注配置
  shortDeck: ['[1]', '[2]', '[4]', '[5]', '[10]', '[20]', '[25]', '[50]', '[100]', '[500]', '[1000]', '[2000]']
}

// 游戏类型映射
export const getAnteConfigByGameId = (gameId) => {
  // 短牌游戏
  if (gameId === 175 || gameId === '175') {
    return GAME_ANTE_CONFIG.shortDeck
  }
  // 德州、奥马哈及其他游戏使用默认配置
  return GAME_ANTE_CONFIG.default
}
