import Cookies from 'cookies-js'
import globals from 'config/globals'

Cookies.defaults = {
  ...Cookies.defaults,
  path: '/',
  secure: globals.secure,
}

export default Cookies
