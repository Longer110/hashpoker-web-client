<template>
  <div>
    <!-- 原: 验证码 -->
    <el-dialog v-model="dialogVisible" :title="$t('User.Captcha')" :modal="true" width="310" align-center>
      <vue-qrcode :value="qrCodeValue" :width="qrCodeWidth"></vue-qrcode>
    </el-dialog>
    <!-- 原: 注：右上角头像下拉可切换角色 -->
    <warning-bar :title="$t('Authority.RoleWarning')" />
    <TableSkeletonWrapper :loading="loading" :show-search="true" :show-toolbar="true" :toolbar-button-count="1">
      <template #search>
        <div class="gva-search-box">
          <el-form ref="searchForm" :inline="true" :model="searchInfo">
            <!-- 原: 用户名 -->
            <el-form-item :label="$t('User.Username')">
              <!-- 原: 用户名 -->
              <el-input v-model="searchInfo.username" :placeholder="$t('User.PlaceholderUsername')" style="width: 240px"  clearable/>
            </el-form-item>
            <!-- 原: 昵称 -->
            <el-form-item :label="$t('User.Nickname')">
              <!-- 原: 昵称 -->
              <el-input v-model="searchInfo.nickname" :placeholder="$t('User.PlaceholderNickname')" style="width: 240px"  clearable/>
            </el-form-item>
            <!-- 原: 手机号 -->
            <el-form-item :label="$t('User.Phone')">
              <!-- 原: 手机号 -->
              <el-input v-model="searchInfo.phone" :placeholder="$t('User.PlaceholderPhone')" style="width: 240px"  clearable/>
            </el-form-item>
            <!-- 原: 邮箱 -->
            <el-form-item :label="$t('User.Email')">
              <!-- 原: 邮箱 -->
              <el-input v-model="searchInfo.email" :placeholder="$t('User.PlaceholderEmail')" style="width: 240px"  clearable/>
            </el-form-item>
            <el-form-item>
              <!-- 原: 查询 -->
              <el-button type="primary" icon="search" @click="onSubmit"> {{ $t('GlobalUniversality.Query') }} </el-button>
              <!-- 原: 重置 -->
              <el-button icon="refresh" @click="onReset"> {{ $t('GlobalUniversality.Reset') }} </el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- 原: 新增用户 -->
          <el-button type="primary" icon="plus" @click="addUser">{{ $t('User.AddUser') }}</el-button>
        </div>
        <el-table :data="tableData" row-key="ID">
        <!-- 原: 头像 -->
        <el-table-column align="left" :label="$t('User.Avatar')" min-width="75">
          <template #default="scope">
            <CustomPic style="margin-top: 8px" :pic-src="scope.row.headerImg" />
          </template>
        </el-table-column>
        <!-- 原: ID -->
        <el-table-column align="left" :label="$t('User.ID')" min-width="50" prop="ID" />
        <!-- 原: 用户名 -->
        <el-table-column align="left" :label="$t('User.Username')" min-width="150" prop="userName" />
        <!-- 原: 昵称 -->
        <el-table-column align="left" :label="$t('User.Nickname')" min-width="150" prop="nickName" />
        <!-- 原: 手机号 -->
        <el-table-column align="left" :label="$t('User.Phone')" min-width="180" prop="phone" />
        <!-- 原: 邮箱 -->
        <el-table-column align="left" :label="$t('User.Email')" min-width="180" prop="email" />
        <!-- 原: 用户角色 -->
        <el-table-column align="left" :label="$t('User.Roles')" min-width="200">
          <template #default="scope">
            <el-cascader
              v-model="scope.row.authorityIds"
              :options="authOptions"
              :show-all-levels="false"
              collapse-tags
              :props="{
                multiple: true,
                checkStrictly: true,
                label: 'authorityName',
                value: 'authorityId',
                disabled: 'disabled',
                emitPath: false
              }"
              :clearable="false"
              @visible-change="
                (flag) => {
                  changeAuthority(scope.row, flag, 0)
                }
              "
              @remove-tag="
                (removeAuth) => {
                  changeAuthority(scope.row, false, removeAuth)
                }
              "
            />
          </template>
        </el-table-column>
        <!-- 原: 启用 -->
        <el-table-column align="left" :label="$t('User.Enabled')" min-width="150">
          <template #default="scope">
            <el-switch
              v-model="scope.row.enable"
              inline-prompt
              :active-value="1"
              :inactive-value="2"
              @change="
                () => {
                  switchEnable(scope.row)
                }
              "
            />
          </template>
        </el-table-column>

        <!-- 原: 操作 -->
        <el-table-column header-align="center" :label="$t('User.Actions')" align="right" min-width="390" fixed="right">
          <template #default="scope">
            <!-- 原: 删除 -->
            <el-button type="primary" link icon="delete" @click="deleteUserFunc(scope.row)">{{ $t('User.Delete') }}</el-button>
            <!-- 原: 编辑 -->
            <el-button type="primary" link icon="edit" @click="openEdit(scope.row)">{{ $t('User.Edit') }}</el-button>
            <!-- 原: 重置密码 -->
            <el-button type="primary" link icon="magic-stick" @click="resetPasswordFunc(scope.row)">{{ $t('User.ResetPassword') }}</el-button>

            <!-- 原: 设置谷歌验证码 -->
            <el-button type="primary" link icon="Grid" @click="setGoogleFn(scope.row)">{{ $t('User.SetGoogle') }}</el-button>
          </template>
        </el-table-column>
        </el-table>
        <div class="gva-pagination">
          <el-pagination
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </TableSkeletonWrapper>
    <!-- 原: 重置密码对话框 -->
    <el-dialog
      v-model="resetPwdDialog"
      :title="$t('User.ResetPasswordTitle')"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="resetPwdInfo" :rules="resetPwdRules" ref="resetPwdForm" label-width="100px">
        <!-- 原: 用户账号 -->
        <el-form-item :label="$t('User.UserAccount')">
          <el-input v-model="resetPwdInfo.userName" disabled />
        </el-form-item>
        <!-- 原: 用户昵称 -->
        <el-form-item :label="$t('User.UserNickname')">
          <el-input v-model="resetPwdInfo.nickName" disabled />
        </el-form-item>
        <!-- 原: 新密码 -->
        <el-form-item :label="$t('User.NewPassword')" prop="password">
          <div class="flex w-full">
            <el-input
              class="flex-1"
              v-model="resetPwdInfo.password"
              :placeholder="$t('User.PlaceholderNewPassword')"
              show-password
            />
            <!-- 原: 生成随机密码 -->
            <el-button type="primary" @click="generateRandomPassword" style="margin-left: 10px">
              {{ $t('User.GenerateRandomPassword') }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeResetPwdDialog">{{ $t('Common.Cancel') }}</el-button>
          <el-button type="primary" @click="confirmResetPassword">{{ $t('Common.Submit') }}</el-button>
        </div>
      </template>
    </el-dialog>

    <el-drawer
      v-model="addUserDialog"
      :size="appStore.drawerSize"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <!-- 原: 用户 -->
          <span class="text-lg">{{ $t('User.Title') }}</span>
          <div>
            <el-button @click="closeAddUserDialog">{{ $t('Common.Cancel') }}</el-button>
            <el-button type="primary" @click="enterAddUserDialog">{{ $t('Common.Submit') }}</el-button>
          </div>
        </div>
      </template>

      <el-form ref="userForm" :rules="rules" :model="userInfo" label-width="80px">
        <!-- 原: 用户名 -->
        <el-form-item v-if="dialogFlag === 'add'" :label="$t('User.Username')" prop="userName">
          <!-- 原: 请输入用户名 -->
          <el-input v-model="userInfo.userName" :placeholder="$t('User.PlaceholderUsername')" />
        </el-form-item>
        <!-- 原: 密码 -->
        <el-form-item v-if="dialogFlag === 'add'" :label="$t('User.Password')" prop="password">
          <!-- 原: 最少18位，包含数字+大小写字母+特殊字符 -->
          <el-input v-model="userInfo.password" :placeholder="$t('User.PlaceholderPassword')" />
        </el-form-item>
        <!-- 原: 昵称 -->
        <el-form-item :label="$t('User.Nickname')" prop="nickName">
          <!-- 原: 请输入昵称 -->
          <el-input v-model="userInfo.nickName" :placeholder="$t('User.PlaceholderNickname')" />
        </el-form-item>
        <!-- 原: 手机号 -->
        <el-form-item :label="$t('User.Phone')" prop="phone">
          <!-- 原: 请输入手机号 -->
          <el-input v-model="userInfo.phone" :placeholder="$t('User.PlaceholderPhone')" />
        </el-form-item>
        <!-- 原: 邮箱 -->
        <el-form-item :label="$t('User.Email')" prop="email">
          <!-- 原: 请输入邮箱 -->
          <el-input v-model="userInfo.email" :placeholder="$t('User.PlaceholderEmail')" />
        </el-form-item>
        <!-- 原: 用户角色 -->
        <el-form-item :label="$t('User.Roles')" prop="authorityId">
          <el-cascader
            v-model="userInfo.authorityIds"
            style="width: 100%"
            :options="authOptions"
            :show-all-levels="false"
            :props="{
              multiple: true,
              checkStrictly: true,
              label: 'authorityName',
              value: 'authorityId',
              disabled: 'disabled',
              emitPath: false
            }"
            :clearable="false"
            @change="handleChange"
          />
        </el-form-item>
        <!-- 原: 启用 -->
        <el-form-item :label="$t('User.Enabled')" prop="disabled">
          <el-switch v-model="userInfo.enable" inline-prompt :active-value="1" :inactive-value="2" />
        </el-form-item>
        <!-- 原: 头像 -->
        <el-form-item :label="$t('User.Avatar')" label-width="80px">
          <SelectImage v-model="userInfo.headerImg" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
  import { getUserList, setUserAuthorities, register, deleteUser, googleApi } from '@/api/user'

  import { getAuthorityList } from '@/api/authority'
  import CustomPic from '@/components/customPic/index.vue'
  import WarningBar from '@/components/warningBar/warningBar.vue'
  import { setUserInfo, resetPassword } from '@/api/user.js'

  import { nextTick, reactive, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import SelectImage from '@/components/selectImage/selectImage.vue'
  import { useAppStore } from '@/pinia'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'User'
  })

  const appStore = useAppStore()
  const { t } = useI18n()

  // 获取验证码
  const dialogVisible = ref(false)
  let qrCodeValue = ref('otpauth://totp/admin?secret=OHTQSBLMPMHRCWDLMTBNRYMBBVFFXBVB\u0026issuer=Admin 登录')
  let qrCodeWidth = ref(280)
  const searchInfo = ref({
    username: '',
    nickname: '',
    phone: '',
    email: ''
  })

  const onSubmit = () => {
    page.value = 1
    getTableData()
  }

  const onReset = () => {
    searchInfo.value = {
      username: '',
      nickname: '',
      phone: '',
      email: ''
    }
    getTableData()
  }
  // 初始化相关
  const setAuthorityOptions = (AuthorityData, optionsData) => {
    AuthorityData &&
      AuthorityData.forEach((item) => {
        if (item.children && item.children.length) {
          const option = {
            authorityId: item.authorityId,
            authorityName: item.authorityName,
            children: []
          }
          setAuthorityOptions(item.children, option.children)
          optionsData.push(option)
        } else {
          const option = {
            authorityId: item.authorityId,
            authorityName: item.authorityName
          }
          optionsData.push(option)
        }
      })
  }

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const loading = ref(false)

  const handleChange = (value) => {
    console.log(value)
    if (value.length > 0) {
      userInfo.value.authorityId = userInfo.value.authorityIds[0]
    } else {
      userInfo.value.authorityId = ''
    }
  }
  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getUserList({
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

  watch(
    () => tableData.value,
    () => {
      setAuthorityIds()
    }
  )

  const initPage = async () => {
    getTableData()
    const res = await getAuthorityList()
    setOptions(res.data)
  }

  initPage()

  // 重置密码对话框相关
  const resetPwdDialog = ref(false)
  const resetPwdForm = ref(null)
  const resetPwdInfo = ref({
    ID: '',
    userName: '',
    nickName: '',
    password: ''
  })

  // 密码校验函数
  const validatePassword = (rule, value, callback) => {
    if (!value) {
      callback(new Error(t('User.PasswordRequired')))
      return
    }
    if (value.length < 18) {
      callback(new Error(t('User.PasswordMinLength')))
      return
    }
    // 检查是否包含数字
    if (!/\d/.test(value)) {
      callback(new Error(t('User.PasswordMustContainNumber')))
      return
    }
    // 检查是否包含小写字母
    if (!/[a-z]/.test(value)) {
      callback(new Error(t('User.PasswordMustContainLower')))
      return
    }
    // 检查是否包含大写字母
    if (!/[A-Z]/.test(value)) {
      callback(new Error(t('User.PasswordMustContainUpper')))
      return
    }
    // 检查是否包含特殊字符
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      callback(new Error(t('User.PasswordMustContainSpecial')))
      return
    }
    callback()
  }

  // 重置密码表单验证规则
  const resetPwdRules = ref({
    password: [
      // 请输入新密码
      { required: true, message: t('User.ResetPwdNewPasswordRequired'), trigger: 'blur' },
      { validator: validatePassword, trigger: 'blur' }
    ]
  })

  // 生成随机密码
  const generateRandomPassword = () => {
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const specialChars = '!@#$%^&*'
    const allChars = upperCase + lowerCase + numbers + specialChars
    // 确保至少包含一个大写字母、一个小写字母、一个数字和特殊字符
    let password = ''
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length))
    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length))
    password += numbers.charAt(Math.floor(Math.random() * numbers.length))
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length))
    // 生成剩余的字符
    for (let i = 0; i < 14; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length))
    }
    // 打乱密码顺序
    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('')

    resetPwdInfo.value.password = password
    // 复制到剪贴板
    navigator.clipboard
      .writeText(password)
      .then(() => {
        ElMessage({
          type: 'success',
          message: t('User.PasswordGeneratedCopied') // 密码已生成并复制到剪贴板
        })
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: t('User.CopyFailed') // 复制失败，请手动复制
        })
      })
  }

  // 打开重置密码对话框
  const resetPasswordFunc = (row) => {
    resetPwdInfo.value.ID = row.ID
    resetPwdInfo.value.userName = row.userName
    resetPwdInfo.value.nickName = row.nickName
    resetPwdInfo.value.password = ''
    resetPwdDialog.value = true
  }

  // 确认重置密码
  const confirmResetPassword = async () => {
    // 使用表单验证
    resetPwdForm.value.validate(async (valid) => {
      if (!valid) {
        return
      }

      const res = await resetPassword({
        ID: resetPwdInfo.value.ID,
        password: resetPwdInfo.value.password
      })

      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: res.msg || t('User.PasswordResetSuccess') // 密码重置成功
        })
        resetPwdDialog.value = false
      } else {
        ElMessage({
          type: 'error',
          message: res.msg || t('User.PasswordResetFailed') // 密码重置失败
        })
      }
    })
  }

  // 关闭重置密码对话框
  const closeResetPwdDialog = () => {
    resetPwdForm.value.resetFields()
    resetPwdInfo.value.password = ''
    resetPwdDialog.value = false
  }
  const setAuthorityIds = () => {
    tableData.value &&
      tableData.value.forEach((user) => {
        user.authorityIds =
          user.authorities &&
          user.authorities.map((i) => {
            return i.authorityId
          })
      })
  }

  const authOptions = ref([])
  const setOptions = (authData) => {
    authOptions.value = []
    setAuthorityOptions(authData, authOptions.value)
  }

  const deleteUserFunc = async (row) => {
    ElMessageBox.confirm(t('User.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await deleteUser({ id: row.ID })
      if (res.code === 0) {
        ElMessage({ type: 'success', message: t('User.DeleteSuccess') })
        await getTableData()
      }
    })
  }

  // 弹窗相关
  const userInfo = ref({
    userName: '',
    password: '',
    nickName: '',
    headerImg: '',
    authorityId: '',
    authorityIds: [],
    enable: 1
  })

  const rules = reactive({
    userName: [
      //请输入用户名
      { required: true, message: t('User.PlaceholderUsername'), trigger: 'blur' },
      // 最低5位字符
      { min: 5, message: t('User.LeastLength5'), trigger: 'blur' }
    ],
    password: [
      //请输入用户密码
      { required: true, message: t('User.PlaceholderPassword'), trigger: 'blur' },
      { validator: validatePassword, trigger: 'blur' }
    ],
    // 请输入用户昵称
    nickName: [{ required: true, message: t('User.PlaceholderNickname'), trigger: 'blur' }],
    phone: [
      // 请输入合法手机号
      {
        pattern: /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/,
        message: t('User.PlaceholderRightPhone'),
        trigger: 'blur'
      }
    ],
    email: [
      // 请输入正确的邮箱
      {
        required: true,
        pattern: /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
        message: t('User.PlaceholderRightEmail'),
        trigger: 'blur'
      }
    ],
    // 请选择用户角色
    authorityId: [{ required: true, message: t('User.PlaceholderRoleSelect'), trigger: 'blur' }]
  })
  const userForm = ref(null)
  const enterAddUserDialog = async () => {
    userInfo.value.authorityId = userInfo.value.authorityIds[0]
    userForm.value.validate(async (valid) => {
      if (valid) {
        const req = {
          ...userInfo.value
        }
        if (dialogFlag.value === 'add') {
          const res = await register(req)
          if (res.code === 0) {
            ElMessage({ type: 'success', message: t('User.CreateSuccess') }) // 创建成功
            await getTableData()
            closeAddUserDialog()
            // 创建成功之后 弹出设置谷歌二维码
            setGoogleFn({ ID: res.data.user.ID })
          }
        }
        if (dialogFlag.value === 'edit') {
          const res = await setUserInfo(req)
          if (res.code === 0) {
            ElMessage({ type: 'success', message: t('User.EditSuccess') }) // 编辑成功
            await getTableData()
            closeAddUserDialog()
          }
        }
      }
    })
  }

  const addUserDialog = ref(false)
  const closeAddUserDialog = () => {
    userForm.value.resetFields()
    userInfo.value = {
      userName: '',
      password: '',
      nickName: '',
      headerImg: '',
      authorityId: '',
      authorityIds: [],
      enable: 1
    }
    addUserDialog.value = false
  }

  const dialogFlag = ref('add')

  const addUser = () => {
    dialogFlag.value = 'add'
    addUserDialog.value = true
  }

  const tempAuth = {}
  const changeAuthority = async (row, flag, removeAuth) => {
    if (flag) {
      if (!removeAuth) {
        tempAuth[row.ID] = [...row.authorityIds]
      }
      return
    }
    await nextTick()
    const res = await setUserAuthorities({
      ID: row.ID,
      authorityIds: row.authorityIds
    })
    if (res.code === 0) {
      ElMessage({ type: 'success', message: t('User.SetRoleSuccess') }) // 角色设置成功
    } else {
      if (!removeAuth) {
        row.authorityIds = [...tempAuth[row.ID]]
        delete tempAuth[row.ID]
      } else {
        row.authorityIds = [removeAuth, ...row.authorityIds]
      }
    }
  }

  const openEdit = (row) => {
    dialogFlag.value = 'edit'
    userInfo.value = JSON.parse(JSON.stringify(row))
    addUserDialog.value = true
  }

  const switchEnable = async (row) => {
    userInfo.value = JSON.parse(JSON.stringify(row))
    await nextTick()
    const req = {
      ...userInfo.value
    }
    const res = await setUserInfo(req)
    if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: req.enable === 2 ? t('User.DisableSuccess') : t('User.EnableSuccess')
          // 禁用成功/启用成功
        })
      await getTableData()
      userInfo.value.headerImg = ''
      userInfo.value.authorityIds = []
    }
  }

  const setGoogleFn = async (row) => {
    const res = await googleApi({ ID: row.ID })
    if (res.code === 0) {
      qrCodeValue.value = res.data.url
      dialogVisible.value = true
    }
  }
</script>

<style lang="scss">
  .header-img-box {
    @apply w-52 h-52 border border-solid border-gray-300 rounded-xl flex justify-center items-center cursor-pointer;
  }
</style>
