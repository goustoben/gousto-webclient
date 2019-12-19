import apis from 'apis'
import endpoint from 'config/endpoint'
import fetch from 'utils/fetch'
import { getAvailableDeliveryDays, getLandingDay, cutoffDateTimeNow } from 'utils/deliveries'

export default {
  apis,
  endpoint,
  fetch,
  getAvailableDeliveryDays,
  getLandingDay,
  cutoffDateTimeNow,
}

