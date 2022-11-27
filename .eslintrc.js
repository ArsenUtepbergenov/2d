module.exports = {
  extends: ['plugin:vue/vue3-essential', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'vue/no-unused-vars': 'error',
    'vue/multi-word-component-names': 0,
  },
}
