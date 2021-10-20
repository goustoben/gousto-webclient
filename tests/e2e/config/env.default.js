module.exports = ({ ARTIFACTS_PATH = "./screenshots", globalWaitTimeout }) => ({
  globals: {
    waitForConditionTimeout: globalWaitTimeout,
  },
  request_timeout_options: {
    timeout: 15000,
  },
  screenshots: {
    enabled: true,
    path: ARTIFACTS_PATH,
    on_failure: true,
    on_error: true,
  },
  silent: true,
  selenium_port: 9515,
  selenium_host: "localhost",
  default_path_prefix: "",
  desiredCapabilities: {
    browserName: "chrome",
    acceptSslCerts: true,
  },
});
