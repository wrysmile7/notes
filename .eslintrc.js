module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eslint.autoFixOnSave': true,
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // // 添加⾃自定义规则
    // "prettier/prettier": [
    //   // eslint校验不不成功后配置提示等级，配置error或2则报错，warn或1则警告，off或0则⽆无提示
    //   "error",//2,
    //   //然后我们加两个配置singleQuote表示使用单引号,semi设为false表示代码尾部不加  ";"
    //   {
    //     singleQuote: true,
    //     semi: false
    //   }
    // ]
  },
}
