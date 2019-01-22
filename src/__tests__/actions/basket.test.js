import basket from 'actions/basket'

import actionTypes from 'actions/actionTypes'

describe('basket actions', () => {
  const dispatch = jest.fn()
  const {basketNumPortionChangeTracking} = basket

  afterEach(() => {
    dispatch.mockClear()
  })

  describe('basketNumPortionChangeTracking', () => {
    it('should dispatch with the right type and right params', async () => {
      const numPortions = 2
      const orderId = 5
      const numPortionChangeTracking = {
        type: actionTypes.PORTION_SIZE_SELECTED_TRACKING,
        trackingData: {
          actionType: 'PortionSize Selected',
          numPortions,
          orderId: orderId ? orderId : null,
        },
      }
      await basketNumPortionChangeTracking(numPortions, orderId)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(numPortionChangeTracking)
    })
    
  })
})
