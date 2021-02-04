import auth from './auth'
import basket from './basket'
import temp from './temp'
import root from './root'

export default {
  ...auth,
  ...basket,
  ...temp,
  ...root,
}

