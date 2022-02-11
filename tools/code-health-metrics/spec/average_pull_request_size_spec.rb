require 'date'
require 'json'
require 'code_health_metrics'
require 'Plugins/average_pull_request_size'

describe AveragePullRequestSizePlugin do

  subject { AveragePullRequestSizePlugin.new }

  describe 'File scanning' do

    context 'given the stub data' do
      it 'returns the output provided by the plugin' do
        date = Date.new(2001, 2, 3)

        pr_file = File.open(File.join(File.dirname(__FILE__), './fixtures/average_pull_request_size/pull_request.json')).read
        pr_data = JSON.parse(pr_file)

        commits_file = File.open(File.join(File.dirname(__FILE__), './fixtures/average_pull_request_size/merge_commits.json')).read
        merge_commits_data = JSON.parse(commits_file)

        context = {
          from_date: date,
          pulls: pr_data,
          merge_commits: {'1c13ed368219768abd2377845c76cc7193a8d2da' => merge_commits_data},
          teams: {
            'iOS-Foundations' => ['sebskuse']
            }
        }

        output = subject.generate(context)

        expect(output.count).to eq(1)
        expect(output.first.name).to eq('iOS-Foundations')
        expect(output.first.type).to eq(PluginOutput::Type::TEAM)
        expect(output.first.statistic.percentage).to eq(100)
        expect(output.first.statistic.suggestions).to eq([])
        expect(output.first.statistic.information.count).to eq(2)
        expect(output.first.statistic.information.first).to eq('Pull request differential sizes: [0], Average: 0, Max: 0')
        expect(output.first.statistic.data_points[:AverageDifferentialPRSize]).to eq(0)
        expect(output.first.statistic.data_points[:AverageAdditionToPR]).to eq(1)
        expect(output.first.statistic.data_points[:MaxAdditionToPR]).to eq(1)
        expect(output.first.statistic.affected_files).to eq([])
      end
    end
  end
end
