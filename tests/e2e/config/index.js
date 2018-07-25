const deepMerge = require('deepmerge');
const params = {
	BINPATH: './node_modules/nightwatch/bin/',
	ARTIFACTS_PATH: process.env.ARTIFACTS || './reports',
	globalWaitTimeout: 30000
};

/*
shape configs into groups:
	{
		env: { ... },
		device: { ... }
	}
*/

const settings = [
	'env.local',
	'env.staging',
	'device.chrome',
	'device.iphone5',
	'device.iphone6'
].reduce((p, c) => {

	const [ group, key ] = c.split('.');
	const groupConfig = require('./' + group + '.default.js')(params);
	const keyConfig = require(`./${c}.js`)(params);

	if (!p[group]) {
		p[group] = {}
	};

	// merge group default properties with key overrides
	p[group][key] = deepMerge(groupConfig, keyConfig);

	return p;

}, {});

// map each environment to each device
// to enable running with [env]:[device]

let testSettings = {};

for (let device in settings.device) {
	for (let env in settings.env) {
		testSettings[`${env}:${device}`] = deepMerge(
			settings.env[env],
			settings.device[device]
		)
	}
}

module.exports = {
	params,
	testSettings
}
