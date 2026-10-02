export default {
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
}