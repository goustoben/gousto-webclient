import logger from 'utils/logger'
import { isServer } from './serverEnvironment'
let env // eslint-disable-line import/no-mutable-exports

if (isServer()) {
  try {
    const { readFileSync } = require('jsonfile') // eslint-disable-line global-require
    const envPath = `${process.cwd()}/config/env.json`
    const configEnvFromFile = readFileSync(envPath)

    env = {
      recaptchaReferralPrivateKey: configEnvFromFile.recaptchaReferralPrivateKey || __RECAPTCHA_RAF_PVTK__,
    }
  } catch (err) {
    logger.critical({ message: 'Reading config/env.json' })
  }
}

export default env
