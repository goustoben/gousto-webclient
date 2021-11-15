import lumberjack from 'gousto-lumberjack-js'

const consoleEnabled = __ENV__ === 'local'

const logger = lumberjack({ service: 'webclient', consoleEnabled })

export default logger
