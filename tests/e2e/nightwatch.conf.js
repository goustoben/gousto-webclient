const cucumber  = require('nightwatch-cucumber');
const { params, testSettings }  = require('./config');

cucumber({
  cucumberArgs: [
    '--require', 'features/step-definitions',
    '--format', 'node_modules/cucumber-pretty',
    'features',
    '--format', 'json:reports/cucumber.json'
  ]
});

module.exports = {
  src_folders: [
    'tests/systemTests'
  ],
  output_folder: params.ARTIFACTS_PATH,
  page_objects_path: './pages',
  selenium: {
    start_process: false,
    log_path: '',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver' : params.BINPATH + 'chromedriver'
    }
  },
  live_output: true,
  test_workers: {
    enabled: true,
    workers: 'auto'
  },
  test_settings: testSettings
}
