export default {
  PayAddress: {
    Title: '收款地址池',
    Warning: '注：收款地址池用于管理充值收款地址，请谨慎操作！',
    Stats: {
      Total: '地址总数',
      Idle: '空闲地址',
      Occupied: '占用中',
      Cooling: '冷却中',
      ToRecycle: '待回收'
    },
    Search: {
      AddressLabel: '地址',
      AddressPlaceholder: '请输入地址模糊匹配',
      KeywordLabel: '关键字',
      KeywordPlaceholder: '请输入关键字',
      StateLabel: '状态',
      StatePlaceholder: '请选择状态',
      SourceLabel: '来源',
      SourcePlaceholder: '请选择来源',
      UserIdLabel: '用户ID',
      UserIdPlaceholder: '请输入占用用户ID',
      IdxStartLabel: '序号起',
      IdxStartPlaceholder: '请输入起始序号',
      IdxEndLabel: '序号止',
      IdxEndPlaceholder: '请输入结束序号'
    },
    Actions: {
      Add: '新增地址',
      BatchDelete: '批量删除',
      Stats: '总览统计',
      Config: '地址池参数',
      Verify: '防篡改校验',
      Detail: '详情',
      Edit: '编辑序号',
      Delete: '删除',
      Release: '释放占用'
    },
    Table: {
      Index: '序号',
      Id: 'ID',
      Idx: '序号',
      Address: '收款地址',
      Source: '来源',
      State: '状态',
      Chargeable: '可分配',
      UserId: '占用用户',
      UserText: '用户信息',
      AssignTime: '分配时间',
      ExpireTime: '过期时间',
      CreateTime: '创建时间',
      Actions: '操作'
    },
    State: {
      Idle: '空闲',
      Occupied: '占用中',
      Cooling: '冷却中',
      ToRecycle: '待回收'
    },
    YesNo: {
      Yes: '是',
      No: '否'
    },
    Dialog: {
      AddTitle: '新增收款地址',
      EditTitle: '编辑序号',
      DetailTitle: '收款地址详情',
      ConfigTitle: '地址池参数配置'
    },
    AddForm: {
      Addresses: '地址列表',
      AddressesPlaceholder: '每行一个地址，支持批量输入',
      AddressesTip: '支持 Tron 地址，以 T 开头，长度不少于 30 位',
      Source: '来源',
      SourcePlaceholder: '请选择来源',
      SourceOptions: {
        Import: '导入',
        Legacy: '历史'
      }
    },
    EditForm: {
      Idx: '序号',
      IdxPlaceholder: '请输入序号'
    },
    Detail: {
      Sections: {
        BasicInfo: '基本信息',
        Leases: '占用历史'
      },
      Leases: {
        Id: 'ID',
        UserId: '用户ID',
        LeaseStart: '租约开始',
        LeaseEnd: '租约结束',
        CreatedAt: '创建时间'
      }
    },
    Config: {
      LeaseDuration: '租约时长(秒)',
      LeaseDurationPlaceholder: '请输入租约时长',
      CoolDownDuration: '冷却时长(秒)',
      CoolDownDurationPlaceholder: '请输入冷却时长',
      MinIdleRatio: '最小空闲比例',
      MinIdleRatioPlaceholder: '请输入最小空闲比例',
      VerifyInterval: '校验间隔(秒)',
      VerifyIntervalPlaceholder: '请输入校验间隔'
    },
    Messages: {
      AddSuccess: '新增成功：已创建 {created} 个，已存在 {existed} 个，非法 {invalid} 个',
      UpdateSuccess: '更新成功',
      DeleteSuccess: '删除成功',
      BatchDeleteSuccess: '批量删除成功',
      ReleaseSuccess: '释放成功',
      VerifySuccess: '校验成功',
      ConfigUpdateSuccess: '参数配置更新成功',
      DeleteConfirm: '确定要删除该收款地址吗？',
      BatchDeleteConfirm: '确定要批量删除选中的收款地址吗？',
      ReleaseConfirm: '确定要强制释放该被占用的地址吗？',
      SelectDeleteWarning: '请选择要删除的数据',
      AddressesRequired: '请输入地址',
      AddressInvalid: '地址格式不正确，必须以 T 开头且长度不少于 30 位',
      AddressFormat: '共输入 {total} 个地址，合法 {valid} 个，非法 {invalid} 个'
    }
  }
}
