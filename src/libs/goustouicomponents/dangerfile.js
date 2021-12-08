/* eslint-disable import/no-extraneous-dependencies */
const {
  danger,
  fail,
  warn,
  markdown,
  message,
} = require('danger')

const SEMVER_NAMES = ['MAJOR', 'MINOR', 'PATCH']
const BIG_PR_THRESHOLD = 600
const hasChangelogChanged = danger.git.modified_files.includes('CHANGELOG.md')
const hasPackageChanged = danger.git.modified_files.includes('package.json')
const hasLockfileChanged = danger.git.modified_files.includes('package-lock.json')

const checkIncrementalUpdate = (previousVersion, nextVersion, index) => {
  if (
    previousVersion[index] !== nextVersion[index]
    && nextVersion[index] !== 0
    && previousVersion[index] + 1 !== nextVersion[index]
  ) {
    const correctVersion = [
      `${previousVersion[0] + 1}.0.0`,
      `${nextVersion[0]}.${previousVersion[1] + 1}.0`,
      `${nextVersion[0]}.${nextVersion[1]}.${nextVersion[2] + 1}`,
    ]

    warn(`It looks like you have updated the ${SEMVER_NAMES[index]} version but not incrementally. Are you sure you didn't mean to update it to ${correctVersion[index]}?`)
  }
}

// Check if CHANGELOG was modified
if (!hasChangelogChanged) {
  fail('Please add a changelog entry for your changes.')
}

// Check if PACKAGE was modified
if (!hasPackageChanged) {
  fail('Please update the version in package.json.')
}

// Keep lockfile up to date
if (hasPackageChanged && !hasLockfileChanged) {
  warn('You\'ve made changes to package.json but not to package-lock.json. Perhaps you need to run `npm install`?')
}

// Encourage small PRs
if (danger.github.pr.additions + danger.github.pr.deletions > BIG_PR_THRESHOLD) {
  warn('Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.')
}

// version checks
if (hasPackageChanged) {
  (async () => {
    const packageContent = await danger.git.JSONDiffForFile('package.json')
    const hasVersionChanged = !!packageContent.version
    const previousVersion = hasVersionChanged ? packageContent.version.before.split('.').map(Number) : null
    const nextVersion = hasVersionChanged ? packageContent.version.after.split('.').map(Number) : null

    // make sure package.json is changed
    if (!hasVersionChanged) {
      fail('Please update the version in package.json.')
    }

    if (previousVersion && nextVersion) {
      // check patch is reset when minor is changed
      if (previousVersion[1] !== nextVersion[1] && nextVersion[2] !== 0) {
        warn(`It looks like you have updated the MINOR version but forgot to reset the PATCH? Are you sure you didn't mean to update to ${nextVersion[0]}.${nextVersion[1]}.0?`)
      }

      // check minor or patch are reset when major is changed
      if (previousVersion[0] !== nextVersion[0] && (nextVersion[1] !== 0 || nextVersion[2] !== 0)) {
        warn(`It looks like you have updated the MAJOR version but forgot to reset the MINOR and PATCH? Are you sure you didn't mean to update to ${nextVersion[0]}.0.0?`)
      }

      // check version is increased incrementally
      SEMVER_NAMES.map((name, index) => checkIncrementalUpdate(previousVersion, nextVersion, index))

      // inform the type of update according to version
      let versionUpdate = 'PATCH'
      versionUpdate = (previousVersion[0] !== nextVersion[0]) ? 'MAJOR' : versionUpdate
      versionUpdate = (previousVersion[1] !== nextVersion[1]) ? 'MINOR' : versionUpdate

      message(`This is a ${versionUpdate} version update.`)
    }

    // make sure version is updated in lockfile as well
    if (hasLockfileChanged) {
      const packageLockContent = await danger.git.JSONDiffForFile('package-lock.json')
      const hasLockVersionChanged = !!packageLockContent.version

      if (!hasLockVersionChanged) {
        warn('It looks like the version declared in package.json is different than the one from from package-lock.json. Make sure to run `npm install` after bumping the version so the lock file gets regernerated with the new version.')
      }
    }
  })()
}

// retrieve changes to the CHANGELOG and post them as a message
if (hasChangelogChanged) {
  (async () => {
    const content = await danger.git.diffForFile('CHANGELOG.md')

    if (content.added) {
      const changelogUpdate = content.added.replace(/\+/g, '')

      markdown(`# These are the updates to the CHANGELOG:
        ${changelogUpdate}
      `)
    }
  })()
}

/* eslint-enable import/no-extraneous-dependencies */
