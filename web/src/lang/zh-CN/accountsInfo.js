export default {
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
      LoginInfo: '最近登陆的时间，另外这个变化可以在用户登陆日志（后台可查）中查出最近3个月的登陆记录或者最近100条登陆记录（ID，昵称，登入渠道，登入机型，机器码，IP，时间）',
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
}