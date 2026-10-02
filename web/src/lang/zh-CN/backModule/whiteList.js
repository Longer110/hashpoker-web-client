export default {
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
      UserIdPlaceholder: '请输入用户ID',
    },
    Messages: {
      AddSuccess: '添加成功',
      AddFail: '添加失败',
      DeleteSuccess: '删除成功',
      DeleteFail: '删除失败',
      ConfirmDelete: '确认要删除{name}吗？',
    }
  }
}