const { params, testSettings }  = require('./config');

module.exports = {
  src_folders: [
    'tests/systemTests'
  ],
  output_folder: params.ARTIFACTS_PATH,
  page_objects_path: './pages',
  live_output: true,
  test_workers: {
    enabled: true,
  },
  test_settings: testSettings
}
