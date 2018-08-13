import logger from 'utils/logger'

let env // eslint-disable-line import/no-mutable-exports

if (__SERVER__ && __PROD__) {
	try {
		const readFileSync = require('jsonfile').readFileSync // eslint-disable-line global-require
		const envPath = `${process.cwd()}/config/env.json`
		env = readFileSync(envPath)
	} catch (err) {
		logger.error('Reading config/env.json')
	}
}

export default env
