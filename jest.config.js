module.exports = {
  moduleFileExtensions: ['js', 'json'],
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/(models|config|routes|middlewares)/**.js',
    '!src/app.js'
  ],
  coverageDirectory: './tests/coverage',
  globalSetup: './tests/globalSetup.js',
  globalTeardown: './tests/globalTeardown.js'
};
