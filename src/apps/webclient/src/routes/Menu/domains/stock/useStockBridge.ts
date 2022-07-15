import { useSelector } from 'react-redux'

import { useStock as useStockBase } from '@library/api-webstock'

import endpoint from 'config/endpoint'
import menuConfig from 'config/menu'
import { getFetcher } from 'routes/Menu/apis/fetch'
import { getAccessToken, getAuthUserId } from 'selectors/auth'
import { getBasketDate } from 'selectors/basket'
import { getBoxSummaryDeliveryDays } from 'selectors/root'

export function useStock() {
  const accessToken = useSelector(getAccessToken)
  const authUserId = useSelector(getAuthUserId)

  const deliveryDayId = useSelector((state) => {
    const date = getBasketDate(state as any)
    const boxSummaryDeliveryDays = getBoxSummaryDeliveryDays(state as any)

    return boxSummaryDeliveryDays.getIn([date, 'coreDayId'])
  })

  const coreUrl = endpoint('core') || ''

  return useStockBase(
    {
      accessToken,
      authUserId,
      coreUrl,
      deliveryDayId,
      getFetcher,
    },
    {
      minimumThreshold: menuConfig.stockThreshold,
    },
  )
}
