export default {
  // API管理
  Api: {
    // Search Form
    Path: 'Path',
    PlaceholderPath: 'Please enter path',
    Description: 'Description',
    PlaceholderDescription: 'Please enter description',
    ApiGroup: 'Group',
    PlaceholderApiGroup: 'Please select API group',
    PlaceholderSelectOrCreate: 'Please select or add',
    Method: 'Method',
    Actions: 'Actions',
    PlaceholderMethod: 'Please select method',
    // Button
    RefreshCache: 'Refresh Cache',
    Add: 'Add',
    Edit: 'Edit',
    Delete: 'Delete',
    SyncApi: 'Sync API',
    AutoFill: 'Auto Fill',
    // Table Column
    ID: 'ID',
    ApiPath: 'API Path',
    ApiGroupColumn: 'Group',
    ApiDescription: 'Description',
    MethodColumn: 'Method',
    SingleAdd: 'Single Add',
    Ignore: 'Ignore',
    CancelIgnore: 'Cancel Ignore',
    // Sync Dialog
    SyncRoute: 'Sync Route',
    NewRoute: 'New Route',
    NewRouteNote: 'Present in current routes but not in the API table',
    DeletedRoute: 'Deleted Route',
    DeletedRouteNote:
      'No longer exists in the current project routes; after confirming sync it will be removed from the apis table',
    IgnoreRouteNote: 'Ignored routes are not included in API sync; commonly routes that do not require authentication.',
    IgnoreRoute: 'Ignore Route',
    SyncApiWarning:
      'Sync API: If no route group is entered, it will not be synced automatically. If the API does not need authentication, you can click the ignore button.',
    // Edit Dialog
    AddApi: 'Add API',
    EditApi: 'Edit API',
    AddApiWarning: 'Adding API: configuration in role management is required to use it',
    // Error Messages
    SelectApiGroupError: 'Please select API group first',
    FillDescriptionError: 'Please fill in description first',
    GroupOrDescriptionError: 'Some APIs are not grouped or descriptions are missing',
    ConfirmRefreshCache: 'Are you sure to refresh cache?',
    ConfirmDeleteAllRoles: 'This action will permanently delete this API from all roles. Continue?',
    UnknownOperation: 'Unknown Operation',
    DeleteSuccess: 'Deleted successfully!',
    AddSuccess: 'Added successfully',
    AddSuccessManageRole: 'Added successfully, please go to role management page to assign permissions',
    EditSuccess: 'Edited successfully',
    AiAutoFillFailed: 'AI auto fill failed, please try again',
    // Request Method Labels
    CreateLabel: 'Create',
    ReadLabel: 'Read',
    UpdateLabel: 'Update',
    DeleteLabel: 'Delete',
    // Form Validation Messages
    PathRequired: 'Please enter API path',
    GroupRequired: 'Please enter group name',
    MethodRequired: 'Please select request method',
    DescriptionRequired: 'Please enter API introduction'
  },
}