import React from 'react'
import { shallow } from 'enzyme'
import { DiscountAppliedBar } from '../DiscountAppliedBar/DiscountAppliedBar'

describe('Given DiscountAppliedBar component', () => {
  let wrapper
  const props = {
    promoModalVisible: false,
    isPromoBarHidden: false,
    trackDiscountVisibility: jest.fn(),
    wizardStep: 'boxSize',
  }

  beforeEach(() => {
    wrapper = shallow(<DiscountAppliedBar {...props} />)
  })

  test('then it renders correctly', () => {
    expect(wrapper.find(DiscountAppliedBar)).toBeDefined()
  })

  describe('when discount pop-up is visible and promoModalVisible is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        promoModalVisible: true,
        isPromoBarHidden: false,
      })
    })

    test('then isHidden state should be changed', () => {
      expect(wrapper.state('isHidden')).toBeFalsy()
    })
  })

  describe('when isHidden state is true', () => {
    beforeEach(() => {
      wrapper.setState({
        isHidden: false
      })
    })

    test('then container should has isHidden class', () => {
      expect(wrapper.find('.container.isHidden')).toBeTruthy()
    })

    test('should call trackDiscountVisibility', () => {
      expect(props.trackDiscountVisibility).toHaveBeenCalledWith(props.wizardStep)
    })
  })

  describe('when Bar is displayed', () => {
    describe('and user clicks to close it', () => {
      beforeEach(() => {
        wrapper.setState({
          isHidden: false
        })
        wrapper.find('.closeIcon').simulate('click')
      })

      test('then isHidden state should be changed to true', () => {
        expect(wrapper.state('isHidden')).toBeTruthy()
      })
    })
  })
})
