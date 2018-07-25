/**
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 */

const BINPATH = './node_modules/nightwatch/bin/';

require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) {
	if (err || !stat || stat.size < 1) {
		require('selenium-download').ensure(BINPATH, function(error) {
			if (error) throw new Error(error);
			console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
		});
	}
});
