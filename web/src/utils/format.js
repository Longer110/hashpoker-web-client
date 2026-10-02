import { formatTimeToStr } from '@/utils/date'
import { getDict } from '@/utils/dictionary'
import { ref } from 'vue'

export const formatBoolean = (bool) => {
  if (bool !== null) {
    return bool ? '是' : '否'
  } else {
    return ''
  }
}
export const formatDate = (time) => {
  if (time !== null && time !== '') {
    var date = new Date(time)
    return formatTimeToStr(date, 'yyyy-MM-dd hh:mm:ss')
  } else {
    return ''
  }
}

export const filterDict = (value, options) => {
  const rowLabel = options && options.filter((item) => item.value === value)
  return rowLabel && rowLabel[0] && rowLabel[0].label
}

export const filterDataSource = (dataSource, value) => {
  if (Array.isArray(value)) {
    return value.map((item) => {
      const rowLabel = dataSource && dataSource.find((i) => i.value === item)
      return rowLabel?.label
    })
  }
  const rowLabel = dataSource && dataSource.find((item) => item.value === value)
  return rowLabel?.label
}

export const getDictFunc = async (type) => {
  const dicts = await getDict(type)
  return dicts
}

const path =
  import.meta.env.VITE_BASE_PATH + ':' + import.meta.env.VITE_SERVER_PORT + '/'
export const ReturnArrImg = (arr) => {
  const imgArr = []
  if (arr instanceof Array) {
    // 如果是数组类型
    for (const arrKey in arr) {
      if (arr[arrKey].slice(0, 4) !== 'http') {
        imgArr.push(path + arr[arrKey])
      } else {
        imgArr.push(arr[arrKey])
      }
    }
  } else {
    // 如果不是数组类型
    if (arr?.slice(0, 4) !== 'http') {
      imgArr.push(path + arr)
    } else {
      imgArr.push(arr)
    }
  }
  return imgArr
}

export const returnArrImg = ReturnArrImg

export const onDownloadFile = (url) => {
  window.open(path + url)
}
const colorToHex = (u) => {
  let e = u.replace('#', '').match(/../g)
  for (let t = 0; t < 3; t++) e[t] = parseInt(e[t], 16)
  return e
}

const hexToColor = (u, e, t) => {
  let a = [u.toString(16), e.toString(16), t.toString(16)]
  for (let n = 0; n < 3; n++) a[n].length === 1 && (a[n] = `0${a[n]}`)
  return `#${a.join('')}`
}
const generateAllColors = (u, e) => {
  let t = colorToHex(u)
  const target = [10, 10, 30]
  for (let a = 0; a < 3; a++) t[a] = Math.floor(t[a] * (1 - e) + target[a] * e)
  return hexToColor(t[0], t[1], t[2])
}

const generateAllLightColors = (u, e) => {
  let t = colorToHex(u)
  const target = [240, 248, 255] // RGB for blue white color
  for (let a = 0; a < 3; a++) t[a] = Math.floor(t[a] * (1 - e) + target[a] * e)
  return hexToColor(t[0], t[1], t[2])
}

function addOpacityToColor(u, opacity) {
  let t = colorToHex(u)
  return `rgba(${t[0]}, ${t[1]}, ${t[2]}, ${opacity})`
}

export const setBodyPrimaryColor = (primaryColor, darkMode) => {
  let fmtColorFunc = generateAllColors
  if (darkMode === 'light') {
    fmtColorFunc = generateAllLightColors
  }

  document.documentElement.style.setProperty('--el-color-primary', primaryColor)
  document.documentElement.style.setProperty(
    '--el-color-primary-bg',
    addOpacityToColor(primaryColor, 0.4)
  )
  for (let times = 1; times <= 2; times++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-dark-${times}`,
      fmtColorFunc(primaryColor, times / 10)
    )
  }
  for (let times = 1; times <= 10; times++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-light-${times}`,
      fmtColorFunc(primaryColor, times / 10)
    )
  }
  document.documentElement.style.setProperty(
    `--el-menu-hover-bg-color`,
    addOpacityToColor(primaryColor, 0.2)
  )
}

const baseUrl = ref(import.meta.env.VITE_BASE_API)

export const getBaseUrl = () => {
  return baseUrl.value === '/' ? '' : baseUrl.value
}

export const CreateUUID = () => {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now()
  }
  return '00000000-0000-0000-0000-000000000000'.replace(/0/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0 // d是随机种子
    d = Math.floor(d / 16)
    return (c === '0' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

/**
 * 解析并展平嵌套的 JSON 字符串数据列表
 * @param {Array} list - 数据列表
 * @returns {Array} 展平后的数据列表
 */
export const parseAndFlattenJSONValue = (list) => {
  if (!Array.isArray(list)) return []
  // 判断字符串是否像 JSON
  const looksLikeJSON = (val) =>
    typeof val === 'string' &&
    !!val &&
    ['{', '['].includes(val.trim()[0]) &&
    ['}', ']'].includes(val.trim().slice(-1))

  // 安全解析 JSON
  const safeJSONParse = (val) => {
    try {
      return JSON.parse(val)
    } catch (e) {
      return null
    }
  }

  // 深度解析对象中所有 JSON 字符串字段
  const deepParseJSONStringFields = (obj) => {
    if (!obj || typeof obj !== 'object') return obj
    for (const k in obj) {
      const v = obj[k]
      if (typeof v === 'string' && looksLikeJSON(v)) {
        const parsed = safeJSONParse(v)
        if (parsed !== null) {
          obj[k] = parsed
          deepParseJSONStringFields(obj[k])
        }
      } else if (v && typeof v === 'object' && !Array.isArray(v)) {
        deepParseJSONStringFields(v)
      }
    }
    return obj
  }

  // 递归展平对象（将所有嵌套对象的属性提升到顶层）
  const flattenObject = (obj, result = {}) => {
    for (const key in obj) {
      const value = obj[key]
      // 如果值是普通对象（非数组、非null），递归展平
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        flattenObject(value, result)
      }
      // 将当前属性添加到结果中（后面的会覆盖前面的同名属性）
      result[key] = value
    }
    return result
  }

  // 处理单个数据行
  const processRow = (row) => {
    if (!row || typeof row !== 'object') return row
    // 深度解析所有字段中的 JSON 字符串
    const clonedRow = { ...row }
    deepParseJSONStringFields(clonedRow)
    // 完全展平所有嵌套对象到第一层级
    const flattened = flattenObject(clonedRow)
    return flattened
  }
  // 处理整个列表
  return list.map(processRow)
}