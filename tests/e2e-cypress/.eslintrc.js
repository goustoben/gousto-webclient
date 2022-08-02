module.exports = {
  extends: "../../.eslintrc.js",
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".js"],
      },
    },
  },
};
