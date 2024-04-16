module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'off',
    'require-jsdoc': 'off', // Требует оформлять функции и классы с помощью JSDoc
    '@typescript-eslint/ban-ts-comment': 'off', // Запрещает использовать комментарии вида // @ts-ignore
    '@typescript-eslint/ban-types': 'off', //   Запрещает определенные типы
    'import/no-unresolved': 'off', // Проверяет, что импортируемые модули существуют в своих файлах
    'valid-jsdoc': 'off', // Проверяет правильность оформления JSDoc
    camelcase: 'off', // Запрещает использовать нотацию вида some_value
    'new-cap': 'off', //  Запрещает использовать нотацию вида SomeClass
    '@typescript-eslint/no-unused-vars': 'off', // Запрещает объявлять переменные, которые не используются
    'react/display-name': 'off', // Запрещает использовать нотацию вида SomeClass
    'no-unused-vars': 'off', // Запрещает объявлять переменные, которые не используются
    '@typescript-eslint/no-explicit-any': 'off', // Запрещает использовать any
    'import/no-named-as-default': 'off', // Запрещает использовать any
    'import/no-named-as-default-member': 'off', //
    'spaced-comment': 'off', //
    '@typescript-eslint/no-var-requires': 'off', //
  },
};
