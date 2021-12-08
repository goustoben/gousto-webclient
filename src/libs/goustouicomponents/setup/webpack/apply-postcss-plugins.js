/*
The project where Zest is imported should not have the PostCSS plugins used here as a dependency. This file is applying the custom plugins while keeping the default PostCSS / CSS Modules features intact (e.g. @value variables, composes, etc.)
*/

const postcss = require('postcss')
const postcssNested = require('postcss-nested')
const logMessage = require('./log-message')

module.exports = async (content, absoluteFrom) => {
  const convertedPostCSS = await postcss(postcssNested).process(content, { from: absoluteFrom })

  if (!convertedPostCSS.css) {
    logMessage(`Something went wrong with applying PostCSS plugins in file ${absoluteFrom}`, 'error')

    return null
  }

  logMessage('PostCSS plugins applied successfully', 'success')

  return convertedPostCSS.css
}
