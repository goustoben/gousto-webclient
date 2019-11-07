import moment from 'moment'
import { fetchDeliveryDays } from '../deliveries'

export const getDeliveryDays = async (accessToken, postcode, cutoffDatetimeFrom, menuCutoffUntil, isNDDExperiment, deliveryTariffId) => {
  const menuCutoffUntilFallback = moment()
    .startOf('day')
    .add(30, 'days')
    .toISOString()

  const cutoffDatetimeFromFallback = moment().
    startOf('day')
    .toISOString()

  const reqData = {
    'filters[cutoff_datetime_from]': cutoffDatetimeFrom || cutoffDatetimeFromFallback,
    'filters[cutoff_datetime_until]': menuCutoffUntil || menuCutoffUntilFallback,
    'ndd': isNDDExperiment.toString(),
    'delivery_tariff_id': deliveryTariffId,
    sort: 'date',
    direction: 'asc',
  }

  if (postcode) {
    reqData.postcode = postcode
  }

  const { data: days } = await fetchDeliveryDays(accessToken, reqData)

  return days
}
