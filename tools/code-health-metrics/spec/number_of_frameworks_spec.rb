require 'date'
require 'code_health_metrics'
require 'Plugins/number_of_frameworks'

describe NumberOfFrameworksPlugin do

  subject { NumberOfFrameworksPlugin.new }

  describe 'Scanning for files' do
    let(:context) do
      {
        dependency_graph: double(workspace_group_map: {
          group_to_target: {
            'Features': %w[Help.framework Dashboard.framework],
            'Services': %w[UI.framework Persistence.framework HTTP.framework],
            'Foundations': %w[Core.framework]
          }
        })
      }
    end

    context 'given there are no violations in the file' do
      it 'returns no suggestions' do

        metric = subject.generate(context)
        expect(metric.count).to eq(1)
        expect(metric.first.type).to eq(PluginOutput::Type::REPOSITORY)
        expect(metric.first.statistic.source).to eq('Number of Frameworks')
        expect(metric.first.statistic.data_points).to eq({'TotalNumberOfFrameworks': 6, 'TotalNumberOfGroups': 3})
      end
    end
  end
end
