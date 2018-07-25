import actions from 'actions'
import { documentLocation } from 'utils/window'

function trackPageChange(store) {
	if (documentLocation() && documentLocation().href) {
		store.dispatch(actions.pageChange(documentLocation().href))
	}
}

export default trackPageChange
