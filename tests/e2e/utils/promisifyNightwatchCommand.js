/**
 * Turn the continuation-passing style invocation:
 *
 * `browser.fnName(...args, (cr) => { <use cr.value> })`
 *
 * into a promise that resolves with `cr.value` or rejects if the Nightwatch
 * interaction is unsuccessful.  Useful for chaining Nightwatch API
 * interactions and avoid callback-in-callback-in-callback.
 */
function promisifyNightwatchCommand(browser, fnName, ...args) {
  return new Promise((resolve, reject) => {
    browser[fnName].call(browser, ...args, (result) => {
      if (result.status === 0) {
        resolve(result.value)
      } else {
        console.error('promisifyNightwatchCommand: ', fnName, ...args, 'error: ', result.value)
        reject(result.value)
      }
    })
  })
}

module.exports = {
  promisifyNightwatchCommand
}
