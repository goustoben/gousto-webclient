import { fetchDeliveryDays } from '../deliveries'

export const getDeliveryDays = async (accessToken, postcode, cutoffDatetimeFrom, menuCutoffUntil, isNDDExperiment, deliveryTariffId) => {
  const reqData = {
    'filters[cutoff_datetime_from]': cutoffDatetimeFrom,
    'filters[cutoff_datetime_until]': menuCutoffUntil,
    'ndd': isNDDExperiment ? 'true' : 'false',
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
