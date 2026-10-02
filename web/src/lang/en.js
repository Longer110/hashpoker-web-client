// src/lang/en.js
export default {
  Common: {
    Title: 'System Management',
    Submit: 'Submit',
    Cancel: 'Cancel',
    Close: 'Close',
    Welcome: 'Welcome {name}!',
    Confirm: 'Confirm',
    Hint: 'Hint'
  },
  Login: {
    Username: 'Username',
    Password: 'Password',
    LoginBtn: 'Login',
    SystemName: 'HASH-POKER Management System',
    UsernamePlaceholder: 'Please enter username',
    PasswordPlaceholder: 'Please enter password',
    GooglePlaceholder: 'Please enter Google verification code',
    PleaseEnterTheCorrectUsername:'Please enter the correct username',
    PleaseEnterTheCorrectPassword:'Please enter the correct password',
    RememberAccountAndPassword:'Remember account and password',
    PleaseSelectALanguage:'Please select a language'
  },
  Menu: {
    Home: 'Home',
    User: 'User Management'
  },
  //   全局通用
  GlobalUniversality: {
    Query: 'Query',
    Reset: 'Reset',
    OperationSuccessful: 'Operation Successful',
    TimeSelection: 'Time Selection',
    Export: 'Export',
    Import: 'Import',
    ImportSuccess: 'Import Successful',
    DownloadTemplate: 'Download Template',
    DownloadTip: 'Export task created successfully, starting download',
    Edit: 'Edit'
  },
  // 牌桌配置
  HallTableList: {
    Actions: {
      Create: 'Add Table',
      CloseTable: 'Close Table',
      ViewDetail: 'View Details',
      ViewGamePlays: 'View Game'
    },
    Table: {
      TemplateName: 'Template Name',
      Index: 'Serial Num',
      GroupId: 'Group ID',
      GameId: 'Game ID',
      TableName: 'Table Name',
      TableId: 'Table ID',
      SmallBlind: 'Small Blind',
      ContinuedNum: 'Reopen Count',
      BigBlind: 'Big Blind',
      PreAnte: 'Ante',
      AutoStart: 'Auto Start',
      ModeType: 'Rake Type',
      ComputeMode: 'Rake Method',
      UsersCount: 'Players',
      AndroidCount: 'Bots',
      Actions: 'Actions'
    },
    Dialog: {
      CreateTitle: 'Add',
      EditTitle: 'Edit',
      DetailTitle: 'Table Details'
    },
      Minutes30: '30 minutes',
    Drawer: {
      Title: 'View'
    },
    ModeType: {
      None: 'No Rake',
      Hand: 'Per Hand',
      Round: 'Per Round'
    },
    ComputeMode: {
      Pot: 'By Pot Size',
      Profit: 'By Profit Ratio',
      Hours5: '5 hours',
      Hours6: '6 hours',
      Hours12: '12 hours',
      Hours24: '24 hours',
    },
    Messages: {
      DeleteConfirm: 'Are you sure you want to delete?',
      CloseConfirm: 'Are you sure you want to close the table?',
      SelectDeleteWarning: 'Please select the data to delete',
      CloseSuccess: 'Table closed successfully',
      DeleteSuccess: 'Deleted successfully'
    },
    GamePlays: {
      Title: 'View Game',
      PlayerId: 'Player ID',
      PlayerName: 'Player Name',
      PlayerBalance: 'Balance',
      Actions: 'Actions',
      KickOut: 'Kick Out',
      BatchKickOut: 'Batch Kick Out',
      KickOutConfirm: 'Are you sure you want to kick out player {name}?',
      BatchKickOutConfirm: 'Are you sure you want to kick out {count} players?',
      SelectWarning: 'Please select players to kick out',
      KickOutSuccess: 'Kicked out successfully',
      KickOutFailed: 'Failed to kick out',
      ParseError: 'Failed to parse player information'
    },
    Detail: {
      Avatar: 'Avatar',
      SysVersion: 'OS Version',
      Models: 'Device Code (club v2.3 uses as promo code)',
      RegistChannel: 'Registration Channel (1: Website; 2: App Store; 3: MyApp; 4+: Other channels)',
      LogonChannel: 'Login Channel (1: Website; 2: App Store; 3: MyApp; 4+: Other channels)',
      ShopID: 'Store/Channel ID (used to fetch group game config)',
      LogongIP: 'Login IP (recent logins available in the log)',
      LogonTime: 'Login Time (recent logins available in the log)',
      BinDingPHone: 'Bound Phone (reserved)',
      RealName: 'Real-Name Verification (0: Not verified; >0: Verification ID)',
      WeiXinOpenID: 'App OpenID',
      WeiXinUnionID: 'Global UnionID',
      HeadUrl: 'Avatar URL',
      SafePassWord: 'Bank Password',
      ShopAccount: 'Store Account',
      ChannelID: 'Channel ID',
      UserMark: 'User Tag (0: Regular; 1001: Host)',
      LogonPos: 'Login Coordinates (JSON [longitude, latitude])',
      LogonRealIP: 'Real External Login IP',
      InviteCode: 'Invitation Code',
      Mail: 'Email'
    }
  },
  HallTableDialog: {
    Divider: {
      RoomConfig: 'Room Configuration',
      ClubTexasConfig: 'Texas & Short-Deck Settings',
      RakeSettings: 'Rake Settings',
      CardSettings: 'Card View Settings'
    },
    Fields: {
      Template: {
        Label: 'Table Template',
        Placeholder: 'Select a table template'
      },
      TemplateName: {
        Label: 'Template Name',
        Placeholder: 'Enter template name'
      },
      TableName: {
        Label: 'Table Name',
        Placeholder: 'Enter table name'
      },
      Group: {
        Label: 'Group',
        Placeholder: 'Select a group'
      },
      Game: {
        Label: 'Game',
        Placeholder: 'Select a game'
      },
      GoldType: {
        Label: 'GoldType',
        Placeholder: 'Select GoldType'
      },
      OpenCount: {
        Label: 'Table Count',
        Placeholder: 'Enter table count'
      },
      KeepTime: {
        Label: 'Room Time',
        Placeholder: 'Select Room time'
      },
      RealtimeAV: {
        Label: 'Realtime Audio'
      },
      VoiceFee: {
        Label: 'Voice Fee(U/min)',
        Placeholder: 'Select'
      },
      VoiceFeeCustom: {
        Label: 'Custom Voice Fee(U/min)'
      },
      AutoContinue: {
        Label: 'Auto Continue Overtime'
      },
      modelRule: {
        Label: 'Model',
        modelType1: 'Banker Mode',
        modelType2: 'Blind Mode',
      },
      AnteSwitch: {
        Label: 'Ante'
      },
      AnteValue: {
        Label: 'Ante Value',
        Placeholder: 'Select ante value'
      },
      DealerMultiple: {
        Label: 'The banker = N times the ante.',
        Placeholder: 'Select Magnification'
      },
      AnteCustom: {
        Label: 'Custom Ante',
        Placeholder: 'Enter custom ante'
      },
      SmallBlind: {
        Label: 'Small Blind'
      },
      BigBlind: {
        Label: 'Big Blind'
      },
      Capacity: {
        Label: 'Players At Table',
      },
      AutoStartPlayers: {
        Label: 'Auto-start Players',
        Placeholder: 'Select player count'
      },
      MinBuyIn: {
        Label: 'Minimum Buy-in BB',
        Placeholder: 'Enter minimum buy-in'
      },
      MaxBuyIn: {
        Label: 'Maximum Buy-in BB',
        Placeholder: 'Enter maximum buy-in'
      },
      BumaLimit: {
        Label: 'Supplement code upper limit',
        Placeholder: 'Enter Supplement code upper limit'
      },
      PoolEntryRate: {
        Label: 'Pool Entry Rate',
        Placeholder: 'Select pool entry rate'
      },
      PoolEntryRateHands: {
        Label: 'Hands Ignored for Pool Rate',
        Placeholder: 'Enter hands count'
      },
      StopLoss: {
        Label: 'Stop-loss Limit'
      },
      LossMultiplier: {
        Label: 'Multiple of The Amount Lost',
        Placeholder: 'Select'
      },
      AllowTakeOut: {
        Label: 'Allow Cash Out'
      },
      TakeOutMultiplier: {
        Label: 'Cash Out Multiplier',
        Placeholder: 'Select cash out multiplier'
      },
      HandLimit: {
        Label: 'Hand Limit'
      },
      HandLimitOptions: {
        Label: 'Hand Options',
        Placeholder: 'Select Hand Options'
      },
      HandLimitCustom: {
        Label: 'Custom Hand Limit',
        Placeholder: 'Enter custom hand limit'
      },
      ForceBlind: {
        Label: 'Force Blind Payment'
      },
      RakeMethod: {
        Label: 'Rake Method',
        Placeholder: 'Select rake method'
      },
      RakeType: {
        Label: 'Rake Type',
        Placeholder: 'Select rake type'
      },
      ServiceRate: {
        Label: 'Service Rate',
        Placeholder: 'Enter service rate'
      },
      TopLimit: {
        Label: 'Top Of Each Hands Commission',
        Placeholder: 'Enter top multiplier'
      },
      TriggerPot: {
        Label: 'Trigger Commission Payout Pool',
        Placeholder: 'Enter trigger pot'
      },
      DelayLook: {
        Label: 'Delay Look Cards'
      }
    },
    Placeholder: {
      Select: 'Please select',
      Input: 'Please enter',
      SelectCost: 'Select {label}',
      InputCost: 'Enter {label}'
    },
    Switch: {
      Enable: 'Enable',
      Disable: 'Disable',
      Yes: 'Yes',
      No: 'No',
      On: 'On',
      Off: 'Off'
    },
    Options: {
      Common: {
        Custom: 'Custom',
        Percent: '{value}%'
      },
      Game: {
        Texas: "Texas Hold'em",
        Short: 'Short Deck'
      },
      KeepTime: {
        Minutes5: '5 minutes',
        Minutes30: '30 minutes',
        Hours0_5: '0.5 hours',
        Hours1: '1 hour',
        Hours1_5: '1.5 hours',
        Hours2: '2 hours',
        Hours2_5: '2.5 hours',
        Hours3: '3 hours',
        Hours3_5: '3.5 hours',
        Hours4: '4 hours',
        Hours4_5: '4.5 hours',
        Hours5: '5 hours',
        Hours12: '12 hours',
        Hours24: '24 hours'
      },
      VoiceFee: {
        Free: 'Free'
      },
      HandCount: '{count} hands',
      PlayerCount: '{count} players',
      Multiplier: '{value}x'
    },
    CardConfig: {
      Public: 'Paid Board Cards',
      PublicCost: 'Board Card Fee',
      Hand: 'Paid Hole Cards',
      HandCost: 'Hole Card Fee',
      Cut: 'Paid Cut',
      CutCost: 'Cut Fee',
      CustomLabel: 'Custom {label}'
    },
    Tips: {
      SmallBlindManual: 'Small blind can be manually entered',
      BuyInAmountPrefix: 'Purchase limit: ',
      ActualAmountPrefix: 'Actual amount:'
    },
    Tooltips: {
      ServiceRate: 'The service fee rate can be up to 10%. If it is 10%, enter 10; if it is 0.1%, enter 0.1.'
    },
    Messages: {
      CreateSuccess: 'Created successfully',
      UpdateSuccess: 'Updated successfully',
      DataParseError: 'Invalid data format'
    },
    Validation: {
      TableNameRequired: 'Please enter the table name',
      GroupRequired: 'Please select a group',
      GameRequired: 'Please select a game',
      PoolEntryRateHandsRequired: 'Please enter the number of hands',
      DealerMultiplierRequired: 'Please select dealer multiple',
      ServiceRateRequired: 'Service rate is required',
      ServiceRateMax: 'Service rate cannot exceed 10%',
      ServiceRateMin: 'Service rate cannot be negative',
      TopLimitRequired: 'Cap per hand must be greater than 0 when service rate is not 0'
    }
  },
  HallTableTemplate: {
    Actions: {
      Add: 'Add Template',
      BatchDelete: 'Delete Selected',
      Edit: 'Edit',
      Delete: 'Delete',
      Detail: 'View Details'
    },
    Dialog: {
      CreateTitle: 'Add Table Template',
      EditTitle: 'Edit Table Template',
      DetailTitle: 'Table Template Details'
    },
    Messages: {
      DeleteConfirmSingle: 'This will permanently delete the template. Continue?',
      DeleteConfirmBatch: 'This will permanently delete the selected templates. Continue?',
      DeleteSuccess: 'Deleted successfully!',
      DeleteCanceled: 'Deletion canceled'
    },
    Options: {
      GoldType: {
        USDT: 'USDT'
      }
    },
    KeepTime: {
      Forever: 'Permanent',
      Minutes30: '30 minutes',
      Hours1: '1 hour',
      Hours2: '2 hours',
      Hours4: '4 hours',
      Hours6: '6 hours',
      Hours12: '12 hours',
      Hours24: '24 hours'
    },
    Format: {
      KeepTimeMinutes: '{minutes} minutes'
    }
  },
  HallTableDetail: {
    Sections: {
      TexasConfig: 'Texas Configuration',
      RakeSettings: 'Rake Settings',
      CardSettings: 'Card View Settings'
    },
    Fields: {
      TemplateName: 'Template Name',
      TableName: 'Table Name',
      TableId: 'Table ID',
      GroupId: 'Group ID',
      Game: 'Game',
      GoldType: 'Currency',
      OpenCount: 'Concurrent Tables',
      KeepTime: 'Room Duration',
      AutoContinue: 'Auto Extend',
      RealtimeAV: 'Real-time Audio',
      VoiceFee: 'Audio Fee (U/min)',
      UsersCount: 'Players',
      AndroidCount: 'Bots',
      DealerMultiple: 'Banker multiplier',
      PreAnte: 'Ante',
      SmallBlind: 'Small Blind',
      BigBlind: 'Big Blind',
      Capacity: 'Seats',
      AutoStartPlayers: 'Auto Start Players',
      MinBuyIn: 'Min Buy-in (BB)',
      MaxBuyIn: 'Max Buy-in (BB)',
      PoolEntryRate: 'Pool Entry Rate',
      PoolEntryRateHands: 'Hands Without Entry Requirement',
      StopLoss: 'Stop Loss Limit',
      LossAmount: 'Loss Limit Amount',
      AllowTakeOut: 'Allow Chip Withdrawal',
      TakeOutMultiplier: 'Withdrawal Multiplier',
      HandLimit: 'Hand Limit',
      HandLimitValue: 'Hand Limit Value',
      ForceBlind: 'Forced Bring-in',
      ZhuaTouAmount: 'Bring-in Amount',
      RakeMethod: 'Rake Method',
      RakeType: 'Rake Type',
      ServiceRate: 'Service Rate',
      TopLimit: 'Hand Cap (BB)',
      TriggerPot: 'Trigger Pot',
      DelayLook: 'Delay Card Peek'
    },
    Unit: {
      Person: 'players'
    },
    KeepTime: {
      Forever: 'Permanent',
      Minutes5: '5 minutes',
      Hours0_5: '30 minutes',
      Hours1: '1 hour',
      Hours1_5: '1.5 hours',
      Hours2: '2 hours',
      Hours2_5: '2.5 hours',
      Hours3: '3 hours',
      Hours3_5: '3.5 hours',
      Hours4: '4 hours',
      Hours4_5: '4.5 hours',
      Hours5: '5 hours',
      Seconds: '{value} seconds'
    }
  },
  HallTableConfig: {
    Search: {
      TableName: 'Table Name',
      TableNamePlaceholder: 'Enter table name',
      Game: 'Game',
      GamePlaceholder: 'Select game',
      Group: 'Group',
      GroupPlaceholder: 'Select group'
    },
    Actions: {
      Delete: 'Delete'
    },
    Table: {
      CreateTime: 'Created Time'
    },
    Dialog: {
      DetailTitle: 'View Table Configuration',
      EditTitle: 'Edit Table Configuration'
    },
    Messages: {
      ConfirmDelete: 'Confirm deletion?',
      DeleteSuccess: 'Deleted successfully!'
    }
  },
  //   弹幕表情
  BulletScreenEmojis: {
    Warning: 'Note: Click the number you want to modify, enter the new value, and press Enter to save it!',
    Search: {
      GroupLabel: 'Group',
      GroupPlaceholder: 'Please select a group'
    },
    Buttons: {
      Add: 'Add',
      Delete: 'Delete'
    },
    Table: {
      Index: 'Serial Num',
      Actions: 'Actions',
      Columns: {
        GroupId: 'Group ID',
        GroupName: 'Group Name',
        Cheers: 'Cheers',
        BlowKiss: 'Blow Kiss',
        Like: 'Like',
        Flowers: 'Flowers',
        Gatling: 'Gatling',
        Shark: 'Shark',
        Tomato: 'Tomato',
        CatchChicken: 'Catch Chicken',
        Bomb: 'Bomb',
        LightCigarette: 'Light Cigarette',
        PatHead: 'Pat Head',
        Delay1: 'Delay 1',
        Delay2: 'Delay 2',
        Delay3: 'Delay 3',
        Delay4: 'Delay 4',
        Delay5: 'Delay 5',
        ViewFlop: 'View Flop',
        ViewTurn: 'View Turn',
        ViewRiver: 'View River',
        NormalBarrage: 'Normal Barrage',
        FancyBarrage: 'Colorful Barrage',
        LuxuryBarrage: 'Luxury Barrage',
        InsuranceDelay1: 'Insurance Delay 1',
        InsuranceDelay2: 'Insurance Delay 2',
        InsuranceDelay3: 'Insurance Delay 3',
        InsuranceDelay4: 'Insurance Delay 4',
        InsuranceDelay5: 'Insurance Delay 5',
        ViewHoleCards: 'View Hole Cards',
        PaidCut: 'Paid Cut',
        ViewBoard: 'View Board Cards'
      }
    },
    Dialog: {
      CreateTitle: 'Add',
      EditTitle: 'Edit'
    },
    DialogSections: {
      Emojis: 'Emoji',
      PokerTable: 'Poker Table',
      Barrage: 'Barrage',
      LookCards: 'Look Cards',
      SelectGroupRequired: 'Please select group',
      InputRequired: 'Please enter'
    },
    Placeholders: {
      Input: 'Please enter'
    },
    Messages: {
      UpdateConfirmPrefix: 'Change the current data to ',
      UpdateConfirmSuffix: '?',
      UpdateSuccess: 'Updated successfully!',
      DeleteConfirm: 'Are you sure you want to delete?',
      DeleteSuccess: 'Deleted successfully!',
      CreateSuccess: 'Added successfully!',
      InputRequired: 'Please enter',
      SelectGroupRequired: 'Please select a group',
      ParseLocalConfigFailed: 'Failed to parse local bullet screen emoji config:',
      FetchGroupFailed: 'Failed to fetch group list:'
    }
  },
  BusinessReport: {
    Title: 'Business Dashboard',
    DefaultTip: 'Averages default to the current day',
    Form: {
      DatePlaceholder: 'Select date'
    },
    Tooltips: {
      TotalPay: 'Total deposits: Sum of credited top-ups',
      TotalPayCount: 'Deposit orders: Number of top-up transactions',
      GasFee: 'Gas fee: Cost required for on-chain operations',
      WaterRemain: 'Rake pool balance: Balance of the rake pool account',
      FreezeFee: 'Frozen funds: Funds frozen by the platform',
      TotalWithdraw: 'Total withdrawals: Total amount withdrawn',
      TotalWithdrawCount: 'Withdrawal orders: Number of withdrawal transactions',
      TotalEarn: 'Net revenue: Deposits minus withdrawals',
      InnerTransfer: 'Internal transfer amount: Coins adjusted in the game backend',
      WithdrawFee: 'Withdrawal fee: Fee charged when users withdraw'
    },
    Cards: {
      TotalPay: {
        Title: 'Total Deposits (Top-up)',
        AveragePrefix: 'Average daily total '
      },
      TotalPayCount: {
        Title: 'Deposit Orders',
        AveragePrefix: 'Average daily orders: '
      },
      GasFee: {
        Title: 'Gas Fee',
        AveragePrefix: 'Average daily: '
      },
      WaterRemain: {
        Title: 'Rake Pool Balance',
        PreviousPrefix: 'Previous balance: '
      },
      FreezeFee: {
        Title: 'Frozen Funds',
        TotalPrefix: 'Total frozen funds: '
      },
      TotalWithdraw: {
        Title: 'Total Withdrawals',
        AveragePrefix: 'Average daily withdrawals: '
      },
      TotalWithdrawCount: {
        Title: 'Withdrawal Orders',
        AveragePrefix: 'Average daily orders: '
      },
      TotalEarn: {
        Title: 'Net Revenue',
        AveragePrefix: 'Average daily net revenue: '
      },
      InnerTransfer: {
        Title: 'Internal Transfer Amount (Adj.)',
        AveragePrefix: 'Average daily transfer: '
      },
      WithdrawFee: {
        Title: 'Withdrawal Fee',
        AveragePrefix: 'Average daily withdrawal fee: '
      }
    },
    Charts: {
      ProfitXAxis: 'Profit Range',
      LossXAxis: 'Loss Range',
      PeopleYAxis: 'Players',
      ProfitBuckets: {
        Range1: '0 < Profit < 10',
        Range2: '10 < Profit < 50',
        Range3: '50 < Profit < 100',
        Range4: 'Profit > 100'
      },
      ProfitPie: {
        Title: 'Long Deck vs Short Deck Turnover'
      },
      RakePie: {
        Title: 'Long Deck vs Short Deck Rake'
      },
      LongDeckRake: 'Long Deck Rake',
      ShortDeckRake: 'Short Deck Rake',
      RightList: {
        Total: 'Total Rake: ',
        Long: 'Long Deck Rake: ',
        Short: 'Short Deck Rake: '
      }
    }
  },
  Home: {
    Title: 'Platform Dashboard',
    DefaultTip: 'Averages default to the current day',
    TotalPumping: 'Total Pumping',
    MeanPumpingRate: 'MeanPumpingRate',
    TotalBet: 'Total Bet',
    AverageBettingValue: 'Average Betting Value',
    AverageNumberOfOnlineUsers: 'Average Number Of Online Users',
    MaximumNumberOfSimultaneousOnlineUsers: 'Maximum Number Of Simultaneous Online Users',
    NumberOfTGRegisteredUsers: 'Number Of TG Registered Users',
    AverageNumberOfTGRegisteredUsers: 'Average Number Of TG Registered Users',
    NumberOfActiveUsers: 'Number Of Active Users',
    AverageNumberOfActiveUsers: 'Average Number Of Active Users',
    TheHighestNumberOfConcurrentOnlineUsers: 'The Highest Number Of Concurrent Online Users',
    MeanOfTheHighestNumberOfConcurrentOnlineUsers: 'Mean Of The Highest Number Of Concurrent Online Users',
    TotalNumberOfGamesPlayed: 'Total Number Of Games Played',
    MeanNumberOfGamesPlayed: 'Mean Number Of Games Played',
    UVMean: 'UV Mean',
    AccumulatedNumberOfPayingPlayers: 'Accumulated Number Of Paying Players',
    NumberOfDAUPayingPlayers: 'Number Of DAU Paying Players',
    AverageOfDAUPayingPlayers: 'Average Of DAU Paying Players',
    NewNumberOfPayingPlayersAdded: 'New Number Of Paying Players Added',
    AverageOfNewlyAddedPayingPlayers: 'Average Of Newly Added Paying Players',
    InsuranceRevenue: 'Insurance Revenue',
    AverageDailyInsuranceIncome: 'Average Daily Insurance Income',
    InsuranceClaimPayment: 'Insurance Claim Payment',
    DailyAverageInsurancePayout: 'Daily Average Insurance Payout',
    UVConversionRate: 'UV Conversion Rate',
    AccountRegistrationConversionRate: 'Account Registration Conversion Rate',
    AddARPU: 'Add ARPU',
    DAUPaymentRate: 'DAU Payment Rate',
    NewPaidRate: 'New Paid Rate',
    Description1:
      'Total pumping: The total service fee extracted by the platform from all games during the statistical period. This is the core revenue of the platform',
    Description2:
      'TG Registered Users: The number of independent users who successfully completed the registration process through the TG mini program during the statistical period',
    Description3: 'Number of active users: even if they have logged in to the game',
    Description4: 'The highest number of concurrent online users: the highest number of online users at a single time point during the cycle',
    Description5: 'Total number of games played: the number of games completed within the week (in lots)',
    Description6: 'UV: Among the newly added users today, there are users who have participated in one game',
    Description7: 'Accumulated number of paying players: from the time of new additions to the statistical date, the total number of recharged users (including VP recharge)',
    Description8: "DAU Paid Players: The total number of players who have paid within today's active users",
    Description9: 'New number of paying players: The number of users who have not paid before and made their first payment today (including VIP recharge)',
    Description10: 'Insurance income: total insurance income during the period',
    Description11: 'Insurance payout: Total amount of insurance payout during the period',

    Description12: 'ARPU: Recharge amount ÷ Number of active users',
    Description13: "UV conversion rate: UV ÷ Today's new additions",
    Description14: "ACU: Average number of concurrent online users; Count CCU every 5 minutes and report the daily average",

    Description15: 'Account registration conversion rate: Number of account registrations ÷ Number of new logins added today',
    Description16: 'New ARPU: Recharge amount ÷ Number of new additions today',
    Description17: 'ARPPU: Recharge amount ÷ Number of active users and paying players',

    Description18: 'DAU payment rate: number of active users paying players ÷ number of active users',
    Description19: 'New payment rate: number of new paying players added during the period/total number of new players added',

  },
  ImageText: {
    Title: 'Title',
    Subtitle: 'Subtitle',
    Source: 'Source',
    Status: 'Status',
    OnShelf: 'On Shelf',
    OffShelf: 'Off Shelf',
    AddImageText: 'Add ImageText',
    Index: 'SerialNum',
    Graphics: 'Graphics',
    Actions: 'Actions',
    PlaceholderTitle: 'Please enter title'
  },
  // 登录日志
  LoginLog: {
    Sort: 'SerialNum',
    LoginLocation: 'Login Location',
    LoginTimes: 'Login Times',
    UserId: 'User ID',
    LoginIp: 'History Login',
    LoginChannel: 'Login Channel',
    MachineCode: 'Machine Code',
    LoginTime: 'Login Time'
  },
  // 角色管理
  Authority: {
    RoleWarning: 'Note: You can switch roles by clicking the avatar dropdown in the top right corner',
    AddRole: 'Add Role',
    RoleId: 'Role ID',
    RoleName: 'Role Name',
    Actions: 'Actions',
    SetPermissions: 'Set Permissions',
    Copy: 'Copy',
    Edit: 'Edit',
    Delete: 'Delete',
    ParentRole: 'Parent Role',
    RoleConfig: 'Role Configuration',
    RoleMenu: 'Role Menu',
    RoleApi: 'Role API',
    ResourcePermission: 'Resource Permission',
    PlaceholderRoleId: 'Please enter role ID',
    RoleIdReg: 'Role ID can only be numbers',
    PlaceholderRoleName: 'Please enter role name',
    PlaceholderSelectParentRole: 'Please select parent role',
  },
  // 菜单管理
  MenuManage: {
    AddRootMenu: 'Add Root Menu',
    ID: 'ID',
    DisplayName: 'Display Name',
    Icon: 'Icon',
    RouteName: 'Route Name',
    RoutePath: 'Route Path',
    IsHidden: 'Is Hidden',
    Hidden: 'Hidden',
    Visible: 'Visible',
    ParentNode: 'Parent Node',
    Sort: 'Sort',
    FilePath: 'File Path',
    Actions: 'Actions',
    AddSubMenu: 'Add Sub Menu',
    Edit: 'Edit',
    Delete: 'Delete',
    MenuWarning: 'New menus need to be configured in role management to be used',
    BasicInfo: 'Basic Information',
    PlaceholderDisplayName: 'Please enter menu display name',
    PlaceholderRouteName: 'Unique English String',
    RouteConfig: 'Route Configuration',
    ParentNodeID: 'Parent Node ID',
    PlaceholderSelectParent: 'Please select parent node',
    AddParams: 'Add Parameters',
    PlaceholderRoutePath: 'Suggest: Only append parameters at the end',
    DisplaySettings: 'Display Settings',
    SortMark: 'Sort Mark',
    PlaceholderSort: 'Please enter sort number',
    No: 'No',
    Yes: 'Yes',
    PlaceholderIsHidden: 'Whether to hide in the list',
    AdvancedConfig: 'Advanced Configuration',
    HighlightMenu: 'Highlight Menu',
    PlaceholderHighlightMenu: 'Please enter highlight menu name',
    KeepAlive: 'KeepAlive',
    PlaceholderKeepAlive: 'Whether to keepAlive cache page',
    CloseTab: 'Close Tab',
    PlaceholderCloseTab: 'Whether to automatically close tab',
    IsBasePage: 'Is Base Page',
    PlaceholderIsBasePage: 'Whether is base page',
    RouteTransition: 'Route Transition',
    FollowGlobal: 'Follow Global',
    Fade: 'Fade',
    Slide: 'Slide',
    Zoom: 'Zoom',
    NoAnimation: 'No Animation',
    ParameterConfig: 'Parameter Configuration',
    AddParameter: 'Add Menu Parameter',
    ParameterType: 'Parameter Type',
    ParameterKey: 'Parameter Key',
    PlaceholderParameterKey: 'Please enter parameter key',
    ParameterValue: 'Parameter Value',
    PlaceholderParameterValue: 'Please enter parameter value',
    ButtonConfig: 'Button Configuration',
    AddButton: 'Add Controllable Button',
    ButtonName: 'Button Name',
    PlaceholderButtonName: 'Please enter button name',
    Remark: 'Remark',
    PlaceholderRemark: 'Please enter button remark',
    TooltipHighlightMenu:
      'Note: When reaching this route, the specified left menu name will be in active state (lit up). It can be empty, and if empty, it will be the current route name.',
    TooltipIsBasePage: 'If this item is selected as yes, the left menu and top information will not be displayed.',
    TooltipRouteTransition:
      'If route transition animation is set, the animation priority under this route is higher than the global animation switching priority.',
    TooltipButtonConfig: 'Click to view the button permission configuration document',
    FormTipSubMenu: 'If the menu contains submenus, please create a router-view secondary routing page or',
    FormTipClickMe: 'Click me to set',
    CascaderPlaceholder: 'Please select file path',
    InputPlaceholder: 'Page:view/xxx/xx.vue Plugin:plugin/xx/xx.vue',
    ToggleManualInput: 'Manual Input',
    ToggleQuickSelect: 'Quick Select',
    SelectPlaceholder: 'Please Select',
    PlaceholderFilePath: 'Please enter file path',
    PlaceholderMenuName: 'Please enter menu name',
  },
  // 用户管理
  User: {
    Captcha: 'Captcha',
    Username: 'Username',
    PlaceholderUsername: 'Please enter username',
    LeastLength5: 'Least length 5',
    Nickname: 'Nickname',
    PlaceholderNickname: 'Please enter nickname',
    Phone: 'Phone',
    PlaceholderPhone: 'Please enter phone number',
    PlaceholderRightPhone: 'Please enter correct phone number',
    Email: 'Email',
    PlaceholderEmail: 'Please enter email',
    PlaceholderRightEmail: 'Please enter correct email',
    PlaceholderRoleSelect: 'Please select role',
    AddUser: 'Add User',
    Avatar: 'Avatar',
    ID: 'ID',
    Roles: 'Roles',
    Enabled: 'Enabled',
    Actions: 'Actions',
    Delete: 'Delete',
    Edit: 'Edit',
    ResetPassword: 'Reset Password',
    SetGoogle: 'Set Google Authenticator',
    ResetPasswordTitle: 'Reset Password',
    UserAccount: 'User Account',
    UserNickname: 'User Nickname',
    NewPassword: 'New Password',
    PlaceholderNewPassword: 'Please enter new password (min 18 chars, include numbers and upper/lower letters)',
    GenerateRandomPassword: 'Generate Random Password',
    Title: 'User',
    Password: 'Password',
    PlaceholderPassword: 'Minimum 18 chars, incl. numbers, upper/lower letters and special char',
    CreateSuccess: 'Created successfully',
    EditSuccess: 'Edited successfully',
    DeleteSuccess: 'Deleted successfully',
    SetRoleSuccess: 'Role set successfully',
    EnableSuccess: 'Enabled successfully',
    DisableSuccess: 'Disabled successfully',
    ConfirmDelete: 'Are you sure to delete?',
    PasswordRequired: 'Please enter password',
    PasswordMinLength: 'Password must be at least 18 characters',
    PasswordMustContainNumber: 'Password must include numbers',
    PasswordMustContainLower: 'Password must include lowercase letters',
    PasswordMustContainUpper: 'Password must include uppercase letters',
    PasswordMustContainSpecial: 'Password must include special characters',
    ResetPwdNewPasswordRequired: 'Please enter new password',
    PasswordGeneratedCopied: 'Password generated and copied to clipboard',
    CopyFailed: 'Copy failed, please copy manually',
    PasswordResetSuccess: 'Password reset successfully',
    PasswordResetFailed: 'Password reset failed'
  },
  // API管理
  Api: {
    // Search Form
    Path: 'Path',
    PlaceholderPath: 'Please enter path',
    Description: 'Description',
    PlaceholderDescription: 'Please enter description',
    ApiGroup: 'Group',
    PlaceholderApiGroup: 'Please select API group',
    PlaceholderSelectOrCreate: 'Please select or add',
    Method: 'Method',
    Actions: 'Actions',
    PlaceholderMethod: 'Please select method',
    // Button
    RefreshCache: 'Refresh Cache',
    Add: 'Add',
    Edit: 'Edit',
    Delete: 'Delete',
    SyncApi: 'Sync API',
    AutoFill: 'Auto Fill',
    // Table Column
    ID: 'ID',
    ApiPath: 'API Path',
    ApiGroupColumn: 'Group',
    ApiDescription: 'Description',
    MethodColumn: 'Method',
    SingleAdd: 'Single Add',
    Ignore: 'Ignore',
    CancelIgnore: 'Cancel Ignore',
    // Sync Dialog
    SyncRoute: 'Sync Route',
    NewRoute: 'New Route',
    NewRouteNote: 'Present in current routes but not in the API table',
    DeletedRoute: 'Deleted Route',
    DeletedRouteNote:
      'No longer exists in the current project routes; after confirming sync it will be removed from the apis table',
    IgnoreRouteNote: 'Ignored routes are not included in API sync; commonly routes that do not require authentication.',
    IgnoreRoute: 'Ignore Route',
    SyncApiWarning:
      'Sync API: If no route group is entered, it will not be synced automatically. If the API does not need authentication, you can click the ignore button.',
    // Edit Dialog
    AddApi: 'Add API',
    EditApi: 'Edit API',
    AddApiWarning: 'Adding API: configuration in role management is required to use it',
    // Error Messages
    SelectApiGroupError: 'Please select API group first',
    FillDescriptionError: 'Please fill in description first',
    GroupOrDescriptionError: 'Some APIs are not grouped or descriptions are missing',
    ConfirmRefreshCache: 'Are you sure to refresh cache?',
    ConfirmDeleteAllRoles: 'This action will permanently delete this API from all roles. Continue?',
    UnknownOperation: 'Unknown Operation',
    DeleteSuccess: 'Deleted successfully!',
    AddSuccess: 'Added successfully',
    AddSuccessManageRole: 'Added successfully, please go to role management page to assign permissions',
    EditSuccess: 'Edited successfully',
    AiAutoFillFailed: 'AI auto fill failed, please try again',
    // Request Method Labels
    CreateLabel: 'Create',
    ReadLabel: 'Read',
    UpdateLabel: 'Update',
    DeleteLabel: 'Delete',
    // Form Validation Messages
    PathRequired: 'Please enter API path',
    GroupRequired: 'Please enter group name',
    MethodRequired: 'Please select request method',
    DescriptionRequired: 'Please enter API introduction'
  },
  // 操作历史
  Operation: {
    Method: 'Request Method',
    Path: 'Request Path',
    PathName: 'Path Name',
    StatusCode: 'Status Code',
    PlaceholderSearch: 'Please enter',
    DeleteSelected: 'Delete',
    Operator: 'Operator',
    Date: 'Date',
    IP: 'Request IP',
    RequestBody: 'Request',
    Response: 'Response',
    None: 'None',
    Actions: 'Actions',
    Delete: 'Delete',
    ConfirmDelete: 'Are you sure to delete?',
    DeleteSuccess: 'Deleted successfully'
  },
  // 字典管理
  Dictionary: {
    Warning:
      'Fetching dictionaries and caching is wrapped in frontend utils/dictionary; no need to implement yourself. See file comments for usage.',
    ListTitle: 'Dictionary List',
    Add: 'Add',
    CreateTitle: 'Add Dictionary',
    EditTitle: 'Edit Dictionary',
    NameZh: 'DictName(CN)',
    PlaceholderNameZh: 'Please enter dictName(CN)',
    NameEn: 'DictName(EN)',
    PlaceholderNameEn: 'Please enter dictName(EN)',
    Status: 'Status',
    StatusOn: 'On',
    StatusOff: 'Off',
    Desc: 'Description',
    PlaceholderDesc: 'Please enter description',
    NameZhRequired: 'Please enter dictName(CN)',
    NameEnRequired: 'Please enter dictName(EN)',
    DescRequired: 'Please enter description',
    DeleteConfirm: 'Are you sure to delete?',
    DeleteSuccess: 'Deleted successfully',
    OperationSuccess: 'Operation successful',
    // Detail
    DetailTitle: 'Dictionary Details',
    AddItem: 'Add Item',
    ColumnDate: 'Date',
    ColumnLabel: 'Display',
    ColumnValue: 'Value',
    ColumnExtend: 'Extend',
    ColumnStatus: 'Status',
    ColumnSort: 'Sort',
    Actions: 'Actions',
    Change: 'Change',
    Delete: 'Delete',
    CreateItemTitle: 'Add Item',
    EditItemTitle: 'Edit Item',
    PlaceholderLabel: 'Please enter display text',
    PlaceholderValue: 'Please enter value',
    PlaceholderExtend: 'Please enter extend value',
    PlaceholderSort: 'Sort mark',
    LabelRequired: 'Please enter display text',
    ValueRequired: 'Please enter value',
    SortRequired: 'Sort mark',
    CreateOrUpdateSuccess: 'Created/updated successfully'
  },
  // 网易IM
  NetEaseIM: {
    Actions: 'Actions',
    Add: 'Add',
    Edit: 'Edit',
    Delete: 'Delete',
    Index: 'SerialNum',
    Url: 'IM Backend Request',
    RoomURL: 'Voice Room URL',
    IMUrl: 'IM URL',
    AppKey: 'appKey',
    AppSecret: 'appSecret',
    PayUrl: 'Recharge Request',
    WithdrawUrl: 'Withdraw Request',
    ClubWithdrawGoldUrl: 'Get User Gold Amount',
    ManualTransferUrl: 'Manual Transfer Recharge/Withdraw',
    PhoneUrl: 'SMS/Email',
    RecommendShareUrl: 'Share/Recommend URL',

    PlaceholderUrl: 'Please enter IM backend request URL',
    PlaceholderRoomURL: 'Please enter voice room URL',
    PlaceholderIMUrl: 'Please enter IM URL',
    PlaceholderAppSecret: 'Please enter appSecret',
    PlaceholderAppKey: 'Please enter appKey',
    PlaceholderPayUrl: 'Please enter recharge request URL',
    PlaceholderWithdrawUrl: 'Please enter withdraw request URL',
    PlaceholderClubWithdrawGoldUrl: 'Please enter get user gold amount URL',
    PlaceholderManualTransferUrl: 'Please enter manual transfer recharge/withdraw URL',
    PlaceholderPhoneUrl: 'Please enter SMS/Email URL',
    PlaceholderRecommendShareUrl: 'Please enter share/recommend URL',

    UrlRequired: 'Please enter IM backend request URL',
    RoomURLRequired: 'Please enter voice room URL',
    IMUrlRequired: 'Please enter IM URL',
    AppSecretRequired: 'Please enter appSecret',
    AppKeyRequired: 'Please enter appKey',
    PayUrlRequired: 'Please enter recharge request URL',
    WithdrawUrlRequired: 'Please enter withdraw request URL',
    ClubWithdrawGoldUrlRequired: 'Please enter get user gold amount URL',
    ManualTransferUrlRequired: 'Please enter manual transfer recharge/withdraw URL',
    PhoneUrlRequired: 'Please enter SMS/Email URL',
    RecommendShareUrlRequired: 'Please enter share/recommend URL',

    CreateOrUpdateSuccess: 'Created/Updated successfully'
  },
  // 开关服
  SwitchSuit: {
    State: 'Server State',
    PlaceholderState: 'Please select server state',
    AllOpen: 'Open All Servers',
    AllClose: 'Close All Servers',
    Index: 'SerialNum',
    ServerID: 'Server ID',
    ServerName: 'Server Name',
    On: 'On',
    Off: 'Off',
    Actions: 'Actions',
    Open: 'Open',
    Close: 'Close',

    ConfirmOpen: 'Confirm open {name}?',
    ConfirmClose: 'Confirm close {name}?',
    ConfirmAllOpen: 'Confirm open all servers?',
    ConfirmAllClose: 'Confirm close all servers?'
  },
  // 广告机器人
  AdvertiseBot: {
    Title: 'Title',
    PlaceholderTitle: 'Please enter title',
    CopyType: 'Copy Type',
    PlaceholderCopyType: 'Please select copy type',
    SendType: 'Send Type',
    PlaceholderSendType: 'Please select send type',
    AdvertiseStatus: 'Advertisement Status',
    PlaceholderAdvertiseStatus: 'Please select advertisement status',
    Add: 'Add',
    Edit: 'Edit',
    Delete: 'Delete',
    View: 'View',
    Index: 'SerialNum',
    ID: 'ID',
    FileType: 'File Type',
    SendTime: 'Send Time',
    SendInterval: 'Send Interval',
    EndTime: 'End Time',
    LastSendTime: 'Last Send Time',
    Status: 'Status',
    On: 'On',
    Off: 'Off',
    Actions: 'Actions',
    Remark: 'Remark',
    Content: 'Content',
    PlaceholderContent: 'Please enter content',
    IsMarkdown: 'Enable Markdown',
    PlaceholderIsMarkdown: 'Please select whether to enable Markdown',
    ChooseUpload: 'Please select image/video to upload',
    PlaceholderButtonName: 'Please enter button name',
    PlaceholderButtonUrl: 'Please enter button URL',
    PlaceholderRemark: 'Please enter remark',
    FileUrl: 'Image/Video URL',
    Buttons: 'Buttons',
    UnknownType: 'Unknown Type',
    SendOnce: 'Send once at specified time',
    SendIntervalLoop: 'Send at specified intervals, loop',
    SendRandom: 'Send at random intervals',
    Text: 'Text',
    ImageText: 'Image & Text',
    VideoText: 'Video & Text',

    ConfirmDelete: 'Are you sure to delete?',
    SelectDeleteData: 'Please select data to delete',
    DeleteSuccess: 'Deleted successfully',
    ConfirmReset: 'Confirm reset?',
    Reset: 'Reset',

    PlaceholderSelectDate: 'Please select date',
    PlaceholderSendInterval: 'Please enter send interval',

    CreateOrUpdateSuccess: 'Created/Updated successfully',
    FileTooLarge: 'File size must not exceed 5MB!',

    CreateTime: 'Create Time',
    UpdateTime: 'Update Time',
    DeletedAt: 'Deleted At',
    ButtonTip: 'Button (The position can be displayed by dragging and dropping the sort button) :'
  },
  // 活跃用户统计
  ActiveReport: {
    TimeSelection: 'Time Selection',
    StartTime: 'Start Time',
    EndTime: 'End Time',
    Index: 'SerialNum',
    Channel: 'Channel',
    DAU: 'Daily Active Users',
    WAU: 'Weekly Active Users',
    MAU: 'Monthly Active Users',
    Time: 'Time'
  },
  // 新用户留存统计
  NewUserStatistics: {
    TimeSelection: 'Time',
    StartTime: 'Start Time',
    EndTime: 'End Time',
    CurrentPeriodTotalRegister: 'Total registered in current period:',
    Index: 'SerialNum',
    Channel: 'Channel',
    Registered: 'Registered Users',
    D1: 'Day 1',
    D3: 'Day 3',
    D7: 'Day 7',
    D15: 'Day 15',
    D30: 'Day 30',
    RegisterTime: 'Register Time'
  },
  // 输赢记录
  PaiJuWinLoseRecord: {
    UserID: 'User ID',
    PlaceholderUserID: 'Please enter player ID',
    PaiJuID: 'Game ID',
    PlaceholderPaiJuID: 'Please enter Game ID',
    GameID: 'Game ID',
    PlaceholderGameID: 'Please select Game ID',
    Time: 'Time',
    StartTime: 'Start Time',
    EndTime: 'End Time',
    Index: 'SerialNum',
    RecordID: 'Record ID',
    PlayerID: 'Player ID',
    GameType: 'Game Type',
    Session: 'Session',
    WinLose: 'Win/Lose',
    DrawWater: 'Draw Water',
    PumpingType: 'Pumping Type',
    BetAmount: 'Bet Amount',
    ValidBet: 'Valid Bet',
    Actions: 'Actions',
    RangeSeparator: 'to',
    View: 'View'
  },
  // 牌局记录
  GameRecord: {
    PaiJuID: 'Game ID',
    PlaceholderPaiJuID: 'Please enter game ID',
    PlayerID: 'Player ID',
    PlaceholderPlayerID: 'Please enter player ID',
    GameName: 'Game Name',
    PlaceholderGameName: 'Please select game name',
    OperateTime: 'Operate Time',
    RangeSeparator: 'to',
    StartTime: 'Start Date',
    EndTime: 'End Date',
    Index: 'SerialNum',
    Actions: 'Actions',
    View: 'View',
    TableName: 'Table Name',
    RoomID: 'Round',
    WinLose: 'WinLose',
    TableId: 'Table ID',
    Time: 'Time',
    GameOptionDeZhou: 'Texas',
    GameOptionShort: 'Short',
  },
  // 财产记录
  PropertyRecords: {
    PlayerID: 'Player ID',
    PlaceholderPlayerID: 'Please enter player ID',
    PlatformUserID: 'Platform User ID',
    PlaceholderPlatformUserID: 'Please enter platform user ID',
    ItemType: 'Item Type',
    PlaceholderItemType: 'Please select item type',
    ChangeType: 'Change Type',
    PlaceholderChangeType: 'Please select change type',
    Time: 'Time',
    StartTime: 'Start Time',
    EndTime: 'End Time',
    Index: 'SerialNum',
    OperatorId: 'Operator ID',
    Operator: 'Operator',
    PaiJuId: 'Game ID',
    changeModule: 'Change Module',
    StartAmount: 'Start Amount',
    ChangeAmount: 'Change Amount',
    EndAmount: 'End Amount',
    ViewDetail: 'View Detail',
    OperateTime: 'Operate Time',
    Gold: 'Gold',
    BankBalance: 'Bank Balance',
    OperationSuccess: 'Operation successful',
    ConfirmDeleteOne: 'Are you sure to delete this record?',
    SelectDeleteData: 'Please select data to delete',
    ConfirmDeleteSelected: 'Are you sure to delete selected records?',
    DeleteSuccess: 'Deleted successfully',
    DeleteBatchSuccess: 'Batch delete successful'
  },
  // 错误页面（404）
  ErrorPage: {
    PageMissing: 'The page has been taken away by mysterious forces.',
    PermissionHintPrefix: 'A common cause is that you do not have permission for this page. If you need this route, ',
    PermissionHintHighlight: 'please contact the administrator to assign permissions!',
    BackHome: 'Back to Home',
    PermissionChangedMessage: 'Another user has modified your route permissions. Please log in again.'
  },
  // 分组管理
  ConfigGroupList: {
    Add: 'Add',
    Delete: 'Delete',
    Index: 'SerialNum',
    GroupId: 'Group ID',
    GroupName: 'Group Name',
    BranchShop: 'Branch',
    Actions: 'Actions',
    View: 'View',
    Edit: 'Edit',
    GroupIdLabel: 'Group ID:',
    GroupNameLabel: 'Group Name:',
    BranchShopLabel: 'Branch:',
    GroupIdPlaceholder: 'Please enter group ID',
    GroupNamePlaceholder: 'Please enter group name',
    BranchShopPlaceholder: 'Please enter branch',
    ValidateGroupId: 'Please enter group ID',
    ValidateGroupName: 'Please enter group name',
    ValidateBranchShop: 'Please enter branch',
    ConfirmDelete: 'Are you sure you want to delete?',
    SelectDeleteWarning: 'Please select the data to delete',
    DeleteSuccess: 'Deleted successfully',
    CreateOrUpdateSuccess: 'Created/updated successfully'
  },
  // 牌局记录-牌局详情
  GameDetailDrawer: {
    Title: 'Game Detail',
    PaiJuNumber: 'Game Number',
    GameTime: 'Game Time',
    TableName: 'Table Name',
    BlindsAnte: 'Small/Big',
    TotalBet: 'Total Bet',
    Participants: 'Participants',
    People: ' people',
    CommunityCardsTitle: 'Community Cards (Flop, Turn, River)',
    NoCommunityCards: 'No community cards dealt',
    GameProgress: 'Game Progress',
    PlayerDetails: 'Player Details',
    Position: 'Position',
    Nickname: 'Nickname',
    Banker: 'Banker',
    PlayerID: 'Player ID',
    NotShown: 'Not shown',
    CardType: 'Hand Type',
    Fold: 'Fold',
    OperationRecords: 'Operation Records',
    Insurance: 'Insurance',
    InsuranceBuyAmount: 'Insurance Buy Amount',
    InsurancePayoutAmount: 'Insurance Payout Amount',
    Rake: 'Rake',
    Profit: 'Profit',
    CardHigh: 'High Card',
    CardOnePair: 'One Pair',
    CardTwoPair: 'Two Pair',
    CardTrips: 'Three of a Kind',
    CardStraight: 'Straight',
    CardFlush: 'Flush',
    CardFullHouse: 'Full House',
    CardQuads: 'Four of a Kind',
    CardStraightFlush: 'Straight Flush',
    CardRoyalFlush: 'Royal Flush',
    TextSmallBlind: 'Small Blind {amount}',
    TextBigBlind: 'Big Blind {amount}',
    TextCall: 'Call {amount}',
    TextCheck: 'Check',
    TextFold: 'Fold',
    TextRaise: 'Raise {amount}',
    HoleCards: 'Hole Cards',
    BestCombination: 'Best Combination'
  },
  // 活动分类
  ActivityClassification: {
    NameLabel: 'Activity Category Name:',
    NamePlaceholder: 'Please enter activity category name',
    StatusLabel: 'Status',
    StatusPlaceholder: 'Please select status',
    StatusSelectPlaceholder: 'Please select activity status',
    Add: 'Add',
    Delete: 'Delete',
    Index: 'SerialNum',
    NameColumn: 'Activity Category Name',
    Sort: 'Sort',
    SortLabel: 'Sort:',
    SortPlaceholder: 'Please enter sort value',
    StatusColumn: 'Status',
    StatusEnabled: 'Enabled',
    StatusDisabled: 'Disabled',
    CategoryId: 'Activity Category ID',
    CreatedAt: 'Created At',
    UpdatedAt: 'Updated At',
    Actions: 'Actions',
    Edit: 'Edit',
    FormNameLabel: 'Activity Name:',
    FormNamePlaceholder: 'Please enter activity name',
    ConfirmDelete: 'Are you sure you want to delete?',
    SelectDeleteWarning: 'Please select the data to delete',
    DeleteSuccess: 'Deleted successfully',
    CreateOrUpdateSuccess: 'Created/updated successfully',
    ValidateName: 'Please enter activity name',
    ValidateSort: 'Please enter sort value',
    ValidateStatus: 'Please select activity status'
  },
  // 俱乐部
  Club: {
    Search: {
      ClubIdLabel: 'Club ID',
      ClubNameLabel: 'Club Name',
      MasterIdLabel: 'President ID',
      Placeholder: 'Search condition'
    },
    Table: {
      Index: 'SerialNum',
      Id: 'ID',
      ClubId: 'Club ID',
      Group: 'Group',
      ClubName: 'Club Name',
      MasterId: 'President ID',
      CanApply: 'Application Allowed',
      CanSearch: 'Searchable',
      CreatedAt: 'Created At',
      PassWords: 'Inventory Password',
      TablePower: 'Table Management Permission',
      Actions: 'Actions',
      View: 'View'
    },
    Options: {
      Can: 'Allowed',
      Cannot: 'Not Allowed',
      Has: 'Has',
      None: 'None'
    },
    Drawer: {
      TitleCreate: 'Add',
      TitleEdit: 'Edit',
      ClubIdLabel: 'Club ID:',
      ClubIdPlaceholder: 'Please enter the club ID',
      GroupIdLabel: 'Group:',
      GroupIdPlaceholder: 'Please enter the group',
      GroupSelectPlaceholder: 'Please select the group',
      ClubNameLabel: 'Club Name:',
      ClubNamePlaceholder: 'Please enter the club name',
      MasterIdLabel: 'President ID:',
      MasterIdPlaceholder: 'Please enter the president ID',
      CanApplyLabel: 'Application Allowed',
      CanSearchLabel: 'Searchable',
      CreateTimeLabel: 'Created At:',
      CreateTimePlaceholder: 'Select date',
      PassWordsLabel: 'Inventory Password:',
      PassWordsPlaceholder: 'Please enter the inventory password',
      TablePowerLabel: 'Table Management Permission'
    },
    Detail: {
      Title: 'View',
      Id: 'ID',
      ClubId: 'Club ID',
      GroupId: 'Group',
      ClubName: 'Club Name',
      MasterId: 'President ID',
      CanApply: 'Application Allowed',
      CanSearch: 'Searchable',
      CreateTime: 'Created At',
      PassWords: 'Inventory Password',
      TablePower: 'Table Management Permission'
    },
    Messages: {
      ConfirmDelete: 'Are you sure you want to delete?',
      DeleteSuccess: 'Deleted successfully',
      SelectDeleteWarning: 'Please select the data to delete',
      CreateOrUpdateSuccess: 'Created/updated successfully',
      FetchGroupFailed: 'Failed to fetch group list'
    },
    Validation: {
      Id: 'Please enter the ID',
      ClubId: 'Please enter the club ID',
      GroupId: 'Please enter the group',
      ClubName: 'Please enter the club name',
      MasterId: 'Please enter the president ID',
      CreateTime: 'Please select the created time',
      PassWords: 'Please enter the inventory password',
      TablePower: 'Please select the table management permission'
    }
  },
  // 俱乐部用户
  ClubUser: {
    Search: {
      UserIdLabel: 'Player ID',
      ClubIdLabel: 'Club ID',
      Placeholder: 'Search condition'
    },
    Actions: {
      Add: 'Add',
      Delete: 'Delete',
      View: 'View',
      Edit: 'Edit'
    },
    Table: {
      Index: 'SerialNum',
      Id: 'ID',
      UserId: 'Player ID',
      ClubId: 'Club ID',
      Money: 'Balance',
      JoinTime: 'Join Time',
      Identity: 'Role',
      MemberPower: 'Member Management Permission',
      ClubGoldPower: 'Club Coin Permission',
      TablePower: 'Table Management Permission',
      Actions: 'Actions'
    },
    Identity: {
      President: 'President',
      Admin: 'Administrator',
      Member: 'Member',
      Unknown: 'Unknown Role'
    },
    Power: {
      HasPermission: 'Has Permission',
      NoPermission: 'No Permission',
      Unknown: 'Unknown'
    },
    Drawer: {
      TitleCreate: 'Add',
      TitleEdit: 'Edit',
      UserIdLabel: 'Player ID:',
      UserIdPlaceholder: 'Please enter the player ID',
      ClubIdLabel: 'Club ID:',
      ClubIdPlaceholder: 'Please enter the club ID',
      JoinTimeLabel: 'Join Time:',
      JoinTimePlaceholder: 'Please select the join time',
      IdentityLabel: 'Role',
      MemberPowerLabel: 'Member Management Permission',
      ClubGoldPowerLabel: 'Club Coin Permission',
      TablePowerLabel: 'Table Management Permission',
      SelectPlaceholder: 'Please select'
    },
    Detail: {
      Title: 'View',
      Id: 'ID',
      UserId: 'Player ID',
      ClubId: 'Club ID',
      JoinTime: 'Join Time',
      Identity: 'Role',
      MemberPower: 'Member Management Permission',
      ClubGoldPower: 'Club Coin Permission',
      TablePower: 'Table Management Permission'
    },
    Messages: {
      ConfirmDelete: 'Are you sure you want to delete?',
      DeleteSuccess: 'Deleted successfully',
      SelectDeleteWarning: 'Please select the data to delete',
      CreateOrUpdateSuccess: 'Created/updated successfully'
    },
    Validation: {
      Id: 'Please enter the ID',
      UserId: 'Please enter the player ID',
      ClubId: 'Please enter the club ID',
      JoinTime: 'Please select the join time',
      Identify: 'Please select the role',
      MemberPower: 'Please select the member management permission',
      ClubGoldPower: 'Please select the club coin permission',
      TablePower: 'Please select the table management permission'
    }
  },
  // 用户列表
  AccountsInfo: {
    Search: {
      UserIdLabel: 'User ID',
      UserIdPlaceholder: 'Please enter the user ID',
      AccountsLabel: 'User Account',
      AccountsPlaceholder: 'Please enter the user account',
      NickNameLabel: 'User Nickname',
      NickNamePlaceholder: 'Please enter the user nickname'
    },
    Actions: {
      ExportXlsx: 'Export xlsx',
      View: 'View',
      Penalty: 'Penalize',
      Unblock: 'Unblock',
      AdjustCurrency: 'Adjust Currency',
      Mark: 'Mark',
      SubmitApplication: 'Submit Application',
      CancelApplication: 'Cancel Application'
    },
    Table: {
      Index: 'Serial Num',
      UserId: 'User ID',
      Accounts: 'User Account',
      Balance: 'Balance',
      Recharge: 'Top-up Amount',
      NickName: 'Nickname',
      ChannelID: 'Channel ID',
      AccountType: 'Account Type',
      LoginIP: 'Login IP',
      RegisterIP: 'Registration IP',
      RegisterTime: 'Registration Time',
      LoginTime: 'Login Last Time',
      Remark: 'Tag',
      Actions: 'Actions'
    },
    DetailDrawer: {
      Title: 'View',
      UserId: 'User ID',
      Accounts: 'User Account',
      Password: 'Password',
      NickName: 'Nickname',
      Sex: 'Gender',
      AccountType: 'Account Type',
      PhoneType: 'Login Device',
      MachineCode: 'Device Code',
      LoginIP: 'Login IP',
      RegisterIP: 'Registration IP',
      RegisterTime: 'Registration Time',
      Remark: 'Tag',
      LoginTime: 'Login Time',
      RealName: 'Real-Name Status',
      IsRobot: 'Is Bot',
      ClientVersion: 'Client Version',
      ServerVersion: 'Server Version',
      DeviceModel: 'Device Model'
    },
    Tooltips: {
      Sex: '0: Male, 1: Female',
      AccountType: '1: Standard account; 2: Test account; 0: Guest; 4: Observer',
      MachineCode: 'Device identifier used for login (club v2.3 uses it as a referral code)',
      LoginInfo:
        'Recent login information. You can view the last 3 months or 100 login records in the login log (ID, nickname, channel, device, device code, IP, time).',
      RealName: '0: Not verified; >0: Verified ID (query ID card info in the admin panel)',
      IsRobot: '0: No; 1: Yes'
    },
    Dialogs: {
      PenaltyTitle: 'Penalize User',
      UnblockTitle: 'Unblock',
      CurrencyTitle: 'Submit Currency Adjustment',
      MarkTitle: 'Mark User',
      TransferTitle: 'Transfer',
      EditTitle: 'Edit User Nickname'
    },
    Labels: {
      UserId: 'User ID'
    },
    Forms: {
      PenaltyType: 'Penalty Type',
      PenaltyAutoUnblock: 'Auto Unblock Time',
      PenaltyReason: 'Penalty Reason',
      PenaltyDefaultReason: 'Violation',
      UnblockType: 'Unblock Type',
      OperationType: 'Operation Type',
      ApplyAmount: 'Requested Amount',
      MarkInfo: 'Mark Notes',
      TransferAmount: 'Transfer Amount',
      Water: 'Requires Turnover',
      Remark: 'Remark',
      NickName: 'User Nickname',
      EditReason: 'Reason for Change'
    },
    Placeholders: {
      UserId: 'Please enter the user ID',
      PenaltyType: 'Please select a penalty type',
      AutoUnblock: 'Please set the auto unblock time',
      PenaltyReason: 'Please provide a penalty reason',
      UnblockType: 'Please select an unblock type',
      OperationType: 'Please select an operation type',
      ApplyAmount: 'Please enter the requested amount',
      MarkInfo: 'Please enter the notes',
      TransferAmount: 'Please enter the transfer amount',
      Water: 'Please select whether turnover is required',
      Remark: 'Please enter a remark',
      NickName: 'Please enter the user nickname',
      EditReason: 'Please enter the reason'
    },
    Validations: {
      OperationTypeRequired: 'Please select an operation type',
      ApplyAmountRequired: 'Please enter the requested amount',
      ApplyAmountNumber: 'The requested amount must be a number',
      ApplyAmountGreaterThanZero: 'The requested amount must be greater than 0',
      NickNameRequired: 'Please enter the user nickname',
      EditReasonRequired: 'Please enter the reason'
    },
    Messages: {
      ExportExcelSuccess: 'Excel file exported successfully',
      ExportExcelFailed: 'Failed to export Excel file',
      ExportExcelError: 'Failed to export XLSX',
      DeleteConfirm: 'Are you sure you want to delete?',
      SelectDeleteWarning: 'Please select the data to delete',
      DeleteSuccess: 'Deleted successfully',
      CreateOrUpdateSuccess: 'Created/updated successfully',
      PenaltySuccess: 'Penalty applied successfully',
      SubmitIncomplete: 'Please complete the form',
      SubmitSuccess: 'Submitted successfully',
      SubmitFailed: 'Submission failed',
      EditSuccess: 'Updated successfully',
      UnblockSuccess: 'Unblocked successfully',
      MarkSuccess: 'Marked successfully',
      TransferSuccess: 'Transfer succeeded'
    },
    AccountType: {
      Normal: 'Standard Account',
      Test: 'Test Account',
      Guest: 'Guest',
      Observer: 'Observer',
      Telegram: 'TG Account'
    },
    Sex: {
      Male: 'Male',
      Female: 'Female',
      Unknown: 'Unknown'
    },
    BooleanText: {
      Yes: 'Yes',
      No: 'No'
    },
    RealName: {
      Unverified: 'Unverified',
      Verified: 'Verified ID'
    },
    PenaltyOptions: {
      AccountBan: 'Account Ban',
      WorldChatMute: 'World Chat Mute',
      IPBan: 'IP Ban',
      GPSBan: 'GPS Ban'
    },
    Currency: {
      Increase: 'Increase',
      Decrease: 'Decrease'
    },
    WaterOptions: {
      Yes: 'Yes',
      No: 'No'
    }
  },
  BannedList: {
    Search: {
      UserIdLabel: 'User ID',
      UserIdPlaceholder: 'Search criteria',
      BanTypeLabel: 'Ban Type',
      BanTypePlaceholder: 'Please select'
    },
    Actions: {
      Expand: 'Expand',
      Collapse: 'Collapse',
      Unblock: 'Unblock'
    },
    Table: {
      Index: 'Index',
      UserId: 'User ID',
      BanType: 'Ban Type',
      BanInfo: 'Ban Information',
      OtherBanInfo: 'Other Ban Information',
      OperatorId: 'Operator ID',
      OperatorName: 'Operator Name',
      AutoUnblockTime: 'Auto Unblock Time',
      Actions: 'Actions'
    },
    BanTypeOptions: {
      AccountBan: 'Account Ban',
      WorldChatMute: 'World Chat Mute',
      IPBan: 'IP Ban',
      GPSBan: 'GPS Ban'
    },
    Dialogs: {
      UnblockTitle: 'Unblock',
      UnblockType: 'Unblock Type'
    },
    Placeholders: {
      UserId: 'User ID',
      UnblockType: 'Please select an unblock type'
    },
    Messages: {
      DeleteConfirm: 'Are you sure you want to delete?',
      DeleteSuccess: 'Deleted successfully',
      DeleteWarning: 'Please select the data to delete',
      CreateOrUpdateSuccess: 'Created/updated successfully',
      PenaltySuccess: 'Penalty applied successfully',
      UnblockSuccess: 'Unblocked successfully'
    }
  },
  // 俱乐部桌子配置
  ClubTableSetup: {
    Search: {
      GroupLabel: 'Club Table Configuration',
      GameLabel: 'Game',
      SelectPlaceholder: 'Please select'
    },
    Actions: {
      Add: 'Add',
      Edit: 'Edit',
      Delete: 'Delete'
    },
    Table: {
      Index: 'SerialNum',
      Group: 'Group',
      Game: 'Game',
      OddsTable: 'Standard Insurance',
      Actions: 'Actions'
    },
    Dialog: {
      TitleCreate: 'Add Club Table Configuration',
      TitleEdit: 'Edit Club Table Configuration'
    },
    Messages: {
      ConfirmDelete: 'This action will permanently delete the configuration. Continue?',
      DeleteSuccess: 'Deleted successfully!',
      CreateSuccess: 'Created successfully',
      EditSuccess: 'Updated successfully'
    },
    AddEditDialog: {
      GroupLabel: 'Group',
      GroupPlaceholder: 'Select a group',
      GameLabel: 'Game',
      GamePlaceholder: 'Select a game',
      CapacityLabel: 'Seats (2-9)',
      CapacityPlaceholder: 'Enter seats (2-9)',
      KeepTimeLabel: 'Room Duration (h)',
      KeepTimePlaceholder: 'Enter room duration',
      TakeinLabel: 'Buy-in Multiples',
      TakeinPlaceholder: 'Enter buy-in multiples',
      PoolEntryRateLabel: 'Pool Entry Rate',
      PoolEntryRatePlaceholder: 'Enter pool entry rate',
      DWLimitLabel: 'Rake Cap',
      DWLimitPlaceholder: 'Enter rake cap',
      VideoFeeLabel: 'Voice Chat Fee',
      VideoFeePlaceholder: 'Enter voice chat fee',
      FrontendRoomConfig: 'Frontend Room Configuration',
      AnteHint: 'Small Blind, Big Blind, Default Buy-In, Ante, Peek Hand, Peek Board, Cut Card',
      SmallBlind: 'Small Blind',
      SmallBlindShortDeck: 'Small Blind / Ante',
      SmallBlindPlaceholder: 'Enter small blind',
      BigBlind: 'Big Blind',
      BigBlindShortDeck: 'Big Blind / Dealer Multiplier',
      BigBlindPlaceholder: 'Enter big blind',
      Scoreboard: 'Buy-in Chips',
      ScoreboardPlaceholder: 'Enter buy-in chips',
      Ante: 'Ante',
      AntePlaceholder: 'Enter ante (JSON array)',
      HandCost: 'Peek Hand',
      HandCostPlaceholder: 'Enter peek hand fee',
      CommonCost: 'Peek Board',
      CommonCostPlaceholder: 'Enter peek board fee',
      CutCost: 'Cut Card',
      CutCostPlaceholder: 'Enter cut card fee',
      Tooltips: {
        ShortDeckBigBlind: 'Reads according to the selected short-deck mode and displays the corresponding value when creating a room on the frontend.',
        Ante: 'When creating a room on the frontend, the selected blind row determines the matching ante amount.<br>For example, choosing the first-row small blind will also use that row\'s big blind and ante.',
        DefaultFirstFour: 'The frontend defaults to the first four rows.'
      },
      InsuranceDivider: 'Standard Insurance Outs',
      OddsLabel: 'Odds',
      OddsPlaceholder: 'Odds for drawing {count} card(s)',
      OddsPrepend: 'Draw {count}',
      Messages: {
        SmallBlindFirst: 'Please enter the small blind first',
        BigBlindGreater: 'Big blind must be greater than small blind'
      },
      Validation: {
        GroupRequired: 'Please select a group',
        GameRequired: 'Please select a game',
        VideoFeeRequired: 'Enter the voice chat fee',
        CapacityRequired: 'Keep at least one seat value and ensure all seats are filled',
        CapacityInteger: 'Seat count must be an integer',
        CapacityRange: 'Seat count must be an integer between 2 and 9',
        KeepTimeRequired: 'Keep at least one duration value and ensure all durations are filled',
        KeepTimePositive: 'Room duration must be greater than 0',
        KeepTimeDecimal: 'Duration cannot have more than two decimal places',
        TakeinRequired: 'Keep at least one buy-in multiple and ensure all multiples are filled',
        TakeinInteger: 'Buy-in multiples must be integers',
        PoolEntryRateRequired: 'Keep at least one pool entry rate and ensure all rates are filled',
        PoolEntryRatePositive: 'Pool entry rate must be greater than 0',
        PoolEntryRateDecimal: 'Pool entry rate cannot have more than two decimal places',
        DWLimitRequired: 'Keep at least one rake cap and ensure all caps are filled',
        DWLimitDecimal: 'Rake cap cannot have more than two decimal places',
        OddsRequired: 'Keep at least one odds value and ensure all odds are filled',
        OddsDecimal: 'Odds cannot have more than two decimal places'
      }
    }
  },
  // 活动定义
  ActivityDefine: {
    Status: 'Status',
    SelectStatus: 'Please select activity status',
    ActivityCategory: 'Activity Category',
    SelectActivityCategory: 'Please select activity category',
    Add: 'Add',
    Index: 'SerialNum',
    Title: 'Title',
    ActivityName: 'Activity Name',
    StatusOpen: 'Enabled',
    StatusClosed: 'Disabled',
    Sort: 'Sort',
    CoverImage: 'Cover Image',
    Link: 'Link URL',
    StartTime: 'Activity Start Time',
    EndTime: 'Activity End Time',
    CreatedAt: 'Created At',
    Actions: 'Actions',
    Edit: 'Edit',
    Delete: 'Delete',
    TitleLabel: 'Title:',
    TitlePlaceholder: 'Please enter title',
    ActivityNameLabel: 'Activity Name:',
    ActivityNamePlaceholder: 'Please enter activity name',
    UploadImageLabel: 'Select an image to upload (click again to replace):',
    SortLabel: 'Sort:',
    StartTimeLabel: 'Start Time:',
    StartTimePlaceholder: 'Please set start time',
    EndTimeLabel: 'End Time:',
    EndTimePlaceholder: 'Please set end time',
    LinkLabel: 'Link:',
    LinkPlaceholder: 'Please enter activity link',
    View: 'View',
    DetailIdField: 'ID Field',
    DetailCreatedAtField: 'createdAt Field',
    DetailUpdatedAtField: 'updatedAt Field',
    DetailDeletedAtField: 'deletedAt Field',
    DetailChannel: 'Channel',
    DetailActivityId: 'Activity ID',
    DetailActivityName: 'Activity Name',
    DetailStatus: 'Status (0=Off, 1=On)',
    DetailSort: 'Sort',
    DetailStartTime: 'Start Time',
    DetailEndTime: 'End Time',
    DetailConfig: 'Activity Config',
    DetailBaseConfig: 'Base Config',
    DetailImage: 'Activity Image',
    DetailImageLang: 'Other Language Images',
    DetailRecharge: 'Minimum Recharge Amount',
    ValidateTitle: 'Please enter title',
    ValidateActivityName: 'Please enter activity name',
    ValidateImage: 'Please select an activity image',
    ValidateStartTime: 'Please select start time',
    ValidateEndTime: 'Please select end time',
    ValidateActivityCategory: 'Please select activity category',
    ValidateLink: 'Please enter activity link',
    ConfirmDelete: 'Are you sure you want to delete?',
    DeleteSuccess: 'Deleted successfully',
    SelectDeleteWarning: 'Please select the data to delete',
    FileSizeLimit: 'File size cannot exceed 5MB!',
    ImageTypeOnly: 'Please upload an image file'
  },
  // 全局配置
  GlobalConfiguration: {
    Table: {
      Index: 'Serial Num',
      Category: 'Category',
      Detail: 'Configuration Name',
      Field: 'Config Key',
      FaFaKan: 'FaFaKan',
      TouTouKan: 'TouTouKan',
      Hash: 'Hash',
      Price: 'Price',
      Amount: 'Amount',
      Interval: 'Interval (s)',
      Status: 'Status',
      ConfigInfo: 'Configuration Detail',
      CreatedAt: 'Created At',
      UpdatedAt: 'Updated At',
      Actions: 'Actions'
    },
    Tags: {
      Rename: 'Rename Settings',
      Transfer: 'Internal Transfer',
      CostConfig: 'External Cost'
    },
    Status: {
      Open: 'Enabled',
      Closed: 'Disabled'
    },
    Actions: {
      Configure: 'Settings',
      View: 'View'
    },
    Dialog: {
      TitleCreate: 'Add',
      TitleEdit: 'Edit'
    },
    Form: {
      ConfigNamePrefix: 'Configuration Name:',
      EnableConfigLabel: 'Enable this configuration:',
      PriceLabel: 'Price:',
      PricePlaceholder: 'Enter price',
      LossLabel: 'Loss:',
      HandProfitLabel: 'Hand profit below:',
      HandProfitPlaceholder: 'Enter hand profit threshold',
      LossAmountLabel: 'Loss amount (positive):',
      LossAmountPlaceholder: 'Enter loss amount',
      AmountLabel: 'Corresponding amount (positive):',
      AmountPlaceholder: 'Enter amount',
      IntervalLabel: 'Interval (s):',
      IntervalPlaceholder: 'Enter time (seconds)',
      FaFaKanLabel: 'FaFaKan:',
      FaFaKanPlaceholder: 'Enter FaFaKan quantity',
      TouTouKanLabel: 'TouTouKan:',
      TouTouKanPlaceholder: 'Enter TouTouKan quantity',
      HashLabel: 'Hash:',
      HashPlaceholder: 'Enter Hash value'
    },
    Calculator: {
      Title: 'Days to Seconds',
      InputDays: 'Days',
      DaysPlaceholder: 'Enter days (supports decimal)',
      ResultLabel: 'Result (seconds)',
      ValidateDaysRequired: 'Please enter days',
      ValidateDaysNonNegative: 'Days must be non-negative',
      ValidateDaysNumber: 'Please enter a valid number'
    },
    Messages: {
      ConfirmDelete: 'Are you sure you want to delete?',
      SelectDeleteWarning: 'Please select the data to delete',
      DeleteSuccess: 'Deleted successfully'
    },
    Detail: {
      IdField: 'ID Field',
      Name: 'Configuration Name',
      Description: 'Configuration Description',
      Content: 'Configuration Content',
      CreatedAtField: 'CreatedAt Field',
      UpdatedAtField: 'UpdatedAt Field'
    }
  },
  // 保险记录
  InsuranceRecord: {
    DashboardTitle: 'Insurance Records',
    Cards: {
      TodayIncome: 'Today Insurance Income',
      TodayPayout: 'Today Insurance Payout',
      IncomeRemain: 'Insurance Income Balance',
      PayoutRemain: 'Insurance Payout Balance'
    },
    Search: {
      TimeRangeLabel: 'Time Range',
      TimeRangeStart: 'Start Time',
      TimeRangeEnd: 'End Time',
      RoomIdLabel: 'Room / Game ID',
      RoomIdPlaceholder: 'Enter room / game ID',
      AccountLabel: 'Game Account',
      AccountPlaceholder: 'Enter game account',
      TypeLabel: 'Type',
      TypePlaceholder: 'Select type'
    },
    TypeOptions: {
      Payout: 'Insurance Payout',
      Buy: 'Insurance Purchase',
      All: 'All',
      Other: 'Other'
    },
    Summary: {
      Income: 'Insurance Income',
      Outcome: 'Insurance Payout',
      Count: 'Transactions',
      Unit: 'USDT'
    },
    Table: {
      Index: 'Serial Num',
      Time: 'Game Time',
      RoomId: 'Game ID',
      UserId: 'User ID',
      Income: 'Insurance Income',
      Outcome: 'Insurance Payout'
    },
    Placeholder: 'Please enter',
    Success: 'Success',
  },
  // 抽水记录
  PumpingRecord: {
    DashboardTitle: 'Pumping Records (no data now)',
    Cards: {
      CurrentPool: 'Current Pumping Pool Total'
    },
    Search: {
      TimeLabel: 'Time',
      TimeStart: 'Start Time',
      TimeEnd: 'End Time',
      OperatorLabel: 'Operator',
      OperatorPlaceholder: 'Enter operator'
    },
    Summary: {
      Income: 'Pumping Income',
      Outcome: 'Insurance Pool Transfer Out',
      Unit: 'USDT'
    },
    Table: {
      Index: 'Serial Num',
      Date: 'Date',
      UserId: 'User ID',
      TotalIncome: 'Total Pumping Income',
      RemainingPool: 'Remaining Pumping Pool (no data now)',
      Operator: 'Operator',
      Amount: 'Operation Amount',
      OperationTime: 'Operation Time'
    },
    Status: {
      Success: 'Success',
      Fail: 'Fail'
    }
  },
  // 其它合计
  OtherTotals: {
    DashboardTitle: 'Other Totals',
    Cards: {
      PoolTotal: 'Other Pool Total',
      TodayDecrease: 'Today Pool Decrease',
      TodayCoinDecrease: 'Today Coin Decrease'
    },
    Search: {
      TimeLabel: 'Time',
      TimeStart: 'Start Time',
      TimeEnd: 'End Time',
      OperatorLabel: 'Operator',
      OperatorPlaceholder: 'Operator ID / Nickname',
      ChangeTypeLabel: 'Change Type',
      ChangeTypePlaceholder: 'Select type',
      CurrencyTypeLabel: 'Currency Type',
      CurrencyTypePlaceholder: 'Select type'
    },
    TypeOptions: {
      Payout: 'Insurance Payout',
      Buy: 'Insurance Purchase',
      All: 'All',
      Other: 'Other'
    },
    Summary: {
      Income: 'Pool Increase',
      Outcome: 'Pool Decrease',
      Unit: 'USDT'
    },
    Table: {
      Index: 'Serial Num',
      Id: 'ID',
      OperationTime: 'Operation Time',
      ChangeAmount: 'Change Amount',
      UserId: 'User ID',
      Type: 'Type'
    },
    SourceType: {
      Emote: 'Emote',
      Voice: 'Voice',
      Rename: 'Rename',
      InsuranceDelay: 'Insurance Delay',
      NoPeek: 'Peek Card (None)',
      CutCard: 'Cut Card',
      ViewBoard: 'View Community Cards',
      ViewHand: 'View Hole Cards',
      Blockchain: 'Blockchain Verification',
      Unknown: 'Unknown Type'
    }
  },
  // 内转记录
  InTransferRecord: {
    DashboardTitle: 'Internal Transfer Records',
    Cards: {
      PoolRemain: 'Internal Transfer Pool Balance',
      Income: 'Collection (User Withdrawal)',
      Outcome: 'Transfer Out (User Recharge)'
    },
    Search: {
      TimeLabel: 'Operation Time',
      TimeStart: 'Start Time',
      TimeEnd: 'End Time',
      OperatorLabel: 'Operator',
      OperatorPlaceholder: 'Enter ID or nickname',
      AccountLabel: 'Game Account',
      AccountPlaceholder: 'Enter ID'
    },
    Summary: {
      Decrease: 'Decrease Amount',
      Increase: 'Increase Amount',
      Count: 'Transactions',
      Unit: 'USDT'
    },
    Table: {
      Index: 'Serial Num',
      Id: 'ID',
      OperationTime: 'Operation Time',
      OperatorNickname: 'Operator Nickname',
      OperatorId: 'Operator ID',
      GameAccount: 'Game Account',
      Amount: 'Amount',
      Reason: 'Reason',
      BeforePool: 'Before Operation - Internal Pool',
      AfterPool: 'After Operation - Internal Pool'
    },
    Status: {
      Success: 'Success',
      Fail: 'Fail'
    }
  },
  // 充值列表
  TransferPayList: {
    Search: {
      UserIdLabel: 'User ID',
      UserIdPlaceholder: 'Enter user ID',
      OrderIdLabel: 'Order ID',
      OrderIdPlaceholder: 'Enter order ID',
      TimeRangeLabel: 'Time Range',
      RangeSeparator: 'to',
      TimeStart: 'Start Time',
      TimeEnd: 'End Time'
    },
    Table: {
      Index: 'Serial Num',
      OrderId: 'Order ID',
      UserId: 'User ID',
      Amount: 'Payment Amount',
      ToAddress: 'Payment Address',
      Fee: 'Handling Fee',
      Type: 'Type',
      Channel: 'Channel',
      Status: 'Status',
      CreatedAt: 'Created At',
      UpdatedAt: 'Updated At'
    },
    Status: {
      Success: 'Success',
      Fail: 'Fail'
    }
  },
  // 提现列表
  TransferWithdrawList: {
    Search: {
      UserIdLabel: 'User ID',
      UserIdPlaceholder: 'Enter user ID',
      OrderIdLabel: 'Order ID',
      OrderIdPlaceholder: 'Enter order ID',
      TimeRangeLabel: 'Time Range',
      RangeSeparator: 'to',
      TimeStart: 'Start Time',
      TimeEnd: 'End Time'
    },
    Table: {
      Index: 'Serial Num',
      OrderId: 'Order ID',
      UserId: 'User ID',
      ActualAmount: 'Actual Amount Received',
      ToAddress: 'Withdrawal Address',
      Status: 'Status',
      Remark: 'Remark',
      CreatedAt: 'Created At',
      UpdatedAt: 'Updated At'
    },
    Status: {
      Success: 'Success',
      Fail: 'Fail'
    }
  },
  // 白名单
  Whitelist: {
    Table: {
      Index: 'Serial Num',
      Id: 'ID',
      UserId: 'User ID',
      NickName: 'Nickname',
      UserAccount: 'User Account',
      AddAccount: 'Added By',
      CreateTime: 'Created At',
      Actions: 'Actions'
    },
    Actions: {
      Add: 'Add',
      Delete: 'Delete'
    },
    Form: {
      UserIdLabel: 'user ID:',
      UserIdPlaceholder: 'Please enter user ID',
    },
    Messages: {
      AddSuccess: 'Added successfully',
      AddFail: 'Add failed',
      DeleteSuccess: 'Deleted successfully',
      DeleteFail: 'Delete failed',
      ConfirmDelete: 'Are you sure you want to delete {name}?',
    }
  }
}
