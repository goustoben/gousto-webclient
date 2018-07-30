const head = require('./head').default
const newAssetPath = require('utils/media').newAssetPath
const encodeState = require('./encodeState')

const htmlTemplate = (reactHTML = '', initialState = {}, apolloState = {}, url = '/', userAgent = '', noGTM = false, helmetHead) => (
	`<!doctype html>
	 <html ${(helmetHead && helmetHead.htmlAttributes) ? helmetHead.htmlAttributes.toString() : ''}>
		<head>
			<!-- ********************************************************************
				Well hello there. Like HTML, do ya? How about PHP? AWS? Git? Laravel?
				We're always looking for talented developers. Email us!
				workintech [at] gousto.co.uk
			******************************************************************** -->
			<meta charset="utf-8" />
			<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
			<meta name="viewport" content="width=device-width,initial-scale=1">
			${(helmetHead && helmetHead.title) ? helmetHead.title.toString() : ''}
			${(helmetHead && helmetHead.meta) ? helmetHead.meta.toString() : ''}
			${noGTM ? '' : head.optimizely(initialState.features)}
			${head.favicon()}
			<script type="text/javascript">
				window.__initialState__ = ${encodeState(initialState)}
				window.__APOLLO_STATE__ = ${encodeState(apolloState)}
			</script>
			<link href="https://fonts.googleapis.com/css?family=Lato:400,700,300italic,400italic" rel="stylesheet" type="text/css">
			${(__HMR__ || __DEV__) ? '' : `<link rel="stylesheet" href="${newAssetPath('main.css')}" type="text/css">`}
			${(helmetHead && helmetHead.link) ? helmetHead.link.toString() : ''}
			${(helmetHead && helmetHead.style) ? helmetHead.style.toString() : ''}
			${(helmetHead && helmetHead.script) ? helmetHead.script.toString() : ''}
			${noGTM ? '' : head.segment()}
			${noGTM ? '' : head.pingdom()}
		</head>
		<body>
			<script src="${newAssetPath('main.js')}"></script>
			${noGTM ? '' : head.fbTracking()}
			${noGTM ? '' : head.gtm(initialState, url, userAgent)}
			<div id="react-root">${reactHTML}</div>
		</body>
	</html>`
)

module.exports = htmlTemplate
