export default {
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