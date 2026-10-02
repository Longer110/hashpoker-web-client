<template>
  <div class="authority">
    <!-- 原: 注：右上角头像下拉可切换角色 -->
    <warning-bar :title="$t('Authority.RoleWarning')" />
    <TableSkeletonWrapper
      :loading="loading"
      :show-toolbar="true"
      :toolbar-button-count="1"
      :row-count="2"
      :show-pagination="false"
    >
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- 原: 新增角色 -->
          <el-button type="primary" icon="plus" @click="addAuthority(0)">{{$t('Authority.AddRole')}}</el-button>
        </div>
        <el-table
          :data="tableData"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          row-key="authorityId"
          style="width: 100%"
        >
        <!-- 原: 角色ID -->
        <el-table-column :label="$t('Authority.RoleId')" min-width="180" prop="authorityId" />
        <!-- 原: 角色名称 -->
        <el-table-column align="left" :label="$t('Authority.RoleName')" min-width="180" prop="authorityName" />
        <!-- 原: 操作 -->
        <el-table-column align="right" header-align="center" :label="$t('Authority.Actions')" width="460">
          <template #default="scope">
            <!-- 原: 设置权限 -->
            <el-button icon="setting" type="primary" link @click="openDrawer(scope.row)">{{$t('Authority.SetPermissions')}}</el-button>
            <!-- <el-button icon="plus" type="primary" link @click="addAuthority(scope.row.authorityId)"
              >新增子角色</el-button
            > -->
            <!-- 原: 拷贝 -->
            <el-button icon="copy-document" type="primary" link @click="copyAuthorityFunc(scope.row)">{{$t('Authority.Copy')}}</el-button>
            <!-- 原: 编辑 -->
            <el-button icon="edit" type="primary" link @click="editAuthority(scope.row)">{{$t('Authority.Edit')}}</el-button>
            <!-- 原: 删除 -->
            <el-button icon="delete" type="primary" link @click="deleteAuth(scope.row)">{{$t('Authority.Delete')}}</el-button>
          </template>
        </el-table-column>
        </el-table>
      </div>
    </TableSkeletonWrapper>
    <!-- 原: 新增角色弹窗 -->
    <el-drawer v-model="authorityFormVisible" :size="appStore.drawerSize" :show-close="false">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ authorityTitleForm }}</span>
          <div>
            <!-- 原: 取 消 -->
            <el-button @click="closeAuthorityForm">{{$t('Common.Cancel')}}</el-button>
            <!-- 原: 确 定 -->
            <el-button type="primary" @click="submitAuthorityForm">{{$t('Common.Submit')}}</el-button>
          </div>
        </div>
      </template>
      <el-form ref="authorityForm" :model="form" :rules="rules" label-width="80px">
        <!-- 原: 父级角色 -->
        <el-form-item :label="$t('Authority.ParentRole')" prop="parentId">
            <!-- :disabled="dialogType == 'add'" -->
          <el-cascader
            v-model="form.parentId"
            style="width: 100%"

            :options="AuthorityOption"
            :props="{
              checkStrictly: true,
              label: 'authorityName',
              value: 'authorityId',
              disabled: 'disabled',
              emitPath: false
            }"
            :show-all-levels="false"
            filterable
          />
        </el-form-item>
        <!-- 原: 角色ID -->
        <el-form-item :label="$t('Authority.RoleId')" prop="authorityId">
          <el-input v-model="form.authorityId" :disabled="dialogType === 'edit'" autocomplete="off" maxlength="4" />
        </el-form-item>
        <!-- 原: 角色姓名 -->
        <el-form-item :label="$t('Authority.RoleName')" prop="authorityName">
          <el-input v-model="form.authorityName" autocomplete="off" />
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 原: 角色配置 -->
    <el-drawer v-if="drawer" v-model="drawer" :size="appStore.drawerSize" :title="$t('Authority.RoleConfig')">
      <el-tabs :before-leave="autoEnter" type="border-card">
        <!-- 原: 角色菜单 -->
        <el-tab-pane :label="$t('Authority.RoleMenu')">
          <Menus ref="menus" :row="activeRow" @changeRow="changeRow" />
        </el-tab-pane>
        <!-- 原: 角色api -->
        <el-tab-pane :label="$t('Authority.RoleApi')">
          <Apis ref="apis" :row="activeRow" @changeRow="changeRow" />
        </el-tab-pane>
        <!-- 原: 资源权限 -->
        <!-- <el-tab-pane :label="$t('Authority.ResourcePermission')">
          <Datas ref="datas" :authority="tableData" :row="activeRow" @changeRow="changeRow" />
        </el-tab-pane> -->
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script setup>
  import { getAuthorityList, deleteAuthority, createAuthority, updateAuthority, copyAuthority } from '@/api/authority'

  import Menus from '@/view/superAdmin/authority/components/menus.vue'
  import Apis from '@/view/superAdmin/authority/components/apis.vue'
  import Datas from '@/view/superAdmin/authority/components/datas.vue'
  import WarningBar from '@/components/warningBar/warningBar.vue'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  import { ref, computed } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useAppStore } from '@/pinia'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  defineOptions({
    name: 'Authority'
  })

  const mustUint = (rule, value, callback) => {
    if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
      return callback(new Error('请输入正整数'))
    }
    return callback()
  }

  const AuthorityOption = ref([
    {
      authorityId: 0,
      authorityName: '根角色/严格模式下为当前角色'
    }
  ])
  const drawer = ref(false)
  const dialogType = ref('add')
  const activeRow = ref({})
  const appStore = useAppStore()
  const loading = ref(false)

  const authorityTitleForm = ref('新增角色')
  const authorityFormVisible = ref(false)
  const apiDialogFlag = ref(false)
  const copyForm = ref({})

  const form = ref({
    authorityId: 0,
    authorityName: '',
    parentId: 0
  })

  const rules = computed(() => ({
    authorityId: [
      //请输入角色ID
      { required: true, message: t('Authority.PlaceholderRoleId'), trigger: 'blur' },
      // 必须为正整数
      { validator: mustUint, trigger: 'blur', message: t('Authority.RoleIdReg') }
    ],
    // '请输入角色名'
    authorityName: [{ required: true, message: t('Authority.PlaceholderRoleName'), trigger: 'blur' }],
    // 请选择父角色
    parentId: [{ required: true, message: t('Authority.PlaceholderSelectParentRole'), trigger: 'blur' }]
  }))

  const tableData = ref([])

  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getAuthorityList()
      if (table.code === 0) {
        tableData.value = table.data
      }
    } finally {
      loading.value = false
    }
  }

  getTableData()

  const changeRow = (key, value) => {
    activeRow.value[key] = value
  }
  const menus = ref(null)
  const apis = ref(null)
  const datas = ref(null)
  const autoEnter = (activeName, oldActiveName) => {
    const paneArr = [menus, apis, datas]
    if (oldActiveName) {
      if (paneArr[oldActiveName].value.needConfirm) {
        paneArr[oldActiveName].value.enterAndNext()
        paneArr[oldActiveName].value.needConfirm = false
      }
    }
  }
  // 拷贝角色
  const copyAuthorityFunc = (row) => {
    setOptions()
    authorityTitleForm.value = '拷贝角色'
    dialogType.value = 'copy'
    for (const k in form.value) {
      form.value[k] = row[k]
    }
    copyForm.value = row
    authorityFormVisible.value = true
  }
  const openDrawer = (row) => {
    drawer.value = true
    activeRow.value = row
  }
  // 删除角色
  const deleteAuth = (row) => {
    ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const res = await deleteAuthority({ authorityId: row.authorityId })
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })

          getTableData()
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  // 初始化表单
  const authorityForm = ref(null)
  const initForm = () => {
    if (authorityForm.value) {
      authorityForm.value.resetFields()
    }
    form.value = {
      authorityId: 0,
      authorityName: '',
      parentId: 0
    }
  }
  // 关闭窗口
  const closeAuthorityForm = () => {
    initForm()
    authorityFormVisible.value = false
    apiDialogFlag.value = false
  }
  // 确定弹窗

  const submitAuthorityForm = () => {
    authorityForm.value.validate(async (valid) => {
      if (valid) {
        form.value.authorityId = Number(form.value.authorityId)
        switch (dialogType.value) {
          case 'add':
            {
              const res = await createAuthority(form.value)
              if (res.code === 0) {
                ElMessage({
                  type: 'success',
                  message: '添加成功!'
                })
                getTableData()
                closeAuthorityForm()
              }
            }
            break
          case 'edit':
            {
              const res = await updateAuthority(form.value)
              if (res.code === 0) {
                ElMessage({
                  type: 'success',
                  message: '添加成功!'
                })
                getTableData()
                closeAuthorityForm()
              }
            }
            break
          case 'copy': {
            const data = {
              authority: {
                authorityId: 0,
                authorityName: '',
                datauthorityId: [],
                parentId: 0
              },
              oldAuthorityId: 0
            }
            data.authority.authorityId = form.value.authorityId
            data.authority.authorityName = form.value.authorityName
            data.authority.parentId = form.value.parentId
            data.authority.dataAuthorityId = copyForm.value.dataAuthorityId
            data.oldAuthorityId = copyForm.value.authorityId
            const res = await copyAuthority(data)
            if (res.code === 0) {
              ElMessage({
                type: 'success',
                message: '复制成功！'
              })
              getTableData()
            }
          }
        }

        initForm()
        authorityFormVisible.value = false
      }
    })
  }
  const setOptions = () => {
    AuthorityOption.value = [
      {
        authorityId: 0,
        authorityName: '根角色(严格模式下为当前用户角色)'
      }
    ]
    setAuthorityOptions(tableData.value, AuthorityOption.value, false)
  }
  const setAuthorityOptions = (AuthorityData, optionsData, disabled) => {
    AuthorityData &&
      AuthorityData.forEach((item) => {
        if (item.children && item.children.length) {
          const option = {
            authorityId: item.authorityId,
            authorityName: item.authorityName,
            disabled: disabled || item.authorityId === form.value.authorityId,
            children: []
          }
          setAuthorityOptions(item.children, option.children, disabled || item.authorityId === form.value.authorityId)
          optionsData.push(option)
        } else {
          const option = {
            authorityId: item.authorityId,
            authorityName: item.authorityName,
            disabled: disabled || item.authorityId === form.value.authorityId
          }
          optionsData.push(option)
        }
      })
  }
  // 增加角色
  const addAuthority = (parentId) => {
    initForm()
    authorityTitleForm.value = '新增角色'
    dialogType.value = 'add'
    form.value.parentId = parentId
    setOptions()
    authorityFormVisible.value = true
  }
  // 编辑角色
  const editAuthority = (row) => {
    setOptions()
    authorityTitleForm.value = '编辑角色'
    dialogType.value = 'edit'
    for (const key in form.value) {
      form.value[key] = row[key]
    }
    setOptions()
    authorityForm.value && authorityForm.value.clearValidate()
    authorityFormVisible.value = true
  }
</script>

<style lang="scss">
  .authority {
    .el-input-number {
      margin-left: 15px;
      span {
        display: none;
      }
    }
  }
  .tree-content {
    margin-top: 10px;
    height: calc(100vh - 158px);
    overflow: auto;
  }
</style>
