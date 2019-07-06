module.exports = {
  moduleFileExtensions: ['js', 'json'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.spec.(js|ts)|**/__tests__/*.(js|ts)'],
  collectCoverageFrom: ['src/(controllers|services|repositories|utils)/*.js'],
  coverageDirectory: './tests/coverage',
  globalSetup: './tests/globalSetup.js',
  globalTeardown: './tests/globalTeardown.js'
};
