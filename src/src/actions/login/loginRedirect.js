import { client } from "config/routes"
import queryString from "query-string"
import URL from "url"
import globals from "config/globals"
import { isOneOfPage } from "utils/routes"

export const loginRedirect = (location, userIsAdmin, features) => {
  let destination
  const {pathname, search} = location

  if (userIsAdmin) {
    destination = client.menu
  } else if (search) {
    const {target} = queryString.parse(search)

    if (target && typeof target === 'string') {
      let url
      try {
        url = URL.parse(target)

        const hostInfoList = url.host.split('.')
        const hostInfo = hostInfoList.slice(
          hostInfoList.indexOf('gousto'),
        )
        const globalsHostInfo = globals.domain.slice(
          globals.domain.indexOf('gousto'),
        )
        const isGoustoTarget = (
          hostInfo.join('.') === globalsHostInfo
        )

        if (isGoustoTarget) {
          destination = `${url.pathname}${url.search ? url.search : ''}`
        }
      } catch (err) {
        // do nothing
      }
    }
  }

  if (!destination && !isOneOfPage(pathname, ['menu', 'check-out'])) {
    const afterLoginPage = features ? features.getIn(['afterLogin', 'value']) : undefined

    destination = client[afterLoginPage] || client.myGousto
  }

  if (search) {
    const {promo_code: promoCode} = queryString.parse(search)
    destination = destination || pathname || ''
    destination = promoCode ? `${destination}?promo_code=${promoCode}` : destination
  }

  return destination
}
