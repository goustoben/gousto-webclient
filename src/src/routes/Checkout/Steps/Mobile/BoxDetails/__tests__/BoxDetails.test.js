import React from 'react'
import { shallow } from 'enzyme'
import { BoxDetails } from '../BoxDetails'
import { CheckoutButton } from '../../../../Components/CheckoutButton'

describe('BoxDetails', () => {
  let wrapper
  const onStepChange = jest.fn()
  const trackClick = jest.fn()
  const trackUTMAndPromoCode = jest.fn()
  const props = {
    onStepChange,
    trackClick,
    trackUTMAndPromoCode
  }

  beforeEach(() => {
    wrapper = shallow(<BoxDetails {...props} />)
  })

  describe('when BoxDetails renders', () => {
    test('should have 2 buttons', () => {
      expect(wrapper.find(CheckoutButton)).toHaveLength(2)
    })
  })

  describe('when CheckoutButton clicked', () => {
    beforeEach(() => {
      expect(onStepChange).not.toBeCalled()
      expect(trackClick).not.toBeCalled()
      expect(trackUTMAndPromoCode).not.toBeCalled()
      wrapper.find(CheckoutButton).at(0).simulate('click')
    })

    test('should dispatch trackUTMAndPromoCode actions with proper parameters', () => {
      expect(onStepChange).toBeCalled()
      expect(trackClick).toHaveBeenCalledWith('NextCTA Clicked', {position: 'first'})
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('clickCheckoutSecurely', 'top')
    })
  })
})
