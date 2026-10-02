export default {
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
}