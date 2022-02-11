require 'code_health_metrics'
require 'Plugins/lines_of_code'

describe LinesOfCodePlugin do

  subject { LinesOfCodePlugin.new }

  describe 'File scanning' do

    context 'given the lines of code per framework' do
      it 'returns the plugin output' do
        repo_stats_double = double('repo stats')

        stats = {
          'total' => 236642,
          'frameworks' => {
            'Gousto' => {
            'lines' => 39293,
            'percentage' => 16.6
            },
            'Core' => {
            'lines' => 7698,
            'percentage' => 3.25
            }
          }
        }

        allow(repo_stats_double).to receive(:workspace_loc_stats).and_return(stats)

        module_ownership = {
          nil => %w[Gousto Identity],
          'iOS-Foundations' => %w[Core]
        }
        context = {
          repo_stats: repo_stats_double,
          teams: {
            'iOS-Foundations': ['sarasipione']
          },
          module_ownership: module_ownership
        }

        metric = subject.generate(context)
        expect(metric.count).to eq(3)
        expect(metric.first.name).to eq('Gousto')
        expect(metric.first.statistic.source).to eq('Lines of Code')
        expect(metric.first.statistic.percentage).to eq(90.0)
        expect(metric.first.statistic.information).to eq(["Gousto's total number of lines of code is 39293 => 16.6%"])
        expect(metric.first.statistic.suggestions).to eq(['Gousto is 16.6% of the entire codebase. Could this be broken down?'])
        expect(metric.first.statistic.data_points).to eq( { 'LinesOfCode': 39293, 'LinesOfCodePercentage': 16.6 })
        expect(metric[1].statistic.data_points).to eq( { 'LinesOfCode': 7698, 'LinesOfCodePercentage': 3.25 })
        expect(metric.first.statistic.affected_files).to eq([])

        repo_stat = metric[2]
        expect(repo_stat.statistic.data_points).to eq({"TotalLinesOfCode": 236642})
        expect(repo_stat.type).to eq(PluginOutput::Type::REPOSITORY)
      end
    end
  end
end
