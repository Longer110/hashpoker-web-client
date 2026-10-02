// 解密 Base64（支持中文）
export const decodeBase64 = (base64Str) => {
  if (!base64Str) return "";
  try {
    const decodedBase64 = atob(base64Str);
    const uint8Array = new Uint8Array(
      decodedBase64.split('').map(char => char.charCodeAt(0))
    );
    return new TextDecoder('utf-8').decode(uint8Array);
  } catch (error) {
    console.error("Base64 解密失败：", error);
    return "解密失败（格式错误或内容无效）";
  }
};