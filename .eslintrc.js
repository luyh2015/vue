// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [ 
    'eslint:recommended',
    'plugin:vue/base'
  ],
  globals: {
    feConfig: true,
    Enums: true
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // only allow console in development
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //
    // Vue
    // 可能的错误
    //
    // 禁止重复的二级键名
    'vue/no-dupe-keys': 'error',
    // 禁止出现语法错误
    'vue/no-parsing-error': 'error',
    // 禁止覆盖保留字
    'vue/no-reservered-keys': 'error',
    // 组件的 data 属性的值必须是一个函数
    // @off 没必要限制
    'vue/no-shared-component-data': 'error',
    // 可以让 <template> 使用 key 属性
    'vue/no-template-key': 'off',
    // render 函数必须有返回值
    'vue/require-render-return': 'error',
    // prop 的默认值必须匹配它的类型
    'vue/require-valid-default-prop': 'error',
    // 计算属性必须有返回值
    'vue/return-in-computed-property': 'error',
    // template 的根节点必须合法
    'vue/valid-template-root': 'error',
    // v-bind 指令必须合法
    'vue/valid-v-bind': 'error',
    // v-cloak 指令必须合法
    'vue/valid-v-cloak': 'error',
    // v-else-if 指令必须合法
    'vue/valid-v-else-if': 'error',
    // v-else 指令必须合法
    'vue/valid-v-else': 'error',
    // v-for 指令必须合法
    'vue/valid-v-for': 'error',
    // v-html 指令必须合法
    'vue/valid-v-html': 'error',
    // v-if 指令必须合法
    'vue/valid-v-if': 'error',
    // v-model 指令必须合法
    'vue/valid-v-model': 'error',
    // v-on 指令必须合法
    'vue/valid-v-on': 'error',
    // v-once 指令必须合法
    'vue/valid-v-once': 'error',
    // v-pre 指令必须合法
    'vue/valid-v-pre': 'error',
    // v-show 指令必须合法
    'vue/valid-v-show': 'error',
    // v-text 指令必须合法
    'vue/valid-v-text': 'error',
    //
    //
    // 最佳实践
    //
    // @fixable html 的结束标签必须符合规定
    // 有的标签不必严格符合规定，如 <br> 或 <br/> 都应该是合法的, 在此列为警告
    'vue/html-end-tags': 'warn',
    // 计算属性禁止包含异步方法
    'vue/no-async-in-computed-properties': 'error',
    // 禁止出现难以理解的 v-if 和 v-for
    'vue/no-confusing-v-for-v-if': 'error',
    // 禁止出现重复的属性
    'vue/no-duplicate-attributes': 'error',
    // 禁止在计算属性中对属性修改, 是具体情况而定，有时候可能会用到，列为warn；
    'vue/no-side-effects-in-computed-properties': 'warn',
    // 禁止在 <textarea> 中出现 {{message}}
    'vue/no-textarea-mustache': 'error',
    // 组件的属性必须为一定的顺序
    'vue/order-in-components': [2, {
      "order": [
        "el",
        ["name", "parent"],
        "functional",
        "delimiters",
        ["components", "directives", "filters"],
        ["extends", "mixins"],
        ["model", "props", "propsData"],
        ["data", "computed"],
        ["watch", "LIFECYCLE_HOOKS"],
        "methods",
        ["template", "render", "renderError"]
      ]
    }],
    // <component> 必须有 v-bind:is
    'vue/require-component-is': 'error',
    // prop 必须有类型限制
    'vue/require-prop-types': 'error',
    // v-for 指令的元素必须有 v-bind:key
    'vue/require-v-for-key': 'error',
    //
    //
    // 风格问题
    //
    // @fixable 限制自定义组件的属性风格, Vue风格指南强烈建议，但和一般习惯差别略大，列为warn；
    'vue/attribute-hyphenation': 'warn',
    // html 属性值必须用双引号括起来
    'vue/html-quotes': 'error',
    // @fixable 没有内容时，组件必须自闭和。只要闭合即可，不限制。
    'vue/html-self-closing': 'off',
    // 限制每行允许的最多属性数量
    // @off 没必要限制。但多行时应该每行一个属性。
    'vue/max-attributes-per-line': 'off',
    // @fixable 限制组件的 name 属性的值的风格
    'vue/name-property-casing': 'error',
    // @fixable 要求花括号插值两边必须有空格
    'vue/mustache-interpolation-spacing': 'error',
    // @fixable 禁止出现连续空格
    'vue/no-multi-spaces': 'error',
    // @fixable 限制 v-bind 的风格, 统一简写形式
    'vue/v-bind-style': 'error',
    // @fixable 限制 v-on 的风格，统一简写形式
    'vue/v-on-style': 'error',
    //
    //
    // 变量
    //
    // 定义了的 jsx element 必须使用
    'vue/jsx-uses-vars': 'error'
  }
}
