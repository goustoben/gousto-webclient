import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

function pricing(accessToken, items, deliveryDate, deliverySlotId, promocode, tariffId) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.prices}`, {
    items,
    promo_code: promocode,
    delivery_slot_id: deliverySlotId,
    delivery_date: deliveryDate,
    tariff_id: tariffId,
  }, 'GET')
}

export default pricing
