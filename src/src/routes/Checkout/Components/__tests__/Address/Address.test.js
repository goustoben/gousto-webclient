import React from 'react'
import { shallow } from 'enzyme'

import { Button } from 'goustouicomponents'
import Address from '../../Address/Address'

describe('Address', () => {
  let wrapper
  const props = {
    registerField: jest.fn(),
    trackUTMAndPromoCode: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<Address {...props} />)
  })

  test('should render by default', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('when Address renders', () => {
    test('should render Button', () => {
      expect(wrapper.find(Button).exists()).toBeTruthy()
    })
  })

  describe('when Button clicked', () => {
    test('should dispatch trackUTMAndPromoCode actions with proper parameters', () => {
      wrapper.find(Button).simulate('click')
      expect(props.trackUTMAndPromoCode).toHaveBeenCalledWith('clickUseThisAddress')
    })
  })
})
