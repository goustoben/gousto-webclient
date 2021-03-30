import React from 'react'
import { shallow } from 'enzyme'
import OrderRestoreButton from '../OrderRestoreButton'

describe('<OrderRestoreButton />', () => {
  let wrapper
  const projectedOrderRestore = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <OrderRestoreButton projectedOrderRestore={projectedOrderRestore} />
    )
  })

  afterEach(() => {
    projectedOrderRestore.mockClear()
  })

  describe('when clicking on restore', () => {
    beforeEach(() => {
      wrapper.setProps({
        orderId: 'test-order-id',
        userId: 'test-user-id',
        deliveryDayId: 'test-delivery-day-id',
        deliveryDay: 'date time',
      })

      wrapper.find('Button').simulate('click')
    })

    test('projectedOrderRestore is called', () => {
      expect(projectedOrderRestore).toHaveBeenCalledWith('test-order-id', 'test-user-id', 'test-delivery-day-id', 'date time')
    })
  })
})
