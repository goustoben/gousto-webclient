require 'code_health_metrics'
require 'Plugins/file_length'

describe FileLengthPlugin do

  subject { FileLengthPlugin.new }

    describe 'File scanning' do

      context 'given there are no violations' do
        before { allow(subject).to receive(:`).and_return('1 ./spec/fixtures/file_length/Shared/shared_file_length.swift') }
        it 'returns 0 suggestions' do

          repo_stats_double = double('repo stats')
          stats = {
            'frameworks' => {
              'Help' => {
              },
              'Shared' => {
              }
            }
          }

          allow(repo_stats_double).to receive(:workspace_loc_stats).and_return(stats)

          context = {
            repo_stats: repo_stats_double
          }

          metric = subject.generate(context)
          expect(metric[1].name).to eq('Shared')
          expect(metric[1].type).to eq('framework')
          expect(metric[1].statistic.source).to eq('File Length')
          expect(metric[1].statistic.information).to eq([])
          expect(metric[1].statistic.percentage).to eq(100)
          expect(metric[1].statistic.suggestions).to eq([])
          expect(metric[1].statistic.data_points).to eq({'TotalFilesAffected': 0, 'LargestFileLength': nil})
          expect(metric[1].statistic.affected_files).to eq([])
        end
      end

      context 'given there is 1 file over 500 lines of code' do
        before { allow(subject).to receive(:`).and_return('501 ./spec/fixtures/file_length/Help/help_file_length.swift') }
        it 'returns a list of suggestions for only that framework' do

          repo_stats_double = double('repo stats')
          stats = {
            'frameworks' => {
              'spec' => {
              },
              'Shared' => {
              }
            }
          }

          allow(repo_stats_double).to receive(:workspace_loc_stats).and_return(stats)

          context = {
            repo_stats: repo_stats_double
          }

          metric = subject.generate(context)
          suggestions = ['spec: help_file_length.swift has 501 lines, which is more than 500. Please break this file down into separate objects with clear responsibilities.']
          expect(metric[0].name).to eq('spec')
          expect(metric[0].type).to eq('framework')
          expect(metric[0].statistic.source).to eq('File Length')
          expect(metric[0].statistic.information).to eq(['spec contains 1 files out of 1 owned with more than 500 lines of code.'])
          expect(metric[0].statistic.percentage).to eq(95)
          expect(metric[0].statistic.suggestions).to eq(suggestions)
          expect(metric[0].statistic.data_points).to eq({'TotalFilesAffected': 1, 'LargestFileLength': 501})
          expect(metric[0].statistic.affected_files).to eq(['help_file_length.swift'])

          expect(metric[1].name).to eq('Shared')
          expect(metric[1].statistic.information).to eq([])
          expect(metric[1].statistic.percentage).to eq(100)
          expect(metric[1].statistic.suggestions).to eq([])
          expect(metric[1].statistic.data_points).to eq({'TotalFilesAffected': 0, 'LargestFileLength': nil})
          expect(metric[1].statistic.affected_files).to eq([])
        end
      end
    end
end
