module.exports = {
  plugins: ['react', 'jest', 'prettier'],
  settings: {
    react:{
      "version":"detect"
    }
    },
  env: {
    'jest/globals': true,
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
   
    'react/jsx-uses-vars': 2,
    'react/no-unused-prop-types': 2,
    'no-labels': 0,
    'arrow-parens': 0,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
  extends: ['eslint:recommended', 'plugin:react/recommended',"plugin:react/jsx-runtime", 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
}
