export default {
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
}