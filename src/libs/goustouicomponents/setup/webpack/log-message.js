const chalk = require('chalk')

module.exports = (message, type) => {
  let loggedMessage

  switch (type) {
    case 'error':
      loggedMessage = chalk.white.bgRed('❌ ERROR: ', message)
      break
    case 'warning':
      loggedMessage = chalk.black.bgYellow('⚠️ WARNING: ', message)
      break
    case 'info':
      loggedMessage = chalk.white.bgBlue('ℹ️ INFO: ', message)
      break
    case 'success':
      loggedMessage = chalk.black.bgGreen('✅ SUCCESS: ', message)
      break
    default:
      loggedMessage = message
  }

  return console.log(loggedMessage) // eslint-disable-line no-console
}
