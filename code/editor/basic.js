module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: "module",
    "ecmaVersion": 2018
  },
  plugins: [
    "eslint-comments",
    "react",
    "react-hooks",
    "react-native",
    "@react-native-community",
  ],

  settings: {
    react: {
      version: "detect",
    },
  },

  globals: require("./globals.js"),
  rules: require("./rules.js"),
};
