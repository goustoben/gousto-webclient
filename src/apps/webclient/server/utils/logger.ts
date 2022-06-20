import lumberjack from 'gousto-lumberjack-js'

import { getEnvironment } from '../../src/utils/isomorphicEnvironment'

const consoleEnabled = getEnvironment() === 'local'

export const logger = lumberjack({ service: 'webclient', consoleEnabled })
