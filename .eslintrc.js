module.exports = {
    root: true,
    ignorePatterns: ["/public/**"],
    extends: ['airbnb-base', 'prettier'],
    plugins: [],
    parserOptions: {
      ecmaVersion: 12
    },
    env: {
      'commonjs': true,
      'es2021': true,
      'node': true
    },
    rules: {
    }
}