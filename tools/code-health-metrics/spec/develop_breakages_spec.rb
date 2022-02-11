require 'date'
require 'webmock/rspec'
require 'code_health_metrics'
require 'Plugins/develop_breakages'

describe DevelopBreakagesPlugin do

  subject { DevelopBreakagesPlugin.new }

  describe 'Detecting develop breakages' do

    context 'given there is a single failure' do
      it 'results in the team getting their score docked' do
        date = Date.new(2001, 2, 3)
        context = {
          from_date: date,
          buildkite: {
            org: 'test',
            develop_pipeline: 'pipeline'
          },
          teams: {
            'iOS-Foundations': ['sebskuse']
          }
        }

        # Stub the 'list builds' API request.
        list_data = File.open(File.join(File.dirname(__FILE__), './fixtures/develop_breakages/breakages_list.json')).read
        stub_request(:get, /builds\?created_from=2001-02-03&state=failed/).to_return(status: 200, body: list_data, headers: {})

        # Stub the 'individual build' API request.
        passed_build = File.open(File.join(File.dirname(__FILE__), './fixtures/develop_breakages/passed_build.json')).read
        stub_request(:get, %r{builds/122}).to_return(status: 200, body: passed_build, headers: {})

        output = subject.generate(context)
        expect(output.count).to eq(1)
        expect(output.first.name).to eq(:'iOS-Foundations')
        expect(output.first.type).to eq(PluginOutput::Type::TEAM)
        expect(output.first.statistic.percentage).to eq(40)
        expect(output.first.statistic.data_points[:TeamFailuresCount]).to eq(1)
        expect(output.first.statistic.data_points[:ProximityFailuresCount]).to eq(0)
      end
    end
  end
end
