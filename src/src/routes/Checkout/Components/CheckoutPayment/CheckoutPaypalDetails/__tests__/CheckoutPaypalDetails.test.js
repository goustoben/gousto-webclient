import React from 'react'
import { shallow } from 'enzyme'

import { CheckoutPaypalDetails } from '../CheckoutPaypalDetails'

describe('CheckoutPaypalDetails', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CheckoutPaypalDetails hide={false} />)
  })

  test('should render correctly', () => {
    expect(wrapper.hasClass('hide')).toBeFalsy()
  })

  describe('when hide is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hide: true })
    })

    test('then it should be hidden', () => {
      expect(wrapper.hasClass('hide')).toBeTruthy()
    })
  })
})
