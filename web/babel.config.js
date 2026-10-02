
const plugins = [];
// 生产环境下
if (process.env.NODE_ENV === 'production') {
  plugins.push("transform-remove-console")
}
/**
* 若有其他环境，可以添加判断
* if (['production', 'prod'].includes(process.env.NODE_ENV)) {
*   plugins.push("transform-remove-console")
* }
*/
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: plugins
}