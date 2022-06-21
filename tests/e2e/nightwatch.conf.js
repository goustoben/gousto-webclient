const { params, testSettings }  = require('./config');

module.exports = {
  src_folders: [
    'tests'
  ],
  output_folder: params.ARTIFACTS_PATH,
  custom_commands_path: './commands',
  page_objects_path: './pages',
  live_output: true,
  test_workers: {
    enabled: true,
  },
  test_settings: testSettings
}
