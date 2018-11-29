import goustoStore from 'store'

const levels = {
  debug: 5,
  info: 4,
  notice: 3,
  warning: 2,
  error: 1,
  critical: 0,
}

const serviceName = 'webclient'

const logger = () => (isNodejs() ? getNodeLogger() : getBrowserLogger() )

const getNodeLogger = () => {
  const {format, createLogger, transports} = require('winston')

  return createLogger({
    format: format.combine(
      format.json(),
      format.printf(log => {
        
        return JSON.stringify(formatLogs(log))
      })
    ),
    transports: [
      new (transports.Console)({
        prettyPrint: false,
        colorize: true,
        silent: false,
        timestamp: false,
      }),
    ],
    levels,
  })
}

const getBrowserLogger = () => ( Object.keys(levels).reduce((reduced, key) => ({ ...reduced, [key]: (args) => (logToConsole(args, key)) }), { log: (args) => (logToConsole(args, 'log')) }) )

const isNodejs = () => ( typeof "process" !== "undefined" && process && process.versions && process.versions.node )

const logToConsole = (args, level) => { const log = typeof args === "string"? {message: args, level: level}: {...args, level}; console.log(JSON.stringify(formatLogs(log))) } /* eslint-disable-line no-console */ 

const formatLogs = (args) => {
  const log = {}
  if( typeof args === "string" ) {
    log.message = args
  }else if (isJSError(args)){
    log.message = 'Error'
    log.errors = [{message: args.message, stack: args.stack}]
  }

  const {message, status, elapsedTime, errors, level, service, requestUrl, uuid, extra, headers} = args

  if(level !== undefined){
    log['log_level'] = level.toUpperCase()
  }

  log.service = service !== undefined ? service : serviceName
  
  if ( message !== undefined && typeof message === "string" ){
    log.message = message
  }else{
    console.error("'message' field not provided or not a string") /* eslint-disable-line no-console */
  }
    
  if(elapsedTime !== undefined) {
    log.elapsedTime = typeof elapsedTime === "number" ? `${elapsedTime}ms` : elapsedTime
  }

  if(status !== undefined){
    log.status = status
  }

  if(errors !== undefined){
    if(typeof errors === "string"){
      log.errors = [{message: errors}]
    } else if(isJSError(errors)){
      log.errors.push({ message:errors.message, stack: errors.stack })
    } else{
      log.errors = []
      errors.map(error => {
        const e = isJSError(error) ? {message: error.message, stack: error.stack } : error
        log.errors.push(e)
      })
    }
  }

  if(requestUrl !== undefined){
    log.requestUrl = requestUrl
  }
  
  if(uuid !== undefined) {
    log['gousto-request-id'] = uuid
  }else{
    const state = goustoStore.store.getState()
    const stateUuid = state && state.logger && state.logger.uuid
    if(stateUuid){
      log['gousto-request-id'] = stateUuid
    }
  }

  if(extra !== undefined){
    log.extra = extra
  }

  if(headers !== undefined){
    log.headers = {
      ...headers,
      cookie: ''
    }
  }

  log.timestamp = new Date()

  return log
}

const isJSError = (e) => (e && e.stack && e.message)

export default logger()
