import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'

function storeProspect(reqData) {
	return fetch(null, `${endpoint('core')}/prospect`, reqData, 'POST')
}

export { storeProspect }
