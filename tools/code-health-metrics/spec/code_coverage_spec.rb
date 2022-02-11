require 'nokogiri'
require 'json'
require 'code_health_metrics'
require 'Plugins/code_coverage'

describe CodeCoveragePlugin do

  subject { CodeCoveragePlugin.new }

  describe 'Detecting code coverage per framework' do

    context 'given the testsuite' do
      it 'returns the test info object' do

        junit = File.open(File.join(File.dirname(__FILE__), './fixtures/code_coverage/report.xml')) { |f| Nokogiri::XML(f) }
        testsuite = junit.css('testsuite')
        output = TestInfo.from_testsuite(testsuite)

        expect(output.ui_testsuites['RAF'][0]['tests']).to eq('3')
        expect(output.ui_testsuites['RAF'][0]['failures']).to eq('0')
        expect(output.ui_testsuites['RAF'][0]['time']).to eq('70.24226117134094')

        expect(output.ui_testsuites['Gousto'][0]['tests']).to eq('81')
        expect(output.ui_testsuites['Gousto'][0]['failures']).to eq('0')
        expect(output.ui_testsuites['Gousto'][0]['time']).to eq('5141.622688651085')

        expect(output.ui_test_info['RAF'].first).to eq({time: '22.23599410057068'})

        expect(output.unit_testsuites['RAF'][0]['tests']).to eq('20')
        expect(output.unit_testsuites['RAF'][0]['failures']).to eq('0')
        expect(output.unit_testsuites['RAF'][0]['time']).to eq('1.6082271337509155')
        expect(output.unit_testsuites['Persistence']).to eq([])

        expect(output.unit_test_info['RAF'].first).to eq({time: '0.1123809814453125'})
        expect(output.unit_test_info['Persistence']).to eq([])

        expect(output.long_tests_per_framework['RAF'][0]['time']).to eq('1.10683393478393555')
        expect(output.long_tests_per_framework['Menu']).to eq([])
        expect(TestInfo::MAX_TESTCASE_EXEC_TIME).to eq(1)
      end
    end

    context 'given the overall coverage report' do
      it 'returns the test coverage by framework' do

        overall_report = File.read(File.join(File.dirname(__FILE__), './fixtures/code_coverage/overall_coverage_report.json'))
        overall_coverage_report = JSON.parse(overall_report)
        output = OverallCodeCoverageInfo.from_overall_coverage_report(overall_coverage_report)

        expect(output.overall_coverage_per_framework['Help'][0]['coverage']).to eq(0.8)
      end
    end

    context 'given the coverage report' do
      it 'returns the unit test coverage by framework' do

        overall_report = File.read(File.join(File.dirname(__FILE__), './fixtures/code_coverage/coverage_report.json'))
        overall_coverage_report = JSON.parse(overall_report)
        output = CodeCoverageInfo.from_coverage_report(overall_coverage_report)

        expect(output.unit_test_coverage_per_framework['Help']).to eq(0.4)
        expect(CodeCoverageInfo::MIN_CODE_COVERAGE).to eq(0.6)
        expect(output.min_coverage_report_per_framework['Help'][0]['coverage']).to eq(0.4)
        expect(output.min_coverage_report_per_framework['RAF']).to eq([])
      end
    end

    context 'given the coverage reports' do
      it 'returns the plugin output' do

        junit = File.join(File.dirname(__FILE__), './fixtures/code_coverage/report.xml')
        overall_report = File.join(File.dirname(__FILE__), './fixtures/code_coverage/overall_coverage_report.json')
        report = File.join(File.dirname(__FILE__), './fixtures/code_coverage/coverage_report.json')

        module_ownership = {
          'iOS-Haricots' => %w[Help],
          'iOS-Rockets' => %w[RAF],
          'iOS-Radishes' => %w[Menu]
        }

        context = {
          build: { derived_data: '/tmp' },
          module_ownership: module_ownership,
          unit_test_code_coverage: { junit: junit, report: report},
          overall_code_coverage: {junit: junit, report: overall_report}
        }

        metric = subject.generate(context)
        expect(metric.count).to eq(4)
        expect(metric.first.name).to eq('Help')
        expect(metric.first.type).to eq(PluginOutput::Type::FRAMEWORK)
        expect(metric.first.statistic.percentage).to eq(80.0)
        expect(metric.first.statistic.information.count).to eq(2)
        expect(metric.first.statistic.information.first).to eq('Help.framework => UITests Code Coverage: 40.0%. UnitTests Code Coverage: 40.0%')
        expect(metric.first.statistic.suggestions.count).to eq(2)
        expect(metric.first.statistic.suggestions.first).to eq('AvailableMenusViewModelTests: testDefaultsToLoading() run time is 2.1s, which is more than 1s!')
        expect(metric.first.statistic.data_points).to eq({
          'UITestsCodeCoverage': 40.0,
          'UnitTestsCodeCoverage': 40.0,
          'OverallCodeCoverage': 80.0,
          'UITestsNumber': 0,
          'UnitTestsNumber': 3.0,
          'OverallTestsNumber': 3,
          'UITestsDuration': 0,
          'UnitTestsDuration': 3.27,
          'UITestsLongestRunTime': 0,
          'UnitTestsLongestRunTime': 2.1
          })
        expect(metric.first.statistic.affected_files).to eq([])

        repo_stats = metric[3]
        expect(repo_stats.type).to eq(PluginOutput::Type::REPOSITORY)
        expect(repo_stats.statistic.data_points).to eq({
          'TotalTestTime': 5217.004353284836,
          'TotalUITestTime': 5211.864949822426,
          'TotalUnitTestTime': 5.139403462409973
          })
      end
    end
  end
end
