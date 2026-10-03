export default {
  WithdrawAudit: {
    Search: {
      LimitLabel: '返回条数',
      LimitHint: '默认 200，上限 500',
      Refresh: '刷新待审核队列'
    },
    Summary: {
      TotalCount: '待审单总数',
      TotalInput: '用户扣款总额（含手续费）',
      TotalNet: '实际应出金净额',
      TotalFee: '手续费合计'
    },
    Wallet: {
      Connect: '连接 Tron 钱包',
      Connected: '钱包已连接',
      Notice: '请先连接 TP 钱包，方便审核时一键发起 Tron 链上转账并回填 TX Hash',
      EnvError: '当前环境不支持浏览器钱包',
      NotFound: '未检测到 TP 钱包插件，请先安装 TokenPocket 浏览器扩展',
      Failed: '未获取到钱包地址，请点击浏览器右上角 TP 图标，登录并解锁 Tron 钱包后重试',
      Error: '连接 Tron 钱包失败',
      Unknown: '未知错误'
    },
    Table: {
      Index: '序号',
      OrderId: '提现订单号',
      UserId: '用户ID',
      InputAmount: '扣款总额',
      Fee: '手续费',
      Amount: '实际出金净额',
      ToAddress: '提U地址',
      Remark: '备注 / 描述',
      CreatedAt: '申请时间',
      Actions: '审核操作'
    },
    Actions: {
      Copy: '复制',
      CopyOk: '已复制到剪贴板',
      CopyFail: '复制失败',
      Pass: '通过（出金）',
      Reject: '拒绝（退回）',
      ConfirmPass: '确认通过',
      ConfirmReject: '确认拒绝'
    },
    Dialog: {
      PassTitle: '提币审核通过 — 提交链上 TX Hash',
      RejectTitle: '提币审核拒绝',
      OrderId: '提现订单号',
      UserId: '用户ID',
      ToAddress: '提币地址',
      InputAmount: '用户扣款（含手续费）',
      Amount: '实际出金净额',
      FeeHint: '手续费',
      NetHint: '退回用户账户',
      QuickSend: '链上快速打款',
      BuildTransfer: '一键发起 Tron 链上转账',
      BuildTransferHint: '通过已连接的 TP 钱包向提币地址发起转账；签名完成后 TX Hash 会自动填入下方输入框。如币种为 USDT-TRC20，请在 TP 钱包内手动选择对应合约币种后再打款。',
      TxHash: '链上交易哈希',
      TxHashPlaceholder: '请输入或粘贴链上出款成功的 Transaction Hash（通过时必填）',
      Remark: '审核备注',
      RemarkPlaceholder: '选填：录入审核备注（如：出款人 / 出款时间 / 说明等）',
      RejectRemarkPlaceholder: '选填：拒绝原因，会写入订单备注供后台追溯',
      PassConfirm: '确认将此订单标记为【通过 / 已出金】？操作不可逆，只有财务在链上完成真实打款并确认 TX Hash 成功后才可执行此操作！',
      PassSuccess: '审核通过成功，该订单已从未审核队列移除',
      PassFail: '审核通过失败',
      RejectHint: '拒绝后，用户被锁定的扣款总额将原路退回其游戏账户，操作不可逆。',
      RejectConfirm: '确认【拒绝】此提币申请并将金额退回用户账户？操作不可逆！',
      RejectSuccess: '审核拒绝成功，金额已退回用户账户',
      RejectFail: '审核拒绝失败',
      MissingOrderId: '缺少订单号，请重试',
      MissingTxHash: '请先填入【链上交易哈希 (TX Hash)】再提交通过',
      InvalidAddress: '提币地址不是合法的 Tron 地址',
      InvalidAmount: '提币金额不合法',
      SendSuccess: '链上交易成功，TX Hash 已自动填入：',
      SendNoTx: '未返回交易 ID，请手动复制链上 TX Hash 后粘贴',
      SendFail: '发起链上转账失败'
    }
  }
}
