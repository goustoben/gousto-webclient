import { sendAwinS2SData } from 'actions/awin'
import { awinServerToServer } from 'apis/awin'
import logger from 'utils/logger'

jest.mock('utils/logger', () => ({
  warning: jest.fn(),
}))

jest.mock('apis/awin')

describe('awin actions', () => {
  const dispatchSpy = jest.fn()
  const awinParams = {
    merchant: '5070',
    amount: '12.50',
    ref: '12345',
    cr: 'GBR',
    vc: 'DTI-CODE',
    parts: 'commissionGroup:12.50',
    cks: '5070_awin_click_checksum',
    user_id: '54321',
  }

  describe('given sendAwinS2SData is dispatched', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('then it should send data to awin s2s', async () => {
      await sendAwinS2SData(awinParams)(dispatchSpy)

      expect(awinServerToServer).toHaveBeenCalledWith(awinParams)
    })

    describe('when awinServerToServer is failed', () => {
      beforeEach(() => {
        awinServerToServer.mockImplementation( () => {
          throw new Error('test error')
        })
      })

      test('then it should log a warning', async () => {
        await sendAwinS2SData(awinParams)(dispatchSpy)

        expect(logger.warning).toHaveBeenCalled()
      })
    })
  })
})
