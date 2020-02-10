module.exports = {
  bracketSpacing: true,
  jsxBracketSameLine: false,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: '*.test.js',
      options: {
        semi: true
      }
    }
  ]
}
