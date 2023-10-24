module.exports = {
  extends: ["turbo", "prettier"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-console": "error",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["simple-import-sort", "@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
  },
  env: { es6: true },
};
