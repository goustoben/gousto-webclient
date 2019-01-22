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
      const num_portion = 2
      const order_id = 5
      const numPortionChangeTracking = {
        type: actionTypes.PORTION_SIZE_SELECTED_TRACKING,
        trackingData: {
          actionType: 'PortionSize Selected',
          num_portion,
          order_id: order_id ? order_id : null,
        },
      }
      await basketNumPortionChangeTracking(num_portion, order_id)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(numPortionChangeTracking)
    })
    
  })
})
