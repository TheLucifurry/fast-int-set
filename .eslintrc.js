module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [
    'webpack.config.js',
  ],
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
  },
};
