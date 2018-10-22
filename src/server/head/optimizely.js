import config from 'config/head/optimizely'

export default function optimizely(features) {
	let script = ''
	if (config[__ENV__]) { // eslint-disable-line no-underscore-dangle
		const featuresSerialised = JSON.stringify(features.toJS())
		script = `
			<script>
				window.__stateFeatures__ = ${featuresSerialised}

				window.__featuresLoadedOnServer__ = function(features) {
					var state = window.__stateFeatures__;
					var allMatched = true;
					if (typeof state === 'object' && state !== null) {
						if (features.enable) {
							allMatched = !features.enable.some(function(feature) { return !state[feature]; });
						}

						if (allMatched && features.disable) {
							allMatched = !features.disable.some(function(feature) { return state[feature] !== false; });
						}

						if (allMatched && features.set) {
							allMatched = !Object.keys(features.set).some(function(name){ return state.features.get(name) !== features.set[name]; });
						}
					} else {
						allMatched = false;
					}

					return allMatched;
				}

				window.__featuresLoaded__ = function(features) {
					var loadedCheck = window.__featuresLoadedOnServer__;
					if (typeof window.__featuresLoadedFromStore__ === 'function') {
						loadedCheck = window.__featuresLoadedFromStore__;
					}

					return loadedCheck(features);
				}

				window.__ABTestingRedirect__ = function(features, targetURL) {
					if (!window.__featuresLoaded__(features)) {
						document.body.setAttribute('style', 'display: none; opacity: 0;');
						window.location.replace(targetURL);
					}
				}

			</script>
			<script src="//cdn.optimizely.com/js/${config[__ENV__]}.js" defer></script>` // eslint-disable-line no-underscore-dangle
	}

	return script
}
