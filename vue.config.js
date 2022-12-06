const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // 将所有带 xing- 的标签名都视为自定义元素
          isCustomElement: tag => tag.startsWith('xing-')
        }
      }))
  }
})
