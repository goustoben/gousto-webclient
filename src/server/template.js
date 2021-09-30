const {newAssetPath} = require('utils/media')
const head = require('./head').default
const encodeState = require('./encodeState')

const htmlTemplate = (reactHTML = '', initialState = {}, userAgent = '', scripts, helmetHead) => (
  `<!doctype html>
   <html lang="en-GB" ${(helmetHead && helmetHead.htmlAttributes) ? helmetHead.htmlAttributes.toString() : ''}>
    <head>
      <!-- ********************************************************************
        Well hello there! You're a curious person, aren't you?
        Are you also curious about React? Or maybe Python, NodeJS, PHP?
        Or are you more the AWS type?
        We're always looking for talented engineers. Email us!
        jobs [at] gousto.co.uk
      ******************************************************************** -->
      <meta charset="utf-8" />
      <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
      <meta name="viewport" content="width=device-width,initial-scale=1">
      ${(helmetHead && helmetHead.title) ? helmetHead.title.toString() : ''}
      ${(helmetHead && helmetHead.meta) ? helmetHead.meta.toString() : ''}
      ${scripts.optimizely ? head.optimizely(initialState.features) : ''}
      <script src="${newAssetPath('vendors.js')}" defer></script>
      <script src="${newAssetPath('main.js')}" defer></script>
      ${head.favicon()}
      <script type="text/javascript">
        window.__initialState__ = ${encodeState(initialState)}
      </script>

      <link href="https://fonts.googleapis.com/css?family=Lato:400,700,300italic,400italic" rel="stylesheet" type="text/css">
      ${(__HMR__ || __DEV__) ? '' : `<link rel="stylesheet" href="${newAssetPath('main.css')}" type="text/css">`}
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
