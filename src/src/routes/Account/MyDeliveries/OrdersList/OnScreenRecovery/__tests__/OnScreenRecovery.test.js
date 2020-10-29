import React from 'react'
import { shallow } from 'enzyme'

import { OnScreenRecovery } from '../OnScreenRecovery'

jest.mock('components/Overlay', () => 'Overlay')

describe('Order Skip Recovery Modal', () => {
  let wrapper

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Alternative Render', () => {
    test('should call getRecoveryContent', () => {
      const getRecoveryContent = jest.fn()
      wrapper = shallow(
        <OnScreenRecovery
          orderId="14245"
          triggered={false}
          orderDate="2018-09-24T13:27:09.487Z"
          deliveryDayId="23001"
          orderType="pending"
          getRecoveryContent={getRecoveryContent}
          isMultiSkipEnabled
          hasBoxesToSkip
        />
      )

      const prevProps = wrapper.props()

      wrapper.setProps({
        triggered: true,
      })

      wrapper.instance().componentDidUpdate(prevProps)

      expect(getRecoveryContent).toHaveBeenCalled()
    })
  })
})
