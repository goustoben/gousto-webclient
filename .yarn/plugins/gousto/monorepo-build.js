const path = require('path')
const fs = require('fs')

// Must use an absolute dependency path, as module resolution won't have kicked in before this plugin is first parsed
const commands = require('../../../src/modules/library/monorepo-build')

const helpText = {
  category: 'Gousto commands',
  details: `
    For workspace names, call "yarn workspaces list --json".\n
    Plugin src: .yarn/plugins/gousto/monorepo-build'
  `,
  flags: {
    since: 'Compare to git reference (required)',
    workspace: 'Workspace name (required)'
  }
}

module.exports = {
  name: '@gousto/monorepo-build',
  factory: (require) => {
    const { Command, Option } = require('clipanion')
    const { BaseCommand } = require('@yarnpkg/cli')
    const { Configuration, Project } = require('@yarnpkg/core')
    const { gitUtils } = require('@yarnpkg/plugin-git')

    class MonorepoCommand extends BaseCommand {
      async createCommandCtx () {
        const { cwd, plugins } = this.context

        const config = await Configuration.find(cwd, plugins)
        const { project } = await Project.find(config, cwd)

        const gitRoot = await gitUtils.fetchRoot(project.configuration.projectCwd)
        const gitBase = await gitUtils.fetchBase(gitRoot, {
          baseRefs: [ this.since ]
        })

        const changedFiles = await gitUtils.fetchChangedFiles(gitRoot, {
          base: gitBase.hash,
          project
        })

        const targetWorkspace = project.workspaces.find(
          workspace => workspace.manifest.raw.name === this.workspace
        )

        const changes = changedFiles.map(filepath => {
          const workspace = project.tryWorkspaceByFilePath(filepath)
          return {
            filepath,
            relativePath: path.relative(workspace.cwd, filepath),
            workspace,
            deleted: !fs.existsSync(filepath)
          }
        })

        return {
          localChanges () {
            return changes.filter(change => change.workspace.cwd === targetWorkspace.cwd)
          },
          stdout: (string) => console.log(string)
        }
      }
    }

    class MonorepoLint extends MonorepoCommand {
      static paths = [
        [ 'monorepo-build', 'lint' ]
      ]

      static usage = Command.Usage({
        category: helpText.category,
        description: 'Outputs changes required to build / test a given workspace, since a given commit',
        details: helpText.details,
        examples: [
          [
            'Get lint changes to a feature module',
            'yarn monorepo-build lint --workspace=@features/recipe-tile --since=REF'
          ],
          [
            'Get lint changes to main webclient',
            'yarn monorepo-build lint --workspace=webclient --since=REF'
          ],
          [
            'Get lint changes to root project',
            'yarn monorepo-build lint --workspace=gousto-webclient --since=REF'
          ]
        ]
      })

      // We don't mark flags as required as this will break --help

      since = Option.String('--since', {
        description: helpText.flags.since
      })

      workspace = Option.String('--workspace', {
        description: helpText.flags.workspace
      })

      async execute () {
        if (!this.since) throw new Error('--since required')
        if (!this.workspace) throw new Error('--workspace required')

        const ctx = await this.createCommandCtx()
        return commands.lint(ctx)
      }
    }

    return {
      commands: [ MonorepoLint ]
    }
  }
}
