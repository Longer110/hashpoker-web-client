<template>
  <div class="menu-page">
    <TableSkeletonWrapper
      :loading="loading"
      :show-toolbar="true"
      :toolbar-button-count="1"
      :show-pagination="false"
      :row-count="skeletonRowCount"
    >
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- 原: 新增根菜单 -->
          <el-button type="primary" icon="plus" @click="addMenu(0)"> {{$t('MenuManage.AddRootMenu')}} </el-button>
        </div>

        <!-- 由于此处菜单跟左侧列表一一对应所以不需要分页 pageSize默认999 -->
        <el-table :data="tableData" row-key="ID">
        <!-- 原: ID -->
        <el-table-column align="left" :label="$t('MenuManage.ID')" min-width="100" prop="ID" />
        <!-- 原: 展示名称 -->
        <el-table-column align="left" :label="$t('MenuManage.DisplayName')" min-width="120" prop="authorityName">
          <template #default="scope">
            <span>{{ scope.row.meta.title }}</span>
          </template>
        </el-table-column>
        <!-- 原: 图标 -->
        <el-table-column align="left" :label="$t('MenuManage.Icon')" min-width="140" prop="authorityName">
          <template #default="scope">
            <div v-if="scope.row.meta.icon" class="icon-column">
              <el-icon>
                <component :is="scope.row.meta.icon" />
              </el-icon>
              <span>{{ scope.row.meta.icon }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- 原: 路由Name -->
        <el-table-column align="left" :label="$t('MenuManage.RouteName')" show-overflow-tooltip min-width="160" prop="name" />
        <!-- 原: 路由Path -->
        <el-table-column align="left" :label="$t('MenuManage.RoutePath')" show-overflow-tooltip min-width="160" prop="path" />
        <!-- 原: 是否隐藏 -->
        <el-table-column align="left" :label="$t('MenuManage.IsHidden')" min-width="100" prop="hidden">
          <template #default="scope">
            <span>{{ scope.row.hidden ? $t('MenuManage.Hidden') : $t('MenuManage.Visible') }}</span>
          </template>
        </el-table-column>
        <!-- 原: 父节点 -->
        <el-table-column align="left" :label="$t('MenuManage.ParentNode')" min-width="90" prop="parentId" />
        <!-- 原: 排序 -->
        <el-table-column align="left" :label="$t('MenuManage.Sort')" min-width="70" prop="sort" />
        <!-- 原: 文件路径 -->
        <el-table-column align="left" :label="$t('MenuManage.FilePath')" min-width="360" prop="component" />
        <!-- 原: 操作 -->
        <el-table-column align="right" fixed="right" header-align="center" :label="$t('MenuManage.Actions')" :min-width="280">
          <template #default="scope">
            <!-- 原: 添加子菜单 -->
            <el-button type="primary" link icon="plus" @click="addMenu(scope.row.ID)"> {{$t('MenuManage.AddSubMenu')}} </el-button>
            <!-- 原: 编辑 -->
            <el-button type="primary" link icon="edit" @click="editMenu(scope.row.ID)"> {{$t('MenuManage.Edit')}} </el-button>
            <!-- 原: 删除 -->
            <el-button type="primary" link icon="delete" @click="deleteMenu(scope.row.ID)"> {{$t('MenuManage.Delete')}} </el-button>
          </template>
        </el-table-column>
        </el-table>
      </div>
    </TableSkeletonWrapper>
    <el-drawer v-model="dialogFormVisible" :size="appStore.drawerSize" :before-close="handleClose" :show-close="false">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ dialogTitle }}</span>
          <div>
            <!-- 原: 取 消 -->
            <el-button @click="closeDialog"> {{$t('Common.Cancel')}} </el-button>
            <!-- 原: 确 定 -->
            <el-button type="primary" @click="enterDialog"> {{$t('Common.Submit')}} </el-button>
          </div>
        </div>
      </template>

      <!-- 原: 新增菜单，需要在角色管理内配置权限才可使用 -->
      <warning-bar :title="$t('MenuManage.MenuWarning')" />

      <!-- 原: 基础信息区域 -->
      <div class="border-b border-gray-200">
        <!-- 原: 基础信息 -->
        <h3 class="font-semibold text-gray-700 mb-4">{{$t('MenuManage.BasicInfo')}}</h3>
        <el-form
          v-if="dialogFormVisible"
          ref="menuForm"
          :inline="true"
          :model="form"
          :rules="rules"
          label-position="top"
        >
          <el-row class="w-full">
            <el-col :span="24">
              <!-- 原: 文件路径 -->
              <el-form-item :label="$t('MenuManage.FilePath')" prop="component">
                <components-cascader :component="form.component" @change="fmtComponent" />
                <div class="form-tip">
                  <el-icon><InfoFilled /></el-icon>
                  <!-- 原: 如果菜单包含子菜单，请创建router-view二级路由页面或者 -->
                  <span>{{$t('MenuManage.FormTipSubMenu')}}</span>
                  <!-- 原: 点我设置 -->
                  <el-button size="small" type="text" @click="form.component = 'view/routerHolder.vue'">
                    {{$t('MenuManage.FormTipClickMe')}}
                  </el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="w-full">
            <el-col :span="12">
              <!-- 原: 展示名称 -->
              <el-form-item :label="$t('MenuManage.DisplayName')" prop="meta.title">
                <el-input v-model="form.meta.title" autocomplete="off" :placeholder="$t('MenuManage.PlaceholderDisplayName')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 原: 路由Name -->
              <el-form-item :label="$t('MenuManage.RouteName')" prop="path">
                <el-input v-model="form.name" autocomplete="off" :placeholder="$t('MenuManage.PlaceholderRouteName')" @change="changeName" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 原: 路由配置区域 -->
      <div class="border-b border-gray-200">
        <!-- 原: 路由配置 -->
        <h3 class="font-semibold text-gray-700 mb-4">{{$t('MenuManage.RouteConfig')}}</h3>
        <el-form :inline="true" :model="form" :rules="rules" label-position="top">
          <el-row class="w-full">
            <el-col :span="12">
              <!-- 原: 父节点ID -->
              <el-form-item :label="$t('MenuManage.ParentNodeID')">
                <el-cascader
                  v-model="form.parentId"
                  style="width: 100%"
                  :disabled="!isEdit"
                  :options="menuOption"
                  :props="{
                    checkStrictly: true,
                    label: 'title',
                    value: 'ID',
                    disabled: 'disabled',
                    emitPath: false
                  }"
                  :show-all-levels="false"
                  filterable
                  :placeholder="$t('MenuManage.PlaceholderSelectParent')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="path">
                <template #label>
                  <div class="inline-flex items-center h-4">
                    <!-- 原: 路由Path -->
                    <span>{{$t('MenuManage.RoutePath')}}</span>
                    <!-- 原: 添加参数 -->
                    <el-checkbox class="ml-2" v-model="checkFlag">{{$t('MenuManage.AddParams')}}</el-checkbox>
                  </div>
                </template>
                <el-input
                  v-model="form.path"
                  :disabled="!checkFlag"
                  autocomplete="off"
                  :placeholder="$t('MenuManage.PlaceholderRoutePath')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 原: 显示设置区域 -->
      <div class="border-b border-gray-200">
        <!-- 原: 显示设置 -->
        <h3 class="font-semibold text-gray-700 mb-4">{{$t('MenuManage.DisplaySettings')}}</h3>
        <el-form :inline="true" :model="form" :rules="rules" label-position="top">
          <el-row class="w-full">
            <el-col :span="8">
              <!-- 原: 图标 -->
              <el-form-item :label="$t('MenuManage.Icon')" prop="meta.icon">
                <icon v-model="form.meta.icon" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- 原: 排序标记 -->
              <el-form-item :label="$t('MenuManage.SortMark')" prop="sort">
                <el-input v-model.number="form.sort" autocomplete="off" :placeholder="$t('MenuManage.PlaceholderSort')" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- 原: 是否隐藏 -->
              <el-form-item :label="$t('MenuManage.IsHidden')">
                <el-select v-model="form.hidden" style="width: 100%" :placeholder="$t('MenuManage.PlaceholderIsHidden')">
                  <el-option :value="false" :label="$t('MenuManage.No')" />
                  <el-option :value="true" :label="$t('MenuManage.Yes')" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 原: 高级配置区域 -->
      <div class="border-b border-gray-200">
        <!-- 原: 高级配置 -->
        <h3 class="font-semibold text-gray-700 mb-4">{{$t('MenuManage.AdvancedConfig')}}</h3>
        <el-form :inline="true" :model="form" :rules="rules" label-position="top">
          <el-row class="w-full">
            <el-col :span="12">
              <el-form-item prop="meta.activeName">
                <template #label>
                  <div class="label-with-tooltip">
                    <!-- 原: 高亮菜单 -->
                    <span>{{$t('MenuManage.HighlightMenu')}}</span>
                    <!-- 原: 注：当到达此路由时候，指定左侧菜单指定name会处于活跃状态（亮起），可为空，为空则为本路由Name。 -->
                    <el-tooltip
                      :content="$t('MenuManage.TooltipHighlightMenu')"
                      placement="top"
                      effect="light"
                    >
                      <el-icon><QuestionFilled /></el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <el-input
                  v-model="form.meta.activeName"
                  :placeholder="form.name || $t('MenuManage.PlaceholderHighlightMenu')"
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 原: KeepAlive -->
              <el-form-item :label="$t('MenuManage.KeepAlive')" prop="meta.keepAlive">
                <el-select v-model="form.meta.keepAlive" style="width: 100%" :placeholder="$t('MenuManage.PlaceholderKeepAlive')">
                  <el-option :value="false" :label="$t('MenuManage.No')" />
                  <el-option :value="true" :label="$t('MenuManage.Yes')" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="w-full">
            <el-col :span="8">
              <!-- 原: CloseTab -->
              <el-form-item :label="$t('MenuManage.CloseTab')" prop="meta.closeTab">
                <el-select v-model="form.meta.closeTab" style="width: 100%" :placeholder="$t('MenuManage.PlaceholderCloseTab')">
                  <el-option :value="false" :label="$t('MenuManage.No')" />
                  <el-option :value="true" :label="$t('MenuManage.Yes')" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <template #label>
                  <div class="label-with-tooltip">
                    <!-- 原: 是否为基础页面 -->
                    <span>{{$t('MenuManage.IsBasePage')}}</span>
                    <!-- 原: 此项选择为是，则不会展示左侧菜单以及顶部信息。 -->
                    <el-tooltip :content="$t('MenuManage.TooltipIsBasePage')" placement="top" effect="light">
                      <el-icon><QuestionFilled /></el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <el-select v-model="form.meta.defaultMenu" style="width: 100%" :placeholder="$t('MenuManage.PlaceholderIsBasePage')">
                  <el-option :value="false" :label="$t('MenuManage.No')" />
                  <el-option :value="true" :label="$t('MenuManage.Yes')" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <template #label>
                  <div class="label-with-tooltip">
                    <!-- 原: 路由切换动画 -->
                    <span>{{$t('MenuManage.RouteTransition')}}</span>
                    <!-- 原: 如果设置了路由切换动画，在本路由下的动画优先级高于全局动画切换优先级。 -->
                    <el-tooltip
                      :content="$t('MenuManage.TooltipRouteTransition')"
                      placement="top"
                      effect="light"
                    >
                      <el-icon><QuestionFilled /></el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <el-select v-model="form.meta.transitionType" style="width: 100%" :placeholder="$t('MenuManage.FollowGlobal')" clearable>
                  <!-- 原: 淡入淡出 -->
                  <el-option value="fade" :label="$t('MenuManage.Fade')" />
                  <!-- 原: 滑动 -->
                  <el-option value="slide" :label="$t('MenuManage.Slide')" />
                  <!-- 原: 缩放 -->
                  <el-option value="zoom" :label="$t('MenuManage.Zoom')" />
                  <!-- 原: 无动画 -->
                  <el-option value="none" :label="$t('MenuManage.NoAnimation')" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 原: 菜单参数配置区域 -->
      <div class="border-b border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <!-- 原: 菜单参数配置 -->
          <h3 class="font-semibold text-gray-700">{{$t('MenuManage.ParameterConfig')}}</h3>
          <!-- 原: 新增菜单参数 -->
          <el-button type="primary" size="small" @click="addParameter(form)"> {{$t('MenuManage.AddParameter')}} </el-button>
        </div>
        <el-table :data="form.parameters" style="width: 100%" class="parameter-table">
          <!-- 原: 参数类型 -->
          <el-table-column align="center" prop="type" :label="$t('MenuManage.ParameterType')" width="150">
            <template #default="scope">
              <el-select v-model="scope.row.type" placeholder="请选择" size="small">
                <el-option key="query" value="query" label="query" />
                <el-option key="params" value="params" label="params" />
              </el-select>
            </template>
          </el-table-column>
          <!-- 原: 参数key -->
          <el-table-column align="center" prop="key" :label="$t('MenuManage.ParameterKey')" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.key" size="small" :placeholder="$t('MenuManage.PlaceholderParameterKey')" />
            </template>
          </el-table-column>
          <!-- 原: 参数值 -->
          <el-table-column align="center" prop="value" :label="$t('MenuManage.ParameterValue')">
            <template #default="scope">
              <el-input v-model="scope.row.value" size="small" :placeholder="$t('MenuManage.PlaceholderParameterValue')" />
            </template>
          </el-table-column>
          <!-- 原: 操作 -->
          <el-table-column align="right" header-align="center" :label="$t('MenuManage.Actions')" width="100">
            <template #default="scope">
              <el-button type="danger" size="small" @click="deleteParameter(form.parameters, scope.$index)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 原: 可控按钮配置区域 -->
      <div class="mb-2 mt-2">
        <div class="flex justify-between items-center mb-4">
          <!-- 原: 可控按钮配置 -->
          <h3 class="font-semibold text-gray-700">{{$t('MenuManage.ButtonConfig')}}</h3>
          <div class="flex items-center gap-2">
            <!-- 原: 新增可控按钮 -->
            <el-button type="primary" size="small" @click="addBtn(form)"> {{$t('MenuManage.AddButton')}} </el-button>
            <!-- 原: 点击查看按钮权限配置文档 -->
            <el-tooltip :content="$t('MenuManage.TooltipButtonConfig')" placement="top" effect="light">
              <el-icon
                class="cursor-pointer text-blue-500 hover:text-blue-700"
                @click="toDoc('https://www.gin-vue-admin.com/guide/web/button-auth.html')"
              >
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
        <el-table :data="form.menuBtn" style="width: 100%" class="button-table">
          <!-- 原: 按钮名称 -->
          <el-table-column align="center" prop="name" :label="$t('MenuManage.ButtonName')" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.name" size="small" :placeholder="$t('MenuManage.PlaceholderButtonName')" />
            </template>
          </el-table-column>
          <!-- 原: 备注 -->
          <el-table-column align="center" prop="desc" :label="$t('MenuManage.Remark')">
            <template #default="scope">
              <el-input v-model="scope.row.desc" size="small" :placeholder="$t('MenuManage.PlaceholderRemark')" />
            </template>
          </el-table-column>
          <!-- 原: 操作 -->
          <el-table-column align="right" header-align="center" :label="$t('MenuManage.Actions')" width="100">
            <template #default="scope">
              <el-button type="danger" size="small" @click="deleteBtn(form.menuBtn, scope.$index)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
  import { updateBaseMenu, getMenuList, addBaseMenu, deleteBaseMenu, getBaseMenuById } from '@/api/menu'
  import icon from '@/view/superAdmin/menu/icon.vue'
  import WarningBar from '@/components/warningBar/warningBar.vue'
  import { canRemoveAuthorityBtnApi } from '@/api/authorityBtn'
  import { computed, ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { QuestionFilled, InfoFilled, Delete } from '@element-plus/icons-vue'
  import { toDoc } from '@/utils/doc'
  import { toLowerCase } from '@/utils/stringFun'
  import ComponentsCascader from '@/view/superAdmin/menu/components/components-cascader.vue'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  import pathInfo from '@/pathInfo.json'
  import { useAppStore } from '@/pinia'

  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  defineOptions({
    name: 'Menus'
  })

  const appStore = useAppStore()

  const rules = computed(() => ({
    // '请输入菜单name'
    path: [{ required: true, message: t('MenuManage.PlaceholderMenuName'), trigger: 'blur' }],
    // '请输入文件路径'
    component: [{ required: true, message: t('MenuManage.PlaceholderFilePath'), trigger: 'blur' }],
    // '请输入菜单展示名称'
    'meta.title': [{ required: true, message: t('MenuManage.PlaceholderDisplayName'), trigger: 'blur' }]
  }))

  const tableData = ref([])
  const loading = ref(false)
  const skeletonRowCount = 12
  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getMenuList({ pageSize: 999 })
      if (table.code === 0) {
        tableData.value = table.data
      }
    } finally {
      loading.value = false
    }
  }

  getTableData()

  // 新增参数
  const addParameter = (form) => {
    if (!form.parameters) {
      form.parameters = []
    }
    form.parameters.push({
      type: 'query',
      key: '',
      value: ''
    })
  }

  const fmtComponent = (component) => {
    form.value.component = component.replace(/\\/g, '/')
    form.value.name = toLowerCase(pathInfo['/src/' + component])
    form.value.path = form.value.name
  }

  // 删除参数
  const deleteParameter = (parameters, index) => {
    parameters.splice(index, 1)
  }

  // 新增可控按钮
  const addBtn = (form) => {
    if (!form.menuBtn) {
      form.menuBtn = []
    }
    form.menuBtn.push({
      name: '',
      desc: ''
    })
  }
  // 删除可控按钮
  const deleteBtn = async (btns, index) => {
    const btn = btns[index]
    if (btn.ID === 0) {
      btns.splice(index, 1)
      return
    }
    const res = await canRemoveAuthorityBtnApi({ id: btn.ID })
    if (res.code === 0) {
      btns.splice(index, 1)
    }
  }

  const form = ref({
    ID: 0,
    path: '',
    name: '',
    hidden: false,
    parentId: 0,
    component: '',
    meta: {
      activeName: '',
      title: '',
      icon: '',
      defaultMenu: false,
      closeTab: false,
      keepAlive: false
    },
    parameters: [],
    menuBtn: []
  })
  const changeName = () => {
    form.value.path = form.value.name
  }

  const handleClose = (done) => {
    initForm()
    done()
  }
  // 删除菜单
  const deleteMenu = (ID) => {
    ElMessageBox.confirm('此操作将永久删除所有角色下该菜单, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const res = await deleteBaseMenu({ ID })
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
  // 初始化弹窗内表格方法
  const menuForm = ref(null)
  const checkFlag = ref(false)
  const initForm = () => {
    checkFlag.value = false
    menuForm.value.resetFields()
    form.value = {
      ID: 0,
      path: '',
      name: '',
      hidden: false,
      parentId: 0,
      component: '',
      meta: {
        title: '',
        icon: '',
        defaultMenu: false,
        closeTab: false,
        keepAlive: false
      }
    }
  }
  // 关闭弹窗

  const dialogFormVisible = ref(false)
  const closeDialog = () => {
    initForm()
    dialogFormVisible.value = false
  }
  // 添加menu
  const enterDialog = async () => {
    menuForm.value.validate(async (valid) => {
      if (valid) {
        let res
        if (isEdit.value) {
          res = await updateBaseMenu(form.value)
        } else {
          res = await addBaseMenu(form.value)
        }
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: isEdit.value ? '编辑成功' : '添加成功，请到角色管理页面分配权限'
          })
          getTableData()
        }
        initForm()
        dialogFormVisible.value = false
      }
    })
  }

  const menuOption = ref([
    {
      ID: '0',
      title: '根菜单'
    }
  ])
  const setOptions = () => {
    menuOption.value = [
      {
        ID: 0,
        title: '根目录'
      }
    ]
    setMenuOptions(tableData.value, menuOption.value, false)
  }
  const setMenuOptions = (menuData, optionsData, disabled) => {
    menuData &&
      menuData.forEach((item) => {
        if (item.children && item.children.length) {
          const option = {
            title: item.meta.title,
            ID: item.ID,
            disabled: disabled || item.ID === form.value.ID,
            children: []
          }
          setMenuOptions(item.children, option.children, disabled || item.ID === form.value.ID)
          optionsData.push(option)
        } else {
          const option = {
            title: item.meta.title,
            ID: item.ID,
            disabled: disabled || item.ID === form.value.ID
          }
          optionsData.push(option)
        }
      })
  }

  // 添加菜单方法，id为 0则为添加根菜单
  const isEdit = ref(false)
  const dialogTitle = ref('新增菜单')
  const addMenu = (id) => {
    dialogTitle.value = '新增菜单'
    form.value.parentId = id
    isEdit.value = false
    setOptions()
    dialogFormVisible.value = true
  }
  // 修改菜单方法
  const editMenu = async (id) => {
    dialogTitle.value = '编辑菜单'
    const res = await getBaseMenuById({ id })
    form.value = res.data.menu
    isEdit.value = true
    setOptions()
    dialogFormVisible.value = true
  }
</script>

<style scoped lang="scss">
  .menu-page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .menu-page :deep(.table-skeleton-wrapper) {
    flex: 1;
    display: flex;
  }

  .menu-page :deep(.table-skeleton__content),
  .menu-page :deep(.table-skeleton),
  .menu-page :deep(.table-skeleton__table) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .menu-page .gva-table-box {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .menu-page .gva-table-box :deep(.el-table) {
    flex: 1;
  }

  .warning {
    color: #dc143c;
  }
  .icon-column {
    display: flex;
    align-items: center;
    .el-icon {
      margin-right: 8px;
    }
  }

  .form-tip {
    margin-top: 8px;
    font-size: 12px;
    color: #909399;
    display: flex;
    align-items: center;
    gap: 8px;

    .el-icon {
      color: #409eff;
    }
  }

  .label-with-tooltip {
    display: flex;
    align-items: center;
    gap: 6px;

    .el-icon {
      color: #909399;
      cursor: help;

      &:hover {
        color: #409eff;
      }
    }
  }

  .parameter-table,
  .button-table {
    border: 1px solid #ebeef5;
    border-radius: 6px;

    :deep(.el-table__header) {
      background-color: #fafafa;
    }

    :deep(.el-table__body) {
      .el-table__row {
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
</style>
