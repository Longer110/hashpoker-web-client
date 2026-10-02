export default {
  BusinessReport: {
    Title: 'Business Dashboard',
    DefaultTip: 'Averages default to the current day',
    Form: {
      DatePlaceholder: 'Select date'
    },
    Tooltips: {
      TotalPay: 'Total deposits: Sum of credited top-ups',
      TotalPayCount: 'Deposit orders: Number of top-up transactions',
      GasFee: 'Gas fee: Cost required for on-chain operations',
      WaterRemain: 'Rake pool balance: Balance of the rake pool account',
      FreezeFee: 'Frozen funds: Funds frozen by the platform',
      TotalWithdraw: 'Total withdrawals: Total amount withdrawn',
      TotalWithdrawCount: 'Withdrawal orders: Number of withdrawal transactions',
      TotalEarn: 'Net revenue: Deposits minus withdrawals',
      InnerTransfer: 'Internal transfer amount: Coins adjusted in the game backend',
      WithdrawFee: 'Withdrawal fee: Fee charged when users withdraw'
    },
    Cards: {
      TotalPay: {
        Title: 'Total Deposits (Top-up)',
        AveragePrefix: 'Average daily total '
      },
      TotalPayCount: {
        Title: 'Deposit Orders',
        AveragePrefix: 'Average daily orders: '
      },
      GasFee: {
        Title: 'Gas Fee',
        AveragePrefix: 'Average daily: '
      },
      WaterRemain: {
        Title: 'Rake Pool Balance',
        PreviousPrefix: 'Previous balance: '
      },
      FreezeFee: {
        Title: 'Frozen Funds',
        TotalPrefix: 'Total frozen funds: '
      },
      TotalWithdraw: {
        Title: 'Total Withdrawals',
        AveragePrefix: 'Average daily withdrawals: '
      },
      TotalWithdrawCount: {
        Title: 'Withdrawal Orders',
        AveragePrefix: 'Average daily orders: '
      },
      TotalEarn: {
        Title: 'Net Revenue',
        AveragePrefix: 'Average daily net revenue: '
      },
      InnerTransfer: {
        Title: 'Internal Transfer Amount (Adj.)',
        AveragePrefix: 'Average daily transfer: '
      },
      WithdrawFee: {
        Title: 'Withdrawal Fee',
        AveragePrefix: 'Average daily withdrawal fee: '
      }
    },
    Charts: {
      ProfitXAxis: 'Profit Range',
      LossXAxis: 'Loss Range',
      PeopleYAxis: 'Players',
      ProfitBuckets: {
        Range1: '0 < Profit < 10',
        Range2: '10 < Profit < 50',
        Range3: '50 < Profit < 100',
        Range4: 'Profit > 100'
      },
      ProfitPie: {
        Title: 'Long Deck vs Short Deck Turnover'
      },
      RakePie: {
        Title: 'Long Deck vs Short Deck Rake'
      },
      LongDeckRake: 'Long Deck Rake',
      ShortDeckRake: 'Short Deck Rake',
      RightList: {
        Total: 'Total Rake: ',
        Long: 'Long Deck Rake: ',
        Short: 'Short Deck Rake: '
      }
    }
  },
}