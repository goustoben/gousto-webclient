require 'code_health_metrics'
require 'json'

describe CodeHealthManager do

  describe 'Collating Plugin Metrics' do

    context 'given there is one plugin returning some basic data' do

      subject do

        plugin = double('plugin double', { generate: [
          PluginOutput.new('Help', PluginOutput::Type::FRAMEWORK,
            Statistic.new('FakePlugin', 80, ['suggestion'], ['information'], { 'dataPoint': 1 }, ['File'])
          ),
          PluginOutput.new('Core', PluginOutput::Type::FRAMEWORK,
            Statistic.new('FakePlugin', 20, ['suggestion'], ['information'], { 'someOtherData': 2 }, ['File2'])
          ),
          PluginOutput.new('iOS-Foundations', PluginOutput::Type::TEAM,
            Statistic.new('FakePlugin', 99, [], [], { 'data': 111 }, [])
          ),
          PluginOutput.new(nil, PluginOutput::Type::REPOSITORY,
            Statistic.new('FakePlugin', nil, [], [], { 'linesOfCode': 99999 }, [])
          )
        ]})

        plugin2 = double('plugin double', { generate: [
          PluginOutput.new('Help', PluginOutput::Type::FRAMEWORK,
            Statistic.new('FakePlugin2', 99, ['suggestion2'], ['information2'], { 'dataPoint2': 1 }, ['File2'])
          ),
          PluginOutput.new('iOS-Haricots', PluginOutput::Type::TEAM,
            Statistic.new('FakePlugin2', 99, [], [], { 'data2': 111 }, [])
          ),
          PluginOutput.new(nil, PluginOutput::Type::REPOSITORY,
            Statistic.new('FakePlugin2', nil, [], [], { 'stuff': 1 }, [])
          )
        ]})
        CodeHealthManager.new([plugin, plugin2])
      end

      it 'returns a report reflecting the plugins data' do
        module_ownership = {
          nil => %w[Gousto Identity],
          'iOS-Haricots' => %w[Account Help CustomerManagement],
          'iOS-Jalapenos' => %w[Cookbook],
          'iOS-Rockets' => %w[Dashboard Onboarding RAF],
          'iOS-Foundations' => %w[Core Authentication],
          'iOS-Radishes' => %w[Marketplace],
          'iOS-Turnips' => %w[RecipeFeedback]
        }

        allow(DateTime).to receive(:now).and_return DateTime.new(2021, 8, 4, 5)

        report = subject.run({ version: '1.2.3', module_ownership: module_ownership })

        expect(report.version).to eq('1.2.3')
        expect(report.date).to eq(DateTime.new(2021, 8, 4, 5))

        # Teams.
        expect(report.teams.keys).to eq(%w[Unallocated iOS-Haricots iOS-Jalapenos iOS-Rockets iOS-Foundations iOS-Radishes iOS-Turnips])
        expect(report.teams['iOS-Foundations'].owned_frameworks).to eq(%w[Core Authentication])
        expect(report.teams['iOS-Foundations'].statistics.count).to eq(1)
        expect(report.teams['iOS-Foundations'].statistics.first.source).to eq('FakePlugin')
        expect(report.teams['iOS-Jalapenos'].statistics.count).to eq(0)

        expect(report.teams['Unallocated'].statistics.count).to eq(0)
        expect(report.teams['Unallocated'].owned_frameworks).to eq(%w[Gousto Identity])

        # Frameworks.
        expect(report.frameworks.keys).to eq(%w[Gousto Identity Account Help CustomerManagement Cookbook Dashboard Onboarding RAF Core Authentication Marketplace RecipeFeedback])

        expect(report.frameworks['Core'].statistics.count).to eq(1)
        expect(report.frameworks['Core'].statistics.first.source).to eq('FakePlugin')
        expect(report.frameworks['Core'].statistics.first.percentage).to eq(20)

        expect(report.frameworks['Help'].statistics.count).to eq(2)

        # Top level data points.
        expect(report.repository_data_points.keys).to eq(%i[linesOfCode stuff])
        expect(report.repository_data_points[:linesOfCode]).to eq(99999)
        expect(report.repository_data_points[:stuff]).to eq(1)
      end

      it 'returns a JSON report reflecting the plugins data' do
        module_ownership = {
          nil => %w[Gousto Identity],
          'iOS-Haricots' => %w[Account Help CustomerManagement],
          'iOS-Jalapenos' => %w[Cookbook],
          'iOS-Rockets' => %w[Dashboard Onboarding RAF],
          'iOS-Foundations' => %w[Core Authentication],
          'iOS-Radishes' => %w[Marketplace],
          'iOS-Turnips' => %w[RecipeFeedback]
        }

        allow(DateTime).to receive(:now).and_return DateTime.new(2021, 8, 4, 5)

        report = subject.run({ version: '1.2.3', module_ownership: module_ownership })

        json = JSON.parse(report.to_json)

        expect(json['version']).to eq('1.2.3')
        expect(json['date']).to eq('2021-08-04T05:00:00+00:00')
        expect(json['teams'].count).to eq(7)
        expect(json['frameworks'].count).to eq(13)

        expect(json['frameworks']['Core']['statistics'].first['dataPoints']['someOtherData']).to eq(2)
        expect(json['repositoryDataPoints']['linesOfCode']).to eq(99999)
      end
    end
  end
end
