export default {
  WithdrawAudit: {
    Search: {
      LimitLabel: 'Result Limit',
      LimitHint: 'Default 200, max 500',
      Refresh: 'Refresh Pending Queue'
    },
    Summary: {
      TotalCount: 'Pending Count',
      TotalInput: 'Total Deducted (incl. fee)',
      TotalNet: 'Total Net Payout',
      TotalFee: 'Total Fee'
    },
    Wallet: {
      Connect: 'Connect Tron Wallet',
      Connected: 'Wallet Connected',
      Notice: 'Connect your TP Wallet first for quick on-chain transfer and automatic TX Hash filling during audit.',
      EnvError: 'Browser wallet not supported in current environment',
      NotFound: 'TP Wallet extension not detected. Please install TokenPocket browser extension first.',
      Failed: 'Failed to retrieve wallet address. Please click the TP icon in the top-right corner, login and unlock your Tron wallet, then retry.',
      Error: 'Failed to connect Tron Wallet',
      Unknown: 'Unknown error'
    },
    Table: {
      Index: '#',
      OrderId: 'Withdrawal Order #',
      UserId: 'User ID',
      InputAmount: 'Deducted Amount',
      Fee: 'Fee',
      Amount: 'Net Payout',
      ToAddress: 'Withdrawal Address',
      Remark: 'Remark / Description',
      CreatedAt: 'Requested At',
      Actions: 'Audit Actions'
    },
    Actions: {
      Copy: 'Copy',
      CopyOk: 'Copied to clipboard',
      CopyFail: 'Copy failed',
      Pass: 'Approve (Payout)',
      Reject: 'Reject (Refund)',
      ConfirmPass: 'Confirm Approve',
      ConfirmReject: 'Confirm Reject'
    },
    Dialog: {
      PassTitle: 'Approve Withdrawal — Submit TX Hash',
      RejectTitle: 'Reject Withdrawal',
      OrderId: 'Order #',
      UserId: 'User ID',
      ToAddress: 'Withdrawal Address',
      InputAmount: 'Deducted (incl. fee)',
      Amount: 'Net Payout',
      FeeHint: 'fee',
      NetHint: 'will be refunded to user balance',
      QuickSend: 'Quick On-chain Payout',
      BuildTransfer: 'Trigger Tron On-chain Transfer',
      BuildTransferHint: 'Initiate a transfer to the withdrawal address via the connected TP Wallet. After signature the TX Hash will be auto-filled below. For USDT-TRC20 payouts, please manually select the USDT contract inside TP Wallet.',
      TxHash: 'On-chain TX Hash',
      TxHashPlaceholder: 'Enter or paste the successful on-chain transaction hash (required for approve)',
      Remark: 'Audit Remark',
      RemarkPlaceholder: 'Optional: record remark (operator / payout time / notes, etc.)',
      RejectRemarkPlaceholder: 'Optional: rejection reason stored for audit traceability',
      PassConfirm: 'Mark this order as [APPROVED / PAID OUT]? This is irreversible. Only execute after actual on-chain payout confirmed and TX Hash verified on block explorer!',
      PassSuccess: 'Approved successfully, order removed from pending queue',
      PassFail: 'Failed to approve',
      RejectHint: 'After rejection the deducted amount will be refunded back to the user\'s in-game balance. This operation is irreversible.',
      RejectConfirm: 'Reject this withdrawal request and refund the amount to user balance? This is irreversible!',
      RejectSuccess: 'Rejected successfully, funds refunded to user',
      RejectFail: 'Failed to reject',
      MissingOrderId: 'Missing order id, please retry',
      MissingTxHash: 'Please fill in the [On-chain Transaction Hash (TX Hash)] before submitting approval',
      InvalidAddress: 'Invalid Tron withdrawal address',
      InvalidAmount: 'Invalid withdrawal amount',
      SendSuccess: 'Transfer succeeded, TX Hash auto-filled: ',
      SendNoTx: 'No TX ID returned. Please manually copy the TX Hash from block explorer and paste it.',
      SendFail: 'Failed to initiate transfer'
    }
  }
}
