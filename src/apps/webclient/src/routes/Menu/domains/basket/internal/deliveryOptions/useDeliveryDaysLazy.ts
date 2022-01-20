import { RootStateOrAny, useSelector } from 'react-redux'
import moment from 'moment'
import Immutable from 'immutable'
import { getDeliveryTariffId, getNDDFeatureFlagVal } from 'utils/deliveries'
import { getAccessToken } from 'selectors/auth'
import { getMenuCutoffUntil } from 'selectors/root'
import { getBasketPostcode } from 'selectors/basket'
import { getUserId, getUsersOrdersDaySlotLeadTimeIds } from 'selectors/user'
import { useDeliveryDays } from './useDeliveryDays'

type UseDeliveryDaysLazyArguments = {
  /**
   * DateTime encoded as ISO string.
   */
  cutoffDatetimeFrom?: string;
  /**
   * DateTime encoded as ISO string.
   */
  cutoffDatetimeUntil?: string;
}

/**
 * Return delivery days available for a user.
 *
 * Fetches all necessary data from Redux global store.
 */
export const useDeliveryDaysLazy = ({cutoffDatetimeFrom, cutoffDatetimeUntil}: UseDeliveryDaysLazyArguments = {}) => {
  const accessToken = useSelector<RootStateOrAny, string>(getAccessToken)
  const cutoffDatetimeFromFormatted = moment.utc(cutoffDatetimeFrom).startOf('day').toISOString()
  const menuCutoffUntil = useSelector<RootStateOrAny, string>(getMenuCutoffUntil)
  const cutoffUntil = cutoffDatetimeUntil
    ? moment.utc(cutoffDatetimeUntil).endOf('day').toISOString()
    : menuCutoffUntil

  const user = useSelector<RootStateOrAny, Immutable.Map<'user', unknown>>(({user: u}) => u)
  const isNDDExperiment = useSelector<RootStateOrAny, boolean>(getNDDFeatureFlagVal)
  const deliveryTariffId: string = getDeliveryTariffId(user, isNDDExperiment)
  const postcode = useSelector<RootStateOrAny, string>(getBasketPostcode)
  const userId = useSelector<RootStateOrAny, string>(getUserId)
  const usersOrdersDaySlotLeadTimeIds = useSelector<RootStateOrAny, string[]>(getUsersOrdersDaySlotLeadTimeIds)

  return useDeliveryDays({
    cutoffFrom: cutoffDatetimeFromFormatted,
    cutoffUntil,
    isNDDExperiment,
    deliveryTariffId,
    postcode,
    accessToken,
    userId,
    usersOrdersDaySlotLeadTimeIds,
  })
}
