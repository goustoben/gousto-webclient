const { params, testSettings }  = require('./config');

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
    enabled: false
  },
  test_settings: testSettings
}
