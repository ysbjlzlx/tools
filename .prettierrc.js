module.exports = {
  ...require("gts/.prettierrc.json"),
  overrides: [
    {
      files: ["*.html", "*.vue"],
      options: {
        printWidth: 150,
        tabWidth: 2,
      },
    },
  ],
};
