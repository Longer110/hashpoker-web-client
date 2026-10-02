<template>
  <div>
      <div class="gva-search-box">
      <el-form inline>
        <!-- 原: 标题 -->
        <el-form-item :label="$t('ImageText.Title')">
          <el-input v-model="params.title" clearable :placeholder="$t('ImageText.PlaceholderTitle')" />
        </el-form-item>

        <!-- 原: 状态 -->
        <el-form-item :label="$t('ImageText.Status')">
          <el-select v-model="params.type" style="width: 100px">
            <!-- 原: 上架 -->
            <el-option :value="0" :label="$t('ImageText.OnShelf')"></el-option>
            <!-- 原: 下架 -->
            <el-option :value="1" :label="$t('ImageText.OffShelf')"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="formSearch">{{$t('GlobalUniversality.Query')}}</el-button>
          <el-button icon="refresh" @click="onReset">{{$t('GlobalUniversality.Reset')}}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="addImages">{{$t('ImageText.AddImageText')}}</el-button>
      </div>
      <el-table style="width: 100%" :data="tableData" height="700">
        <!-- 原: 序号 -->
        <el-table-column type="index" :label="$t('ImageText.Index')" width="70" />
        <!-- 原: 标题 -->
        <el-table-column :label="$t('ImageText.Title')" prop="title" align="center"></el-table-column>
        <!-- 原: 副标题 -->
        <el-table-column :label="$t('ImageText.Subtitle')" prop="briefIntroduction" align="center"></el-table-column>
        <!-- 原: 来源 -->
        <el-table-column :label="$t('ImageText.Source')" prop="source" align="center"></el-table-column>
        <!-- 原: 状态 -->
        <el-table-column :label="$t('ImageText.Status')" prop="source" align="center">
          <template #default="{ row }">
            <el-tag type="primary" v-if="row.type == 0">{{$t('ImageText.OnShelf')}}</el-tag>
            <el-tag type="warning" v-else>{{$t('ImageText.OffShelf')}}</el-tag>
          </template>
        </el-table-column>

        <!-- 原: 图文 -->
        <el-table-column :label="$t('ImageText.Graphics')" prop="graphicsImages" align="center">
          <template #default="scope">
            <el-image :src="scope.row.graphicsImages" style="width: 100px; height: 100px"></el-image>
          </template>
        </el-table-column>

        <!-- 原: 操作 -->
        <el-table-column fixed="right" :label="$t('ImageText.Actions')" min-width="120" header-align="center" align="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handlerEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handlerDel(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          v-model:current-page="params.pageIndex"
          layout="prev, pager, next, jumper,total"
          :total="totalPages"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <EditForm ref="editRef" @success="init"></EditForm>
  </div>
</template>
<script setup>
  import EditForm from '@/view/superAdmin/imageText/components/editForm.vue'
  import { deleteStrategicGraphics, findAdminStrategicGraphicsList } from '@/api/menu'
  import { onMounted, reactive, ref } from 'vue'
  import { ElMessageBox } from 'element-plus'

  const editRef = ref(null)

  function handlerEdit(row) {
    editRef.value?.openDrawer(row)
  }

  const params = reactive({
    pageIndex: 1,
    pageSize: 10,
    title: '',
    type: 0
  })

  function formSearch() {
    params.pageIndex = 1
    init()
  }

  const tableData = ref([])
  const totalPages = ref(0)

  function handleCurrentChange() {
    init()
  }

  function init() {
    findAdminStrategicGraphicsList(params)
      .then((res) => {
        const { list, total } = res.data
        tableData.value = list
        totalPages.value = total
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 重置
  const onReset = () => {
    params.pageIndex = 1
    params.title = ''
    params.type = 0
    init()
  }
  onMounted(() => {
    init()
  })

  function handlerDel(row) {
    ElMessageBox.confirm(`删除${row.title}图文信息`, 'Warning', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await deleteStrategicGraphics({ graphicsId: row.graphicsId })
      await init()
    })
  }

  function addImages() {
    editRef.value?.openDrawer()
  }
</script>

<style scoped lang="scss"></style>
