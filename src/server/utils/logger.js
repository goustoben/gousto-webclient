import lumberjack from 'gousto-lumberjack-js'

const consoleEnabled = __ENV__ === 'local'

const logger = lumberjack({ service: 'webclient', consoleEnabled })

// eslint-disable-next-line import/no-default-export
export default logger
