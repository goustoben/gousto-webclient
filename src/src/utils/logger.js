import lumberjack from 'gousto-lumberjack-js'

const logger = lumberjack({service: 'webclient', consoleEnabled: !__PROD__})

export default logger
