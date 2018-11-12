import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import deliverySlotUtil from 'utils/deliverySlot'

describe('utils/deliverySlot', () => {
  describe('toTimeRange', () => {
    test('it should take in a deliverySlot and give out a time range', () => {
      const deliverySlot = Immutable.fromJS({
        deliveryStart: '10:00:00',
        deliveryEnd: '16:59:59',
      })

      expect(deliverySlotUtil.toTimeRange(deliverySlot)).toEqual('10am - 5pm')
    })
  })
})
