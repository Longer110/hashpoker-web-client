/**
 * 信息脱敏工具函数
 * @param {String} type 脱敏类型：name/phone/idCard/email/bankCard/address
 * @param {String} value 原始值
 * @returns {String} 脱敏后的值
 */
export const desensitize = (type, value) => {
  if (!value) return '-' // 空值返回占位符
  let result = value
  switch (type) {
    // 姓名：保留第一个字和最后一个字，中间每个字符替换为*（长度不变）
    case 'name':
      if (value.length <= 2) {
        // 1个字：原样返回；2个字：保留第一个，第二个替换为*
        result = value.length === 1 ? value : value.replace(/(.)./, '$1*')
      } else {
        // 大于2个字：保留首尾，中间每个字符替换为*
        const first = value.charAt(0) // 首字符
        const last = value.charAt(value.length - 1) // 尾字符
        const middleLen = value.length - 2 // 中间字符长度
        const middle = '*'.repeat(middleLen) // 生成对应长度的*
        result = first + middle + last
      }
      break
    // 手机号：保留前3后4，中间4位替换为*（如 138****1234）
    case 'phone':
      result = value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      break
    // 身份证：保留前6后4，中间替换为*（如 110101********1234）
    case 'idCard':
      result = value.replace(/(\d{6})\d{8,10}(\d{4})/, '$1********$2')
      break
    // 邮箱：保留前2位和域名，中间替换为*（如 zh****@163.com）
    case 'email':
      result = value.replace(/(.{2}).*(@.*)/, '$1****$2')
      break
    // 银行卡：保留前6后4，中间替换为*（如 622202********1234）
    case 'bankCard':
      result = value.replace(/(\d{6})\d{8,12}(\d{4})/, '$1********$2')
      break
    // 地址：保留前6位，后面替换为*（如 北京市海淀区****）
    case 'address':
      result = value.length > 6 ? `${value.substring(0, 6)}****` : value
      break
    // 自定义脱敏：传入正则和替换规则（备用）
    case 'custom':
      // 示例：保留前2后1，中间*（需自行调整正则）
      result = value.replace(/(.{2}).*(.)/, '$1****$2')
      break
    default:
      result = value
  }
  return result
}
