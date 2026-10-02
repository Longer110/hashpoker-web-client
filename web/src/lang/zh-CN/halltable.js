export default {
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
      IsRobotTable: '是否机器人桌',
      RobotTableYes: '是',
      RobotTableNo: '否',
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
        modelType2: '盲注模式',
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
      },
      RobotTable: {
        Label: '是否机器人桌'
      },
      PrivateRoom: {
        Label: '私人房(密码房)',
        Password: '进房密码',
        PasswordPlaceholder: '请输入6位数字密码',
        ShowInLobby: '大厅可见'
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
      ServiceRate: '服务费比例最多为10%，如10%则输入10，0.1%则输入0.1',
      RobotTable: '机器人专用测试桌：整桌机器人自动打牌，真人一律禁入；开启后自动允许机器人进桌',
      PrivateRoom: '开启后需输入6位数字密码，玩家进房时需验证密码；房主和重连玩家免验证',
      PrivateRoomShowInLobby: '是否在大厅列表中显示该牌桌；关闭后仅通过分享链接或房间号加入'
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
      TopLimitRequired: '服务费比例≠0时,每手抽佣封顶不能为0',
      PrivateRoomPasswordRequired: '开启私人房时请输入6位数字密码',
      PrivateRoomPasswordFormat: '密码必须是6位数字'
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
}