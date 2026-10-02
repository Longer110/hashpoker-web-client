// src/lang/zh-CN.js
export default {
  Common: {
    Title: '系统管理',
    Submit: '提交',
    Cancel: '取消',
    Close: '关 闭',
    Welcome: '欢迎{Name}使用！', // 带变量的文案
    Confirm: '确认',
    Hint: '提示'
  },
  Login: {
    Username: '用户名',
    Password: '密码',
    LoginBtn: '登 录',
    SystemName: 'HASH-POKER管理系统',
    UsernamePlaceholder: '请输入用户名',
    PasswordPlaceholder: '密码最少18位，包含数字+大小写字母+特殊字符',
    GooglePlaceholder: '请输入谷歌验证码',
    PleaseEnterTheCorrectUsername: '请输入正确的用户名',
    PleaseEnterTheCorrectPassword: '请输入正确的密码',
    RememberAccountAndPassword: '记住账号和密码',
    PleaseSelectALanguage: '请选择语言'
  },
  Menu: {
    Home: '首页',
    User: '用户管理'
  },
  //   全局通用
  GlobalUniversality: {
    Query: '查询',
    Reset: '重置',
    OperationSuccessful: '操作成功',
    TimeSelection: '时间选择',
    Export: '导出',
    Import: '导入',
    ImportSuccess: '导入成功',
    DownloadTemplate: '下载模板',
    DownloadTip: '创建导出任务成功，开始下载',
    Edit: '编辑'
  },
  // 牌桌管理
  HallTableList: {
    Actions: {
      Create: '新增',
      CloseTable: '关闭牌桌',
      ViewDetail: '详情',
      ViewGamePlays: '查看牌局'
    },
    Table: {
      Index: '序号',
      GroupId: '分组ID',
      GameId: '游戏ID',
      TableName: '牌桌名称',
      TableId: '牌桌ID',
      SmallBlind: '小盲',
      BigBlind: '大盲',
      PreAnte: '前注',
      ModeType: '抽水类型',
      ComputeMode: '抽水方式',
      UsersCount: '玩家数量',
      AndroidCount: '当前机器人数',
      Actions: '操作'
    },
    Dialog: {
      CreateTitle: '新增',
      EditTitle: '编辑',
      DetailTitle: '查看牌桌详情'
    },
    Drawer: {
      Title: '查看'
    },
    ModeType: {
      None: '不抽水',
      Hand: '把抽',
      Round: '局抽'
    },
    ComputeMode: {
      Pot: '按底池比例',
      Profit: '按盈利比例'
    },
    Messages: {
      DeleteConfirm: '确定要删除吗?',
      CloseConfirm: '确定要关闭牌桌吗?',
      SelectDeleteWarning: '请选择要删除的数据',
      CloseSuccess: '关闭牌桌成功',
      DeleteSuccess: '删除成功'
    },
    GamePlays: {
      Title: '查看牌局',
      PlayerId: '玩家ID',
      PlayerName: '玩家昵称',
      PlayerBalance: '玩家余额',
      Actions: '操作',
      KickOut: '一键踢出',
      BatchKickOut: '批量踢出',
      KickOutConfirm: '确定要踢出玩家 {name} 吗？',
      BatchKickOutConfirm: '确定要批量踢出 {count} 个玩家吗？',
      SelectWarning: '请选择要踢出的玩家',
      KickOutSuccess: '踢出成功',
      KickOutFailed: '踢出失败',
      ParseError: '解析玩家信息失败'
    },
    Detail: {
      Avatar: '头像',
      SysVersion: '操作系统版本号（记录玩家系统版本）',
      Models: '机器码（俱乐部2.3版本用作推广码）',
      RegistChannel: '账号注册渠道（1.官网；2.AppStore；3.应用宝；4+：预留扩展渠道）',
      LogonChannel: '登录渠道（1.官网；2.AppStore；3.应用宝；4+：预留扩展渠道）',
      ShopID: '分店ID/渠道ID（用于获取群组游戏配置）',
      LogongIP: '登入IP（最近登录信息可在登录日志中查看）',
      LogonTime: '登入时间（最近登录信息可在登录日志中查看）',
      BinDingPHone: '绑定手机（预留）',
      RealName: '实名认证（0：未认证；>0：认证ID）',
      WeiXinOpenID: '在应用下的唯一ID',
      WeiXinUnionID: '全局唯一UnionID',
      HeadUrl: '头像URL',
      SafePassWord: '银行密码',
      ShopAccount: '分店账号',
      ChannelID: '渠道ID',
      UserMark: '用户标记（0：普通用户；1001：主播）',
      LogonPos: '登录经纬度（JSON格式 [经度, 纬度]）',
      LogonRealIP: '上次登录的真实外网IP',
      InviteCode: '邀请码',
      Mail: '邮箱'
    }
  },
  HallTableDialog: {
    Divider: {
      RoomConfig: '房间配置',
      ClubTexasConfig: '俱乐部德州配置',
      RakeSettings: '抽水设置',
      CardSettings: '看牌设置'
    },
    Fields: {
      Template: {
        Label: '牌桌模板',
        Placeholder: '请选择牌桌模板'
      },
      TemplateName: {
        Label: '模板名称',
        Placeholder: '请输入模板名称'
      },
      TableName: {
        Label: '牌桌名称',
        Placeholder: '请输入牌桌名称'
      },
      Group: {
        Label: '分组',
        Placeholder: '请选择分组'
      },
      Game: {
        Label: '游戏',
        Placeholder: '请选择游戏'
      },
      GoldType: {
        Label: '金币类型',
        Placeholder: '请选择金币类型'
      },
      OpenCount: {
        Label: '开桌数量',
        Placeholder: '请输入开桌数量'
      },
      KeepTime: {
        Label: '房间时长',
        Placeholder: '请选择房间时长'
      },
      RealtimeAV: {
        Label: '实时音频'
      },
      VoiceFee: {
        Label: '语音收费(U/分钟)',
        Placeholder: '请选择'
      },
      VoiceFeeCustom: {
        Label: '语音收费(U/分钟)(自定义)'
      },
      AutoContinue: {
        Label: '超时自动续开'
      },
      modelRule: {
        Label: '模式',
        modelType1: '庄位模式',
        modelType2: '盲注模式'
      },
      AnteSwitch: {
        Label: '前注'
      },
      AnteValue: {
        Label: '前注值',
        Placeholder: '请选择前注'
      },
      DealerMultiple: {
        Label: '庄家=N倍前注',
        Placeholder: '请选择倍率'
      },
      AnteCustom: {
        Label: '前注(自定义)',
        Placeholder: '请输入前注'
      },
      SmallBlind: {
        Label: '小盲'
      },
      BigBlind: {
        Label: '大盲'
      },
      Capacity: {
        Label: '牌桌人数'
      },
      AutoStartPlayers: {
        Label: '自动开始人数',
        Placeholder: '请选择自动开始人数'
      },
      MinBuyIn: {
        Label: '最小买入BB',
        Placeholder: '请输入最小值'
      },
      MaxBuyIn: {
        Label: '最大买入BB',
        Placeholder: '请输入最大值'
      },
      BumaLimit: {
        Label: '补码上限',
        Placeholder: '请输入补码上限'
      },
      PoolEntryRate: {
        Label: '入池率',
        Placeholder: '请选择入池率'
      },
      PoolEntryRateHands: {
        Label: 'n手之内不受入池率限制',
        Placeholder: '请输入'
      },
      StopLoss: {
        Label: '止损上限'
      },
      LossMultiplier: {
        Label: '输钱金额倍数',
        Placeholder: '请选择输钱限制倍数'
      },
      AllowTakeOut: {
        Label: '是否可撤码'
      },
      TakeOutMultiplier: {
        Label: '撤码倍数',
        Placeholder: '请选择撤码倍数'
      },
      HandLimit: {
        Label: '手数限制'
      },
      HandLimitOptions: {
        Label: '手数选项',
        Placeholder: '请选择手数选项'
      },
      HandLimitCustom: {
        Label: '手数限制(自定义)',
        Placeholder: '请输入手数'
      },
      ForceBlind: {
        Label: '强制抓头'
      },
      RakeMethod: {
        Label: '抽水方式',
        Placeholder: '请选择抽水方式'
      },
      RakeType: {
        Label: '抽水类型',
        Placeholder: '请选择抽水类型'
      },
      ServiceRate: {
        Label: '服务费比例',
        Placeholder: '请输入服务费比例'
      },
      TopLimit: {
        Label: '每手抽佣封顶',
        Placeholder: '请输入封顶倍数'
      },
      TriggerPot: {
        Label: '触发抽佣底池',
        Placeholder: '请输入低于倍数'
      },
      DelayLook: {
        Label: '延时看牌'
      }
    },
    Placeholder: {
      Select: '请选择',
      Input: '请输入',
      SelectCost: '请选择{label}',
      InputCost: '请输入{label}'
    },
    Switch: {
      Enable: '开启',
      Disable: '关闭',
      Yes: '是',
      No: '否',
      On: '开',
      Off: '关'
    },
    Options: {
      Common: {
        Custom: '自定义',
        Percent: '{value}%'
      },
      Game: {
        Texas: '德州',
        Short: '短牌'
      },
      KeepTime: {
        Minutes5: '5分钟',
        Minutes30: '30分钟',
        Hours0_5: '0.5小时',
        Hours1: '1小时',
        Hours1_5: '1.5小时',
        Hours2: '2小时',
        Hours2_5: '2.5小时',
        Hours3: '3小时',
        Hours3_5: '3.5小时',
        Hours4: '4小时',
        Hours4_5: '4.5小时',
        Hours5: '5小时',
        Hours12: '12小时',
        Hours24: '24小时'
      },
      VoiceFee: {
        Free: '免费'
      },
      HandCount: '{count}手',
      PlayerCount: '{count}人',
      Multiplier: '{value}倍'
    },
    CardConfig: {
      Public: '付费看公牌',
      PublicCost: '付费看公牌额度',
      Hand: '付费看手牌',
      HandCost: '付费看手牌额度',
      Cut: '付费切牌',
      CutCost: '付费切牌额度',
      CustomLabel: '{label}(自定义)'
    },
    Tips: {
      SmallBlindManual: '小盲可手动输入',
      BuyInAmountPrefix: '买入额度：',
      ActualAmountPrefix: '实际额度：'
    },
    Tooltips: {
      ServiceRate: '服务费比例最多为10%，如10%则输入10，0.1%则输入0.1'
    },
    Messages: {
      CreateSuccess: '创建成功',
      UpdateSuccess: '更新成功',
      DataParseError: '数据格式错误'
    },
    Validation: {
      TableNameRequired: '请输入牌桌名称',
      GroupRequired: '请选择分组',
      GameRequired: '请选择游戏',
      PoolEntryRateHandsRequired: '请输入手数',
      DealerMultiplierRequired: '请选择庄家倍率',
      ServiceRateRequired: '服务费比例不能为空',
      ServiceRateMax: '服务费比例最多为10%',
      ServiceRateMin: '服务费比例不能为负数',
      TopLimitRequired: '服务费比例≠0时,每手抽佣封顶不能为0'
    }
  },
  HallTableDetail: {
    Sections: {
      TexasConfig: '德州配置',
      RakeSettings: '抽水设置',
      CardSettings: '看牌设置'
    },
    Fields: {
      TemplateName: '模板名称',
      TableName: '牌桌名称',
      TableId: '牌桌ID',
      GroupId: '分组ID',
      Game: '游戏',
      GoldType: '金币类型',
      OpenCount: '开桌数量',
      ContinuedNum: '补开数量',
      KeepTime: '房间时长',
      AutoContinue: '超时自动续开',
      AutoStart: '自动开始',
      RealtimeAV: '实时音频',
      VoiceFee: '语音收费（U/分钟）',
      UsersCount: '玩家数量',
      AndroidCount: '当前机器人数',
      DealerMultiple: '庄家倍数',
      PreAnte: '前注',
      SmallBlind: '小盲',
      BigBlind: '大盲',
      Capacity: '牌桌人数',
      AutoStartPlayers: '自动开始人数',
      MinBuyIn: '最小买入BB',
      MaxBuyIn: '最大买入BB',
      PoolEntryRate: '入池率',
      PoolEntryRateHands: 'n手之内不受入池率限制',
      StopLoss: '止损上限',
      LossAmount: '输钱限制金额',
      AllowTakeOut: '是否可撤码',
      TakeOutMultiplier: '撤码倍数',
      HandLimit: '手数限制',
      HandLimitValue: '手数限制值',
      ForceBlind: '强制抓头',
      ZhuaTouAmount: '抓头数额',
      RakeMethod: '抽水方式',
      RakeType: '抽水类型',
      ServiceRate: '服务费比例',
      TopLimit: '每手抽佣封顶',
      TriggerPot: '触发抽佣底池',
      DelayLook: '延迟看牌'
    },
    Unit: {
      Person: '人'
    },
    KeepTime: {
      Forever: '永久',
      Minutes30: '30分钟',
      Minutes5: '5分钟',
      Hours0_5: '0.5小时',
      Hours1: '1小时',
      Hours1_5: '1.5小时',
      Hours2: '2小时',
      Hours2_5: '2.5小时',
      Hours3: '3小时',
      Hours3_5: '3.5小时',
      Hours4: '4小时',
      Hours4_5: '4.5小时',
      Hours5: '5小时',
      Hours6: '6小时',
      Hours12: '12小时',
      Hours24: '24小时',
      Seconds: '{value}秒'
    }
  },
  HallTableConfig: {
    Search: {
      TableName: '牌桌名称',
      TableNamePlaceholder: '请输入牌桌名称',
      Game: '游戏类型',
      GamePlaceholder: '请选择游戏类型',
      Group: '分组',
      GroupPlaceholder: '请选择分组'
    },
    Actions: {
      Delete: '删除'
    },
    Table: {
      CreateTime: '时间'
    },
    Dialog: {
      DetailTitle: '查看牌桌配置详情',
      EditTitle: '编辑牌桌配置'
    },
    Messages: {
      ConfirmDelete: '确认删除吗？',
      DeleteSuccess: '删除成功!'
    }
  },
  // 牌桌模板
  HallTableTemplate: {
    Actions: {
      Add: '新增',
      BatchDelete: '删除',
      Edit: '编辑',
      Delete: '删除',
      Detail: '详情'
    },
    Dialog: {
      CreateTitle: '新增牌桌模板',
      EditTitle: '编辑牌桌模板',
      DetailTitle: '查看牌桌模板详情'
    },
    Messages: {
      DeleteConfirmSingle: '此操作将永久删除该模板, 是否继续?',
      DeleteConfirmBatch: '此操作将永久删除选中的模板, 是否继续?',
      DeleteSuccess: '删除成功!',
      DeleteCanceled: '已取消删除'
    },
    Options: {
      GoldType: {
        USDT: 'USDT'
      }
    },
    KeepTime: {
      Forever: '永久',
      Minutes30: '30分钟',
      Hours1: '1小时',
      Hours2: '2小时',
      Hours4: '4小时',
      Hours6: '6小时',
      Hours12: '12小时',
      Hours24: '24小时'
    },
    Format: {
      KeepTimeMinutes: '{minutes}分钟'
    }
  },
  //   弹幕表情
  BulletScreenEmojis: {
    Warning: '注：点击对应要操作的数字，可进行输入，点击回车可进行编辑！',
    Search: {
      GroupLabel: '分组',
      GroupPlaceholder: '请选择分组'
    },
    Buttons: {
      Add: '新增',
      Delete: '删除'
    },
    Table: {
      Index: '序号',
      Actions: '操作',
      Columns: {
        GroupId: '分组id',
        GroupName: '分组名称',
        Cheers: '干杯',
        BlowKiss: '飞吻',
        Like: '点赞',
        Flowers: '鲜花',
        Gatling: '加特林',
        Shark: '鲨鱼',
        Tomato: '番茄',
        CatchChicken: '抓鸡',
        Bomb: '炸弹',
        LightCigarette: '点烟',
        PatHead: '摸头',
        Delay1: '延时1',
        Delay2: '延时2',
        Delay3: '延时3',
        Delay4: '延时4',
        Delay5: '延时5',
        ViewFlop: '看翻牌',
        ViewTurn: '看转牌',
        ViewRiver: '看河牌',
        NormalBarrage: '普通弹幕',
        FancyBarrage: '炫彩弹幕',
        LuxuryBarrage: '土豪弹幕',
        InsuranceDelay1: '保险延时1',
        InsuranceDelay2: '保险延时2',
        InsuranceDelay3: '保险延时3',
        InsuranceDelay4: '保险延时4',
        InsuranceDelay5: '保险延时5',
        ViewHoleCards: '看手牌',
        PaidCut: '付费切牌',
        ViewBoard: '看公牌'
      }
    },
    Dialog: {
      CreateTitle: '新增',
      EditTitle: '编辑'
    },
    DialogSections: {
      Emojis: '表情',
      PokerTable: '牌桌',
      Barrage: '弹幕',
      LookCards: '看牌',
      SelectGroupRequired: '请选择分组',
      InputRequired: '请输入'
    },
    Placeholders: {
      Input: '请输入'
    },
    Messages: {
      UpdateConfirmPrefix: '是否修改当前数据为',
      UpdateConfirmSuffix: '？',
      UpdateSuccess: '更新成功！',
      DeleteConfirm: '确认删除吗？',
      DeleteSuccess: '删除成功！',
      CreateSuccess: '添加成功！',
      InputRequired: '请输入',
      SelectGroupRequired: '请选择分组',
      ParseLocalConfigFailed: '解析弹幕表情本地配置失败:',
      FetchGroupFailed: '获取分组列表失败:'
    }
  },
  BusinessReport: {
    Title: '业务看板',
    DefaultTip: '默认均值为当前一天',
    Form: {
      DatePlaceholder: '选择日期'
    },
    Tooltips: {
      TotalPay: '入款总额：充值到账的总额',
      TotalPayCount: '入款笔数：充值的订单数量',
      GasFee: 'Gas费用：上链所需的费用',
      WaterRemain: '抽水池余额：抽水池资金账号的余额',
      FreezeFee: '冻结资金：平台冻结的资金',
      TotalWithdraw: '总提现：提现的总金额',
      TotalWithdrawCount: '提现笔数：提现的订单数量',
      TotalEarn: '净营收：充值金额-提现金额',
      InnerTransfer: '运营内转金额：在游戏后台进行的增加金币数量额度',
      WithdrawFee: '提现手续费：用户提现时收取的手续费'
    },
    Cards: {
      TotalPay: {
        Title: '入款（充值）总额',
        AveragePrefix: '平均每日总额'
      },
      TotalPayCount: {
        Title: '入款笔数',
        AveragePrefix: '平均每日笔数：'
      },
      GasFee: {
        Title: 'Gas费用',
        AveragePrefix: '平均每日：'
      },
      WaterRemain: {
        Title: '抽水池余额',
        PreviousPrefix: '前日账号余额：'
      },
      FreezeFee: {
        Title: '冻结资金',
        TotalPrefix: '总冻结资金：'
      },
      TotalWithdraw: {
        Title: '总提现',
        AveragePrefix: '平均每日提现：'
      },
      TotalWithdrawCount: {
        Title: '提现笔数',
        AveragePrefix: '平均每日笔数：'
      },
      TotalEarn: {
        Title: '净营收',
        AveragePrefix: '平均每日净营收：'
      },
      InnerTransfer: {
        Title: '运营内转金额（增减）',
        AveragePrefix: '平均每日内转：'
      },
      WithdrawFee: {
        Title: '提现手续费',
        AveragePrefix: '平均每日提现手续费:'
      }
    },
    Charts: {
      ProfitXAxis: '盈利额度',
      LossXAxis: '亏损额度',
      PeopleYAxis: '人数',
      ProfitBuckets: {
        Range1: '0<盈利<10',
        Range2: '10<盈利<50',
        Range3: '50<盈利<100',
        Range4: '盈利>100'
      },
      ProfitPie: {
        Title: '长牌德州VS短牌德州流水'
      },
      RakePie: {
        Title: '长牌德州VS短牌德州抽水'
      },
      LongDeckRake: '长牌抽水',
      ShortDeckRake: '短牌抽水',
      RightList: {
        Total: '总抽水：',
        Long: '长牌抽水：',
        Short: '短牌抽水：'
      }
    }
  },
  Home: {
    Title: '平台看板',
    DefaultTip: '默认均值为当前一天',
    TotalPumping: '总抽水',
    MeanPumpingRate: '抽水均值',
    TotalBet: '总下注',
    AverageBettingValue: '下注均值',
    AverageNumberOfOnlineUsers: '平均在线用户数',
    MaximumNumberOfSimultaneousOnlineUsers: '最高同时在线用户数',
    NumberOfTGRegisteredUsers: 'TG注册用户数',
    AverageNumberOfTGRegisteredUsers: 'TG注册用户数均值',
    NumberOfActiveUsers: '活跃用户数',
    AverageNumberOfActiveUsers: '活跃用户数均值',
    TheHighestNumberOfConcurrentOnlineUsers: '同时在线最高人数',
    MeanOfTheHighestNumberOfConcurrentOnlineUsers: '同时在线最高人数均值',
    TotalNumberOfGamesPlayed: '总牌局数',
    MeanNumberOfGamesPlayed: '牌局数均值',
    UVMean: 'UV均值',
    AccumulatedNumberOfPayingPlayers: '累计付费玩家数',
    NumberOfDAUPayingPlayers: 'DAU付费玩家数',
    AverageOfDAUPayingPlayers: 'DAU付费玩家数均值',
    NewNumberOfPayingPlayersAdded: '新增付费玩家数',
    AverageOfNewlyAddedPayingPlayers: '新增付费玩家数均值',
    InsuranceRevenue: '保险收入',
    AverageDailyInsuranceIncome: '每日保险收入均值',
    InsuranceClaimPayment: '保险赔付',
    DailyAverageInsurancePayout: '每日保险赔付均值',
    UVConversionRate: 'UV转化率',
    AccountRegistrationConversionRate: '账号注册转化率',
    AddARPU: '新增ARPU',
    DAUPaymentRate: 'DAU付费率',
    NewPaidRate: '新增付费率',
    Description1: '总抽水：统计周期内，平台从所有牌局中抽取的服务费总和。这是平台的核心收入',
    Description2: 'TG注册用户数：统计周期内，通过TG小程序成功完成注册流程的独立用户数量',
    Description3: '活跃用户数：登录过游戏就算',
    Description4: '同时在线最高人数：周期内单一时间点，最高的在线人数',
    Description5: '总牌局数：周内已经完成的牌局数（手数）',
    Description6: 'UV:今日新增的用户数内，有参与过一局游戏的用户',
    Description7: '累计付费玩家数：从有新增开始，计算到统计日期，所有的充值用户总数(包含VP充值)',
    Description8: 'DAU付费玩家数：今日的活跃用户内，所有付费过的玩家总数',
    Description9: '新增付费玩家数：之前没有付费过的玩家，今日首次付费行为的用户数（包含VIP充值）',
    Description10: '保险收入：周期内保险收入总额',
    Description11: '保险赔付：周期内保险赔付总额',

    Description12: 'ARPU:充值金额÷活跃用户数',
    Description13: 'UV转化率：UV÷今日新增人数',
    Description14: 'ACU:平均同时在线人数；每5分钟统计一次ccu,报表为当日的均值',

    Description15: '帐号注册转化率：帐号注册数÷今日新增登录人数',
    Description16: '新增ARPU:充值金额÷今日新增人数',
    Description17: 'ARPPU:充值金额÷活跃用户付费玩家数',

    Description18: 'DAU付费率：活跃用户付费玩家数÷活跃用户数',
    Description19: '新增付费率：周期内新增付费玩家数/新增总数'
  },
  ImageText: {
    Title: '标题',
    Subtitle: '副标题',
    Source: '来源',
    Status: '状态',
    OnShelf: '上架',
    OffShelf: '下架',
    AddImageText: '添加策略图文',
    Index: '序号',
    Graphics: '图文',
    Actions: '操作',
    PlaceholderTitle: '请输入标题'
  },
  // 登录日志
  LoginLog: {
    Sort: '序号',
    LoginLocation: '登录地点',
    LoginTimes: '登录次数',
    UserId: '用户ID',
    LoginIp: '登陆IP',
    LoginChannel: '登陆渠道',
    MachineCode: '机器码',
    LoginTime: '登陆时间'
  },
  // 角色管理
  Authority: {
    RoleWarning: '注：右上角头像下拉可切换角色',
    AddRole: '新增角色',
    RoleId: '角色ID',
    RoleName: '角色名称',
    Actions: '操作',
    SetPermissions: '设置权限',
    Copy: '拷贝',
    Edit: '编辑',
    Delete: '删除',
    ParentRole: '父级角色',
    RoleConfig: '角色配置',
    RoleMenu: '角色菜单',
    RoleApi: '角色api',
    ResourcePermission: '资源权限',
    PlaceholderRoleId: '请输入角色ID',
    RoleIdReg: '必须为正整数',
    PlaceholderRoleName: '请输入角色名',
    PlaceholderSelectParentRole: '请选择父级角色'
  },
  // 菜单管理
  MenuManage: {
    AddRootMenu: '新增根菜单',
    ID: 'ID',
    DisplayName: '展示名称',
    Icon: '图标',
    RouteName: '路由Name',
    RoutePath: '路由Path',
    IsHidden: '是否隐藏',
    Hidden: '隐藏',
    Visible: '显示',
    ParentNode: '父节点',
    Sort: '排序',
    FilePath: '文件路径',
    Actions: '操作',
    AddSubMenu: '添加子菜单',
    Edit: '编辑',
    Delete: '删除',
    MenuWarning: '新增菜单，需要在角色管理内配置权限才可使用',
    BasicInfo: '基础信息',
    PlaceholderDisplayName: '请输入菜单展示名称',
    PlaceholderRouteName: '唯一英文字符串',
    RouteConfig: '路由配置',
    ParentNodeID: '父节点ID',
    PlaceholderSelectParent: '请选择父节点',
    AddParams: '添加参数',
    PlaceholderRoutePath: '建议只在后方拼接参数',
    DisplaySettings: '显示设置',
    SortMark: '排序标记',
    PlaceholderSort: '请输入排序数字',
    No: '否',
    Yes: '是',
    PlaceholderIsHidden: '是否在列表隐藏',
    AdvancedConfig: '高级配置',
    HighlightMenu: '高亮菜单',
    PlaceholderHighlightMenu: '请输入高亮菜单名称',
    KeepAlive: 'KeepAlive',
    PlaceholderKeepAlive: '是否keepAlive缓存页面',
    CloseTab: 'CloseTab',
    PlaceholderCloseTab: '是否自动关闭tab',
    IsBasePage: '是否为基础页面',
    PlaceholderIsBasePage: '是否为基础页面',
    RouteTransition: '路由切换动画',
    FollowGlobal: '跟随全局',
    Fade: '淡入淡出',
    Slide: '滑动',
    Zoom: '缩放',
    NoAnimation: '无动画',
    ParameterConfig: '菜单参数配置',
    AddParameter: '新增菜单参数',
    ParameterType: '参数类型',
    ParameterKey: '参数key',
    PlaceholderParameterKey: '请输入参数key',
    ParameterValue: '参数值',
    PlaceholderParameterValue: '请输入参数值',
    ButtonConfig: '可控按钮配置',
    AddButton: '新增可控按钮',
    ButtonName: '按钮名称',
    PlaceholderButtonName: '请输入按钮名称',
    Remark: '备注',
    PlaceholderRemark: '请输入按钮备注',
    TooltipHighlightMenu:
      '注：当到达此路由时候，指定左侧菜单指定name会处于活跃状态（亮起），可为空，为空则为本路由Name。',
    TooltipIsBasePage: '此项选择为是，则不会展示左侧菜单以及顶部信息。',
    TooltipRouteTransition: '如果设置了路由切换动画，在本路由下的动画优先级高于全局动画切换优先级。',
    TooltipButtonConfig: '点击查看按钮权限配置文档',
    FormTipSubMenu: '如果菜单包含子菜单，请创建router-view二级路由页面或者',
    FormTipClickMe: '点我设置',
    CascaderPlaceholder: '请选择文件路径',
    InputPlaceholder: '页面:view/xxx/xx.vue 插件:plugin/xx/xx.vue',
    ToggleManualInput: '手动输入',
    ToggleQuickSelect: '快捷选择',
    SelectPlaceholder: '请选择',
    PlaceholderFilePath: '请输入文件路径',
    PlaceholderMenuName: '请输入菜单name'
  },
  // 用户管理
  User: {
    Captcha: '验证码',
    Username: '用户名',
    PlaceholderUsername: '请输入用户名',
    LeastLength5: '最低5位字符',
    Nickname: '昵称',
    PlaceholderNickname: '请输入昵称',
    Phone: '手机号',
    PlaceholderPhone: '请输入手机号',
    PlaceholderRightPhone: '请输入合法手机号',
    Email: '邮箱',
    PlaceholderEmail: '请输入邮箱',
    PlaceholderRightEmail: '请输入正确的邮箱',
    PlaceholderRoleSelect: '请选择用户角色',
    AddUser: '新增用户',
    Avatar: '头像',
    ID: 'ID',
    Roles: '用户角色',
    Enabled: '启用',
    Actions: '操作',
    Delete: '删除',
    Edit: '编辑',
    ResetPassword: '重置密码',
    SetGoogle: '设置谷歌验证码',
    ResetPasswordTitle: '重置密码',
    UserAccount: '用户账号',
    UserNickname: '用户昵称',
    NewPassword: '新密码',
    PlaceholderNewPassword: '请输入新密码（最少18位，包含数字+大小写字母）',
    GenerateRandomPassword: '生成随机密码',
    Title: '用户',
    Password: '密码',
    PlaceholderPassword: '最少18位，包含数字+大小写字母+特殊字符',
    CreateSuccess: '创建成功',
    EditSuccess: '编辑成功',
    DeleteSuccess: '删除成功',
    SetRoleSuccess: '角色设置成功',
    EnableSuccess: '启用成功',
    DisableSuccess: '禁用成功',
    ConfirmDelete: '确定要删除吗?',
    PasswordRequired: '请输入密码',
    PasswordMinLength: '密码至少需要18位字符',
    PasswordMustContainNumber: '密码必须包含数字',
    PasswordMustContainLower: '密码必须包含小写字母',
    PasswordMustContainUpper: '密码必须包含大写字母',
    PasswordMustContainSpecial: '密码必须包含特殊字符',
    ResetPwdNewPasswordRequired: '请输入新密码',
    PasswordGeneratedCopied: '密码已生成并复制到剪贴板',
    CopyFailed: '复制失败，请手动复制',
    PasswordResetSuccess: '密码重置成功',
    PasswordResetFailed: '密码重置失败'
  },
  // api管理
  Api: {
    // 搜索表单
    Path: '路径',
    PlaceholderPath: '请输入路径',
    Description: '描述',
    PlaceholderDescription: '请输入描述',
    ApiGroup: 'API分组',
    PlaceholderApiGroup: '请选择API分组',
    PlaceholderSelectOrCreate: '请选择或新增',
    Method: '请求',
    Actions: '操作',
    Cancel: '取消',
    PlaceholderMethod: '请求选择',
    // 按钮
    RefreshCache: '刷新缓存',
    Add: '新增',
    Edit: '编辑',
    Delete: '删除',
    SyncApi: '同步API',
    AutoFill: '自动填充',
    // 表格列
    ID: 'ID',
    ApiPath: 'API路径',
    ApiGroupColumn: 'API分组',
    ApiDescription: 'API简介',
    MethodColumn: '请求',
    SingleAdd: '单条新增',
    Ignore: '忽略',
    CancelIgnore: '取消忽略',
    // 同步对话框
    SyncRoute: '同步路由',
    NewRoute: '新增路由',
    NewRouteNote: '存在于当前路由中，但是不存在于api表',
    DeletedRoute: '已删除路由',
    DeletedRouteNote: '已经不存在于当前项目的路由中，确定同步后会自动从apis表删除',
    IgnoreRoute: '忽略路由',
    IgnoreRouteNote: '忽略路由不参与api同步，常见为不需要进行鉴权行为的路由',
    SyncApiWarning: '同步API，不输入路由分组将不会被自动同步，如果api不需要参与鉴权，可以按忽略按钮进行忽略。',
    // 编辑对话框
    AddApi: '新增Api',
    EditApi: '编辑Api',
    AddApiWarning: '新增API，需要在角色管理内配置权限才可使用',
    // 错误消息
    SelectApiGroupError: '请先选择API分组',
    FillDescriptionError: '请先填写API描述',
    GroupOrDescriptionError: '存在API未分组或未填写描述',
    ConfirmRefreshCache: '确定要刷新缓存吗?',
    ConfirmDeleteAllRoles: '此操作将永久删除所有角色下该api, 是否继续?',
    UnknownOperation: '未知操作',
    DeleteSuccess: '删除成功!',
    AddSuccess: '添加成功',
    AddSuccessManageRole: '添加成功，请到角色管理页面分配权限',
    EditSuccess: '编辑成功',
    AiAutoFillFailed: 'AI自动填充失败,请重新生成',
    // 请求方法标签
    CreateLabel: '创建',
    ReadLabel: '查看',
    UpdateLabel: '更新',
    DeleteLabel: '删除',
    // 表单验证消息
    PathRequired: '请输入api路径',
    GroupRequired: '请输入组名称',
    MethodRequired: '请选择请求方式',
    DescriptionRequired: '请输入api介绍'
  },
  // 操作历史
  Operation: {
    Method: '请求方法',
    Path: '请求路径',
    PathName: '操作详情',
    StatusCode: '结果状态码',
    PlaceholderSearch: '搜索条件',
    DeleteSelected: '删除',
    Operator: '操作人',
    Date: '日期',
    IP: '请求IP',
    RequestBody: '请求',
    Response: '响应',
    None: '无',
    Actions: '操作',
    Delete: '删除',
    ConfirmDelete: '确定要删除吗?',
    DeleteSuccess: '删除成功'
  },
  // 字典管理
  Dictionary: {
    Warning: '获取字典且缓存方法已在前端utils/dictionary 已经封装完成 不必自己书写 使用方法查看文件内注释',
    ListTitle: '字典列表',
    Add: '新增',
    CreateTitle: '添加字典',
    EditTitle: '修改字典',
    NameZh: '字典名（中）',
    PlaceholderNameZh: '请输入字典名（中）',
    NameEn: '字典名（英）',
    PlaceholderNameEn: '请输入字典名（英）',
    Status: '状态',
    StatusOn: '开启',
    StatusOff: '停用',
    Desc: '描述',
    PlaceholderDesc: '请输入描述',
    NameZhRequired: '请输入字典名（中）',
    NameEnRequired: '请输入字典名（英）',
    DescRequired: '请输入描述',
    DeleteConfirm: '确定要删除吗?',
    DeleteSuccess: '删除成功',
    OperationSuccess: '操作成功',
    // Detail
    DetailTitle: '字典详细内容',
    AddItem: '新增字典项',
    ColumnDate: '日期',
    ColumnLabel: '展示值',
    ColumnValue: '字典值',
    ColumnExtend: '扩展值',
    ColumnStatus: '启用状态',
    ColumnSort: '排序标记',
    Actions: '操作',
    Change: '变更',
    Delete: '删除',
    CreateItemTitle: '添加字典项',
    EditItemTitle: '修改字典项',
    PlaceholderLabel: '请输入展示值',
    PlaceholderValue: '请输入字典值',
    PlaceholderExtend: '请输入扩展值',
    PlaceholderSort: '排序标记',
    LabelRequired: '请输入展示值',
    ValueRequired: '请输入字典值',
    SortRequired: '排序标记',
    CreateOrUpdateSuccess: '创建/更改成功'
  },
  // 网易IM
  NetEaseIM: {
    Actions: '操作',
    Add: '新增',
    Edit: '编辑',
    Delete: '删除',
    Index: '序号',
    Url: 'IM后端请求',
    RoomURL: '语音房URL',
    IMUrl: 'IM地址',
    AppKey: 'appKey',
    AppSecret: 'appSecret',
    PayUrl: '充值请求',
    WithdrawUrl: '提现请求',
    ClubWithdrawGoldUrl: '获取用户金币额度',
    ManualTransferUrl: '手动转账充值/提现',
    PhoneUrl: '短信/邮箱',
    RecommendShareUrl: '分享/推荐地址',

    PlaceholderUrl: '请输入IM后端请求地址',
    PlaceholderRoomURL: '请输入语音房URL',
    PlaceholderIMUrl: '请输入IM地址',
    PlaceholderAppSecret: '请输入appSecret',
    PlaceholderAppKey: '请输入appKey',
    PlaceholderPayUrl: '请输入充值请求地址',
    PlaceholderWithdrawUrl: '请输入提现请求地址',
    PlaceholderClubWithdrawGoldUrl: '请输入获取用户金币额度地址',
    PlaceholderManualTransferUrl: '请输入手动转账充值/提现地址',
    PlaceholderPhoneUrl: '请输入短信/邮箱地址',
    PlaceholderRecommendShareUrl: '请输入分享/推荐地址',

    UrlRequired: '请输入IM后端请求地址',
    RoomURLRequired: '请输入语音房URL',
    IMUrlRequired: '请输入IM地址',
    AppSecretRequired: '请输入appSecret',
    AppKeyRequired: '请输入appKey',
    PayUrlRequired: '请输入充值请求地址',
    WithdrawUrlRequired: '请输入提现请求地址',
    ClubWithdrawGoldUrlRequired: '请输入获取用户金币额度地址',
    ManualTransferUrlRequired: '请输入手动转账充值/提现地址',
    PhoneUrlRequired: '请输入短信/邮箱地址',
    RecommendShareUrlRequired: '请输入分享/推荐地址',

    CreateOrUpdateSuccess: '创建/更改成功'
  },
  // 区服开关（开关服）
  SwitchSuit: {
    State: '区服状态',
    PlaceholderState: '请选择区服状态',
    AllOpen: '一键开服',
    AllClose: '一键关服',
    Index: '序号',
    ServerID: '区服ID',
    ServerName: '区服名称',
    On: '开启',
    Off: '关闭',
    Actions: '操作',
    Open: '开服',
    Close: '关服',

    ConfirmOpen: '确认开启{name}吗？',
    ConfirmClose: '确认关闭{name}吗？',
    ConfirmAllOpen: '确认开启所有区服吗？',
    ConfirmAllClose: '确认关闭所有区服吗？'
  },
  // 广告机器人
  AdvertiseBot: {
    Title: '标题',
    PlaceholderTitle: '请输入标题',
    CopyType: '文案类型',
    PlaceholderCopyType: '请选择文案类型',
    SendType: '发送类型',
    PlaceholderSendType: '请选择发送类型',
    AdvertiseStatus: '广告状态',
    PlaceholderAdvertiseStatus: '请选择广告状态',
    Add: '新增',
    Edit: '编辑',
    Delete: '删除',
    View: '查看',
    Index: '序号',
    ID: 'ID',
    FileType: '文件类型',
    SendTime: '发送时间',
    SendInterval: '时间间隔',
    EndTime: '截止时间',
    LastSendTime: '最后发送时间',
    Status: '状态',
    On: '开启',
    Off: '关闭',
    Actions: '操作',
    Remark: '备注',
    Content: '文案内容',
    PlaceholderContent: '请输入文案内容',
    IsMarkdown: '是否启用Markdown语法',
    PlaceholderIsMarkdown: '请选择是否启用Markdown语法',
    ChooseUpload: '请选择要上传的图片/视频',
    PlaceholderButtonName: '请输入按钮名称',
    PlaceholderButtonUrl: '请输入按钮对应网址',
    PlaceholderRemark: '请输入备注',
    FileUrl: '图片/视频路径',
    Buttons: '按钮',
    UnknownType: '未知类型',
    SendOnce: '指定时间发送一次',
    SendIntervalLoop: '指定间隔时间，循环发送',
    SendRandom: '随机间隔时间发送',
    Text: '文本',
    ImageText: '图片文本',
    VideoText: '视频文本',

    ConfirmDelete: '确定要删除吗?',
    SelectDeleteData: '请选择要删除的数据',
    DeleteSuccess: '删除成功',
    ConfirmReset: '确定重置吗?',
    Reset: '重置',

    PlaceholderSelectDate: '请选择日期',
    PlaceholderSendInterval: '请输入时间间隔',

    CreateOrUpdateSuccess: '创建/更改成功',
    FileTooLarge: '文件大小不能超过5MB！',

    CreateTime: '创建时间',
    UpdateTime: '更新时间',
    DeletedAt: '删除时间',
    ButtonTip: '按钮（可拖拽排序按钮显示位置）:'
  },
  // 活跃用户统计
  ActiveReport: {
    TimeSelection: '时间选择',
    StartTime: '开始时间',
    EndTime: '结束时间',
    Index: '序号',
    Channel: '渠道',
    DAU: '日活跃用户数量',
    WAU: '周活跃用户数量',
    MAU: '月活跃用户数量',
    Time: '时间'
  },
  // 新用户留存统计
  NewUserStatistics: {
    TimeSelection: '时间',
    StartTime: '开始时间',
    EndTime: '结束时间',
    CurrentPeriodTotalRegister: '当前周期内总注册:',
    Index: '序号',
    Channel: '渠道',
    Registered: '注册人数',
    D1: '第一天',
    D3: '第三天',
    D7: '第七天',
    D15: '第15天',
    D30: '第30天',
    RegisterTime: '注册时间'
  },
  // 输赢记录
  PaiJuWinLoseRecord: {
    UserID: '用户ID',
    PlaceholderUserID: '请输入玩家ID',
    PaiJuID: '牌局ID',
    PlaceholderPaiJuID: '请输入牌局ID',
    GameID: '游戏ID',
    PlaceholderGameID: '请选择游戏ID',
    Time: '时间',
    StartTime: '开始时间',
    EndTime: '结束时间',
    Index: '序号',
    RecordID: '记录ID',
    PlayerID: '玩家ID',
    GameType: '游戏类型',
    Session: '场次',
    WinLose: '输赢情况',
    DrawWater: '抽水',
    PumpingType: '抽水类型',
    BetAmount: '下注金额',
    ValidBet: '有效投注额',
    Actions: '操作',
    RangeSeparator: '至',
    View: '查看'
  },
  // 牌局记录
  GameRecord: {
    PaiJuID: '牌局ID',
    PlaceholderPaiJuID: '请输入牌局ID',
    PlayerID: '玩家ID',
    PlaceholderPlayerID: '请输入玩家ID',
    GameName: '游戏名称',
    PlaceholderGameName: '请选择游戏名称',
    OperateTime: '操作时间',
    RangeSeparator: '至',
    StartTime: '开始日期',
    EndTime: '结束日期',
    Index: '序号',
    Actions: '操作',
    View: '查看',
    TableName: '牌桌名称',
    RoomID: '场次',
    WinLose: '输赢',
    TableId: '牌桌ID',
    Time: '时间',
    GameOptionDeZhou: '德州',
    GameOptionShort: '短牌'
  },
  // 财产记录
  PropertyRecords: {
    PlayerID: '玩家ID',
    PlaceholderPlayerID: '请输入玩家ID',
    PlatformUserID: '平台UserID',
    PlaceholderPlatformUserID: '请输入平台UserID',
    ItemType: '道具类型',
    PlaceholderItemType: '请选择道具类型',
    ChangeType: '变动类型',
    PlaceholderChangeType: '请选择变动类型',
    Time: '时间',
    StartTime: '开始时间',
    EndTime: '结束时间',
    Index: '序号',
    OperatorId: '操作人ID',
    Operator: '操作人',
    PaiJuId: '牌局ID',
    changeModule: '变动模块',
    StartAmount: '起始数额',
    ChangeAmount: '变动数额',
    EndAmount: '结束数额',
    ViewDetail: '查看详情',
    OperateTime: '操作时间',
    Gold: '金币',
    BankBalance: '银行余额',
    OperationSuccess: '操作成功',
    ConfirmDeleteOne: '确定删除该条记录吗？',
    SelectDeleteData: '请选择要删除的数据',
    ConfirmDeleteSelected: '确定删除选中数据吗？',
    DeleteSuccess: '删除成功',
    DeleteBatchSuccess: '批量删除成功'
  },
  // 错误页面（404）
  ErrorPage: {
    PageMissing: '页面被神秘力量吸走了',
    PermissionHintPrefix: '常见问题为无当前页面权限，如果确定要使用本路由，',
    PermissionHintHighlight: '请联系管理员进行页面权限分配！',
    BackHome: '返回首页',
    PermissionChangedMessage: '检测到其他用户修改了路由权限，请重新登录'
  },
  // 牌局记录-牌局详情
  GameDetailDrawer: {
    Title: '牌局详情',
    PaiJuNumber: '牌局编号',
    GameTime: '游戏时间',
    TableName: '牌桌名称',
    BlindsAnte: '小盲/大盲',
    TotalBet: '下注总额',
    Participants: '参与人数',
    People: '人',
    CommunityCardsTitle: '公共牌（翻牌、转牌、河牌）',
    NoCommunityCards: '未发公共牌',
    GameProgress: '游戏进程',
    PlayerDetails: '玩家详情',
    Position: '位置',
    Nickname: '玩家昵称',
    Banker: '庄家',
    PlayerID: '玩家ID',
    NotShown: '未显示',
    CardType: '牌型',
    Fold: '弃牌',
    OperationRecords: '操作记录',
    Insurance: '保险',
    InsuranceBuyAmount: '购买保险金额',
    InsurancePayoutAmount: '赔付金额',
    Rake: '抽水',
    Profit: '盈亏',
    CardHigh: '高牌',
    CardOnePair: '一对',
    CardTwoPair: '两对',
    CardTrips: '三条',
    CardStraight: '顺子',
    CardFlush: '同花',
    CardFullHouse: '葫芦',
    CardQuads: '四条',
    CardStraightFlush: '同花顺',
    CardRoyalFlush: '皇家同花顺',
    TextSmallBlind: '小盲 {amount}',
    TextBigBlind: '大盲 {amount}',
    TextCall: '跟注 {amount}',
    TextCheck: '过牌',
    TextFold: '弃牌',
    TextRaise: '加注 {amount}',
    HoleCards: '手牌',
    BestCombination: '最佳组合'
  },
  // 分组管理
  ConfigGroupList: {
    Add: '新增',
    Delete: '删除',
    Index: '序号',
    GroupId: '群组ID',
    GroupName: '群组名称',
    BranchShop: '创建所属',
    Actions: '操作',
    View: '查看',
    Edit: '编辑',
    GroupIdLabel: '群组ID：',
    GroupNameLabel: '群组名称：',
    BranchShopLabel: '创建所属：',
    GroupIdPlaceholder: '请输入群组ID',
    GroupNamePlaceholder: '请输入群组名称',
    BranchShopPlaceholder: '请输入创建所属',
    ValidateGroupId: '请输入群组ID',
    ValidateGroupName: '请输入群组名称',
    ValidateBranchShop: '请输入创建所属',
    ConfirmDelete: '确定要删除吗?',
    SelectDeleteWarning: '请选择要删除的数据',
    DeleteSuccess: '删除成功',
    CreateOrUpdateSuccess: '创建/更改成功'
  },
  // 活动定义
  ActivityDefine: {
    Status: '状态',
    SelectStatus: '请选择活动状态',
    ActivityCategory: '活动分类',
    SelectActivityCategory: '请选择活动分类',
    Add: '新增',
    Index: '序号',
    Title: '标题',
    ActivityName: '活动名称',
    StatusOpen: '开启',
    StatusClosed: '关闭',
    Sort: '排序',
    CoverImage: '封面图',
    Link: '链接地址',
    StartTime: '活动开始时间',
    EndTime: '活动结束时间',
    CreatedAt: '创建时间',
    Actions: '操作',
    Edit: '编辑',
    Delete: '删除',
    TitleLabel: '标题：',
    TitlePlaceholder: '请输入标题',
    ActivityNameLabel: '活动名称：',
    ActivityNamePlaceholder: '请输入活动名称',
    UploadImageLabel: '请选择要上传的图片(再次点击可更换)：',
    SortLabel: '排序：',
    StartTimeLabel: '开始时间：',
    StartTimePlaceholder: '请设置开始时间',
    EndTimeLabel: '结束时间：',
    EndTimePlaceholder: '请设置结束时间',
    LinkLabel: '链接：',
    LinkPlaceholder: '请输入活动链接',
    View: '查看',
    DetailIdField: 'id字段',
    DetailCreatedAtField: 'createdAt字段',
    DetailUpdatedAtField: 'updatedAt字段',
    DetailDeletedAtField: 'deletedAt字段',
    DetailChannel: '渠道',
    DetailActivityId: '活动ID',
    DetailActivityName: '活动名',
    DetailStatus: '状态(0关闭1开启)',
    DetailSort: '排序',
    DetailStartTime: '开始时间',
    DetailEndTime: '结束时间',
    DetailConfig: '活动配置',
    DetailBaseConfig: '基础配置',
    DetailImage: '活动图',
    DetailImageLang: '其他语言图片',
    DetailRecharge: '最低充值金额',
    ValidateTitle: '请输入标题',
    ValidateActivityName: '请输入活动名称',
    ValidateImage: '请选择活动图片',
    ValidateStartTime: '请选择开始时间',
    ValidateEndTime: '请选择结束时间',
    ValidateActivityCategory: '请选择活动分类',
    ValidateLink: '请输入活动链接',
    ConfirmDelete: '确定要删除吗?',
    DeleteSuccess: '删除成功',
    SelectDeleteWarning: '请选择要删除的数据',
    FileSizeLimit: '文件大小不能超过5MB！',
    ImageTypeOnly: '请上传图片类型'
  },
  // 活动分类
  ActivityClassification: {
    NameLabel: '活动分类名称：',
    NamePlaceholder: '请输入活动分类名称',
    StatusLabel: '状态',
    StatusPlaceholder: '请选择状态',
    StatusSelectPlaceholder: '请选择活动状态',
    Add: '新增',
    Delete: '删除',
    Index: '序号',
    NameColumn: '活动分类名称',
    Sort: '排序',
    SortLabel: '排序：',
    SortPlaceholder: '请输入排序',
    StatusColumn: '状态',
    StatusEnabled: '开启',
    StatusDisabled: '关闭',
    CategoryId: '活动分类ID',
    CreatedAt: '创建时间',
    UpdatedAt: '更新时间',
    Actions: '操作',
    Edit: '编辑',
    FormNameLabel: '活动名：',
    FormNamePlaceholder: '请输入活动名称',
    ConfirmDelete: '确定要删除吗?',
    SelectDeleteWarning: '请选择要删除的数据',
    DeleteSuccess: '删除成功',
    CreateOrUpdateSuccess: '创建/更改成功',
    ValidateName: '请输入活动名称',
    ValidateSort: '请输入排序',
    ValidateStatus: '请选择活动状态'
  },
  // 俱乐部
  Club: {
    Search: {
      ClubIdLabel: '俱乐部ID',
      ClubNameLabel: '俱乐部名称',
      MasterIdLabel: '主席ID',
      Placeholder: '搜索条件'
    },
    Table: {
      Index: '序号',
      Id: 'ID',
      ClubId: '俱乐部ID',
      Group: '分组',
      ClubName: '俱乐部名称',
      MasterId: '主席ID',
      CanApply: '能否申请加入',
      CanSearch: '能否被搜索',
      CreatedAt: '创建时间',
      PassWords: '库存密码',
      TablePower: '桌子管理权限',
      Actions: '操作',
      View: '查看'
    },
    Options: {
      Can: '能',
      Cannot: '不能',
      Has: '有',
      None: '无'
    },
    Drawer: {
      TitleCreate: '新增',
      TitleEdit: '编辑',
      ClubIdLabel: '俱乐部ID：',
      ClubIdPlaceholder: '请输入俱乐部ID',
      GroupIdLabel: '分组：',
      GroupIdPlaceholder: '请输入分组',
      GroupSelectPlaceholder: '请选择分组',
      ClubNameLabel: '俱乐部名称：',
      ClubNamePlaceholder: '请输入俱乐部名称',
      MasterIdLabel: '主席ID：',
      MasterIdPlaceholder: '请输入主席ID',
      CanApplyLabel: '能否申请加入',
      CanSearchLabel: '能否被搜索',
      CreateTimeLabel: '创建时间：',
      CreateTimePlaceholder: '选择日期',
      PassWordsLabel: '库存密码：',
      PassWordsPlaceholder: '请输入库存密码',
      TablePowerLabel: '桌子管理权限'
    },
    Detail: {
      Title: '查看',
      Id: 'ID',
      ClubId: '俱乐部ID',
      GroupId: '分组',
      ClubName: '俱乐部名称',
      MasterId: '主席ID',
      CanApply: '能否申请加入',
      CanSearch: '能否被搜索',
      CreateTime: '创建时间',
      PassWords: '库存密码',
      TablePower: '桌子管理权限'
    },
    Messages: {
      ConfirmDelete: '确定要删除吗?',
      DeleteSuccess: '删除成功',
      SelectDeleteWarning: '请选择要删除的数据',
      CreateOrUpdateSuccess: '创建/更改成功',
      FetchGroupFailed: '获取分组列表失败'
    },
    Validation: {
      Id: '请输入ID',
      ClubId: '请输入俱乐部ID',
      GroupId: '请输入分组',
      ClubName: '请输入俱乐部名称',
      MasterId: '请输入主席ID',
      CreateTime: '请选择创建时间',
      PassWords: '请输入库存密码',
      TablePower: '请选择桌子管理权限'
    }
  },
  AccountsInfo: {
    Search: {
      UserIdLabel: '用户ID',
      UserIdPlaceholder: '请输入用户ID',
      AccountsLabel: '用户账号',
      AccountsPlaceholder: '请输入用户账号',
      NickNameLabel: '用户昵称',
      NickNamePlaceholder: '请输入用户昵称'
    },
    Actions: {
      ExportXlsx: '导出xlsx',
      View: '查看',
      Penalty: '处罚',
      Unblock: '解封',
      AdjustCurrency: '增减货币',
      Mark: '标记',
      SubmitApplication: '提交申请',
      CancelApplication: '取消申请'
    },
    Table: {
      Index: '序号',
      UserId: '用户ID',
      Accounts: '用户账号',
      Balance: '用户余额',
      Recharge: '充值金额',
      NickName: '昵称',
      ChannelID: '平台ID',
      AccountType: '账号类型',
      LoginIP: '历史登录',
      RegisterIP: '注册IP',
      RegisterTime: '注册时间',
      LoginTime: '最后登录时间',
      Remark: '标记',
      Actions: '操作'
    },
    DetailDrawer: {
      Title: '查看',
      UserId: '用户ID',
      Accounts: '用户账号',
      Password: '密码',
      NickName: '昵称',
      Sex: '性别',
      AccountType: '账号类型',
      PhoneType: '登入机型',
      MachineCode: '机器码',
      LoginIP: '登入IP',
      RegisterIP: '注册IP',
      RegisterTime: '注册时间',
      Remark: '标记',
      LoginTime: '登入时间',
      RealName: '实名认证',
      IsRobot: '是否机器人',
      ClientVersion: '客户端版本号',
      ServerVersion: '服务端版本号',
      DeviceModel: '设备型号'
    },
    Tooltips: {
      Sex: '0：男，1: 女',
      AccountType: '1、普通账号(输入账号密码登陆的)2 测试账号、0 游客、4观察账号',
      MachineCode: '登入机器的机器码(俱乐部2.3版本用作推广码)',
      LoginInfo:
        '最近登陆的时间，另外这个变化可以在用户登陆日志（后台可查）中查出最近3个月的登陆记录或者最近100条登陆记录（ID，昵称，登入渠道，登入机型，机器码，IP，时间）',
      RealName: '0 :未认证，>0 ,认证ID（后台根据ID查询身份证和姓名）',
      IsRobot: '0:不是  1是'
    },
    Dialogs: {
      PenaltyTitle: '处罚用户',
      UnblockTitle: '解封',
      CurrencyTitle: '提交申请增减货币',
      MarkTitle: '标记用户',
      TransferTitle: '转账',
      EditTitle: '修改用户昵称'
    },
    Labels: {
      UserId: '用户ID'
    },
    Forms: {
      PenaltyType: '封禁类型',
      PenaltyAutoUnblock: '设置自动解除时间',
      PenaltyReason: '封禁原因',
      PenaltyDefaultReason: '违规',
      UnblockType: '解封类型',
      OperationType: '操作类型',
      ApplyAmount: '申请数量',
      MarkInfo: '标记信息',
      TransferAmount: '转账金额',
      Water: '是否跑流水',
      Remark: '备注',
      NickName: '用户昵称',
      EditReason: '修改原因'
    },
    Placeholders: {
      UserId: '请输入用户ID',
      PenaltyType: '请选择封禁类型',
      AutoUnblock: '请设置封禁自动解除时间',
      PenaltyReason: '请填写封禁原因',
      UnblockType: '请选择解封类型',
      OperationType: '请选择操作类型',
      ApplyAmount: '请输入申请数量',
      MarkInfo: '请填写要备注的信息',
      TransferAmount: '请输入转账金额',
      Water: '请选择是否跑流水',
      Remark: '请填写备注',
      NickName: '请输入用户昵称',
      EditReason: '请输入修改原因'
    },
    Validations: {
      OperationTypeRequired: '请选择操作类型',
      ApplyAmountRequired: '请输入申请数量',
      ApplyAmountNumber: '申请数量必须为数字',
      ApplyAmountGreaterThanZero: '申请数量必须大于0',
      NickNameRequired: '请输入用户昵称',
      EditReasonRequired: '请输入修改原因'
    },
    Messages: {
      ExportExcelSuccess: 'Excel 文件导出成功',
      ExportExcelFailed: '导出Excel失败',
      ExportExcelError: '导出xlsx失败',
      DeleteConfirm: '确定要删除吗?',
      SelectDeleteWarning: '请选择要删除的数据',
      DeleteSuccess: '删除成功',
      CreateOrUpdateSuccess: '创建/更改成功',
      PenaltySuccess: '处罚成功',
      SubmitIncomplete: '请完整填写表单',
      SubmitSuccess: '提交成功',
      SubmitFailed: '提交失败',
      EditSuccess: '修改成功',
      UnblockSuccess: '解封成功',
      MarkSuccess: '标记成功',
      TransferSuccess: '转账成功'
    },
    AccountType: {
      Normal: '普通账号',
      Test: '测试账号',
      Guest: '游客',
      Observer: '观察账号',
      Telegram: 'TG账号'
    },
    Sex: {
      Male: '男',
      Female: '女',
      Unknown: '未知'
    },
    BooleanText: {
      Yes: '是',
      No: '不是'
    },
    RealName: {
      Unverified: '未认证',
      Verified: '认证ID'
    },
    PenaltyOptions: {
      AccountBan: '账号封禁',
      WorldChatMute: '世界聊天禁言',
      IPBan: 'IP封禁',
      GPSBan: 'GPS封禁'
    },
    Currency: {
      Increase: '增加',
      Decrease: '减少'
    },
    WaterOptions: {
      Yes: '是',
      No: '否'
    }
  },
  BannedList: {
    Search: {
      UserIdLabel: '用户ID',
      UserIdPlaceholder: '搜索条件',
      BanTypeLabel: '封禁类型',
      BanTypePlaceholder: '请选择'
    },
    Actions: {
      Expand: '展开',
      Collapse: '收起',
      Unblock: '解封'
    },
    Table: {
      Index: '序号',
      UserId: '用户ID',
      BanType: '封禁类型',
      BanInfo: '封禁信息',
      OtherBanInfo: '其他封禁信息',
      OperatorId: '操作人ID',
      OperatorName: '操作人名称',
      AutoUnblockTime: '封禁自动解除时间',
      Actions: '操作'
    },
    BanTypeOptions: {
      AccountBan: '账号封禁',
      WorldChatMute: '世界聊天禁言',
      IPBan: 'IP封禁',
      GPSBan: 'GPS封禁'
    },
    Dialogs: {
      UnblockTitle: '解封',
      UnblockType: '解封类型'
    },
    Placeholders: {
      UserId: '用户ID',
      UnblockType: '请选择解封类型'
    },
    Messages: {
      DeleteConfirm: '确定要删除吗?',
      DeleteSuccess: '删除成功',
      DeleteWarning: '请选择要删除的数据',
      CreateOrUpdateSuccess: '创建/更改成功',
      PenaltySuccess: '处罚成功',
      UnblockSuccess: '解封成功'
    }
  },
  // 俱乐部用户
  ClubUser: {
    Search: {
      UserIdLabel: '玩家ID',
      ClubIdLabel: '俱乐部ID',
      Placeholder: '搜索条件'
    },
    Actions: {
      Add: '新增',
      Delete: '删除',
      View: '查看',
      Edit: '编辑'
    },
    Table: {
      Index: '序号',
      Id: 'ID',
      UserId: '玩家ID',
      ClubId: '俱乐部ID',
      Money: '玩家余额',
      JoinTime: '加入俱乐部的时间',
      Identity: '身份',
      MemberPower: '成员管理权限',
      ClubGoldPower: '俱乐部币管理权限',
      TablePower: '桌子管理权限',
      Actions: '操作'
    },
    Identity: {
      President: '主席',
      Admin: '管理员',
      Member: '普通成员',
      Unknown: '未知身份'
    },
    Power: {
      HasPermission: '有权限',
      NoPermission: '无权限',
      Unknown: '未知'
    },
    Drawer: {
      TitleCreate: '新增',
      TitleEdit: '编辑',
      UserIdLabel: '玩家ID：',
      UserIdPlaceholder: '请输入玩家ID',
      ClubIdLabel: '俱乐部ID：',
      ClubIdPlaceholder: '请输入俱乐部ID',
      JoinTimeLabel: '加入俱乐部的时间：',
      JoinTimePlaceholder: '请选择加入时间',
      IdentityLabel: '身份',
      MemberPowerLabel: '成员管理权限',
      ClubGoldPowerLabel: '俱乐部币管理权限',
      TablePowerLabel: '桌子管理权限',
      SelectPlaceholder: '请选择'
    },
    Detail: {
      Title: '查看',
      Id: 'ID',
      UserId: '玩家ID',
      ClubId: '俱乐部ID',
      JoinTime: '加入俱乐部的时间',
      Identity: '身份',
      MemberPower: '成员管理权限',
      ClubGoldPower: '俱乐部币管理权限',
      TablePower: '桌子管理权限'
    },
    Messages: {
      ConfirmDelete: '确定要删除吗?',
      DeleteSuccess: '删除成功',
      SelectDeleteWarning: '请选择要删除的数据',
      CreateOrUpdateSuccess: '创建/更改成功'
    },
    Validation: {
      Id: '请输入ID',
      UserId: '请输入玩家ID',
      ClubId: '请输入俱乐部ID',
      JoinTime: '请选择加入时间',
      Identify: '请选择身份',
      MemberPower: '请选择成员管理权限',
      ClubGoldPower: '请选择俱乐部币管理权限',
      TablePower: '请选择桌子管理权限'
    }
  },
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
  // 全局配置
  GlobalConfiguration: {
    Table: {
      Index: '序号',
      Category: '分类',
      Detail: '配置名称',
      Field: '配置字段',
      FaFaKan: '发发看',
      TouTouKan: '偷偷看',
      Hash: 'Hash',
      Price: '修改价格',
      Amount: '对应金额',
      Interval: '配置时间(秒)',
      Status: '状态',
      ConfigInfo: '配置信息',
      CreatedAt: '创建时间',
      UpdatedAt: '更新时间',
      Actions: '操作'
    },
    Tags: {
      Rename: '昵称修改',
      Transfer: '内部转币',
      CostConfig: '局外消耗'
    },
    Status: {
      Open: '开启',
      Closed: '关闭'
    },
    Actions: {
      Configure: '设置',
      View: '查看'
    },
    Dialog: {
      TitleCreate: '新增',
      TitleEdit: '编辑'
    },
    Form: {
      ConfigNamePrefix: '配置名称:',
      EnableConfigLabel: '是否开启该配置:',
      PriceLabel: '价格:',
      PricePlaceholder: '请输入价格',
      LossLabel: '亏损:',
      HandProfitLabel: '手均盈利低于:',
      HandProfitPlaceholder: '请输入手均盈利阈值',
      LossAmountLabel: '亏损金额(正数):',
      LossAmountPlaceholder: '请输入亏损金额',
      AmountLabel: '对应金额(正数):',
      AmountPlaceholder: '请输入金额',
      IntervalLabel: '配置时间(秒):',
      IntervalPlaceholder: '请输入时间(秒)',
      FaFaKanLabel: '发发看:',
      FaFaKanPlaceholder: '请输入发发看数量',
      TouTouKanLabel: '偷偷看:',
      TouTouKanPlaceholder: '请输入偷偷看数量',
      HashLabel: 'Hash:',
      HashPlaceholder: '请输入Hash数值'
    },
    Calculator: {
      Title: '天数转秒数',
      InputDays: '输入天数',
      DaysPlaceholder: '请输入天数（支持整数/小数）',
      ResultLabel: '转换结果（秒）',
      ValidateDaysRequired: '请输入天数',
      ValidateDaysNonNegative: '天数必须为非负数',
      ValidateDaysNumber: '请输入有效的数字'
    },
    Messages: {
      ConfirmDelete: '确定要删除吗?',
      SelectDeleteWarning: '请选择要删除的数据',
      DeleteSuccess: '删除成功'
    },
    Detail: {
      IdField: 'id字段',
      Name: '配置名称',
      Description: '配置描述',
      Content: '配置信息',
      CreatedAtField: 'createdAt字段',
      UpdatedAtField: 'updatedAt字段'
    }
  },
  // 保险记录
  InsuranceRecord: {
    DashboardTitle: '保险记录',
    Cards: {
      TodayIncome: '今日保险收入',
      TodayPayout: '今日保险赔付',
      IncomeRemain: '保险收入余额',
      PayoutRemain: '保险赔付余额'
    },
    Search: {
      TimeRangeLabel: '时间范围',
      TimeRangeStart: '开始时间',
      TimeRangeEnd: '结束时间',
      RoomIdLabel: '房间/牌局ID',
      RoomIdPlaceholder: '请输入房间/牌局ID',
      AccountLabel: '游戏账号',
      AccountPlaceholder: '请输入游戏账号',
      TypeLabel: '类型',
      TypePlaceholder: '请选择类型'
    },
    TypeOptions: {
      Payout: '保险赔付',
      Buy: '投保',
      All: '全部',
      Other: '其他'
    },
    Summary: {
      Income: '保险收入',
      Outcome: '保险赔付',
      Count: '笔数',
      Unit: 'USDT'
    },
    Table: {
      Index: '序号',
      Time: '牌局时间',
      RoomId: '牌局ID',
      UserId: '用户ID',
      Income: '保险收入',
      Outcome: '保险赔付'
    },
    Placeholder: '请输入',
    Success: '操作成功'
  },
  // 抽水记录
  PumpingRecord: {
    DashboardTitle: '抽水记录',
    Cards: {
      CurrentPool: '抽水池当前总额（暂无）'
    },
    Search: {
      TimeLabel: '时间',
      TimeStart: '开始时间',
      TimeEnd: '结束时间',
      OperatorLabel: '操作人',
      OperatorPlaceholder: '请输入操作人'
    },
    Summary: {
      Income: '抽水收入',
      Outcome: '保险池转出',
      Unit: 'USDT'
    },
    Table: {
      Index: '序号',
      Date: '日期',
      UserId: '用户ID',
      TotalIncome: '抽水总收入',
      RemainingPool: '抽水池剩余总额（暂无）',
      Operator: '操作人',
      Amount: '操作额度',
      OperationTime: '操作时间'
    },
    Status: {
      Success: '成功',
      Fail: '失败'
    }
  },
  // 其它合计
  OtherTotals: {
    DashboardTitle: '其它合计',
    Cards: {
      PoolTotal: '其它池总额',
      TodayDecrease: '今日池减少',
      TodayCoinDecrease: '今日金币减少'
    },
    Search: {
      TimeLabel: '时间',
      TimeStart: '开始时间',
      TimeEnd: '结束时间',
      OperatorLabel: '操作人',
      OperatorPlaceholder: '操作人id/昵称',
      ChangeTypeLabel: '变化类型',
      ChangeTypePlaceholder: '请选择类型',
      CurrencyTypeLabel: '货币类型',
      CurrencyTypePlaceholder: '请选择类型'
    },
    TypeOptions: {
      Payout: '保险赔付',
      Buy: '投保',
      All: '全部',
      Other: '其他'
    },
    Summary: {
      Income: '池增加',
      Outcome: '池减少',
      Unit: 'USDT'
    },
    Table: {
      Index: '序号',
      Id: 'ID',
      OperationTime: '操作时间',
      ChangeAmount: '变换额度',
      UserId: '用户ID',
      Type: '类型'
    },
    SourceType: {
      Emote: '表情',
      Voice: '语音',
      Rename: '修改昵称',
      InsuranceDelay: '保险延迟',
      NoPeek: '咪牌（没有）',
      CutCard: '切牌',
      ViewBoard: '看公牌',
      ViewHand: '看手牌',
      Blockchain: '区块链验证',
      Unknown: '未知类型'
    }
  },
  // 内转记录
  InTransferRecord: {
    DashboardTitle: '内转记录',
    Cards: {
      PoolRemain: '内转池剩余',
      Income: '收款（用户提现）',
      Outcome: '转出（用户充值）'
    },
    Search: {
      TimeLabel: '操作时间',
      TimeStart: '开始时间',
      TimeEnd: '结束时间',
      OperatorLabel: '操作人',
      OperatorPlaceholder: '输入id或昵称',
      AccountLabel: '游戏账号',
      AccountPlaceholder: '请输入id'
    },
    Summary: {
      Decrease: '减少金额',
      Increase: '增加金额',
      Count: '笔数',
      Unit: 'USDT'
    },
    Table: {
      Index: '序号',
      Id: 'ID',
      OperationTime: '操作时间',
      OperatorNickname: '操作人昵称',
      OperatorId: '操作人ID',
      GameAccount: '游戏账号',
      Amount: '货币数额',
      Reason: '操作原因',
      BeforePool: '操作前-内转池',
      AfterPool: '操作后-内转池'
    },
    Status: {
      Success: '成功',
      Fail: '失败'
    }
  },
  // 充值列表
  TransferPayList: {
    Search: {
      UserIdLabel: '用户ID',
      UserIdPlaceholder: '请输入用户ID',
      OrderIdLabel: '订单ID',
      OrderIdPlaceholder: '请输入订单ID',
      TimeRangeLabel: '时间范围',
      RangeSeparator: '至',
      TimeStart: '开始时间',
      TimeEnd: '结束时间'
    },
    Table: {
      Index: '序号',
      OrderId: '订单ID',
      UserId: '用户ID',
      Amount: '付款金额',
      ToAddress: '充U地址',
      Fee: '手续费',
      Type: '类型',
      Channel: '渠道',
      Status: '状态',
      CreatedAt: '创建时间',
      UpdatedAt: '更新时间'
    },
    Status: {
      Success: '成功',
      Fail: '失败'
    }
  },
  // 提现列表
  TransferWithdrawList: {
    Search: {
      UserIdLabel: '用户ID',
      UserIdPlaceholder: '请输入用户ID',
      OrderIdLabel: '订单ID',
      OrderIdPlaceholder: '请输入订单ID',
      TimeRangeLabel: '时间范围',
      RangeSeparator: '至',
      TimeStart: '开始时间',
      TimeEnd: '结束时间'
    },
    Table: {
      Index: '序号',
      OrderId: '订单ID',
      UserId: '用户ID',
      ActualAmount: '实际到账金额',
      ToAddress: '提U地址',
      Status: '状态',
      Remark: '备注',
      CreatedAt: '创建时间',
      UpdatedAt: '更新时间'
    },
    Status: {
      Success: '成功',
      Fail: '失败'
    }
  },
  // 白名单
  Whitelist: {
    Table: {
      Index: '序号',
      Id: 'ID',
      UserId: '用户ID',
      NickName: '用户昵称',
      UserAccount: '用户账号',
      AddAccount: '添加账号',
      CreateTime: '添加时间',
      Actions: '操作'
    },
    Actions: {
      Add: '新增',
      Delete: '删除'
    },
    Form: {
      UserIdLabel: '用户ID：',
      UserIdPlaceholder: '请输入用户ID'
    },
    Messages: {
      AddSuccess: '添加成功',
      AddFail: '添加失败',
      DeleteSuccess: '删除成功',
      DeleteFail: '删除失败',
      ConfirmDelete: '确认要删除{name}吗？'
    }
  }
}
