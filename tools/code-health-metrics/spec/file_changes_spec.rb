require 'code_health_metrics'
require 'Plugins/file_changes'

describe FileChangesPlugin do

  subject { FileChangesPlugin.new }

    describe 'File scanning' do

      context 'given there are no violations' do
          before { allow(subject).to receive(:`).and_return('6 Gousto/Sources/ViewControllers/RecipeList/RecipeListViewController.swift') }
          it 'returns 0 suggestions' do
              repo_stats_double = double('repo stats')
              stats = {
                'frameworks' => {
                  'Gousto' => {
                  }
                }
              }

              allow(repo_stats_double).to receive(:workspace_loc_stats).and_return(stats)
              date = Date.new(2001, 2, 3)
              context = {
                repo_stats: repo_stats_double,
                from_date: date
              }
              metric = subject.generate(context)
              expect(metric[0].name).to eq('Gousto')
              expect(metric[0].type).to eq('framework')
              expect(metric[0].statistic.source).to eq('File Changes')
              expect(metric[0].statistic.information).to eq([])
              expect(metric[0].statistic.percentage).to eq(85)
              expect(metric[0].statistic.suggestions).to eq(['Gousto: RecipeListViewController.swift has changed 6 times by 6 developers.'])
              expect(metric[0].statistic.data_points).to eq({'TotalFileChangesCount': 1})
              expect(metric[0].statistic.affected_files).to eq(['RecipeListViewController.swift'])
          end
      end

      context 'given there are multiple files that have been changed more than 5 times' do
        before do allow(subject).to receive(:`).and_return(
          '6 Gousto/Sources/ViewControllers/RecipeList/RecipeListViewController.swift
          8 Gousto/Sources/ViewControllers/Stars/StarViewController.swift'
          )
        end

        it 'returns a report of multiple suggestions and affected files' do
          repo_stats_double = double('repo stats')
          stats = {
            'frameworks' => {
              'Gousto' => {
              },
              'Shared' => {
              }
            }
          }

          allow(repo_stats_double).to receive(:workspace_loc_stats).and_return(stats)
          date = Date.new(2001, 2, 3)
          context = {
            repo_stats: repo_stats_double,
            from_date: date
          }

          metric = subject.generate(context)
          suggestions = ['Gousto: RecipeListViewController.swift has changed 6 times by 6 developers.', 'Gousto: StarViewController.swift has changed 8 times by 6 developers.']
          expect(metric[0].name).to eq('Gousto')
          expect(metric[0].type).to eq('framework')
          expect(metric[0].statistic.source).to eq('File Changes')
          expect(metric[0].statistic.information).to eq([])
          expect(metric[0].statistic.percentage).to eq(70)
          expect(metric[0].statistic.suggestions).to eq(suggestions)
          expect(metric[0].statistic.data_points).to eq({'TotalFileChangesCount': 2})
          expect(metric[0].statistic.affected_files).to eq(['RecipeListViewController.swift', 'StarViewController.swift'])
        end
      end

      context 'given there has been a violation in only Gousto' do
        before { allow(subject).to receive(:`).and_return('6 Gousto/Sources/ViewControllers/RecipeList/RecipeListViewController.swift')}
        it 'there should not be any violations reported in other frameworks' do

          repo_stats_double = double('repo stats')
            stats = {
              'frameworks' => {
                'Gousto' => {
                },
              'Shared' => {
                }
              }
            }

          allow(repo_stats_double).to receive(:workspace_loc_stats).and_return(stats)
          date = Date.new(2001, 2, 3)
          context = {
            repo_stats: repo_stats_double,
            from_date: date
          }

          metric = subject.generate(context)
          expect(metric[0].name).to eq('Gousto')
          expect(metric[0].type).to eq('framework')
          expect(metric[0].statistic.source).to eq('File Changes')
          expect(metric[0].statistic.information).to eq([])
          expect(metric[0].statistic.percentage).to eq(85)
          expect(metric[0].statistic.suggestions).to eq(['Gousto: RecipeListViewController.swift has changed 6 times by 6 developers.'])
          expect(metric[0].statistic.data_points).to eq({'TotalFileChangesCount': 1})
          expect(metric[0].statistic.affected_files).to eq(['RecipeListViewController.swift'])

          expect(metric[1].name).to eq('Shared')
          expect(metric[1].type).to eq('framework')
          expect(metric[1].statistic.source).to eq('File Changes')
          expect(metric[1].statistic.information).to eq([])
          expect(metric[1].statistic.percentage).to eq(100)
          expect(metric[1].statistic.suggestions).to eq([])
          expect(metric[1].statistic.data_points).to eq({'TotalFileChangesCount': 0})
          expect(metric[1].statistic.affected_files).to eq([])
        end
      end
    end
end
