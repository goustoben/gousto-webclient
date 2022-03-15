const formatJSError = (error) => ({
  message: error.message || error.code || 'Error',
  code: error.code,
  stack: error.stack
})

const isJSError = (e) => (e && e.stack && (e.message || e.code))

const formatErrors = (errors, log) => {
  if (errors !== undefined) {
    if (typeof errors === 'string') {
      return [{ message: errors }]
    } else if (isJSError(errors) && Array.isArray(log.errors)) {
      return [...log.errors, formatJSError(errors)]
    } else if (Array.isArray(errors)) {
      return errors.map(error => (isJSError(error) ? formatJSError(error) : error))
    }
  }

  return undefined
}

const formatLogs = (args) => {
  let log = {}

  if (isJSError(args)) {
    log.message = 'Error'
    log.errors = [formatJSError(args)]
  }

  const { message, status, elapsedTime, errors, level, requestUrl, uuid, extra, headers, source, requestType, actor, involves } = args

  log.log_level = level.toUpperCase()
  log.service = 'webclient'

  if (typeof message === 'string') {
    log.message = message
  } else {
    console.error("'message' field not provided or not a string") /* eslint-disable-line no-console */
  }

  log = {
    ...log,
    elapsedTime: typeof elapsedTime === 'number' ? `${elapsedTime}ms` : elapsedTime,
    status,
    errors: formatErrors(errors, log),
    requestUrl,
    'gousto-request-id': uuid,
    extra,
    headers: headers && {
      ...headers,
      cookie: ''
    },
    source,
    request_type: requestType,
    actor,
    involves,
    timestamp: __ENV__ !== 'production' && new Date(),
  }

  Object.keys(log).forEach(key => !log[key] && delete log[key])

  return log
}

const logToConsole = (args, level, consoleEnabled) => {
  const log = typeof args === 'string' ? { message: args, level } : { ...args, level }
  const logs = JSON.stringify(formatLogs(log))

  if (consoleEnabled) {
    console.log(logs) /* eslint-disable-line no-console */

    return null
  } else {
    return logs
  }
}

const getBrowserLogger = (consoleEnabled) => (
  ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'log'].reduce(
    (reduced, level) => ({
      ...reduced,
      [level]: args => logToConsole(args, level, consoleEnabled)
    }), {}
  )
)

/* eslint-disable-next-line */
export default getBrowserLogger(__ENV__ === 'local')
