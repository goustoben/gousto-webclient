import lumberjack from 'gousto-lumberjack-js'

const consoleEnabled = __ENV__ !== 'production' || __ENV__ !== 'staging'

const logger = lumberjack({ service: 'webclient', consoleEnabled })

export default logger
