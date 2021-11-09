import lumberjack from 'gousto-lumberjack-js'

export const logger = lumberjack({service: 'webclient', consoleEnabled: !(__ENV__ === 'production')})
