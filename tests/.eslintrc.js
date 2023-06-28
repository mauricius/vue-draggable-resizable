module.exports = {
  env: {
    mocha: true
  },
  globals: {
    'expect': true,
    'sinon': true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-unused-expressions': 'off'
  }
}
