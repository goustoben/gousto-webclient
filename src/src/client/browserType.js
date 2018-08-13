import { browserTypeChange } from 'actions/request'
import actual from 'actual'

export default store => {
	if (actual('width', 'px') < 768) {
		store.dispatch(browserTypeChange('mobile'))
	} else {
		store.dispatch(browserTypeChange('desktop'))
	}
}
