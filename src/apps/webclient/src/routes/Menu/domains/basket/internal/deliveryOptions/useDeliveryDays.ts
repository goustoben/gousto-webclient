import { useMemo } from 'react'
import useSWR from 'swr'
import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { getAvailableDeliveryDays, transformDaySlotLeadTimesToMockSlots } from 'utils/deliveries'
import { getFirstPartPostcode } from 'utils/format'
import { parseObjectKeysToCamelCase, CamelCasedValue } from 'utils/jsonHelper'
import { getFetcher } from 'routes/Menu/apis/fetch'

const getDeliveryOptionServiceUrl = () => `${endpoint('deliveries')}${routes.deliveries.days}`

type UseDeliveryDaysArguments = {
  /**
   * DateTime encoded as ISO string.
   */
  cutoffFrom: string
  /**
   * DateTime encoded as ISO string.
   */
  cutoffUntil: string
  isNDDExperiment: boolean
  deliveryTariffId: string
  postcode?: string
  accessToken: string
  userId: string
  usersOrdersDaySlotLeadTimeIds: string[]
  sort?: Partial<{
    field: 'date'
    direction: 'asc' | 'desc'
  }>
}

/**
 * Return delivery days available for a user.
 *
 * Does not depend on Redux store.
 */
export const useDeliveryDays = ({
  accessToken,
  cutoffFrom,
  cutoffUntil,
  deliveryTariffId,
  isNDDExperiment,
  postcode,
  userId,
  usersOrdersDaySlotLeadTimeIds,
  sort = {},
}: UseDeliveryDaysArguments): { days?: DeliveryDays; error?: Error } => {
  const { field: sortField = 'date', direction: sortDirection = 'asc' } = sort

  // Memoise requestParameters otherwise the SWR would do the api call every re-render
  const requestParameters = useMemo(
    () => ({
      'filters[cutoff_datetime_from]': cutoffFrom,
      'filters[cutoff_datetime_until]': cutoffUntil,
      ndd: isNDDExperiment ? 'true' : 'false',
      delivery_tariff_id: deliveryTariffId,
      sort: sortField,
      direction: sortDirection,
      ...(postcode && {
        postcode: postcode.length >= 5 ? getFirstPartPostcode(postcode) : postcode,
      }),
    }),
    [
      cutoffFrom,
      cutoffUntil,
      isNDDExperiment,
      deliveryTariffId,
      postcode,
      sortField,
      sortDirection,
    ],
  )

  const url = getDeliveryOptionServiceUrl()

  const { data: response, error } = useSWR<DeliveryOptionsResponse, Error>(
    [url, requestParameters, accessToken, userId],
    getFetcher,
  )

  if (!response) {
    return { error }
  }

  const rawDays = response.data.map((o) => parseObjectKeysToCamelCase(o))

  const days = getAvailableDeliveryDays(
    isNDDExperiment ? transformDaySlotLeadTimesToMockSlots(rawDays) : rawDays,
    cutoffFrom,
    usersOrdersDaySlotLeadTimeIds,
  )

  return { days }
}

/**
 * Shape of Delivery options as coming from server.
 */
type DeliveryOptionInResponse = {
  id: string
  date: string
  is_default: boolean
  core_day_id: string
  unavailable_reason: string
  alternate_delivery_day: string | null
  slots: {
    id: string
    default_day: number
    core_slot_id: string
    delivery_start_time: string
    delivery_end_time: string
    cutoff_day: number
    cutoff_time: string
    delivery_price: string
    is_default: boolean
    when_cutoff: string
  }[]
  day_slots: [
    {
      id: string
      day_id: string
      slot_id: string
      when_cutoff: string
      unavailable_reason: string
      alternate_day: string | null
      active_for_subscribers_one_off: boolean
      active_for_non_subscribers_one_off: boolean
      active_for_signups: boolean
    },
  ]
}

type DeliveryOptionsResponse = {
  data: DeliveryOptionInResponse[]
}

/**
 * Available delivery days.
 */
type DeliveryDays = {
  [date: string]: CamelCasedValue<DeliveryOptionInResponse>
}
