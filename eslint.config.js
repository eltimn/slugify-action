import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'eol-last': 'warn',
    },
  },
]
