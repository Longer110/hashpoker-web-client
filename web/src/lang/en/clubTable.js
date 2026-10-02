export default {
  // 俱乐部桌子配置
  ClubTableSetup: {
    Search: {
      GroupLabel: 'Club Table Configuration',
      GameLabel: 'Game',
      SelectPlaceholder: 'Please select'
    },
    Actions: {
      Add: 'Add',
      Edit: 'Edit',
      Delete: 'Delete'
    },
    Table: {
      Index: 'SerialNum',
      Group: 'Group',
      Game: 'Game',
      OddsTable: 'Standard Insurance',
      Actions: 'Actions'
    },
    Dialog: {
      TitleCreate: 'Add Club Table Configuration',
      TitleEdit: 'Edit Club Table Configuration'
    },
    Messages: {
      ConfirmDelete: 'This action will permanently delete the configuration. Continue?',
      DeleteSuccess: 'Deleted successfully!',
      CreateSuccess: 'Created successfully',
      EditSuccess: 'Updated successfully'
    },
    AddEditDialog: {
      GroupLabel: 'Group',
      GroupPlaceholder: 'Select a group',
      GameLabel: 'Game',
      GamePlaceholder: 'Select a game',
      CapacityLabel: 'Seats (2-9)',
      CapacityPlaceholder: 'Enter seats (2-9)',
      KeepTimeLabel: 'Room Duration (h)',
      KeepTimePlaceholder: 'Enter room duration',
      TakeinLabel: 'Buy-in Multiples',
      TakeinPlaceholder: 'Enter buy-in multiples',
      PoolEntryRateLabel: 'Pool Entry Rate',
      PoolEntryRatePlaceholder: 'Enter pool entry rate',
      DWLimitLabel: 'Rake Cap',
      DWLimitPlaceholder: 'Enter rake cap',
      VideoFeeLabel: 'Voice Chat Fee',
      VideoFeePlaceholder: 'Enter voice chat fee',
      FrontendRoomConfig: 'Frontend Room Configuration',
      AnteHint: 'Small Blind, Big Blind, Default Buy-In, Ante, Peek Hand, Peek Board, Cut Card',
      SmallBlind: 'Small Blind',
      SmallBlindShortDeck: 'Small Blind / Ante',
      SmallBlindPlaceholder: 'Enter small blind',
      BigBlind: 'Big Blind',
      BigBlindShortDeck: 'Big Blind / Dealer Multiplier',
      BigBlindPlaceholder: 'Enter big blind',
      Scoreboard: 'Buy-in Chips',
      ScoreboardPlaceholder: 'Enter buy-in chips',
      Ante: 'Ante',
      AntePlaceholder: 'Enter ante (JSON array)',
      HandCost: 'Peek Hand',
      HandCostPlaceholder: 'Enter peek hand fee',
      CommonCost: 'Peek Board',
      CommonCostPlaceholder: 'Enter peek board fee',
      CutCost: 'Cut Card',
      CutCostPlaceholder: 'Enter cut card fee',
      Tooltips: {
        ShortDeckBigBlind: 'Reads according to the selected short-deck mode and displays the corresponding value when creating a room on the frontend.',
        Ante: 'When creating a room on the frontend, the selected blind row determines the matching ante amount.<br>For example, choosing the first-row small blind will also use that row\'s big blind and ante.',
        DefaultFirstFour: 'The frontend defaults to the first four rows.'
      },
      InsuranceDivider: 'Standard Insurance Outs',
      OddsLabel: 'Odds',
      OddsPlaceholder: 'Odds for drawing {count} card(s)',
      OddsPrepend: 'Draw {count}',
      Messages: {
        SmallBlindFirst: 'Please enter the small blind first',
        BigBlindGreater: 'Big blind must be greater than small blind'
      },
      Validation: {
        GroupRequired: 'Please select a group',
        GameRequired: 'Please select a game',
        VideoFeeRequired: 'Enter the voice chat fee',
        CapacityRequired: 'Keep at least one seat value and ensure all seats are filled',
        CapacityInteger: 'Seat count must be an integer',
        CapacityRange: 'Seat count must be an integer between 2 and 9',
        KeepTimeRequired: 'Keep at least one duration value and ensure all durations are filled',
        KeepTimePositive: 'Room duration must be greater than 0',
        KeepTimeDecimal: 'Duration cannot have more than two decimal places',
        TakeinRequired: 'Keep at least one buy-in multiple and ensure all multiples are filled',
        TakeinInteger: 'Buy-in multiples must be integers',
        PoolEntryRateRequired: 'Keep at least one pool entry rate and ensure all rates are filled',
        PoolEntryRatePositive: 'Pool entry rate must be greater than 0',
        PoolEntryRateDecimal: 'Pool entry rate cannot have more than two decimal places',
        DWLimitRequired: 'Keep at least one rake cap and ensure all caps are filled',
        DWLimitDecimal: 'Rake cap cannot have more than two decimal places',
        OddsRequired: 'Keep at least one odds value and ensure all odds are filled',
        OddsDecimal: 'Odds cannot have more than two decimal places'
      }
    }
  },
}