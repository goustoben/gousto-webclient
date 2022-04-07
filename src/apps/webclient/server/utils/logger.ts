import lumberjack from 'gousto-lumberjack-js'
import { getEnvironment } from '../../src/utils/isomorphicEnvironment'

const consoleEnabled = getEnvironment() === 'local'

const logger = lumberjack({ service: 'webclient', consoleEnabled })

// eslint-disable-next-line import/no-default-export
export default logger
