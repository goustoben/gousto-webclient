import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { getFirstPartPostcode } from 'utils/format'

export function fetchDeliveryDays(accessToken, cutoffDatetimeFrom, menuCutoffUntil, isNDDExperiment, deliveryTariffId, postcode) {
  const reqData = {
    'filters[cutoff_datetime_from]': cutoffDatetimeFrom,
    'filters[cutoff_datetime_until]': menuCutoffUntil,
    'ndd': isNDDExperiment ? 'true' : 'false',
    'delivery_tariff_id': deliveryTariffId,
    sort: 'date',
    direction: 'asc', }

  if (postcode && postcode.length >= 5) {
    reqData.postcode = getFirstPartPostcode(postcode)
  }

  return fetch(accessToken, `${endpoint('deliveries', routes.version.deliveries)}${routes.deliveries.days}`, reqData, 'GET')
}

export function fetchDeliveryConsignment(accessToken, orderId) {
  const reqData = {
    'filters[order_id]': orderId,
  }

  const url = `${endpoint('deliveries', routes.version.deliveries)}${routes.deliveries.consignments}`

  return fetch(accessToken, url, reqData, 'GET')
}
