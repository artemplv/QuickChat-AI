module.exports = {
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },
  ignorePatterns: [
    'dist/*',
    '*config.js',
    'tests/*',
    '.eslintrc.js'
  ],
  rules: {
    camelcase: 'warn',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-underscore-dangle': 0,
    'no-unused-vars': 'error',
    'no-useless-escape': 0,
    strict: 'off',
    'no-unused-expressions': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
};
