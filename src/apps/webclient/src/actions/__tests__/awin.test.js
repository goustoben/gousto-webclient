import { sendAwinData } from 'actions/awin'
import { trackAwinOrder } from 'apis/tracking'
import logger from 'utils/logger'

jest.mock('utils/logger', () => ({
  warning: jest.fn(),
}))

jest.mock('apis/tracking')

describe('awin actions', () => {
  const dispatchSpy = jest.fn()
  const orderId = '12345'
  const awin = {
    merchant: '5070',
    amount: '12.50',
    cr: 'GBR',
    parts: 'commissionGroup:12.50',
    cks: '5070_awin_click_checksum',
  }
  const awinParams = {
    orderId,
    ...awin,
  }

  describe('given sendAwinData is dispatched', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('then it should send data to awin s2s', async () => {
      await sendAwinData(awinParams)(dispatchSpy)

      expect(trackAwinOrder).toHaveBeenCalledWith({ order_id: orderId }, awin)
    })

    describe('when trackAwinOrder is failed', () => {
      beforeEach(() => {
        trackAwinOrder.mockImplementation( () => {
          throw new Error('test error')
        })
      })

      test('then it should log a warning', async () => {
        await sendAwinData(awinParams)(dispatchSpy)

        expect(logger.warning).toHaveBeenCalled()
      })
    })
  })
})
