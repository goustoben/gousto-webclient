import { getSnowplowDomainUserId } from 'containers/OptimizelyRollouts/optimizelyUtils'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAuthUserId } from 'selectors/auth'
import { identifyHotjarUser } from 'utils/hotjarUtils'
import logger from 'utils/logger'

export function useHotjarIdentify() {
  const userId = useSelector(getAuthUserId)

  useEffect(() => {
    async function identifyToHotjar() {
      const snowplowUserId = await getSnowplowDomainUserId()

      identifyHotjarUser({ userId, snowplowUserId })
    }

    identifyToHotjar().catch((reason) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      logger.error({ message: `Error identifying to hotjar: ${JSON.stringify(reason)}` }),
    )
  }, [userId])
}
