import logger from 'utils/logger'
const env = {}

if (__SERVER__) {
  try {
    const { readFileSync } = require('jsonfile') // eslint-disable-line global-require
    const envPath = `${process.cwd()}/config/env.json`
    const configEnvFromFile = readFileSync(envPath)

    env.apiToken = configEnvFromFile.apiToken || __API_TOKEN__
    env.authClientId = configEnvFromFile.authClientId || __AUTH_CLIENT_ID__
    env.authClientSecret = configEnvFromFile.authClientSecret || __AUTH_CLIENT_SECRET__
    env.recaptchaReferralPrivateKey = configEnvFromFile.recaptchaReferralPrivateKey || __RECAPTCHA_RAF_PVTK__
  } catch (err) {
    logger.critical({ message: 'Reading config/env.json' })
  }
}

export default env
