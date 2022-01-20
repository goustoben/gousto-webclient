/* eslint-disable no-useless-escape */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-continue */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-fallthrough */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-default-export */
/* eslint-disable import/no-unresolved */

const { warn, danger, message } = require('danger')
const fs = require('fs')
const path = require('path')

const checkIfPackageJsonIsUpdated = () => {
  const packageJson = danger.git.fileMatch('package.json')
  const lockfile = danger.git.fileMatch('yarn.lock')

  // Remind people to update lockfiles
  if (packageJson.modified && !lockfile.modified) {
    warn('This PR modified package.json, but not the lockfile')
  }
}

const checkDocumentationIsUpdate = () => {
  const documentation = danger.git.fileMatch('**/*.md')

  if (documentation.edited) {
    message('Thanks :heart: for updating the documentation!')
  }
}

function globToRegex(glob, opts) {
  if (typeof glob !== 'string') {
    throw new TypeError('Expected a string')
  }

  const str = String(glob)

  // The regexp we are building, as a string.
  let reStr = ''

  // Whether we are matching so called "extended" globs (like bash) and should
  // support single character matching, matching ranges of characters, group
  // matching, etc.
  const extended = opts ? !!opts.extended : false

  // When globstar is _false_ (default), '/foo/*' is translated a regexp like
  // '^\/foo\/.*$' which will match any string beginning with '/foo/'
  // When globstar is _true_, '/foo/*' is translated to regexp like
  // '^\/foo\/[^/]*$' which will match any string beginning with '/foo/' BUT
  // which does not have a '/' to the right of it.
  // E.g. with '/foo/*' these will match: '/foo/bar', '/foo/bar.txt' but
  // these will not '/foo/bar/baz', '/foo/bar/baz.txt'
  // Lastely, when globstar is _true_, '/foo/**' is equivelant to '/foo/*' when
  // globstar is _false_
  const globstar = opts ? !!opts.globstar : false

  // If we are doing extended matching, this boolean is true when we are inside
  // a group (eg {*.html,*.js}), and false otherwise.
  let inGroup = false

  // RegExp flags (eg "i" ) to pass in to RegExp constructor.
  const flags = opts && typeof( opts.flags ) === 'string' ? opts.flags : ''

  let c
  for (let i = 0, len = str.length; i < len; i++) {
    c = str[i]

    switch (c) {
    case '/':
    case '$':
    case '^':
    case '+':
    case '.':
    case '(':
    case ')':
    case '=':
    case '!':
    case '|':
      reStr += `\\${c}`
      break

    case '?':
      if (extended) {
        reStr += '.'
        break
      }

    case '[':
    case ']':
      if (extended) {
        reStr += c
        break
      }

    case '{':
      if (extended) {
        inGroup = true
        reStr += '('
        break
      }

    case '}':
      if (extended) {
        inGroup = false
        reStr += ')'
        break
      }

    case ',':
      if (inGroup) {
        reStr += '|'
        break
      }
      reStr += `\\${c}`
      break

    case '*':
      // Move over all consecutive "*"'s.
      // Also store the previous and next characters
      var prevChar = str[i - 1]
      var starCount = 1
      while (str[i + 1] === '*') {
        starCount++
        i++
      }
      var nextChar = str[i + 1]

      if (!globstar) {
        // globstar is disabled, so treat any number of "*" as one
        reStr += '.*'
      } else {
        // globstar is enabled, so determine if this is a globstar segment
        const isGlobstar = starCount > 1 // multiple "*"'s
          && (prevChar === '/' || prevChar === undefined) // from the start of the segment
          && (nextChar === '/' || nextChar === undefined) // to the end of the segment

        if (isGlobstar) {
          // it's a globstar, so match zero or more path segments
          reStr += '((?:[^/]*(?:\/|$))*)'
          i++ // move over the "/"
        } else {
          // it's not a globstar, so only match one path segment
          reStr += '([^/]*)'
        }
      }
      break

    default:
      reStr += c
    }
  }

  // When regexp 'g' flag is specified don't
  // constrain the regular expression with ^ & $
  if (!flags || !~flags.indexOf('g')) {
    reStr = `^${reStr}$`
  }

  return new RegExp(reStr, flags)
}

function ownerMatcher(pathString) {
  const regex = globToRegex(pathString, { flags: 'g' })

  return (testPath) => regex.test(testPath)
}

const createGetOwners = () => {
  const file = fs
    .readFileSync(path.resolve(__dirname, 'CODEOWNERS'))
    .toString()
  const lines = file
    .split(/\r\n|\r|\n/)
  let ownerEntries = []

  let line
  for (line of lines) {
    if (!line) {
      continue
    }

    if (line.startsWith('#')) {
      continue
    }

    const [pathString, ...usernames] = line.split(/\s+/)

    ownerEntries.push({
      path: pathString,
      usernames,
      match: ownerMatcher(pathString),
    })
  }

  ownerEntries = ownerEntries.reverse()

  const getOwner = (filePath) => {
    let entry
    for (entry of ownerEntries) {
      if (entry.match(filePath)) {
        return entry.usernames
      }
    }

    return []
  }

  return getOwner
}

// eslint-disable-next-line no-unused-vars
const checkCodeOwnersOfChangedFiles = () => {
  const getOwner = createGetOwners()
  const allFiles = danger.git.modified_files.concat(danger.git.created_files)
  const filesNotOwned = allFiles
    .filter((filePath) => {
      const owners = getOwner(`/${filePath}`)

      return owners.length === 1 && owners.includes('@Gousto/guild-frontend')
    })

  if (filesNotOwned.length === 0) {
    message('Yay :tada: all files changed have owners!')

    return
  }

  filesNotOwned.forEach((file) => {
    warn(`Missing Codeowners for files: ${file}`)
  })
}

checkIfPackageJsonIsUpdated()
checkDocumentationIsUpdate()
// TODO:
// This script keeps catching files that are owned,
// we need to put sometime to fix it.
// checkCodeOwnersOfChangedFiles()
