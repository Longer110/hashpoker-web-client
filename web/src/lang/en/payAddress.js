export default {
  PayAddress: {
    Title: 'Payment Address Pool',
    Warning: 'Note: The payment address pool is used to manage recharge collection addresses, please operate with caution!',
    Stats: {
      Total: 'Total Addresses',
      Idle: 'Idle Addresses',
      Occupied: 'Occupied',
      Cooling: 'Cooling Down',
      ToRecycle: 'Pending Recycle'
    },
    Search: {
      AddressLabel: 'Address',
      AddressPlaceholder: 'Enter address for fuzzy match',
      KeywordLabel: 'Keyword',
      KeywordPlaceholder: 'Enter keyword',
      StateLabel: 'Status',
      StatePlaceholder: 'Select status',
      SourceLabel: 'Source',
      SourcePlaceholder: 'Select source',
      UserIdLabel: 'User ID',
      UserIdPlaceholder: 'Enter occupying user ID',
      IdxStartLabel: 'Index From',
      IdxStartPlaceholder: 'Enter start index',
      IdxEndLabel: 'Index To',
      IdxEndPlaceholder: 'Enter end index'
    },
    Actions: {
      Add: 'Add Address',
      BatchDelete: 'Batch Delete',
      Stats: 'Overview Stats',
      Config: 'Pool Config',
      Verify: 'Tamper Verify',
      Detail: 'Detail',
      Edit: 'Edit Index',
      Delete: 'Delete',
      Release: 'Release'
    },
    Table: {
      Index: 'No.',
      Id: 'ID',
      Idx: 'Index',
      Address: 'Payment Address',
      Source: 'Source',
      State: 'Status',
      Chargeable: 'Assignable',
      UserId: 'Occupied User',
      UserText: 'User Info',
      AssignTime: 'Assign Time',
      ExpireTime: 'Expire Time',
      CreateTime: 'Create Time',
      Actions: 'Actions'
    },
    State: {
      Idle: 'Idle',
      Occupied: 'Occupied',
      Cooling: 'Cooling',
      ToRecycle: 'To Recycle'
    },
    YesNo: {
      Yes: 'Yes',
      No: 'No'
    },
    Dialog: {
      AddTitle: 'Add Payment Address',
      EditTitle: 'Edit Index',
      DetailTitle: 'Payment Address Detail',
      ConfigTitle: 'Address Pool Config'
    },
    AddForm: {
      Addresses: 'Address List',
      AddressesPlaceholder: 'One address per line, batch input supported',
      AddressesTip: 'Supports Tron addresses, starting with T, length at least 30 characters',
      Source: 'Source',
      SourcePlaceholder: 'Select source',
      SourceOptions: {
        Import: 'Import',
        Legacy: 'Legacy'
      }
    },
    EditForm: {
      Idx: 'Index',
      IdxPlaceholder: 'Enter index'
    },
    Detail: {
      Sections: {
        BasicInfo: 'Basic Info',
        Leases: 'Lease History'
      },
      Leases: {
        Id: 'ID',
        UserId: 'User ID',
        LeaseStart: 'Lease Start',
        LeaseEnd: 'Lease End',
        CreatedAt: 'Created At'
      }
    },
    Config: {
      LeaseDuration: 'Lease Duration (sec)',
      LeaseDurationPlaceholder: 'Enter lease duration',
      CoolDownDuration: 'Cooldown Duration (sec)',
      CoolDownDurationPlaceholder: 'Enter cooldown duration',
      MinIdleRatio: 'Min Idle Ratio',
      MinIdleRatioPlaceholder: 'Enter min idle ratio',
      VerifyInterval: 'Verify Interval (sec)',
      VerifyIntervalPlaceholder: 'Enter verify interval'
    },
    Messages: {
      AddSuccess: 'Add success: created {created}, existed {existed}, invalid {invalid}',
      UpdateSuccess: 'Update success',
      DeleteSuccess: 'Delete success',
      BatchDeleteSuccess: 'Batch delete success',
      ReleaseSuccess: 'Release success',
      VerifySuccess: 'Verify success',
      ConfigUpdateSuccess: 'Config update success',
      DeleteConfirm: 'Are you sure to delete this payment address?',
      BatchDeleteConfirm: 'Are you sure to batch delete selected payment addresses?',
      ReleaseConfirm: 'Are you sure to force release the occupied address?',
      SelectDeleteWarning: 'Please select data to delete',
      AddressesRequired: 'Please enter addresses',
      AddressInvalid: 'Invalid address format, must start with T and have at least 30 characters',
      AddressFormat: 'Total {total} addresses entered, {valid} valid, {invalid} invalid'
    }
  }
}
