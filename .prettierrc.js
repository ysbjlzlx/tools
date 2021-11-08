module.exports = {
  ...require('gts/.prettierrc.json'),
  overrides: [
    {
      files: ['*.html', '*.tsx', '*.vue'],
      options: {
        printWidth: 120,
      },
    },
  ],
};
