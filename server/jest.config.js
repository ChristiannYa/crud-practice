export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
  testMatch: ['**/test/**/*.test.mjs'],
  moduleFileExtensions: ['js', 'mjs'],
};
