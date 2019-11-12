import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

function pricing(
  accessToken,
  items,
  deliveryDate,
  deliverySlotId,
  promocode,
  daySlotLeadTimeId,
  deliveryTariffId,
  tariffId
) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.prices}`, {
    items,
    promo_code: promocode,
    delivery_slot_id: deliverySlotId,
    delivery_date: deliveryDate,
    tariff_id: tariffId,
    day_slot_lead_time_id: daySlotLeadTimeId,
    delivery_tariff_id: deliveryTariffId
  }, 'GET')
}

export default pricing
