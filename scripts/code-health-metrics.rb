require 'Xcodeproj'
require_relative '../tools/codeowners/lib/codeowners'
require_relative '../tools/code_health_metrics/lib/code_health_metrics'

module Fastlane
  module Actions
    class CodeHealthMetricsAction < Action

      def self.run(params)
        @api_calls = 0

        date = Date.parse(params[:date])

        manager = CodeHealthManager.new

        UI.message("Generating metrics for period from #{date} till now.")

        rate_limit = other_action.github_api(path: '/rate_limit')
        UI.message("Rate limit standing: #{rate_limit[:json]['resources']['core']}")

        UI.message('Creating reporting context. This may take some time.')

        teams = github_team_mapping(params)
        pulls = pull_requests(params, date)
        codeowners = CodeOwners.new(params[:codeowners_location])

        context = {
          dir: Dir.pwd,
          version: params[:version],
          teams: teams,
          pulls: pulls,
          merge_commits: merge_commits(params, pulls),
          from_date: date,
          build: build_app(params),
          dependency_graph: other_action.dependency_graph_from_workspace,
          codeowners: codeowners,
          module_ownership: module_ownership(params, codeowners),
          repo_stats: RepositoryStatistics.new(params[:workspace_path]),
          unit_test_code_coverage: code_coverage(params, 'UnitTests'),
          overall_code_coverage: code_coverage(params, 'Integration'),
          buildkite: buildkite_params(params)
        }

        UI.message("GitHub API calls: #{@api_calls}")

        report = manager.run(context)

        # Write the report.
        Dir.mkdir(params[:report_output_path]) if File.exist?(params[:report_output_path]) == false

        report_data_path = File.join(params[:report_output_path], 'code_health_report.json')

        File.open(report_data_path, 'w') { |f| f.write(report.to_json) }

        {
          json: report_data_path,
          date: report.date
        }
      end

      def self.github_team_mapping(params)
        teams = other_action.github_api(path: "/organizations/#{params[:organisation_identifier]}/team/#{params[:root_team_id]}/teams")
        @api_calls += 1

        teams[:json].map do |team|
          members_url = team['members_url'].gsub(%r{{/member}$}, '')
          members = other_action.github_api(url: members_url)
          @api_calls += 1
          [team['name'], members[:json].map { |member| member['login'] }]
        end.to_h
      end

      def self.pull_requests(params, date)
        response = other_action.github_api(path: "/repos/Gousto/#{params[:repository_name]}/pulls?state=closed&base=develop&per_page=100")
        @api_calls += 1
        response[:json].filter do |pr|
          Date.parse(pr['merged_at']) > date if pr['merged_at'].nil? == false
        end
      end

      def self.merge_commits(params, pulls)
        pulls.map do |pull|
          @api_calls += 1
          response = other_action.github_api(path: "/repos/Gousto/#{params[:repository_name]}/commits/#{pull['merge_commit_sha']}")
          [pull['merge_commit_sha'], response[:json]]
        end.to_h
      end

      def self.build_app(params)
        derived_data_path = File.join(params[:build_directory], 'build')
        result_bundle_path = File.join(params[:build_directory], 'timing_report')

        skip_rebuild = Dir.exist?(params[:build_directory]) && params[:no_rebuild]

        unless skip_rebuild
          other_action.clear_derived_data(derived_data_path: params[:build_directory])

          other_action.build_app(
            scheme: params[:scheme],
            skip_archive: true,
            result_bundle: true,
            result_bundle_path: result_bundle_path,
            derived_data_path: derived_data_path,
            xcargs: 'EXCLUDED_ARCHS="arm64"',
            destination: 'generic/platform=iOS Simulator'
          )
        end

        {
          derived_data: derived_data_path,
          result_bundle: result_bundle_path
        }
      end

      def self.module_ownership(params, codeowners)
        workspace = Xcodeproj::Workspace.new_from_xcworkspace(params[:workspace_path])

        workspace.document.get_elements('/Workspace//FileRef').reduce(Hash.new { |h, k| h[k] = [] }) do |hash, project_reference|
          project = project_reference.attribute('location').value.split(':', 2).last
          dirname = File.dirname(project)
          hash[codeowners.owner("/#{dirname}/")].push(dirname)
          hash
        end
      end

      def self.code_coverage(params, plan)
        output_path = File.join(ENV['OUTPUT_PATH'], plan)
        intermediary_path = File.join(ENV['INTERMEDIARY_OUTPUT_PATH'], plan)

        # Execute in the `fastlane` directory, as that's what `test`
        # from Fastfile is expecting (see http://docs.fastlane.tools/advanced/fastlane/#directory-behavior).
        Dir.chdir('fastlane') do
          params[:run_tests]&.call(testplan: plan, output_root_path: output_path, intermediary_path: intermediary_path)
        end

        # The directory path where the 'report.json' file is stored.
        tmp_coverage_dir = File.join('./xcov', plan, params[:test_scheme], 'xcovarchive')
        FileUtils.rm_rf(tmp_coverage_dir) if Dir.exist?(tmp_coverage_dir)

        report = other_action.xcov(scheme: params[:test_scheme],
                                   workspace: params[:workspace_path],
                                   xccov_file_direct_path: Scan.cache[:result_bundle_path],
                                   output_directory: tmp_coverage_dir,
                                   json_report: true)

        {
          junit: File.join(output_path, "#{params[:test_scheme]}.xml"),
          report: File.join(tmp_coverage_dir, 'report.json')
        }
      end

      def self.buildkite_params(params)
        {
          develop_pipeline: 'ios-develop-merge',
          org: 'gousto',
          key: params[:buildkite_token]
        }
      end

      #####################################################
      # @!group Documentation
      #####################################################

      # rubocop:disable Metrics/MethodLength
      def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :organisation_identifier,
            env_name: 'GITHUB_ORGANISATION_IDENTIFIER',
            description: 'The GitHub organisation identifier'
          ),
          FastlaneCore::ConfigItem.new(
            key: :root_team_id,
            env_name: 'GITHUB_ROOT_IOS_TEAM_IDENTIFIER',
            description: 'The root GitHub team identifier'
          ),
          FastlaneCore::ConfigItem.new(
            key: :repository_name,
            env_name: 'GITHUB_REPO',
            description: 'The GitHub repository name'
          ),
          FastlaneCore::ConfigItem.new(
            key: :date,
            type: String,
            default_value: `git --no-pager log --tags --simplify-by-decoration --pretty="format:%ci" | head -1`, # The last release date.
            description: 'The date to run the report from'
          ),
          FastlaneCore::ConfigItem.new(
            key: :build_directory,
            type: String,
            default_value: './build_metrics',
            description: 'The root directory to store build artefacts'
          ),
          FastlaneCore::ConfigItem.new(
            key: :no_rebuild,
            type: Boolean,
            default_value: false,
            description: 'Whether to avoid rebuilding if a cache is found'
          ),
          FastlaneCore::ConfigItem.new(
            key: :scheme,
            type: String,
            default_value: 'ProductionRelease',
            description: 'The scheme to build'
          ),
          FastlaneCore::ConfigItem.new(
            key: :test_scheme,
            type: String,
            default_value: 'ProductionDevelopment',
            description: 'The scheme to build tests'
          ),
          FastlaneCore::ConfigItem.new(
            key: :workspace_path,
            env_name: 'WORKSPACE',
            description: 'The main project workspace'
          ),
          FastlaneCore::ConfigItem.new(
            key: :report_output_path,
            env_name: 'OUTPUT_PATH',
            description: 'The location to store the report for CI'
          ),
          FastlaneCore::ConfigItem.new(
            key: :version,
            description: 'The version this report is being generated for'
          ),
          FastlaneCore::ConfigItem.new(
            key: :run_tests,
            description: 'A callback allowing tests to be run',
            optional: true,
            type: Proc
          ),
          FastlaneCore::ConfigItem.new(
            key: :codeowners_location,
            description: 'The location of the CODEOWNERS file',
            env_name: 'CODEOWNERS_LOCATION',
          ),
          FastlaneCore::ConfigItem.new(
            key: :buildkite_token,
            env_name: 'CODE_METRICS_BUILDKITE_API_TOKEN',
            description: 'A Buildkite token'
          )
        ]
      end

      def self.description
        'Generate the code health metrics report.'
      end
    end
  end
end