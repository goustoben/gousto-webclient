module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  displayName: '@features/account-details',
  "setupFilesAfterEnv": ["@testing-library/jest-dom/extend-expect"],
  rootDir: './',
}
