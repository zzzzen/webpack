module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "jquery": false,
    "es6": true,

  },
  parser: "babel-eslint",
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "no-console": "off",
    "quotes": ["error", "double"],
    "semi": ["error", "always"]
  }
};
