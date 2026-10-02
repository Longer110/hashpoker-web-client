export default {
  // 俱乐部桌子配置
  ClubTableSetup: {
    Search: {
      GroupLabel: '俱乐部桌子配置',
      GameLabel: '游戏',
      SelectPlaceholder: '请选择'
    },
    Actions: {
      Add: '新增',
      Edit: '编辑',
      Delete: '删除'
    },
    Table: {
      Index: '序号',
      Group: '分组',
      Game: '游戏',
      OddsTable: '常规保险',
      Actions: '操作'
    },
    Dialog: {
      TitleCreate: '新增俱乐部桌子配置',
      TitleEdit: '编辑俱乐部桌子配置'
    },
    Messages: {
      ConfirmDelete: '此操作将永久删除该配置, 是否继续?',
      DeleteSuccess: '删除成功!',
      CreateSuccess: '新增成功',
      EditSuccess: '编辑成功'
    },
    AddEditDialog: {
      GroupLabel: '分组',
      GroupPlaceholder: '请选择分组',
      GameLabel: '游戏',
      GamePlaceholder: '请选择游戏',
      CapacityLabel: '人数(2-9)',
      CapacityPlaceholder: '请输入人数 (2-9)',
      KeepTimeLabel: '房间时长(h)',
      KeepTimePlaceholder: '请输入房间时长',
      TakeinLabel: '带入筹码倍数',
      TakeinPlaceholder: '请输入带入筹码倍数',
      PoolEntryRateLabel: '入场率',
      PoolEntryRatePlaceholder: '请输入入场率',
      DWLimitLabel: '抽水封顶',
      DWLimitPlaceholder: '请输入抽水封顶',
      VideoFeeLabel: '语聊收费价格',
      VideoFeePlaceholder: '请输入语聊收费价格',
      FrontendRoomConfig: '前端创建房间配置',
      AnteHint: '小盲,大盲,默认带入,前注,付费看手牌,付费看公牌,付费切牌',
      SmallBlind: '小盲',
      SmallBlindShortDeck: '小盲/底注',
      SmallBlindPlaceholder: '请输入小盲',
      BigBlind: '大盲',
      BigBlindShortDeck: '大盲/庄家倍率',
      BigBlindPlaceholder: '请输入大盲',
      Scoreboard: '带入记分牌',
      ScoreboardPlaceholder: '请输入带入记分牌',
      Ante: '前注',
      AntePlaceholder: '请输入前注 (JSON 数组)',
      HandCost: '付费看手牌',
      HandCostPlaceholder: '请输入付费看手牌',
      CommonCost: '付费看公牌',
      CommonCostPlaceholder: '请输入付费看公牌',
      CutCost: '付费切牌',
      CutCostPlaceholder: '请输入付费切牌',
      Tooltips: {
        ShortDeckBigBlind: '根据短牌选择的模式读取，前端创建房间显示对应的值',
        Ante: '前端创建房间时，选择对应的大小盲，分别对应显示配置的前注额度,<br>例如：选择第一行的小盲，后面的大盲、前注都是第一行的，依此类推;&nbsp;',
        DefaultFirstFour: '前端默认读取前四行的数据;'
      },
      InsuranceDivider: '常规保险outs数',
      OddsLabel: '赔率',
      OddsPlaceholder: '补{count}张牌赔率',
      OddsPrepend: '补牌{count}',
      Messages: {
        SmallBlindFirst: '请先输入小盲',
        BigBlindGreater: '大盲必须大于小盲'
      },
      Validation: {
        GroupRequired: '请选择分组',
        GameRequired: '请选择游戏',
        VideoFeeRequired: '请输入语聊收费价格',
        CapacityRequired: '请至少保留一个人数并确保所有人数已填写',
        CapacityInteger: '人数必须为整数',
        CapacityRange: '人数只能输入2-9之间的整数',
        KeepTimeRequired: '请至少保留一个房间时长并确保所有时长已填写',
        KeepTimePositive: '房间时长必须大于0',
        KeepTimeDecimal: '房间时长小数位不能超过两位',
        TakeinRequired: '请至少保留一个带入筹码倍数并确保所有倍数已填写',
        TakeinInteger: '带入筹码倍数必须为整数',
        PoolEntryRateRequired: '请至少保留一个入场率并确保所有入场率已填写',
        PoolEntryRatePositive: '入场率必须大于0',
        PoolEntryRateDecimal: '入场率小数位不能超过两位',
        DWLimitRequired: '请至少保留一个抽水封顶并确保所有抽水封顶已填写',
        DWLimitDecimal: '抽水封顶小数位不能超过两位',
        OddsRequired: '请至少保留一个赔率并确保所有赔率已填写',
        OddsDecimal: '赔率小数位不能超过两位'
      }
    }
  },
}