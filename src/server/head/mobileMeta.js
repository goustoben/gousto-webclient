const mobileConfig = require('config/apps')

export function mobileMeta() {
  if (mobileConfig.show_smart_banner) {
    return (`<meta name="apple-itunes-app" content="app-id=${mobileConfig.app_store_id}">`)
  }

  return ''
}
