/**
 * Query file changes to a given Yarn workspace. Used for differential build tasks. Works like yarn workspace-tools
 * Need help? Call `yarn workspace-changes --help`
 * For details on Yarn custom plugins, visit https://yarnpkg.com/advanced/plugin-tutorial
 */
const path = require('path')
const fs = require('fs')

module.exports = {
  name: '@gousto/workspace-changes',
  factory: (require) => {
    const { Command, Option } = require('clipanion')
    const { BaseCommand } = require('@yarnpkg/cli')
    const { Configuration, Project } = require('@yarnpkg/core')
    const { gitUtils } = require('@yarnpkg/plugin-git')

    class WorkspaceChanges extends BaseCommand {
      static paths = [
        [ 'workspace-changes' ]
      ]

      static usage = Command.Usage({
        category: 'Gousto commands',
        description: 'Outputs changes files relative to workspace, since a given commit',
        details: `
          For workspace names, call "yarn workspaces list --json"
          Plugin src: .yarn/plugins/gousto/workspace-changes.js
        `,
        examples: [
          [
            'Changes to a feature module',
            'yarn workspace-changes @features/recipe-tile --since=REF'
          ],
          [
            'Changes to main webclient app, linting only',
            'yarn workspace-changes webclient --since=REF --filter=lint'
          ],
          [
            'Changes to the root project',
            'yarn workspace-changes gousto-webclient --since=REF'
          ]
        ]
      })

      // Required, but can't be marked as such in Option without breaking the --help command
      since = Option.String('--since', {
        description: 'Compare to git reference (required)'
      })

      filter = Option.String('--filter', {
        description: 'Filters changes for different processes. Options: "lint"'
      })

      workspace = Option.Rest({
        required: 1
      })

      async execute () {
        if (!this.since) {
          throw new Error('The --since arg must be passed to yarn workspace-changes')
        }

        const [ workspaceTarget ] = this.workspace
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

        const changes = changedFiles.map(function toChangeCtx(filename) {
          const workspace = project.tryWorkspaceByFilePath(filename)
          return {
            filename,
            workspaceCwd: workspace.cwd,
            workspaceName: workspace.manifest.raw.name,
          }
        })

        const filterFlagFn = makeFilterFlagFn(this.filter)

        const results = changes
          .filter(function filterWorkspace (changeCtx) {
            return changeCtx.workspaceName === workspaceTarget
          })
          .filter(
            filterFlagFn
          )
          .map(function getRelativePath (changeCtx) {
            return path.relative(changeCtx.workspaceCwd, changeCtx.filename)
          })

        // If results are empty don't log, else output >= 1 byte, which breaks [ -f file ]
        if (results.length) {
          console.log(results.join(' '))
        }
      }
    }

    return {
      commands: [ WorkspaceChanges ]
    }
  }
}

function makeFilterFlagFn (filterFlag) {
  switch (filterFlag) {
    case undefined:
      return () => true

    case 'lint':
      return (changeCtx) => fs.existsSync(changeCtx.filename) && changeCtx.filename.match(/[jt]s(x?)$/g)

    default:
      throw new Error('The --filter option only supports "lint"')
  }
}
