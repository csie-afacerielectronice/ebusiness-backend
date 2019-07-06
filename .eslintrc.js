module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    indent: 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'off',
    'no-unused-vars': ['error', { args: 'none' }]
  }
};
