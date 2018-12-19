module.exports = {
  env: {
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'off'
  }
};
