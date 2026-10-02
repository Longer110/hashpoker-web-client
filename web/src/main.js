import './style/element_visiable.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'uno.css';
import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import { vAdaptive } from '@/directive/adaptive';
import debounce from '@/directive/debounce';

import Particles from 'particles.vue3'
import VueQrcode from 'vue-qrcode'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css' // 引入样式

import 'element-plus/dist/index.css'
// 引入gin-vue-admin前端初始化相关内容
import './core/gin-vue-admin'
// 引入封装的router
import router from '@/router/index'
import '@/permission'
import run from '@/core/gin-vue-admin.js'
import auth from '@/directive/auth'
import { store } from '@/pinia'
import App from './App.vue'
import { decodeBase64 } from './utils/base64'; // 引入工具函数

// 复制自定义指令
import copyDirective from './directive/copy';

import i18n from './lang';

const app = createApp(App)
app.config.productionTip = false
// 注册为全局方法（通过 this.$decodeBase64 或模板中直接使用 $decodeBase64 调用）
app.config.globalProperties.$decodeBase64 = decodeBase64;
app.directive('adaptive', vAdaptive); // 注册为全局指令 v-adaptive
app.directive('debounce', debounce);

app.component('vue-qrcode', VueQrcode)
// app.use(Viewer)
// 可选：配置全局默认参数
app.use(Viewer, {
  defaultOptions: {
    zIndex: 9999, // 预览层的 z-index
    inline: false, // 是否内联显示（默认弹窗）
    button: true, // 显示关闭按钮
    navbar: true, // 显示图片导航栏
    title: true, // 显示图片标题（文件名/索引）
    toolbar: true, // 显示工具栏
    tooltip: true, // 显示缩放比例提示
    movable: true, // 图片是否可拖动
    zoomable: true, // 图片是否可缩放
    rotatable: true, // 图片是否可旋转
    scalable: true, // 图片是否可翻转
    transition: true, // 是否使用过渡动画
    fullscreen: true, // 是否支持全屏
    keyboard: true, // 是否支持键盘操作
    url: 'src' // 图片地址的属性名（默认 src）
  }
})
app.use(i18n); // 注册i18n

app.use(run).use(ElementPlus).use(store).use(auth).use(router).use(Particles).mount('#app')

app.directive('copy', copyDirective);
export default app
