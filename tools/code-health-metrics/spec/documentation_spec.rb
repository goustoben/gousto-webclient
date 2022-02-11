require 'code_health_metrics'
require 'Plugins/documentation'

describe DocumentationPlugin do

    subject { DocumentationPlugin.new }

    describe 'File scanning' do

      context 'given the documentation percentage has increased for the framework' do
        it 'does not return any suggestions' do
            repo_stats_double = double('repo stats')

            stats = {
              'frameworks' => {
                'Gousto' => {
                  'docs' => 100.00
                },
                'Shared' => {
                  'docs' => 80.00
                }
              }
            }

            stored_stats = {
              'frameworks' => {
                'Gousto' => {
                  'docs' => 66.86
                },
                'Shared' => {
                  'docs' => 75.00
                }
              }
            }

            allow(repo_stats_double).to receive(:workspace_doc_stats).and_return(stats)
            allow(repo_stats_double).to receive(:fetch_reference_stored_stats).and_return(stored_stats)

            context = {
              repo_stats: repo_stats_double
            }

          metric = subject.generate(context)
          expect(metric[0].name).to eq('Gousto')
          expect(metric[0].statistic.information).to eq(['Gousto documentation coverage is 100.0%.'])
          expect(metric[0].statistic.percentage).to eq(100.0)
          expect(metric[0].statistic.source).to eq('Documentation')
          expect(metric[0].statistic.suggestions).to eq([])
        end
      end

      context 'given the documentation percentage has decreased for the framework' do
        it 'returns some suggestions' do
            repo_stats_double = double('repo stats')

            stats = {
              'frameworks' => {
                'Gousto' => {
                  'docs' => 90.00
                },
                'Shared' => {
                  'docs' => 55.00
                }
              }
            }

            stored_stats = {
              'frameworks' => {
                'Gousto' => {
                  'docs' => 100.00
                },
                'Shared' => {
                  'docs' => 75.00
                }
              }
            }

            allow(repo_stats_double).to receive(:workspace_doc_stats).and_return(stats)
            allow(repo_stats_double).to receive(:fetch_reference_stored_stats).and_return(stored_stats)

            module_ownership = {
              nil => %w[Gousto Identity],
              'iOS-Foundations' => %w[Core]
            }
            context = {
              repo_stats: repo_stats_double,
              teams: {
                'iOS-Foundations': ['katieljones']
              },
              module_ownership: module_ownership
            }

          metric = subject.generate(context)
          gousto_metrics = metric[0]
          gousto_suggestions = ['Gousto documentation coverage has decreased by -10.0%. Please fix it ASAP and ensure we add documentation when adding to this framework!']
          expect(gousto_metrics.name).to eq('Gousto')
          expect(gousto_metrics.statistic.information).to eq(['Gousto documentation coverage is 90.0%.'])
          expect(gousto_metrics.statistic.percentage).to eq(90.0)
          expect(gousto_metrics.statistic.source).to eq('Documentation')
          expect(gousto_metrics.statistic.suggestions).to eq(gousto_suggestions)

          shared_metrics = metric[1]
          shared_suggestions = ['Shared documentation coverage has decreased by -20.0%. Please fix it ASAP and ensure we add documentation when adding to this framework!']
          expect(shared_metrics.name).to eq('Shared')
          expect(shared_metrics.statistic.information).to eq(['Shared documentation coverage is 55.0%.'])
          expect(shared_metrics.statistic.percentage).to eq(55.0)
          expect(shared_metrics.statistic.source).to eq('Documentation')
          expect(shared_metrics.statistic.suggestions).to eq(shared_suggestions)
        end
      end

      context 'given a new framework with no stored stats' do
        it 'returns no suggestions' do
            repo_stats_double = double('repo stats')

            stats = {
              'frameworks' => {
                'Gousto' => {
                  'docs' => 90.00
                },
                'Shared' => {
                  'docs' => 55.00
                }
              }
            }

            stored_stats = {
              'frameworks' => {
                'Shared' => {
                  'docs' => 75.00
                }
              }
            }

            allow(repo_stats_double).to receive(:workspace_doc_stats).and_return(stats)
            allow(repo_stats_double).to receive(:fetch_reference_stored_stats).and_return(stored_stats)

            module_ownership = {
              nil => %w[Gousto Identity],
              'iOS-Foundations' => %w[Core]
            }
            context = {
              repo_stats: repo_stats_double,
              teams: {
                'iOS-Foundations': ['katieljones']
              },
              module_ownership: module_ownership
            }

          metric = subject.generate(context)
          gousto_metrics = metric[0]

          expect(gousto_metrics.name).to eq('Gousto')
          expect(gousto_metrics.statistic.information).to eq(['Gousto documentation coverage is 90.0%.'])
          expect(gousto_metrics.statistic.percentage).to eq(90.0)
          expect(gousto_metrics.statistic.source).to eq('Documentation')
          expect(gousto_metrics.statistic.suggestions).to eq([])

          shared_metrics = metric[1]
          shared_suggestions = ['Shared documentation coverage has decreased by -20.0%. Please fix it ASAP and ensure we add documentation when adding to this framework!']
          expect(shared_metrics.name).to eq('Shared')
          expect(shared_metrics.statistic.suggestions).to eq(shared_suggestions)
        end
      end
    end
  end
