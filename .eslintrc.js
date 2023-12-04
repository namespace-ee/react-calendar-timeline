{
  "plugins": [
    "react",
    "jest",
    "prettier"
  ],
  "env": {
    "jest/globals": true,
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/no-unused-prop-types": 2,
    "react/react-in-jsx-scope": 2,
    "no-labels": 0,
    "arrow-parens": 0
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  }
}
