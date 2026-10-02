export default {
    BusinessReport: {
    Title: '业务看板',
    DefaultTip: '默认均值为当前一天',
    Form: {
      DatePlaceholder: '选择日期'
    },
    Tooltips: {
      TotalPay: '入款总额：充值到账的总额',
      TotalPayCount: '入款笔数：充值的订单数量',
      GasFee: 'Gas费用：上链所需的费用',
      WaterRemain: '抽水池余额：抽水池资金账号的余额',
      FreezeFee: '冻结资金：平台冻结的资金',
      TotalWithdraw: '总提现：提现的总金额',
      TotalWithdrawCount: '提现笔数：提现的订单数量',
      TotalEarn: '净营收：充值金额-提现金额',
      InnerTransfer: '运营内转金额：在游戏后台进行的增加金币数量额度',
      WithdrawFee: '提现手续费：用户提现时收取的手续费'
    },
    Cards: {
      TotalPay: {
        Title: '入款（充值）总额',
        AveragePrefix: '平均每日总额'
      },
      TotalPayCount: {
        Title: '入款笔数',
        AveragePrefix: '平均每日笔数：'
      },
      GasFee: {
        Title: 'Gas费用',
        AveragePrefix: '平均每日：'
      },
      WaterRemain: {
        Title: '抽水池余额',
        PreviousPrefix: '前日账号余额：'
      },
      FreezeFee: {
        Title: '冻结资金',
        TotalPrefix: '总冻结资金：'
      },
      TotalWithdraw: {
        Title: '总提现',
        AveragePrefix: '平均每日提现：'
      },
      TotalWithdrawCount: {
        Title: '提现笔数',
        AveragePrefix: '平均每日笔数：'
      },
      TotalEarn: {
        Title: '净营收',
        AveragePrefix: '平均每日净营收：'
      },
      InnerTransfer: {
        Title: '运营内转金额（增减）',
        AveragePrefix: '平均每日内转：'
      },
      WithdrawFee: {
        Title: '提现手续费',
        AveragePrefix: '平均每日提现手续费:'
      }
    },
    Charts: {
      ProfitXAxis: '盈利额度',
      LossXAxis: '亏损额度',
      PeopleYAxis: '人数',
      ProfitBuckets: {
        Range1: '0<盈利<10',
        Range2: '10<盈利<50',
        Range3: '50<盈利<100',
        Range4: '盈利>100'
      },
      ProfitPie: {
        Title: '长牌德州VS短牌德州流水'
      },
      RakePie: {
        Title: '长牌德州VS短牌德州抽水'
      },
      LongDeckRake: '长牌抽水',
      ShortDeckRake: '短牌抽水',
      RightList: {
        Total: '总抽水：',
        Long: '长牌抽水：',
        Short: '短牌抽水：'
      }
    }
  },
}