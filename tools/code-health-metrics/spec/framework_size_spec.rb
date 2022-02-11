require 'code_health_metrics'
require 'Plugins/framework_size'

describe FrameworkSizePlugin do

  subject { FrameworkSizePlugin.new }

  describe 'Detecting framework size' do

    module_ownership = {
      'nil' => %w[Gousto Identity],
      'iOS-Haricots' => %w[Account Help CustomerManagement],
      'iOS-Jalapenos' => %w[Cookbook],
      'iOS-Rockets' => %w[Dashboard Onboarding RAF],
      'iOS-Foundations' => %w[Core Authentication],
      'iOS-Radishes' => %w[Marketplace],
      'iOS-Turnips' => %w[RecipeFeedback]
    }

    let(:context) do
      {
        build: {
          derived_data: '/tmp'
        },
        module_ownership: module_ownership,
        dependency_graph: double(workspace_group_map: {
          group_to_target: { 'unused': %w[Help.framework] }
        })
      }
    end

    context 'given the framework does not have large assets' do
      before { allow(subject).to receive(:`).and_return('45747.0') }
      it 'returns the frameworks size filled with any assets ' do

        allow(Dir).to receive(:glob).with('/tmp/Build/Products/*/*.{framework,app}').and_return [
          '/Build/Products/Test/Foo.framework',
          '/Build/Products/Test/Help.framework'
        ]
        allow(File).to receive(:size).with('/Build/Products/Test/Foo.framework/Foo').and_return 10000000000
        allow(File).to receive(:size).with('/Build/Products/Test/Help.framework/Help').and_return 10000000000

        output = subject.generate(context)
        expect(output.count).to eq(1)
        expect(output.first.name).to eq('Help.framework')
        expect(output.first.type).to eq(PluginOutput::Type::FRAMEWORK)
        expect(output.first.statistic.percentage).to eq(90)
        expect(output.first.statistic.data_points).to eq({'FrameworkAssetSize': 0, 'FrameworkBinarySize': 9536})
        expect(output.first.statistic.affected_files).to eq([])
      end
    end

    context 'given the framework does have large assets' do
      before { allow(subject).to receive(:`).and_return('45747.0') }
      it 'returns the frameworks size filled with assets ' do

        allow(Dir).to receive(:glob).with('/tmp/Build/Products/*/*.{framework,app}').and_return [
          '/Build/Products/Test/Foo.framework',
          '/Build/Products/Test/Help.framework'
        ]
        allow(File).to receive(:size).with('/Build/Products/Test/Foo.framework/Foo').and_return 10000000000
        allow(File).to receive(:size).with('/Build/Products/Test/Help.framework/Help').and_return 10000000000
        allow(File).to receive(:exist?).with('/Build/Products/Test/Help.framework/Assets.car').and_return true
        allow(File).to receive(:size).with('/Build/Products/Test/Help.framework/Assets.car').and_return 20000000000
        allow(subject).to receive(:largest_assets_in_car).and_return [
          {
            'SizeOnDisk' => 5000000000000,
            'AssetType' => 'Image',
            'PixelWidth' => '400',
            'PixelHeight' => '500',
            'Name' => 'sampleImage'
          }
        ]

        output = subject.generate(context)
        expect(output.count).to eq(1)
        expect(output.first.name).to eq('Help.framework')
        expect(output.first.type).to eq(PluginOutput::Type::FRAMEWORK)
        expect(output.first.statistic.percentage).to eq(80)
        expect(output.first.statistic.data_points).to eq({'FrameworkAssetSize': 19073, 'FrameworkBinarySize': 9536})
        expect(output.first.statistic.affected_files).to eq(['/Build/Products/Test/Help.framework/Assets.car'])
      end
    end
  end
end
