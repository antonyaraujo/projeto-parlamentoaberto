module.exports = {
  extends: [
    'airbnb-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    node: true,
  },
};
