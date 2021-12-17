import favIcoUrl from 'media/favicons/favicon.ico'

import lg from 'media/favicons/favicon-152.png'
import md from 'media/favicons/favicon-120.png'
import sm from 'media/favicons/favicon-76.png'

function favicon() {
  return (
    `<link href="${favIcoUrl}" rel="icon">
    <link href="${lg}" rel="apple-touch-icon-precomposed">
    <link href="${lg}" rel="apple-touch-icon-precomposed" sizes="152x152">
    <link href="${md}" rel="apple-touch-icon-precomposed" sizes="120x120">
    <link href="${sm}" rel="apple-touch-icon-precomposed" sizes="76x76">`
  )
}

export default favicon
