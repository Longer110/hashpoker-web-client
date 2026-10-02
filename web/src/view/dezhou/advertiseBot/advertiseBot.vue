<template>
  <div>
    <!-- {{ SendingTypeOptions }} -->
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="4"
      :search-button-count="2"
      :show-toolbar="true"
      :toolbar-button-count="2"
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
            <!-- 原: 标题: -->
            <el-form-item :label="$t('AdvertiseBot.Title')" prop="title">
              <el-input v-model="searchInfo.title"  :placeholder="$t('AdvertiseBot.PlaceholderTitle')" clearable style="width: 240px"/>
            </el-form-item>

            <!-- 原: 文案类型 -->
            <el-form-item :label="$t('AdvertiseBot.CopyType')" prop="type">
              <el-select clearable v-model="searchInfo.type" :placeholder="$t('AdvertiseBot.PlaceholderCopyType')" style="width: 240px">
                <el-option v-for="item in copyTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <!-- 原: 发送类型 -->
            <el-form-item :label="$t('AdvertiseBot.SendType')" prop="sendType">
              <el-select clearable v-model="searchInfo.sendType" :placeholder="$t('AdvertiseBot.PlaceholderSendType')" style="width: 240px">
                <el-option v-for="item in SendingTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <!-- 原: 广告状态 -->
            <el-form-item :label="$t('AdvertiseBot.AdvertiseStatus')" prop="status">
              <el-select clearable v-model="searchInfo.status" :placeholder="$t('AdvertiseBot.PlaceholderAdvertiseStatus')" style="width: 240px">
                <el-option
                  v-for="item in advertisementStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
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
          <!-- 原: 新增 -->
          <el-button type="primary" icon="plus" @click="openDialog()">{{ $t('AdvertiseBot.Add') }}</el-button>
          <!-- 原: 删除 -->
          <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete">{{ $t('AdvertiseBot.Delete') }}</el-button>
        </div>
        <el-icon :size="20" style="float: right; font-size: 33px" class="show-col-btn">
          <el-popover placement="bottom" trigger="hover" width="80">
            <template #reference>
              <el-icon :size="20"><Operation /></el-icon>
            </template>
            <div>
              <el-checkbox-group v-model="checkedColumns" @change="watchCheckedColumns" class="checkbox-wrap">
                <el-checkbox
                  size="large"
                  style="display: block"
                  v-for="item in checkBoxGroup"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-popover>
        </el-icon>

        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="30" />
          <!-- 原: 序号 -->
          <el-table-column align="center" type="index" width="70" :label="$t('AdvertiseBot.Index')" />
          <el-table-column
            v-if="colData[0].istrue"
            sortable
            align="center"
            key="Math.random()"
            label="ID"
            prop="id"
            min-width="120"
          />

          <el-table-column
            v-if="colData[1].istrue"
            sortable
            align="center"
            key="Math.random()"
            :label="$t('AdvertiseBot.Title')"
            prop="title"
            min-width="150"
          />

          <el-table-column
            v-if="colData[2].istrue"
            sortable
            align="center"
            key="Math.random()"
            :label="$t('AdvertiseBot.SendType')"
            prop="sendType"
            min-width="220"
          >
            <!-- 使用模板自定义显示内容 -->
            <template #default="scope">
              <!-- scope.row 可以获取当前行的数据 -->
              {{ typeDic[scope.row.sendType] || $t('AdvertiseBot.UnknownType') }}
            </template>
          </el-table-column>

          <el-table-column
            v-if="colData[3].istrue"
            sortable
            align="center"
            key="Math.random()"
            :label="$t('AdvertiseBot.FileType')"
            prop="type"
            min-width="180"
          >
            <!-- 使用模板自定义显示内容 -->
            <template #default="scope">
              <!-- scope.row 可以获取当前行的数据 -->
              {{ wenanType[scope.row.type] || $t('AdvertiseBot.UnknownType') }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="colData[4].istrue"
            sortable
            align="center"
            key="Math.random()"
            :label="$t('AdvertiseBot.SendTime')"
            prop="sendTime"
            min-width="180"
          >
            <template #default="scope">{{ formatDate(scope.row.sendTime) }}</template>
          </el-table-column>
          <el-table-column
            v-if="colData[5].istrue"
            sortable
            align="center"
            key="Math.random()"
            :label="$t('AdvertiseBot.SendInterval')"
            prop="sendInterval"
            min-width="120"
          />

          <el-table-column
            v-if="colData[6].istrue"
            sortable
            align="center"
            key="Math.random()"
            :label="$t('AdvertiseBot.EndTime')"
            prop="endTime"
            min-width="180"
          >
            <template #default="scope">{{ formatDate(scope.row.endTime) }}</template>
          </el-table-column>
          <el-table-column
            v-if="colData[7].istrue"
            sortable
            align="center"
            key="Math.random()"
            :label="$t('AdvertiseBot.LastSendTime')"
            prop="lastTime"
            min-width="180"
          >
            <template #default="scope">{{ formatDate(scope.row.lastTime) }}</template>
          </el-table-column>
          <!-- <el-table-column
            align="left"
            label="文本"
            prop="text"
            min-width="180"
          /> -->

          <!-- <el-table-column
            align="left"
            label="图片/视频路径"
            prop="url"
              min-width="280"
          /> -->

          <!-- <el-table-column
            align="left"
            label="是否启用Markdown语法"
            prop="isMarkdown"
            min-width="180"
          >

            <template #default="scope">

              <span v-if="scope.row.isMarkdown === 1">开启</span>
              <span v-else-if="scope.row.isMarkdown === 2">关闭</span>
            </template>
          </el-table-column> -->

          <el-table-column
            v-if="colData[8].istrue"
            sortable
            align="center"
            key="Math.random()"
            :label="$t('AdvertiseBot.AdvertiseStatus')"
            prop="status"
            width="120"
          >
            <!-- 使用模板自定义显示内容 -->
            <template #default="scope">
              <!-- scope.row 可以获取当前行的数据 -->
              <span v-if="scope.row.status === 1">{{ $t('AdvertiseBot.On') }}</span>
              <span v-else-if="scope.row.status === 2">{{ $t('AdvertiseBot.Off') }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            align="left"
            label="按钮"
            prop="buttons"
            min-width="180"
          /> -->

          <el-table-column
            v-if="colData[9].istrue"
            sortable
            align="center"
            key="Math.random()"
            :label="$t('AdvertiseBot.Remark')"
            prop="remark"
            min-width="150"
          />

          <!-- <el-table-column
            align="left"
            label="createdAt字段"
            prop="createdAt"
            width="180"
          >
            <template #default="scope">{{
              formatDate(scope.row.createdAt)
            }}</template>
          </el-table-column>
          <el-table-column
            align="left"
            label="updatedAt字段"
            prop="updatedAt"
            width="180"
          >
            <template #default="scope">{{
              formatDate(scope.row.updatedAt)
            }}</template>
          </el-table-column>
          <el-table-column
            align="left"
            label="deletedAt字段"
            prop="deletedAt"
            width="120"
          /> -->

          <!-- <el-table-column
            align="left"
            label="发送次数"
            prop="sendNumber"
            width="120"
          /> -->

          <el-table-column align="center" :label="$t('AdvertiseBot.Actions')" fixed="right" :min-width="appStore.operateMinWith">
            <template #default="scope">
              <!-- 原: 查看 -->
              <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
                <el-icon style="margin-right: 5px"><InfoFilled /></el-icon>{{ $t('AdvertiseBot.View') }}</el-button>
              <!-- 原: 编辑 -->
              <el-button type="primary" link icon="edit" class="table-button" @click="updateAdvertiseBotFunc(scope.row)">{{ $t('AdvertiseBot.Edit') }}</el-button>
              <!-- 原: 删除 -->
              <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">{{ $t('AdvertiseBot.Delete') }}</el-button>
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
          <!-- 原: 新增 / 编辑 -->
          <span class="text-lg">{{ type === 'create' ? $t('AdvertiseBot.Add') : $t('AdvertiseBot.Edit') }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">{{ $t('Common.Confirm') }}</el-button>
            <el-button @click="closeDialog">{{ $t('Common.Cancel') }}</el-button>
          </div>
        </div>
      </template>
      <!-- 新增 -->
      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="80px">
        <!-- <el-form-item label="id字段:" prop="id">
          <el-input
            v-model.number="formData.id"
            :clearable="true"
            placeholder="请输入id字段"
          />
        </el-form-item> -->
        <!-- 原: 标题: -->
        <el-form-item :label="$t('AdvertiseBot.Title')" prop="title">
          <el-input v-model="formData.title" :clearable="true" :placeholder="$t('AdvertiseBot.PlaceholderTitle')" />
        </el-form-item>
        <!-- 原: 请选择要上传的图片/视频: -->
        <el-form-item :label="$t('AdvertiseBot.ChooseUpload')" v-if="imgVideoFlag">
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
            <img v-if="formData.url" v-show="isImg" :src="formData.url" class="avatar" />

            <video
              v-show="isVideo"
              v-if="formData.url"
              :src="formData.url"
              class="avatar"
              width="400"
              height="400"
              controls
              volume="0"
              @timeupdate="handleTimeUpdate"
            ></video>
            <el-icon
              v-if="!formData.url"
              class="avatar-uploader-icon"
              style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
              ><Plus
            /></el-icon>
          </el-upload>
        </el-form-item>
        <!-- 原: 文案类型 -->
        <el-form-item :label="$t('AdvertiseBot.CopyType')" prop="type">
          <el-select
            @change="handleCopyTypeChange()"
            v-model="formData.type"
            :placeholder="$t('AdvertiseBot.PlaceholderCopyType')"
            style="width: 240px"
          >
            <el-option v-for="item in copyTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 原: 发送类型 -->
        <el-form-item :label="$t('AdvertiseBot.SendType')" prop="sendType">
          <el-select
            v-model="formData.sendType"
            :placeholder="$t('AdvertiseBot.PlaceholderSendType')"
            style="width: 240px"
            @change="handleSendTypeChange()"
          >
            <el-option v-for="item in SendingTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 原: 发送时间: -->
        <el-form-item :label="$t('AdvertiseBot.SendTime')" prop="sendTime" v-if="!isSendType">
          <el-date-picker
            v-model="formData.sendTime"
            type="datetime"
            style="width: 100%"
            :placeholder="$t('AdvertiseBot.PlaceholderSelectDate')"
            :clearable="true"
          />
        </el-form-item>
        <!-- 原: 时间间隔: -->
        <el-form-item :label="$t('AdvertiseBot.SendInterval')" prop="sendInterval" v-if="isSendType">
          <el-input v-model.number="formData.sendInterval" :clearable="true" :placeholder="$t('AdvertiseBot.PlaceholderSendInterval')" />
        </el-form-item>
        <!-- 原: 截止时间: -->
        <el-form-item :label="$t('AdvertiseBot.EndTime')" prop="endTime" v-if="isSendType">
          <el-date-picker
            v-model="formData.endTime"
            type="datetime"
            style="width: 100%"
            :placeholder="$t('AdvertiseBot.PlaceholderSelectDate')"
            :clearable="true"
          />
        </el-form-item>
        <!-- <el-form-item label="最后发送时间:" prop="lastTime">
          <el-date-picker
            v-model="formData.lastTime"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
            :clearable="true"
          />
        </el-form-item> -->

        <!-- 原: 文案内容: -->
        <el-form-item :label="$t('AdvertiseBot.Content')" prop="text">
          <el-input
            v-model="formData.text"
            style="width: 100%"
            :rows="5"
            type="textarea"
            :placeholder="$t('AdvertiseBot.PlaceholderContent')"
          />
        </el-form-item>
        <!-- <el-form-item label="图片/视频路径:" prop="url">
          <el-input
            v-model="formData.url"
            :clearable="true"
            placeholder="请输入图片/视频路径"
          />
        </el-form-item> -->
        <!-- 原: 是否启用Markdown语法: -->
        <el-form-item :label="$t('AdvertiseBot.IsMarkdown')" prop="isMarkdown">
          <el-select v-model="formData.isMarkdown" :placeholder="$t('AdvertiseBot.PlaceholderIsMarkdown')" style="width: 240px">
            <el-option v-for="item in MarkdownOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 原: 按钮（可拖拽排序按钮显示位置）: -->
        <el-form-item :label="$t('AdvertiseBot.ButtonTip')" prop="buttons">
          <div style="margin-bottom: 10px">
            <el-button @click="btnsAdd">{{ $t('AdvertiseBot.Add') }}</el-button>

            <el-popconfirm :title="$t('AdvertiseBot.ConfirmReset')" @confirm="btnsRemove()">
              <template #reference>
                <el-button>{{ $t('AdvertiseBot.Reset') }}</el-button>
              </template>
            </el-popconfirm>
          </div>
          <div class="scrollable-content" id="maincontain">
            <draggable
              :list="btnsList"
              :disabled="!btnState.enabled"
              item-key="name"
              ghost-class="ghost"
              chosen-class="chosen"
              @start="btnState.dragging = true"
              @end="btnState.dragging = false"
              animation="300"
            >
              <template #item="{ element }">
                <div style="padding: 5px 10px 5px 10px">
                  <div style="display: flex; align-items: center">
                    <el-input style="width: 150px" v-model="element.text" :placeholder="$t('AdvertiseBot.PlaceholderButtonName')"></el-input>
                    <el-input v-model="element.url" :placeholder="$t('AdvertiseBot.PlaceholderButtonUrl')"></el-input>
                    <!-- <div style="margin-left: 20px; margin-top: 10px" @click="btnsRemove(element)">   <el-icon  size="20"><circle-close-filled /></el-icon></div> -->
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </el-form-item>
        <!-- 原: 备注: -->
        <el-form-item :label="$t('AdvertiseBot.Remark')" prop="remark">
          <el-input v-model="formData.remark" :clearable="true" :placeholder="$t('AdvertiseBot.PlaceholderRemark')" />
        </el-form-item>

        <!-- 原: 广告状态: -->
        <el-form-item :label="$t('AdvertiseBot.AdvertiseStatus')" prop="status">
          <el-select v-model="formData.status" :placeholder="$t('AdvertiseBot.PlaceholderAdvertiseStatus')" style="width: 240px">
            <el-option
              v-for="item in advertisementStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="createdAt字段:" prop="createdAt">
          <el-date-picker
            v-model="formData.createdAt"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item label="updatedAt字段:" prop="updatedAt">
          <el-date-picker
            v-model="formData.updatedAt"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item label="deletedAt字段:" prop="deletedAt">
          <el-input
            v-model="formData.deletedAt"
            :clearable="true"
            placeholder="请输入deletedAt字段"
          />
        </el-form-item> -->
        <!-- <el-form-item label="发送次数:" prop="sendNumber">
          <el-input
            v-model.number="formData.sendNumber"
            :clearable="true"
            placeholder="请输入发送次数"
          />
        </el-form-item> -->
      </el-form>
    </el-drawer>

    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="detailShow"
      :show-close="true"
      :before-close="closeDetailShow"
      :title="$t('AdvertiseBot.View')"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item :label="$t('AdvertiseBot.ID')">
          {{ detailForm.id }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.Title')">
          {{ detailForm.title }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.SendType')">
          {{ typeDic[detailForm.sendType] }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.SendTime')">
          {{ formatDate(detailForm.sendTime) }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.SendInterval')">
          {{ detailForm.sendInterval }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.EndTime')">
          {{ formatDate(detailForm.endTime) }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.LastSendTime')">
          {{ formatDate(detailForm.lastTime) }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.Content')">
          {{ detailForm.text }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.FileUrl')">
          {{ detailForm.url }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.IsMarkdown')">
          {{ detailForm.isMarkdown == 1 ? $t('AdvertiseBot.On') : $t('AdvertiseBot.Off') }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.Buttons')">
          {{ detailForm.buttons }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.Remark')">
          {{ detailForm.remark }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.CopyType')">
          {{ wenanType[detailForm.type] }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.AdvertiseStatus')">
          {{ detailForm.status == 1 ? $t('AdvertiseBot.On') : $t('AdvertiseBot.Off') }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.CreateTime')">
          {{ formatDate(detailForm.createdAt) }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.UpdateTime')">
          {{ formatDate(detailForm.updatedAt) }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('AdvertiseBot.DeletedAt')">
          {{ detailForm.deletedAt }}
        </el-descriptions-item>
        <!-- <el-descriptions-item label="发送次数">
          {{ detailForm.sendNumber }}
        </el-descriptions-item> -->
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
  import {
    createAdvertiseBot,
    deleteAdvertiseBot,
    deleteAdvertiseBotByIds,
    updateAdvertiseBot,
    findAdvertiseBot,
    getAdvertiseBotList
  } from '@/api/dezhou/advertiseBot'

  // 导入文件上传
  import { uploadFile } from '@/api/fileUploadAndDownload'

  // 全量引入格式化工具 请按需保留
  import { formatDate } from '@/utils/format'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, reactive, onMounted, computed, nextTick } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAppStore } from '@/pinia'
  import { getDict } from '@/utils/dictionary'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'AdvertiseBot'
  })
  const { t } = useI18n()
  let isImg = ref(false)
  let isVideo = ref(false)
  let SendingTypeOptions = ref([])
  let advertisementStatusOptions = ref([])

  let copyTypeOptions = ref([])
  let MarkdownOptions = ref([])
  const loading = ref(false)

  const typeDic = {
    1: t('AdvertiseBot.SendOnce'),
    2: t('AdvertiseBot.SendIntervalLoop'),
    3: t('AdvertiseBot.SendRandom')
  }

  const wenanType = {
    1: t('AdvertiseBot.Text'),
    2: t('AdvertiseBot.ImageText'),
    3: t('AdvertiseBot.VideoText')
  }
  // 字典选项
  onMounted(async () => {
    console.log('------------------------')
    await getDict('advertisementSendingType').then((res) => {
      SendingTypeOptions.value = res
      console.log(res)
    })
    await getDict('advertisementStatus').then((res) => {
      advertisementStatusOptions.value = res
      console.log(res)
    })

    await getDict('copyType').then((res) => {
      copyTypeOptions.value = res
      console.log(res)
    })

    await getDict('Markdown').then((res) => {
      MarkdownOptions.value = res
      console.log(res)
    })
  })

  // 提交按钮loading
  const btnLoading = ref(false)
  const appStore = useAppStore()

  // 自动化生成的字典（可能为空）以及字段
  const formData = ref({
    id: undefined,
    title: null,
    sendType: '1',
    sendTime: new Date(),
    sendInterval: undefined,
    endTime: new Date(),
    lastTime: new Date(),
    text: null,
    url: null,
    isMarkdown: undefined,
    buttons: '[[{ text: null, url: null}]]',
    remark: '1',
    type: '1',
    status: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: '1',
    sendNumber: undefined
  })

  // 验证规则
  const rule = computed(() => ({
    title: [{ required: true, message: t('AdvertiseBot.PlaceholderTitle'), trigger: 'blur' }], // 请输入标题
    sendType: [{ required: true, message: t('AdvertiseBot.PlaceholderSendType'), trigger: 'blur' }], // 请选择发送类型
    text: [{ required: true, message: t('AdvertiseBot.PlaceholderContent'), trigger: 'blur' }] // 请输入文案内容
  }))

  const elFormRef = ref()
  const elSearchFormRef = ref()

  // =========== 表格控制部分 ===========
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
      const table = await getAdvertiseBotList({
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
    ElMessageBox.confirm(t('AdvertiseBot.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(() => {
      deleteAdvertiseBotFunc(row)
    })
  }

  // 多选删除
  const onDelete = async () => {
    ElMessageBox.confirm(t('AdvertiseBot.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({ type: 'warning', message: t('AdvertiseBot.SelectDeleteData') }) // 请选择要删除的数据
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map((item) => {
          ids.push(item.id)
        })
      const res = await deleteAdvertiseBotByIds({ ids })
      if (res.code === 0) {
        ElMessage({ type: 'success', message: t('AdvertiseBot.DeleteSuccess') }) // 删除成功
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
  const updateAdvertiseBotFunc = async (row) => {
    console.log('编辑')

    const res = await findAdvertiseBot({ id: row.id })
    type.value = 'update'
    if (res.code === 0) {
      formData.value = res.data

      formData.value.sendType = String(formData.value.sendType)
      formData.value.status = String(formData.value.status)
      formData.value.sendInterval = String(formData.value.sendInterval)
      formData.value.type = String(formData.value.type)
      formData.value.isMarkdown = String(formData.value.isMarkdown)
      // 如果文案为纯文本就删除之前上传过的文件
      if (formData.value.type == 1) {
        imgVideoFlag.value = false
      } else {
        imgVideoFlag.value = true
      }
      formData.value.url = res.data.url

      if (res.data.buttons == '') {
        btnsList.value = [{}]
      } else {
        btnsList.value = JSON.parse(res.data.buttons)[0]
      }

      // 类型
      // if (formData.value.type == "1") {
      //     isImg.value = false
      //   isVideo.value = false

      // } else {
      //      isImg.value = true
      //   isVideo.value = true

      // }

      // 判断文件类型
      const fileType = getFileType(res.data.url)

      // 根据类型给不同变量赋值
      if (fileType === 'image') {
        console.log('upload file success: ', res.data)
        isImg.value = true
        isVideo.value = false
      } else if (fileType === 'video') {
        console.log('upload file success: ', res.data)
        isImg.value = false
        isVideo.value = true
      }

      // 编辑时发送弹框关联
      if (formData.value.sendType == 1) {
        formData.value.sendInterval = ''
        formData.value.endTime = ''
        isSendType.value = false
      } else {
        isSendType.value = true
        formData.value.sendTime = ''
      }
    }
    dialogFormVisible.value = true
  }

  // 删除行
  const deleteAdvertiseBotFunc = async (row) => {
    const res = await deleteAdvertiseBot({ id: row.id })
    if (res.code === 0) {
      ElMessage({ type: 'success', message: t('AdvertiseBot.DeleteSuccess') }) // 删除成功
      if (tableData.value.length === 1 && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  }

  // 弹窗控制标记
  const dialogFormVisible = ref(false)

  // 打开弹窗
  const openDialog = () => {
    formData.value = {}
    type.value = 'create'
    isImg.value = false
    isVideo.value = false

    formData.value.sendType = '1'
    formData.value.status = '1'
    formData.value.sendInterval = '1'
    formData.value.type = '1'
    formData.value.isMarkdown = '1'

    formData.value.url = ''

    btnsList.value = [{ text: '', url: '' }]
    dialogFormVisible.value = true

    if (formData.value.sendType == 1) {
      formData.value.sendInterval = ''
      formData.value.endTime = ''
      isSendType.value = false
    } else {
      isSendType.value = true
      formData.value.sendTime = ''
    }
  }

  // 关闭弹窗
  const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
      id: undefined,
      title: '', //标题
      sendType: undefined, //1指定时间 需要填 sendTime 发送时间 2 需要填 sendInterval endTime 3 待确认需求
      sendTime: new Date(),
      sendInterval: undefined,
      endTime: new Date(),
      lastTime: new Date(),
      text: '',
      url: '',
      isMarkdown: undefined,
      buttons: [],
      remark: '',
      type: undefined,
      status: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: '',
      sendNumber: undefined
    }
  }
  const isEmptyArray = (arr) => {
    // 如果不是数组，返回false
    if (!Array.isArray(arr)) {
      return false
    }

    // 如果是空数组，返回true
    if (arr.length === 0) {
      return true
    }

    // 检查嵌套数组
    return arr.every((item) => {
      if (Array.isArray(item)) {
        return isEmptyArray(item)
      }
      return false
    })
  }
  let btnsList = ref([{ text: '', url: '' }])

  // 弹窗确定
  const enterDialog = async () => {
    btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
      let res
      let parms = JSON.parse(JSON.stringify(formData.value)) // 深拷贝对象
      parms.sendType = Number(parms.sendType)
      parms.status = Number(parms.status)
      parms.sendInterval = Number(parms.sendInterval)
      parms.type = Number(parms.type)
      parms.isMarkdown = Number(parms.isMarkdown)
      parms.sendTime = parms.sendTime ? parms.sendTime : null
      parms.endTime = parms.endTime ? parms.endTime : null
      switch (type.value) {
        case 'create':
          if (btnsList.value[0].text == '') {
            formData.value.buttons = ''
          } else {
            formData.value.buttons = JSON.stringify([btnsList.value])
          }
          console.log('点击了新增的确定')
          res = await createAdvertiseBot(parms)
          break
        case 'update':
          if (parms.type == 1) {
            parms.url = null
            imgVideoFlag.value = false
          } else {
            imgVideoFlag.value = true
          }
          parms.buttons = JSON.stringify([btnsList.value])
          res = await updateAdvertiseBot(parms)
          break
        default:
          res = await createAdvertiseBot(parms)
          break
      }
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage({ type: 'success', message: t('AdvertiseBot.CreateOrUpdateSuccess') }) // 创建/更改成功
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
    const res = await findAdvertiseBot({ id: row.id })
    if (res.code === 0) {
      detailForm.value = res.data
      openDetailShow()
    }
  }

  // 关闭详情弹窗
  const closeDetailShow = () => {
    detailShow.value = false
    detailForm.value = {}
  }
  // 上传的图片或者视频
  const uploadUrl = ref('')

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
  const fullscreenLoading = ref(false)

  const checkFile = async (file) => {
    console.log('f', file)

    const sizeLimit = file.size / 1024 / 1024 < 5
    if (!sizeLimit) {
      ElMessage.error(t('AdvertiseBot.FileTooLarge')) // 文件大小不能超过5MB
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
        console.log('upload 上传的是图片: ', res.data)

        formData.value.url = res.data.file.url
        isImg.value = true
        isVideo.value = false
      } else if (fileType === 'video') {
        const res = await uploadFile(data)
        console.log('upload 上传的是视频: ', res.data)

        formData.value.url = res.data.file.url // 视频地址变量
        isImg.value = false
        isVideo.value = true
      }
    } catch (error) {
      console.error('upload file failed: ', error)
      // 处理上传失败的情况
    }
  }

  const uploadSuccess = (res) => {
    const { data } = res
    if (data.file) {
      console.log(data.file)
    }
  }

  let imgVideoFlag = ref(false)
  const handleCopyTypeChange = (value) => {
    console.log('formData.type', formData.value.type)
    // 如果文案为纯文本就删除之前上传过的文件
    if (formData.value.type == 1) {
      formData.value.url = null
      imgVideoFlag.value = false
    } else {
      imgVideoFlag.value = true
    }
  }
  let isSendType = ref(false) //发送类型联动
  // 发送类型联动
  const handleSendTypeChange = () => {
    console.log(formData.value.sendType)

    if (formData.value.sendType == 1) {
      formData.value.sendInterval = ''
      formData.value.endTime = ''
      isSendType.value = false
    } else {
      isSendType.value = true
      formData.value.sendTime = ''
    }
  }
  // 新增按钮表格

  import draggable from 'vuedraggable'
  let id = 1

  const btnState = reactive({
    enabled: true,

    dragging: false
  })

  const draggingInfo = computed(() => (btnState.dragging ? 'under drag' : ''))

  const btnsAdd = () => {
    nextTick(() => {
      // 执行DOM操作
      maincontain.scrollTop = maincontain.scrollHeight
      btnsList.value.push({})
    })
  }

  const btnsRemove = (el, index) => {
    // 执行DOM操作
    // maincontain.scrollTop = maincontain.scrollHeight

    btnsList.value = [{}]

    console.log(index)
  }
  const btnsSave = () => {
    console.log('保存', btnsList.value)
  }

  //用于存放随机数用于key属性的绑定
  var reload = ref()

  // 多选框的列表，列出表格的每一列
  const checkBoxGroup = ref([
    'ID',
    '标题',
    '发送类型',
    '文件类型',
    '发送时间',
    '时间间隔',
    '截止时间',
    '最后发送时间',
    '状态',
    '备注'
  ])

  // 当前选中的多选框，代表当前展示的列
  const checkedColumns = ref([
    'ID',
    '标题',
    '发送类型',
    '文件类型',
    '发送时间',
    '时间间隔',
    '截止时间',
    '最后发送时间',
    '状态',
    '备注'
  ])

  // colData中列出表格中的每一列，默认都展示
  const colData = reactive([
    { title: 'ID', istrue: true },
    { title: '标题', istrue: true },
    { title: '发送类型', istrue: true },
    { title: '文件类型', istrue: true },
    { title: '发送时间', istrue: true },
    { title: '时间间隔', istrue: true },
    { title: '截止时间', istrue: true },
    { title: '最后发送时间', istrue: true },
    { title: '状态', istrue: true },
    { title: '备注', istrue: true }
  ])

  // 监听checkedColumns的变化，当checkedColumns发生变化时，重新渲染表格
  const watchCheckedColumns = () => {
    // 遍历colData，将colData中的istrue属性设置为false
    colData.forEach((item) => {
      item.istrue = false
    })
    // 遍历checkedColumns，将checkedColumns中的值在colData中找到对应的列，将istrue属性设置为true
    checkedColumns.value.forEach((item) => {
      colData.forEach((col) => {
        if (item === col.title) {
          col.istrue = true
        }
      })
    })
    // 重新渲染表格
    reload.value = Math.random()
  }
</script>

<style lang="scss">
  .avatar-uploader {
    width: 300px;
    height: 300px;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 300px;
      height: 300px;
    }
    video {
      width: 300px;
      height: 300px;
    }
  }

  .avatar-uploader-icon {
    font-size: 100px;
  }

  .ghost {
    opacity: 0.5;
    border: 1px solid #3b82f6;
  }
  .chosen {
    border: 1px solid #3b82f6;
  }
  .item {
    width: 100%;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  .not-draggable {
    cursor: no-drop;
  }

  .scrollable-content {
    width: 100%;
    max-height: 200px; /* 设置最大高度 */
    overflow-y: auto; /* 垂直方向超出时显示滚动条 */
    padding: 5px;
    border: 1px solid #464749; /* 可选：添加边框 */
    border-radius: 4px; /* 可选：圆角 */
  }

  /* 自定义滚动条样式（可选） */
  .scrollable-content::-webkit-scrollbar {
    width: 6px;
  }

  .scrollable-content::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
</style>
