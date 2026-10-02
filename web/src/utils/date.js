// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
// eslint-disable-next-line no-extend-native
Date.prototype.Format = function(fmt) {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  const reg = /(y+)/
  if (reg.test(fmt)) {
    const t = reg.exec(fmt)[1]
    fmt = fmt.replace(
      t,
      (this.getFullYear() + '').substring(4 - t.length)
    )
  }
  for (let k in o) {
    const regx = new RegExp('(' + k + ')')
    if (regx.test(fmt)) {
      const t = regx.exec(fmt)[1]
      fmt = fmt.replace(
        t,
        t.length === 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length)
      )
    }
  }
  return fmt
}

export function formatTimeToStr(times, pattern) {
  let d = new Date(times).Format('yyyy-MM-dd hh:mm:ss')
  if (pattern) {
    d = new Date(times).Format(pattern)
  }
  return d.toLocaleString()
}

// 获取一周的时间范围
 export function getOneWeekTimeRange()  {
    // 1. 获取当前日期（本地时间）
    const currentDate = new Date()

    // 2. 计算上周的起始和结束日期（核心逻辑：以周一为一周起点）
    // 计算上周一的日期：今天减去（当前星期几 + 6）天（例：今天周一(1)→1+6=7天前，今天周二(2)→2+6=8天前）
    const lastWeekMonday = new Date(currentDate)
    lastWeekMonday.setDate(currentDate.getDate() - 7)
    // 计算上周结束日期（下周一，与示例格式保持一致：结束日期为一周后的同一天）
    const lastWeekEndDay = new Date(lastWeekMonday)
    lastWeekEndDay.setDate(lastWeekMonday.getDate() + 7)

    // 4. 格式化为 UTC 时间字符串（ISO 8601 格式，末尾带 Z）
    const formatUTCTime = (date) => {
      const year = date.getUTCFullYear()
      const month = String(date.getUTCMonth() + 1).padStart(2, '0')
      const day = String(date.getUTCDate()).padStart(2, '0')
      const hours = String(date.getUTCHours()).padStart(2, '0')
      const minutes = String(date.getUTCMinutes()).padStart(2, '0')
      const seconds = String(date.getUTCSeconds()).padStart(2, '0')
      const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
    }

    // 5. 生成结果
    const lastWeekTimeRange = [formatUTCTime(lastWeekMonday), formatUTCTime(lastWeekEndDay)]
    // 把结果输出为东八区时间
    // const formatBeijingTime = (date) => {
    //   const pad = (value, length = 2) => String(value).padStart(length, '0')
    //   const beijingDate = new Date(date.getTime() + 8 * 60 * 60 * 1000)
    //   const year = beijingDate.getUTCFullYear()
    //   const month = pad(beijingDate.getUTCMonth() + 1)
    //   const day = pad(beijingDate.getUTCDate())
    //   const hours = pad(beijingDate.getUTCHours())
    //   const minutes = pad(beijingDate.getUTCMinutes())
    //   const seconds = pad(beijingDate.getUTCSeconds())
    //   const milliseconds = pad(beijingDate.getUTCMilliseconds(), 3)
    //   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+08:00`
    // }

    // const lastWeekTimeRange = [formatBeijingTime(lastWeekMonday), formatBeijingTime(lastWeekEndDay)]
    return lastWeekTimeRange
  }

// 判断当前本地时区是否为 UTC+8
export function isUTC8() {
  return new Date().getTimezoneOffset() === -480; // UTC+8 的偏移是 -480 分钟
}
