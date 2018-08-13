import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { getFirstPartPostcode } from 'utils/format'

export function fetchDeliveryDays(accessToken, reqData) {
	let data = reqData
	if (reqData.postcode && reqData.postcode.length >= 5) {
		data = { ...reqData, postcode: getFirstPartPostcode(reqData.postcode) }
	}

	return fetch(accessToken, `${endpoint('deliveries', routes.version.deliveries)}${routes.deliveries.days}`, data, 'GET')
}
