module.exports = {
  moduleFileExtensions: ['js', 'json'],
  testMatch: [
    '**/tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/(models|config|routes)/**.js',
    '!src/app.js'
  ]
};
