import globals from 'config/globals'

function writeLog(args) {
	console.log(args) // eslint-disable-line no-console
}

function logger() {
	const levels = {
		debug: 5,
		info: 4,
		notice: 3,
		warning: 2,
		error: 1,
		critical: 0,
	}

	const logLevel = (globals.prod && ['production', 'staging'].includes(globals.env)) ? 'notice' : 'debug'

	let loggerObj = Object.keys(levels).reduce((reduced, key) => ({ ...reduced, [key]: () => {} }), { log: () => {} })

	if (globals.server) {
		const winston = require('winston') // eslint-disable-line global-require

		loggerObj = new (winston.Logger)({
			transports: [
				new (winston.transports.Console)({
					level: logLevel,
					prettyPrint: true,
					colorize: false,
					silent: false,
					timestamp: true,
				}),
			],
			levels,
		})
	} else if (globals.dev || (globals.env !== 'production' && globals.env !== 'staging')) {
		loggerObj = Object.keys(levels).reduce((reduced, key) => ({ ...reduced, [key]: writeLog }), { log: writeLog })
	}

	return loggerObj
}

export default logger()
