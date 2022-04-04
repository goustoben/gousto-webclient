import Cookies from 'cookies-js'
import { getProtocol } from 'utils/isomorphicEnvironment'
import { PROTOCOL_PREFIX } from 'config/service-environment/service-environment.types'

Cookies.defaults = {
  ...Cookies.defaults,
  path: '/',
  secure: (getProtocol() === PROTOCOL_PREFIX.HTTPS),
}

export default Cookies
