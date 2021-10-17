module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: [
    'dist/**/*',
    '*.d.ts',
    '*.config.*',
  ],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'max-len': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    'no-debugger': 1,
    'no-return-assign': 0,
    'no-param-reassign': 0,

    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,

    '@typescript-eslint/ban-ts-comment': 0,
  },
};
