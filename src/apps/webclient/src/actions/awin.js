import logger from 'utils/logger'
import { trackAwinOrder } from 'apis/tracking'

export const sendAwinData = ({ orderId, ...awin }) => async () => {
  try {
    await trackAwinOrder({
      order_id: orderId
    },
    awin)
  } catch (err) {
    logger.warning('error saving parameters for AWIN', err)
  }
}
