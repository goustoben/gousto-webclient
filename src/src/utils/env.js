import logger from 'utils/logger'

let env // eslint-disable-line import/no-mutable-exports

if (__SERVER__) {
  try {
    const readFileSync = require('jsonfile').readFileSync // eslint-disable-line global-require
    const envPath = `${process.cwd()}/config/env.json`
    env = readFileSync(envPath)
  } catch (err) {
    logger.critical({message: 'Reading config/env.json'})
  }
}

export default env
