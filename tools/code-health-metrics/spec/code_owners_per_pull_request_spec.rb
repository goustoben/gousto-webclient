require 'date'
require 'json'
require 'code_health_metrics'
require 'Plugins/code_owners_per_pull_request'

describe CodeOwnersPerPullRequestPlugin do

  subject { CodeOwnersPerPullRequestPlugin.new }

  describe 'Pull request scanning' do

    context 'given there are no requested teams' do
      it 'returns no additional teams have been requested' do
        date = Date.new(2001, 2, 3)

        pr_file = File.open(File.join(File.dirname(__FILE__), './fixtures/code_owners_per_pull_request/pull_request.json')).read

        context = {
          from_date: date,
          pulls: JSON.parse(pr_file),
          teams: {
            'iOS-Foundations' => ['sebskuse'],
            'iOS-Radishes' => []
            }
        }

        output = subject.generate(context)

        expect(output.count).to eq(1)
        expect(output.first.name).to eq('iOS-Foundations')
        expect(output.first.type).to eq(PluginOutput::Type::TEAM)
        expect(output.first.statistic.percentage).to eq(100)
        expect(output.first.statistic.suggestions).to eq([])
        expect(output.first.statistic.data_points[:PullRequestsWithExternalTeams]).to eq(0)
        expect(output.first.statistic.data_points[:PullRequestsExternalTeamsPercentage]).to eq(0)
        expect(output.first.statistic.data_points[:PullRequestsWithMultipleExternalTeams]).to eq(0)
        expect(output.first.statistic.data_points[:PullRequestsMultipleExternalTeamsPercentage]).to eq(0)
        expect(output.first.statistic.affected_files).to eq([])
      end
    end

    context 'given there is an external team requested' do
      it 'returns the team requested' do
        date = Date.new(2001, 2, 3)

        pr_file = File.open(File.join(File.dirname(__FILE__), './fixtures/code_owners_per_pull_request/pull_request_external.json')).read

        context = {
          from_date: date,
          pulls: JSON.parse(pr_file),
          teams: {
            'iOS-Foundations' => ['sebskuse'],
            'iOS-Radishes' => []
            }
        }

        output = subject.generate(context)

        expect(output.count).to eq(1)
        expect(output.first.name).to eq('iOS-Foundations')
        expect(output.first.type).to eq(PluginOutput::Type::TEAM)
        expect(output.first.statistic.percentage).to eq(90)
        expect(output.first.statistic.suggestions).to eq(['100% of your PRs consult external teams (iOS-Radishes)'])
        expect(output.first.statistic.data_points[:PullRequestsWithExternalTeams]).to eq(1)
        expect(output.first.statistic.data_points[:PullRequestsExternalTeamsPercentage]).to eq(100)
        expect(output.first.statistic.data_points[:PullRequestsWithMultipleExternalTeams]).to eq(0)
        expect(output.first.statistic.data_points[:PullRequestsMultipleExternalTeamsPercentage]).to eq(0)
        expect(output.first.statistic.affected_files).to eq([])
      end
    end

    context 'given there is multiple external teams requested' do
      it 'returns the teams requested' do
        date = Date.new(2001, 2, 3)

        pr_file = File.open(File.join(File.dirname(__FILE__), './fixtures/code_owners_per_pull_request/pull_request_multiple_external.json')).read

        context = {
          from_date: date,
          pulls: JSON.parse(pr_file),
          teams: {
            'iOS-Foundations' => ['sebskuse'],
            'iOS-Radishes' => []
            }
        }

        output = subject.generate(context)

        expect(output.count).to eq(1)
        expect(output.first.name).to eq('iOS-Foundations')
        expect(output.first.type).to eq(PluginOutput::Type::TEAM)
        expect(output.first.statistic.percentage).to eq(70)
        expect(output.first.statistic.suggestions).to eq([
          '100% of your PRs consult external teams (iOS-Radishes, iOS-Jalapenos)',
          '100% of your PRs consult multiple teams. Consider breaking down into separate, smaller PRs'
        ])
        expect(output.first.statistic.data_points[:PullRequestsWithExternalTeams]).to eq(1)
        expect(output.first.statistic.data_points[:PullRequestsExternalTeamsPercentage]).to eq(100)
        expect(output.first.statistic.data_points[:PullRequestsWithMultipleExternalTeams]).to eq(1)
        expect(output.first.statistic.data_points[:PullRequestsMultipleExternalTeamsPercentage]).to eq(100)
        expect(output.first.statistic.affected_files).to eq([])
      end
    end
  end
end
