require 'date'
require 'code_health_metrics'
require 'Plugins/output_files'

describe OutputFilesPlugin do

  subject { OutputFilesPlugin.new }

  describe 'Scanning for files' do

    let(:module_ownership) do
      {
        nil => %w[Gousto Identity],
        'iOS-Haricots' => %w[Account Help CustomerManagement],
        'iOS-Jalapenos' => %w[Cookbook],
        'iOS-Rockets' => %w[Dashboard Onboarding RAF],
        'iOS-Foundations' => %w[Core Authentication],
        'iOS-Radishes' => %w[Marketplace],
        'iOS-Turnips' => %w[RecipeFeedback]
      }
    end

    let(:context) do
      {
        build: {
          derived_data: '/tmp'
        },
        module_ownership: :module_ownership,
        dependency_graph: double(workspace_group_map: {
          group_to_target: { 'unused': %w[Help.framework] }
        })
      }
    end

    context 'given there are no violations in the file' do
      it 'returns no suggestions' do

        # Lets say we've got two output frameworks.
        # Help belongs to us (see group_to_target) above
        # But Foo doesn't.
        allow(Dir).to receive(:glob).with('/tmp/Build/Products/*/*.framework').and_return [
          '/Build/Products/Test/Foo.framework',
          '/Build/Products/Test/Help.framework'
        ]

        # No files detected
        allow(Dir).to receive(:glob).with('/Build/Products/Test/Help.framework/*Controller.storyboardc').and_return []
        allow(Dir).to receive(:glob).with('/Build/Products/Test/Help.framework/*.nib').and_return []
        allow(Dir).to receive(:glob).with('/Build/Products/Test/Help.framework/*.xcconfig').and_return []

        metric = subject.generate(context)
        expect(metric.count).to eq(2)
        expect(metric.first.type).to eq(PluginOutput::Type::FRAMEWORK)
        expect(metric.first.statistic.source).to eq('Discouraged Output Files')
        expect(metric[1].statistic.source).to eq('Prohibited Output Files')
        expect(metric.first.name).to eq('Help.framework')
        expect(metric.first.statistic.percentage).to eq(100)
      end
    end

    context 'given there are violations in the file' do
      it 'returns suggestions' do
        # Lets say we've got two output frameworks.
        # Help belongs to us (see group_to_target) above
        # But Foo doesn't.
        allow(Dir).to receive(:glob).with('/tmp/Build/Products/*/*.framework').and_return [
          '/Build/Products/Test/Foo.framework',
          '/Build/Products/Test/Help.framework'
        ]

        # No files detected
        allow(Dir).to receive(:glob).with('/Build/Products/Test/Help.framework/*Controller.storyboardc').and_return [
          '/Build/Products/Test/Help.framework/BananasController.storyboardc'
        ]
        allow(Dir).to receive(:glob).with('/Build/Products/Test/Help.framework/*.nib').and_return [
          '/Build/Products/Test/Help.framework/AppleInterface.nib'
        ]

        allow(Dir).to receive(:glob).with('/Build/Products/Test/Help.framework/*.xcconfig').and_return [
          '/Build/Products/Test/Help.framework/Naughty.xcconfig'
        ]

        metric = subject.generate(context)
        expect(metric.count).to eq(2)
        expect(metric.first.type).to eq(PluginOutput::Type::FRAMEWORK)
        expect(metric.first.name).to eq('Help.framework')
        expect(metric.first.statistic.percentage).to eq(96)
        expect(metric.first.statistic.data_points).to eq({ 'NibsCount' => 1, 'StoryboardsCount' => 1 })

        expect(metric[1].type).to eq(PluginOutput::Type::FRAMEWORK)
        expect(metric[1].name).to eq('Help.framework')
        expect(metric[1].statistic.percentage).to eq(70)
        expect(metric[1].statistic.data_points).to eq({ 'XcconfigsCount' => 1 })
      end
    end
  end
end
