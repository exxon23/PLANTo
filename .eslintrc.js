module.exports = {
  extends: ['@react-native-community'],
  globals: {
    __DEV__: true,
  },
  rules: {
    'no-console': 0,
    'no-undef': 1,
    'no-unused-vars': 1,
    semi: ['error', 'never'],
    'no-useless-constructor': 'off',
    'no-return-await': 2,
    'no-useless-catch': 2,
    'object-curly-spacing': ['error', 'always'],
    allowMultiplePropertiesPerLine: 0,
    'prettier/prettier': ['error'],
    'no-mixed-spaces-and-tabs': 2,
    'sort-vars': 2,
    'comma-dangle': 0,
    'no-inline-styles': 0,
  },
}
