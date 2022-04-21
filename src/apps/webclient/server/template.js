const { newAssetPath, getAssetRootUrl } = require('utils/media')
const { createWindowEnvConfig } = require('./utils/envConfigForClient')
const { getServerEnvironment, getServerDomain } = require('./utils/serverEnvironment')
const head = require('./head').default
const encodeState = require('./encodeState')

const preconnectDomains = [
  'https://fonts.googleapis.com/',
  'https://snplw.gousto.co.uk/',
  'https://static.zdassets.com/',
  getAssetRootUrl(),
  `https://${getServerEnvironment()}-api.${getServerDomain()}/`,
]

const getPreconnectSection = () => preconnectDomains.map(value => (
  `<link rel="preconnect" href="${value}">`
)).join('\n')

const fontDescriptors = [
  ['AvenirLTW04-45Book.woff2', 'font/woff2'],
  ['AvenirLTW04-85Heavy.woff2', 'font/woff2'],
  ['fontawesome-webfont.woff2?v=4.6.3', 'font/woff2'],
  ['Axiforma-Bold.woff2', 'font/woff2'],
  ['Axiforma-Book.woff2', 'font/woff2'],
  ['Axiforma-Light.woff2', 'font/woff2'],
  ['Axiforma-Medium.woff2', 'font/woff2'],
  ['Axiforma-SemiBold.woff2', 'font/woff2'],
]

const getPreloadFontsSection = () => fontDescriptors.map(([fontFileName, typeAttr]) => (
  `<link ref="preload" href="${newAssetPath(fontFileName)}" as="font" type="${typeAttr}" crossorigin>`
)).join('\n')

// eslint-disable-next-line default-param-last
const htmlTemplate = (reactHTML = '', initialState = {}, userAgent = '', scripts, helmetHead) => (
  `<!doctype html>
   <html lang="en-GB" ${(helmetHead && helmetHead.htmlAttributes) ? helmetHead.htmlAttributes.toString() : ''}>
    <head>
      <!-- **********************************************************************************
        Well hello there! You're a curious person, aren't you?
        Are you also curious about React, Python, NodeJS or TypeScript?
        Gousto builds high-availability distributed systems to put dinner on Britain's table.
        We're always seeking talented engineers. Take a look!
        https://www.gousto.co.uk/jobs
      *********************************************************************************** -->
      <meta charset="utf-8" />
      <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
      ${(helmetHead && helmetHead.title) ? helmetHead.title.toString() : ''}
      ${(helmetHead && helmetHead.meta) ? helmetHead.meta.toString() : ''}
      ${scripts.optimizely ? head.optimizely(initialState.features) : ''}
      ${getPreconnectSection()}
      ${getPreloadFontsSection()}
      <script>
        window.__config__ = ${createWindowEnvConfig()}
      </script>
      <script src="${newAssetPath('performanceTracker.js')}"></script>
      <script src="${newAssetPath('vendors.js')}" defer></script>
      <script src="${newAssetPath('main.js')}" defer></script>
      ${head.favicon()}
      <script type="text/javascript">
        window.__initialState__ = ${encodeState(initialState)}
      </script>

      <link rel="stylesheet" href="${newAssetPath('main.css')}" type="text/css">
      ${(helmetHead && helmetHead.link) ? helmetHead.link.toString() : ''}
      ${(helmetHead && helmetHead.style) ? helmetHead.style.toString() : ''}
      ${(helmetHead && helmetHead.script) ? helmetHead.script.toString() : ''}
      ${scripts.other ? head.pingdom() : ''}
      ${head.trustpilot ? head.trustpilot() : ''}
      ${head.ribbon ? head.ribbon() : ''}
    </head>
    <body>
      ${scripts.facebookTracking ? head.fbTracking() : ''}
      ${scripts.gtm ? head.gtm(initialState, userAgent) : ''}
      <div id="react-root">${reactHTML}</div>
    </body>
  </html>`
)

module.exports = htmlTemplate
