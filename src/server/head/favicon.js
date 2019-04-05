const favIcoUrl = require('media/favicons/favicon.ico')

const lg = require('media/favicons/favicon-152.png')
const md = require('media/favicons/favicon-120.png')
const sm = require('media/favicons/favicon-76.png')

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
