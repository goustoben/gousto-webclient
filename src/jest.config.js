module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  coverageReporters: [
    'lcov',
    'json-summary'
  ],
  testMatch: [
    '**/__tests__/**/[^.]*.(j|t)s?(x)',
    '**/?(*.)(test).(j|t)s?(x)'
  ],
  moduleNameMapper: {
    'fixtures/(.*)$': '<rootDir>/../tests/regression/fixtures/$1',
    goustouicomponents: '<rootDir>/libs/goustouicomponents/src/main',
    'zest/(.*)$': '<rootDir>/libs/goustouicomponents/dist/$1',
    'gousto-config': '<rootDir>/libs/goustouicomponents/src/gousto-config',
    'design-language/icons/(.*)$': '<rootDir>/libs/goustouicomponents/src/design-language/icons/$1',
    'design-language/media/(.*)$': '<rootDir>/libs/goustouicomponents/src/design-language/media/$1',
    '^.+\\.(css|scss)$': 'identity-obj-proxy'
  },
  testPathIgnorePatterns: [
    '<rootDir>/libs/goustouicomponents',
    '<rootDir>/src/adapters/gousto/__tests__/'
  ],
  transform: {
    '^.+\\.js?$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|ico|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/.fileTransformer.js'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js}',
    '<rootDir>/server/**/*.{js}',
    '!<rootDir>/src/scripts/**/*',
    '!<rootDir>/src/**/config/*.{js}',
    '!<rootDir>/src/_testing/**/*'
  ],
  moduleDirectories: [
    'node_modules',
    '<rootDir>',
    '<rootDir>/src',
    '<rootDir>/src/components'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest/.setup.js'
  ],
  globals: {
    __DEV__: false,
    __PROD__: true,
    __HMR__: false,
    __SERVER__: false,
    __CLIENT__: true,
    __CLOUDFRONT_URL__: 'test.com',
    __CLIENT_PROTOCOL__: 'https',
    __CHECKOUT_PK__: '',
    __RECAPTCHA_RAF_PUBK__: '',
    __RECAPTCHA_RAF_PVTK__: '',
    __ENV__: 'production',
    __API_ENV__: 'production',
    __RUNNING_ENV__: 'live',
    __DOMAIN__: 'gousto.local',
    __TEST__: true,
    'process.env.NODE_ENV': 'production',
    __ENDPOINTS__: {},
    __DATADOG_ENABLED__: false,
    __DATADOG_BROWSER_LOGS_TOKEN__: 'BROWSER_LOGS_TOKEN',
    __DATADOG_RUM_SDK_TOKEN__: 'RUM_SDK_TOKEN',
    __DATADOG_RUM_SDK_APP_ID__: 'RUM_SDK_APP_ID',
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.tests.json',
    }
  }
}
