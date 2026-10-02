export default {
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
      IsRobotTable: 'Robot Table',
      RobotTableYes: 'Yes',
      RobotTableNo: 'No',
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
      },
      RobotTable: {
        Label: 'Robot Table'
      },
      PrivateRoom: {
        Label: 'Private Room (Password)',
        Password: 'Room Password',
        PasswordPlaceholder: 'Enter 6-digit password',
        ShowInLobby: 'Visible in Lobby'
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
      ServiceRate: 'The service fee rate can be up to 10%. If it is 10%, enter 10; if it is 0.1%, enter 0.1.',
      RobotTable: 'Bot-only test table: All bots auto-play, no real players allowed. Enabling auto-allows bots to join.',
      PrivateRoom: 'When enabled, players must enter a 6-digit password to join. Hosts and reconnecting players skip verification.',
      PrivateRoomShowInLobby: 'Whether to show this table in the lobby list. If disabled, only accessible via share link or table ID.'
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
      TopLimitRequired: 'Cap per hand must be greater than 0 when service rate is not 0',
      PrivateRoomPasswordRequired: 'Please enter a 6-digit password when enabling private room',
      PrivateRoomPasswordFormat: 'Password must be exactly 6 digits'
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
}