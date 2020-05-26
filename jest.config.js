module.exports = {
  moduleFileExtensions: ["js", "json"],
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.(js|ts)|**/__tests__/*.(js|ts)"],
  collectCoverageFrom: ["src/(controllers|services|utils)/*.js"],
  coverageDirectory: "./tests/coverage",
  // setupFiles: ['./tests/setupFramework.js'],
  globalSetup: "./tests/globalSetup.js",
  globalTeardown: "./tests/globalTeardown.js",
};
