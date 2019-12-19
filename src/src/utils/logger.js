import lumberjack from 'gousto-lumberjack-js'

const logger = lumberjack({service: 'webclient', consoleEnabled: !(__ENV__==='production')})

export default logger
