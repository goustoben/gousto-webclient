import auth from './auth'
import basket from './basket'
import filters from './filters'
import temp from './temp'
import root from './root'

export default {
	...auth,
	...basket,
	...filters,
	...temp,
	...root,
}

