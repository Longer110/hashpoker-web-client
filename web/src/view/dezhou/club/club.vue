<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="3"
      :search-button-count="2"
      :show-toolbar="true"
      :toolbar-button-count="1"
      :row-count="pageSize"
      :show-pagination="true"
    >
      <template #search>
        <div class="gva-search-box">
          <el-form
            ref="elSearchFormRef"
            :inline="true"
            :model="searchInfo"
            class="demo-form-inline"
            @keyup.enter="onSubmit"
          >
            <el-form-item :label="$t('Club.Search.ClubIdLabel')" prop="ClubId">
              <el-input
                v-model.number="searchInfo.ClubId"
                :placeholder="$t('Club.Search.Placeholder')"
                style="width: 240px"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('Club.Search.ClubNameLabel')" prop="ClubName">
              <el-input
                v-model="searchInfo.ClubName"
                :placeholder="$t('Club.Search.Placeholder')"
                style="width: 240px"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('Club.Search.InviteCodeLabel')" prop="InviteCode">
              <el-input
                v-model="searchInfo.InviteCode"
                :placeholder="$t('Club.Search.InviteCodePlaceholder')"
                style="width: 240px"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('Club.Search.MasterIdLabel')" prop="MasterId">
              <el-input
                v-model.number="searchInfo.MasterId"
                :placeholder="$t('Club.Search.Placeholder')"
                style="width: 240px"
                clearable
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <el-button type="primary" icon="plus" @click="openDialog()">{{ $t('Club.Actions.Create') }}</el-button>
          <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete"
            >{{ $t('Club.Actions.BatchDelete') }}</el-button
          >
        </div>
        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection" min-width="50" />
        <el-table-column align="center" type="index" min-width="70" :label="$t('Club.Table.Index')" />
        <el-table-column align="center" :label="$t('Club.Table.Id')" prop="id" min-width="80" />
        <el-table-column align="center" :label="$t('Club.Table.ClubId')" prop="ClubId" min-width="100" center />
        <el-table-column align="center" :label="$t('Club.Table.Avatar')" prop="Avatar" min-width="100">
          <template #default="scope">
            <el-image
              v-if="scope.row.Avatar"
              :src="scope.row.Avatar"
              :preview-src-list="[scope.row.Avatar]"
              fit="cover"
              style="width: 48px; height: 48px; border-radius: 6px"
            >
              <template #error>
                <div class="avatar-placeholder">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
            <div v-else class="avatar-placeholder" style="width: 48px; height: 48px">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('Club.Table.Group')" prop="GroupId" min-width="80" />
        <el-table-column align="center" :label="$t('Club.Table.ClubName')" prop="ClubName" min-width="180" show-overflow-tooltip />
        <el-table-column align="center" :label="$t('Club.Table.MasterId')" prop="MasterId" min-width="100" />
        <el-table-column align="center" :label="$t('Club.Table.InviteCode')" prop="InviteCode" min-width="140">
          <template #default="scope">
            <el-tag v-if="scope.row.InviteCode" type="success" size="small" effect="plain">
              {{ scope.row.InviteCode }}
            </el-tag>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('Club.Table.MemberCount')" prop="MemberCount" min-width="100" sortable />
        <el-table-column align="center" :label="$t('Club.Table.CanApply')" prop="CanApply" min-width="140">
          <template #default="scope">
            <el-tag v-if="!scope.row.CanApply" type="success" size="small">{{ $t('Club.Options.Can') }}</el-tag>
            <el-tag v-else type="info" size="small">{{ $t('Club.Options.Cannot') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('Club.Table.CanSearch')" prop="CanSearch" min-width="140">
          <template #default="scope">
            <el-tag v-if="!scope.row.CanSearch" type="success" size="small">{{ $t('Club.Options.Can') }}</el-tag>
            <el-tag v-else type="info" size="small">{{ $t('Club.Options.Cannot') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('Club.Table.TablePower')" prop="TablePower" min-width="140">
          <template #default="scope">
            <el-tag v-if="scope.row.TablePower === 1" type="warning" size="small">{{ $t('Club.Options.Has') }}</el-tag>
            <el-tag v-else type="info" size="small">{{ $t('Club.Options.None') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('Club.Table.CreatedAt')" prop="CreateTime" min-width="160">
          <template #default="scope">{{ formatDate(scope.row.CreateTime) }}</template>
        </el-table-column>

        <el-table-column align="center" :label="$t('Club.Table.Actions')" fixed="right" min-width="380">
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"
              ><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>{{ $t('Club.Table.View') }}</el-button
            >
            <el-button type="primary" link icon="edit" class="table-button" @click="updateClubFunc(scope.row)"
              >{{ $t('Club.Actions.Edit') }}</el-button
            >
            <el-button type="primary" link icon="refresh" @click="handleResetInviteCode(scope.row)">{{ $t('Club.Actions.ResetInviteCode') }}</el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">{{ $t('Club.Actions.Delete') }}</el-button>
          </template>
        </el-table-column>
        </el-table>
        <div class="gva-pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </TableSkeletonWrapper>
    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="dialogFormVisible"
      :show-close="false"
      :before-close="closeDialog"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">
            {{ type === 'create' ? $t('Club.Drawer.TitleCreate') : $t('Club.Drawer.TitleEdit') }}
          </span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">{{ $t('Common.Confirm') }}</el-button>
            <el-button @click="closeDialog">{{ $t('Common.Cancel') }}</el-button>
          </div>
        </div>
      </template>

      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('Club.Drawer.ClubIdLabel')" prop="ClubId">
              <el-input
                @input="handleInput(formData, 'ClubId')"
                v-model.number="formData.ClubId"
                :clearable="true"
                :placeholder="$t('Club.Drawer.ClubIdPlaceholder')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('Club.Drawer.GroupIdLabel')" prop="GroupId">
              <el-select v-model="formData.GroupId" :placeholder="$t('Club.Drawer.GroupSelectPlaceholder')" style="width: 100%" clearable>
                <el-option v-for="item in groupOptions" :key="item.GroupId" :label="item.GroupName" :value="item.GroupId" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('Club.Drawer.ClubNameLabel')" prop="ClubName">
              <el-input v-model="formData.ClubName" :clearable="true" :placeholder="$t('Club.Drawer.ClubNamePlaceholder')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('Club.Drawer.MasterIdLabel')" prop="MasterId">
              <el-input
                @input="handleInput(formData, 'MasterId')"
                v-model.number="formData.MasterId"
                :clearable="true"
                :placeholder="$t('Club.Drawer.MasterIdPlaceholder')"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('Club.Drawer.PassWordsLabel')" prop="PassWords">
              <el-input v-model="formData.PassWords" :clearable="true" :placeholder="$t('Club.Drawer.PassWordsPlaceholder')" show-password />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('Club.Drawer.TablePowerLabel')" prop="TablePower">
              <el-select v-model="formData.TablePower" style="width: 100%">
                <el-option :label="$t('Club.Options.None')" value="0" />
                <el-option :label="$t('Club.Options.Has')" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('Club.Drawer.CanApplyLabel')" prop="CanApply">
              <el-switch
                v-model="formData.CanApply"
                style="--el-switch-on-color: #dcdfe6; --el-switch-off-color: #3b82f6"
                :active-text="$t('Club.Options.Cannot')"
                :inactive-text="$t('Club.Options.Can')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('Club.Drawer.CanSearchLabel')" prop="CanSearch">
              <el-switch
                v-model="formData.CanSearch"
                style="--el-switch-on-color: #dcdfe6; --el-switch-off-color: #3b82f6"
                :active-text="$t('Club.Options.Cannot')"
                :inactive-text="$t('Club.Options.Can')"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('Club.Drawer.CreateTimeLabel')" prop="CreateTime">
              <el-date-picker
                v-model="formData.CreateTime"
                type="date"
                style="width: 100%"
                :placeholder="$t('Club.Drawer.CreateTimePlaceholder')"
                :clearable="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('Club.Drawer.InviteCodeLabel')" prop="InviteCode">
              <el-input
                v-model="formData.InviteCode"
                :clearable="true"
                :placeholder="$t('Club.Drawer.InviteCodePlaceholder')"
                :disabled="type === 'create'"
              >
                <template v-if="type === 'create'" #append>
                  <span style="font-size: 12px; color: #909399">{{ $t('Club.Drawer.InviteCodeAuto') }}</span>
                </template>
                <template v-if="type === 'update' && formData.InviteCode" #append>
                  <el-button link type="primary" @click="handleResetInviteCodeInForm" :loading="resetInviteCodeLoading">
                    <el-icon><Refresh /></el-icon>{{ $t('Club.Actions.ResetInviteCode') }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item :label="$t('Club.Drawer.AvatarLabel')" prop="Avatar">
          <el-upload
            :action="`#`"
            :before-upload="handleAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :headers="{ 'x-token': token }"
            class="avatar-uploader"
            style="position: relative"
          >
            <img v-show="formData.Avatar" :src="formData.Avatar" class="avatar" />
            <div v-show="!formData.Avatar" class="avatar-uploader-icon-wrapper">
              <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              <div class="avatar-uploader-text">{{ $t('Club.Drawer.UploadAvatar') }}</div>
            </div>
          </el-upload>
          <div v-if="formData.Avatar" style="margin-top: 8px">
            <el-button link type="danger" @click="handleRemoveAvatar" size="small">
              <el-icon><Delete /></el-icon>{{ $t('Club.Actions.RemoveAvatar') }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="detailShow"
      :show-close="true"
      :before-close="closeDetailShow"
      :title="$t('Club.Detail.Title')"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item :label="$t('Club.Detail.Avatar')">
          <el-image
            v-if="detailForm.Avatar"
            :src="detailForm.Avatar"
            :preview-src-list="[detailForm.Avatar]"
            fit="cover"
            style="width: 120px; height: 120px; border-radius: 8px"
          >
            <template #error>
              <div class="avatar-placeholder" style="width: 120px; height: 120px">
                <el-icon :size="40"><Picture /></el-icon>
              </div>
            </template>
          </el-image>
          <div v-else class="avatar-placeholder" style="width: 120px; height: 120px">
            <el-icon :size="40"><Picture /></el-icon>
          </div>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.Id')">
          {{ detailForm.id }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.ClubId')">
          {{ detailForm.ClubId }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.GroupId')">
          {{ detailForm.GroupId }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.ClubName')">
          {{ detailForm.ClubName }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.MasterId')">
          {{ detailForm.MasterId }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.InviteCode')">
          <el-tag v-if="detailForm.InviteCode" type="success" effect="plain" size="large">
            {{ detailForm.InviteCode }}
          </el-tag>
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.MemberCount')">
          <el-tag type="primary" effect="dark" size="large">
            {{ detailForm.MemberCount ?? 0 }} {{ $t('Club.Detail.MemberUnit') }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.CanApply')">
          <el-tag v-if="!detailForm.CanApply" type="success" size="large">{{ $t('Club.Options.Can') }}</el-tag>
          <el-tag v-else type="info" size="large">{{ $t('Club.Options.Cannot') }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.CanSearch')">
          <el-tag v-if="!detailForm.CanSearch" type="success" size="large">{{ $t('Club.Options.Can') }}</el-tag>
          <el-tag v-else type="info" size="large">{{ $t('Club.Options.Cannot') }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.TablePower')">
          <el-tag v-if="detailForm.TablePower === 1" type="warning" size="large">{{ $t('Club.Options.Has') }}</el-tag>
          <el-tag v-else type="info" size="large">{{ $t('Club.Options.None') }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.PassWords')">
          {{ detailForm.PassWords }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Club.Detail.CreateTime')">
          {{ detailForm.CreateTime }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
  import { createClub, deleteClub, deleteClubByIds, updateClub, findClub, getClubList, resetInviteCode } from '@/api/dezhou/club'
  import { uploadFile } from '@/api/fileUploadAndDownload'

  import { formatDate } from '@/utils/format'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { Plus, Refresh, Delete, InfoFilled, Picture } from '@element-plus/icons-vue'
  import { ref, reactive, nextTick, computed } from 'vue'
  import { useAppStore, useUserStore } from '@/pinia'
  import { getGlobalGroupingApi } from '@/api/dezhou/global'
  import { useI18n } from 'vue-i18n'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'
  defineOptions({
    name: 'Club'
  })
  const { t } = useI18n()
  const appStore = useAppStore()
  const userStore = useUserStore()
  const token = userStore.token

  const groupOptions = ref([])

  const getGroupOptions = async () => {
    try {
      const res = await getGlobalGroupingApi()
      if (res.code === 0) {
        groupOptions.value = res.data.list || []
      }
    } catch (error) {
      console.error('获取分组列表失败:', error)
    }
  }

  const btnLoading = ref(false)
  const resetInviteCodeLoading = ref(false)

  const formData = ref({
    id: undefined,
    ClubId: undefined,
    GroupId: undefined,
    ClubName: '',
    MasterId: undefined,
    CanApply: false,
    CanSearch: false,
    CreateTime: new Date(),
    PassWords: '',
    TablePower: '0',
    InviteCode: '',
    Avatar: ''
  })

  const rules = reactive({
    ClubId: [{ required: true, message: t('Club.Validation.ClubId'), trigger: 'blur' }],
    GroupId: [{ required: true, message: t('Club.Validation.GroupId'), trigger: 'change' }],
    ClubName: [{ required: true, message: t('Club.Validation.ClubName'), trigger: 'blur' }],
    MasterId: [{ required: true, message: t('Club.Validation.MasterId'), trigger: 'blur' }],
    PassWords: [{ required: true, message: t('Club.Validation.PassWords'), trigger: 'blur' }],
    TablePower: [{ required: true, message: t('Club.Validation.TablePower'), trigger: 'change' }]
  })

  const elFormRef = ref()
  const elSearchFormRef = ref()
  const loading = ref(false)

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})

  const handleInput = (row, prop) => {
    nextTick(() => {
      if (row.value[prop] === undefined || row.value[prop] === null) return
      let value = String(row.value[prop]).replace(/[^-0-9]/g, '')
      row.value[prop] = value === '' ? undefined : Number(value)
    })
  }

  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }

  const onSubmit = () => {
    elSearchFormRef.value?.validate(async (valid) => {
      if (!valid) return
      page.value = 1
      if (searchInfo.value.CanApply === '') {
        searchInfo.value.CanApply = null
      }
      if (searchInfo.value.CanSearch === '') {
        searchInfo.value.CanSearch = null
      }
      getTableData()
    })
  }

  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getClubList({
        page: page.value,
        pageSize: pageSize.value,
        ...searchInfo.value
      })
      if (table.code === 0) {
        tableData.value = table.data.list
        total.value = table.data.total
        page.value = table.data.page
        pageSize.value = table.data.pageSize
      }
    } finally {
      loading.value = false
    }
  }

  getTableData()
  getGroupOptions()

  const setOptions = async () => {}
  setOptions()

  const multipleSelection = ref([])
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  const deleteRow = (row) => {
    ElMessageBox.confirm(
      t('Club.Messages.ConfirmDelete'),
      t('Common.Hint'),
      {
        confirmButtonText: t('Common.Confirm'),
        cancelButtonText: t('Common.Cancel'),
        type: 'warning'
      }
    ).then(() => {
      deleteClubFunc(row)
    })
  }

  const onDelete = async () => {
    ElMessageBox.confirm(
      t('Club.Messages.ConfirmDelete'),
      t('Common.Hint'),
      {
        confirmButtonText: t('Common.Confirm'),
        cancelButtonText: t('Common.Cancel'),
        type: 'warning'
      }
    ).then(async () => {
      const ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: t('Club.Messages.SelectDeleteWarning')
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map((item) => {
          ids.push(item.id)
        })
      const res = await deleteClubByIds({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('Club.Messages.DeleteSuccess')
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }

  const type = ref('')

  const updateClubFunc = async (row) => {
    const res = await findClub({ id: row.id })
    type.value = 'update'
    if (res.code === 0) {
      let data = JSON.parse(JSON.stringify(res.data))
      data.CanApply = data.CanApply ? true : false
      data.CanSearch = data.CanSearch ? true : false
      data.TablePower = data.TablePower + ''
      formData.value = data
      dialogFormVisible.value = true
    }
  }

  const deleteClubFunc = async (row) => {
    const res = await deleteClub({ id: row.id })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('Club.Messages.DeleteSuccess')
      })
      if (tableData.value.length === 1 && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  }

  const dialogFormVisible = ref(false)

  const openDialog = () => {
    getGroupOptions()
    type.value = 'create'
    dialogFormVisible.value = true
  }

  const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
      id: undefined,
      ClubId: undefined,
      GroupId: undefined,
      ClubName: '',
      MasterId: undefined,
      CanApply: false,
      CanSearch: false,
      CreateTime: new Date(),
      PassWords: '',
      TablePower: '0',
      InviteCode: '',
      Avatar: ''
    }
    elFormRef.value?.clearValidate()
  }

  const enterDialog = async () => {
    btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
      formData.value.CanApply = formData.value.CanApply ? 1 : 0
      formData.value.CanSearch = formData.value.CanSearch ? 1 : 0
      formData.value.TablePower = +formData.value.TablePower
      let res
      switch (type.value) {
        case 'create':
          res = await createClub(formData.value)
          break
        case 'update':
          res = await updateClub(formData.value)
          break
        default:
          res = await createClub(formData.value)
          break
      }
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('Club.Messages.CreateOrUpdateSuccess')
        })
        closeDialog()
        getTableData()
      }
    })
  }

  const handleResetInviteCode = async (row) => {
    try {
      await ElMessageBox.confirm(
        t('Club.Messages.ConfirmResetInviteCode'),
        t('Common.Hint'),
        {
          confirmButtonText: t('Common.Confirm'),
          cancelButtonText: t('Common.Cancel'),
          type: 'warning'
        }
      )
    } catch {
      return
    }
    resetInviteCodeLoading.value = true
    try {
      const res = await resetInviteCode({ id: row.id })
      if (res.code === 0) {
        ElMessage.success(t('Club.Messages.ResetInviteCodeSuccess'))
        getTableData()
      }
    } finally {
      resetInviteCodeLoading.value = false
    }
  }

  const handleResetInviteCodeInForm = async () => {
    if (!formData.value.id) return
    try {
      await ElMessageBox.confirm(
        t('Club.Messages.ConfirmResetInviteCode'),
        t('Common.Hint'),
        {
          confirmButtonText: t('Common.Confirm'),
          cancelButtonText: t('Common.Cancel'),
          type: 'warning'
        }
      )
    } catch {
      return
    }
    resetInviteCodeLoading.value = true
    try {
      const res = await resetInviteCode({ id: formData.value.id })
      if (res.code === 0 && res.data && res.data.InviteCode) {
        formData.value.InviteCode = res.data.InviteCode
        ElMessage.success(t('Club.Messages.ResetInviteCodeSuccess'))
      }
    } finally {
      resetInviteCodeLoading.value = false
    }
  }

  const handleAvatarUpload = async (file) => {
    const isJPG = file.type?.toLowerCase() === 'image/jpeg'
    const isPng = file.type?.toLowerCase() === 'image/png'
    const isGif = file.type?.toLowerCase() === 'image/gif'
    const isWebp = file.type?.toLowerCase() === 'image/webp'
    if (!isJPG && !isPng && !isGif && !isWebp) {
      ElMessage.error(t('Club.Messages.AvatarFormatError'))
      return false
    }
    const sizeLimit = file.size / 1024 / 1024 < 5
    if (!sizeLimit) {
      ElMessage.error(t('Club.Messages.AvatarSizeError'))
      return false
    }
    const data = new FormData()
    data.append('file', file)
    try {
      const res = await uploadFile(data)
      if (res.code === 0 && res.data && res.data.file) {
        formData.value.Avatar = res.data.file.url
        ElMessage.success(t('Club.Messages.UploadSuccess'))
      } else {
        ElMessage.error(res.msg || t('Club.Messages.UploadFailed'))
      }
    } catch (error) {
      console.error('upload avatar failed:', error)
      ElMessage.error(t('Club.Messages.UploadFailed'))
    }
    return false
  }

  const handleAvatarSuccess = () => {
  }

  const handleRemoveAvatar = () => {
    ElMessageBox.confirm(
      t('Club.Messages.ConfirmRemoveAvatar'),
      t('Common.Hint'),
      {
        confirmButtonText: t('Common.Confirm'),
        cancelButtonText: t('Common.Cancel'),
        type: 'warning'
      }
    ).then(() => {
      formData.value.Avatar = ''
    }).catch(() => {})
  }

  const detailForm = ref({})
  const detailShow = ref(false)

  const openDetailShow = () => {
    detailShow.value = true
  }

  const getDetails = async (row) => {
    const res = await findClub({ id: row.id })
    if (res.code === 0) {
      detailForm.value = res.data
      openDetailShow()
    }
  }

  const closeDetailShow = () => {
    detailShow.value = false
    detailForm.value = {}
  }
</script>

<style lang="scss">
  .avatar-uploader {
    min-width: 140px;
    height: 140px;
    border: 1px dashed #dcdfe6;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: border-color 0.3s;
    &:hover {
      border-color: #3b82f6;
    }
    .avatar {
      width: 136px;
      height: 136px;
      border-radius: 6px;
      object-fit: cover;
    }
    .avatar-uploader-icon-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .avatar-uploader-icon {
      font-size: 36px;
      color: #8c939d;
    }
    .avatar-uploader-text {
      font-size: 12px;
      color: #909399;
    }
  }
  .avatar-placeholder {
    width: 100%;
    height: 100%;
    background: #f0f2f5;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #909399;
  }
</style>
