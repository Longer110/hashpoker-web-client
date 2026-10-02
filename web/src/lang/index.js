// src/lang/index.js
import { createI18n } from 'vue-i18n';
// import zhCN from './zh-CN';
// import en from './en';
import zhCN from './zh-CN/index.js';
import en from './en/index.js';

// 从本地存储获取默认语言（优先用户选择，否则用浏览器语言）
const getDefaultLang = () => {
  const savedLang = localStorage.getItem('lang');
  if (savedLang) return savedLang;
  
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.includes('en') ? 'en' : 'zh-CN';
};

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // Vue3必须设置为false（启用Composition API）
  locale: getDefaultLang(), // 当前语言
  fallbackLocale: 'zh-CN', // 语言回退（无对应文案时用中文）
  globalInjection: true, // 全局注入$t方法，模板可直接使用
  messages: {
    'zh-CN': zhCN,
    'en': en
  }
});

export default i18n;