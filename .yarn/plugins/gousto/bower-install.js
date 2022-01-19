const { execSync } = require('child_process')

module.exports = {
  name: '@gousto/bower-install',
  factory: (require) => ({
    hooks: {
      async afterAllInstalled(project, options) {
        console.log('📦 Custom yarn plugin: bower-install')
        const start = Date.now()

        /**
         * When running workspaces in focused mode, we'd like to skip the bower install if it's not relevant
         * Focused mode works by temporarily clearing the dependencies list for each workspace
         */
        const installedWorkspaces = project.workspaces.filter(workspace => workspace.dependencies.size)
        const targetWorkspaces = installedWorkspaces.filter(workspace => workspace.manifest.scripts.has('bower-install'))

        if (targetWorkspaces.length === 0) {
          console.log('bower-install: ✅ No bower modules to install')
          return
        }

        for (const workspace of targetWorkspaces) {
          const { name } = workspace.locator
          console.log(`bower-install: ⏳ Running bower-install for workspace "${name}" ...`)
          execSync(`yarn workspace ${name} run bower-install`, { stdio: 'inherit' })
        }

        const duration = Math.round((Date.now() - start) / 1000)
        console.log(`bower-install: ✅ All bower modules installed! (${duration}s)`)
      }
    }
  })
}
