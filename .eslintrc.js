const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    // 'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@src', path.resolve('./src')]],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  plugins: ['prettier'],
  rules: {},
  globals: {},
};

