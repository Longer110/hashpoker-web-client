<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="2"
      :search-button-count="2"
      :row-count="pageSize"
      :show-toolbar="true"
      :toolbar-button-count="1"
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
            <!-- 状态 -->
            <el-form-item :label="$t('ActivityDefine.Status')">
              <el-select
                clearable
                v-model="searchInfo.state"
                :placeholder="$t('ActivityDefine.SelectStatus')"
                style="width: 240px"
              >
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <!-- 活动分类 -->
            <el-form-item :label="$t('ActivityDefine.ActivityCategory')">
              <el-select
                clearable
                v-model="searchInfo.typeId"
                :placeholder="$t('ActivityDefine.SelectActivityCategory')"
                style="width: 240px"
              >
                <el-option v-for="item in flOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
          <!-- 新增 -->
          <el-button type="primary" icon="plus" @click="openDialog()">{{ $t('ActivityDefine.Add') }}</el-button>
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
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column align="center" type="index" width="70" :label="$t('ActivityDefine.Index')" />
          <el-table-column align="center" :label="$t('ActivityDefine.Title')" prop="title" min-width="150" sortable />
          <el-table-column align="center" :label="$t('ActivityDefine.ActivityName')" prop="name" width="120" sortable />

          <el-table-column align="center" :label="$t('ActivityDefine.Status')" prop="state" min-width="120" sortable>
            <!-- 使用模板自定义显示内容 -->
            <template #default="scope">
              <!-- scope.row 可以获取当前行的数据 -->
              <span v-if="scope.row.state == 1">{{ $t('ActivityDefine.StatusOpen') }}</span>
              <span v-else>{{ $t('ActivityDefine.StatusClosed') }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('ActivityDefine.Sort')" prop="sort" min-width="120" sortable />

          <el-table-column align="center" :label="$t('ActivityDefine.CoverImage')" prop="image" min-width="200">
            <template #default="scope">
              <img
                :src="scope.row.image"
                :alt="$t('ActivityDefine.CoverImage')"
                style=" max-width: 400px; height: 100px; cursor: pointer;"
                v-viewer
              />



            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="id字段" prop="ID" min-width="120" /> -->
          <!-- <el-table-column align="center" label="活动分类ID" prop="type_id" min-width="120" /> -->

          <el-table-column align="center" :label="$t('ActivityDefine.Link')" prop="url" min-width="480" />
          <el-table-column align="center" :label="$t('ActivityDefine.StartTime')" prop="startTime" min-width="180">
            <template #default="scope">{{ formatTimestamp(scope.row.startTime) }}</template>
          </el-table-column>

          <el-table-column align="center" :label="$t('ActivityDefine.EndTime')" prop="endTime" min-width="180">
            <template #default="scope">{{ formatTimestamp(scope.row.endTime) }}</template>
          </el-table-column>

          <el-table-column align="center" :label="$t('ActivityDefine.CreatedAt')" prop="CreatedAt" min-width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
          </el-table-column>

          <el-table-column align="center" :label="$t('ActivityDefine.Actions')" fixed="right" :min-width="160">
            <template #default="scope">
              <el-button
                type="primary"
                link
                icon="edit"
                class="table-button"
                @click="updateActivityDefineFunc(scope.row)"
                >{{ $t('ActivityDefine.Edit') }}</el-button
              >
              <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">{{ $t('ActivityDefine.Delete') }}</el-button>
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
          <span class="text-lg">{{ type === 'create' ? $t('ActivityDefine.Add') : $t('ActivityDefine.Edit') }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">{{ $t('Common.Confirm') }}</el-button>
            <el-button @click="closeDialog">{{ $t('Common.Cancel') }}</el-button>
          </div>
        </div>
      </template>

      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rules" label-width="80px">
        <!-- 标题: -->
        <el-form-item :label="$t('ActivityDefine.TitleLabel')" prop="title">
          <el-input
            v-model="formData.title"
            :clearable="true"
            :placeholder="$t('ActivityDefine.TitlePlaceholder')"
            :maxlength="6"
          />
        </el-form-item>
        <!-- 活动名称: -->
        <el-form-item :label="$t('ActivityDefine.ActivityNameLabel')" prop="name">
          <el-input
            v-model="formData.name"
            :clearable="true"
            :placeholder="$t('ActivityDefine.ActivityNamePlaceholder')"
            :maxlength="6"
          />
        </el-form-item>
        <!-- {{ formData.image }} -->
        <!-- 请选择要上传的图片(再次点击可更换): -->
        <el-form-item :label="$t('ActivityDefine.UploadImageLabel')" prop="image">
          <el-upload
            :action="`#`"
            :before-upload="checkFile"
            :on-success="uploadSuccess"
            :show-file-list="false"
            :headers="{ 'x-token': token }"
            multiple
            class="avatar-uploader"
            style="position: relative"
          >
            <img v-show="isImg" :src="formData.image" class="avatar" />

            <el-icon
              v-if="!isImg"
              class="avatar-uploader-icon"
              style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
              ><Plus
            /></el-icon>
          </el-upload>
        </el-form-item>
        <!-- 排序: -->
        <el-form-item :label="$t('ActivityDefine.SortLabel')" prop="sort">
          <el-input-number v-model.number="formData.sort" :min="1" :max="20" />
        </el-form-item>
        <!-- 状态 -->
        <el-form-item :label="$t('ActivityDefine.Status')">
          <el-select v-model="formData.state" :placeholder="$t('ActivityDefine.SelectStatus')" style="width: 240px">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 开始时间: -->
        <el-form-item :label="$t('ActivityDefine.StartTimeLabel')" prop="startTime">
          <el-date-picker
            v-model="formData.startTime"
            type="datetime"
            :placeholder="$t('ActivityDefine.StartTimePlaceholder')"
            clearable
          />
        </el-form-item>
        <!-- 结束时间: -->
        <el-form-item :label="$t('ActivityDefine.EndTimeLabel')" prop="endTime">
          <el-date-picker
            v-model="formData.endTime"
            type="datetime"
            :placeholder="$t('ActivityDefine.EndTimePlaceholder')"
            clearable
          />
        </el-form-item>

        <!-- 活动分类 -->
        <el-form-item :label="$t('ActivityDefine.ActivityCategory')" prop="type_id">
          <el-select v-model="formData.type_id" :placeholder="$t('ActivityDefine.SelectActivityCategory')" style="width: 240px">
            <el-option v-for="item in flOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <!-- 链接: -->
        <el-form-item :label="$t('ActivityDefine.LinkLabel')" prop="url">
          <el-input v-model="formData.url" :clearable="true" :placeholder="$t('ActivityDefine.LinkPlaceholder')" />
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="detailShow"
      :show-close="true"
      :before-close="closeDetailShow"
      :title="$t('ActivityDefine.View')"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item :label="$t('ActivityDefine.DetailIdField')">
          {{ detailForm.id }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailCreatedAtField')">
          {{ detailForm.CreatedAt }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailUpdatedAtField')">
          {{ detailForm.updatedAt }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailDeletedAtField')">
          {{ detailForm.deletedAt }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailChannel')">
          {{ detailForm.channel }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailActivityId')">
          {{ detailForm.actId }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailActivityName')">
          {{ detailForm.name }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailStatus')">
          {{ detailForm.state }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailSort')">
          {{ detailForm.sort }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailStartTime')">
          {{ detailForm.startTime }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailEndTime')">
          {{ detailForm.endTime }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailConfig')">
          {{ detailForm.config }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailBaseConfig')">
          {{ detailForm.baseConfig }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailImage')">
          {{ detailForm.image }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailImageLang')">
          {{ detailForm.imageLang }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.DetailRecharge')">
          {{ detailForm.recharge }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('ActivityDefine.Title')">
          {{ detailForm.title }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import {
    createActivityDefine,
    deleteActivityDefine,
    deleteActivityDefineByIds,
    updateActivityDefine,
    findActivityDefine,
    getActivityDefineList
  } from '@/api/dezhou/activityDefine'
  import dayjs from 'dayjs'

  const formatTimestamp = (timestamp) => {
    return dayjs(timestamp).format('YYYY/MM/DD HH:mm:ss')
  }

  // 获取活动分类列表定义下拉框
  import { getActivityTypeListApi } from '@/api/dezhou/activityClassification'

  // 导入文件上传
  import { uploadFile } from '@/api/fileUploadAndDownload'
  // 全量引入格式化工具 请按需保留
  import { formatDate } from '@/utils/format'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, reactive, computed } from 'vue'
  import { useAppStore } from '@/pinia'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'ActivityDefine'
  })
  const { t } = useI18n()

  const statusOptions = computed(() => [
    { label: t('ActivityDefine.StatusOpen'), value: 1 },
    { label: t('ActivityDefine.StatusClosed'), value: 0 }
  ])
  // 提交按钮loading
  const btnLoading = ref(false)
  const appStore = useAppStore()

  // 自动化生成的字典（可能为空）以及字段
  const formData = ref({
    name: '', //名称
    type_id: '', //活动分类
    title: '', //标题
    image: '', //封面图
    url: '', //链接
    state: 1, //活动状态
    sort: 1, //排序
    startTime: undefined, //开始时间
    endTime: undefined //结束时间
  })

  // 验证规则
  const rules = reactive({
    title: [{ required: true, message: t('ActivityDefine.ValidateTitle'), trigger: 'blur' }],
    name: [{ required: true, message: t('ActivityDefine.ValidateActivityName'), trigger: 'blur' }],
    image: [{ required: true, message: t('ActivityDefine.ValidateImage'), trigger: 'blur' }],
    startTime: [{ required: true, message: t('ActivityDefine.ValidateStartTime'), trigger: 'blur' }],
    endTime: [{ required: true, message: t('ActivityDefine.ValidateEndTime'), trigger: 'blur' }],
    type_id: [{ required: true, message: t('ActivityDefine.ValidateActivityCategory'), trigger: 'blur' }],
    url: [{ required: true, message: t('ActivityDefine.ValidateLink'), trigger: 'blur' }]
  })

  const elFormRef = ref()
  const elSearchFormRef = ref()

  // =========== 表格控制部分 ===========
  const loading = ref(false)
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})
  // 重置
  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }

  // 搜索
  const onSubmit = () => {
    elSearchFormRef.value?.validate(async (valid) => {
      if (!valid) return
      page.value = 1
      getTableData()
    })
  }

  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  // 修改页面容量
  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getActivityDefineList({
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

  // ============== 表格控制部分结束 ===============

  // 获取需要的字典 可能为空 按需保留
  const setOptions = async () => {}

  // 获取需要的字典 可能为空 按需保留
  setOptions()

  // 多选数据
  const multipleSelection = ref([])
  // 多选
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  // 删除行
  const deleteRow = (row) => {
    console.log(row.ID)

    ElMessageBox.confirm(t('ActivityDefine.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(() => {
      deleteActivityDefine({ id: row.ID }).then((res) => {
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: t('ActivityDefine.DeleteSuccess')
          })
          getTableData()
        }
      })
    })
  }

  // 多选删除
  const onDelete = async () => {
    ElMessageBox.confirm(t('ActivityDefine.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: t('ActivityDefine.SelectDeleteWarning')
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map((item) => {
          ids.push(item.id)
        })
      const res = await deleteActivityDefineByIds({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('ActivityDefine.DeleteSuccess')
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }

  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('')

  // 更新行
  const updateActivityDefineFunc = async (row) => {
    console.log('更新行: ', row)
    type.value = 'update'
    formData.value.ID = row.ID
    formData.value.name = row.name
    formData.value.type_id = row.type_id
    formData.value.title = row.title
    formData.value.image = row.image
    formData.value.url = row.url
    formData.value.state = row.state
    formData.value.sort = row.sort
    formData.value.startTime = row.startTime
    formData.value.endTime = row.endTime
    isImg.value = true
    dialogFormVisible.value = true
    getActivityTypeListApi().then((res) => {
      let newList = []
      if (res.code == 0) {
        console.log(res.data)
        res.data.list.map((item) => {
          newList.push({
            label: item.name,
            value: item.id
          })
        })
      }
      flOptions.value = newList
      console.log('flOptions', newList)
    })
  }

  let flOptions = ref([])
  const flOptionsFn = () => {
    getActivityTypeListApi().then((res) => {
      let newList = []
      if (res.code == 0) {
        console.log(res.data)
        res.data.list.map((item) => {
          newList.push({
            label: item.name,
            value: item.id
          })
        })
      }
      flOptions.value = newList
      console.log('flOptions', newList)
    })
  }
  flOptionsFn()
  // 弹窗控制标记
  const dialogFormVisible = ref(false)

  // 打开弹窗
  const openDialog = () => {
    type.value = 'create'

    flOptionsFn()
    dialogFormVisible.value = true
  }

  // 关闭弹窗
  const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
      name: '', //名称
      type_id: null, //活动分类
      title: '', //标题
      image: '.png', //封面图
      url: '', //链接
      state: 1, //活动状态
      sort: 1, //排序
      startTime: undefined, //开始时间
      endTime: undefined //结束时间
    }
    isImg.value = false
  }
  // 弹窗确定
  const enterDialog = async () => {
    btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
      formData.value.startTime = new Date(formData.value.startTime).getTime()
      formData.value.endTime = new Date(formData.value.endTime).getTime()
      let res
      switch (type.value) {
        case 'create':
          res = await createActivityDefine(formData.value)
          break
        case 'update':
          res = await updateActivityDefine(formData.value)
          break
        default:
          res = await createActivityDefine(formData.value)
          break
      }
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('GlobalUniversality.OperationSuccessful')
        })
        closeDialog()
        getTableData()
      }
    })
  }

  const detailForm = ref({})

  // 查看详情控制标记
  const detailShow = ref(false)

  // 打开详情弹窗
  const openDetailShow = () => {
    detailShow.value = true
  }

  // 打开详情
  const getDetails = async (row) => {
    // 打开弹窗
    const res = await findActivityDefine({ id: row.id })
    if (res.code === 0) {
      detailForm.value = res.data
      openDetailShow()
    }
  }

  // 关闭详情弹窗
  const closeDetailShow = () => {
    detailShow.value = false
    detailForm.value = {}
    isImg.value = false
  }
  // 先定义判断文件类型的方法
  const getFileType = (filename) => {
    console.log('getFileType: ', filename)

    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
    const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm']

    const ext = filename.split('.').pop()?.toLowerCase()

    if (imageExts.includes(ext)) {
      return 'image'
    } else if (videoExts.includes(ext)) {
      return 'video'
    } else {
      return 'other'
    }
  }

  let isImg = ref(false)
  const uploadSuccess = (res) => {
    const { data } = res
    if (data.file) {
      console.log(data.file)
    }
  }
  const checkFile = async (file) => {
    console.log('f', file)

    const sizeLimit = file.size / 1024 / 1024 < 5
    if (!sizeLimit) {
      ElMessage.error(t('ActivityDefine.FileSizeLimit'))
      return false
    }

    const data = new FormData()
    //使用append存储信息，append('键名','键值')
    data.append('file', file)

    try {
      // 判断文件类型
      const fileType = getFileType(file.name)

      // 根据类型给不同变量赋值
      if (fileType === 'image') {
        const res = await uploadFile(data)
        console.log('upload image response: ', res.data)

        formData.value.image = res.data.file.url
        isImg.value = true
      } else {
        ElMessage.error(t('ActivityDefine.ImageTypeOnly'))
      }
    } catch (error) {
      console.error('upload file failed: ', error)
      // 处理上传失败的情况
    }
  }
</script>

<style lang="scss">
  .avatar-uploader {
    min-width: 200px;
    height: 200px;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 200px;
      // margin: auto;
    }
    .avatar-uploader-icon {
      font-size: 100px;
    }
  }
</style>
