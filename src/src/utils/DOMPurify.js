import DOMPurify from 'dompurify'
import globals from 'config/globals'
import jsdom from 'jsdom'
const { JSDOM } = jsdom

export function getDOMPurify() {
  let DOMPurifyUtil

  if (globals.server) {
    // for server side rendering, we need to provide a window object
    // https://github.com/cure53/DOMPurify#user-content-using-the-minified-and-tested-production-version-source-map-available > "DOMPurify also works server-side with node.js"
    DOMPurifyUtil = DOMPurify(new JSDOM('', {
      features: {
        FetchExternalResources: false,
        ProcessExternalResources: false,
      },
    }).defaultView)
  } else {
    DOMPurifyUtil = DOMPurify
  }

  return DOMPurifyUtil
}

export default getDOMPurify()
