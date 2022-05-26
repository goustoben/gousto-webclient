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

  describe('when discount pop-up is not visible and isPromoBarHidden is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        promoModalVisible: false,
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
        isHidden: true,
      })
      wrapper.setProps({
        promoModalVisible: true,
        isPromoBarHidden: false,
      })
    })

    test('then container should has isHidden class', () => {
      expect(wrapper.find('.container.isHidden').exists()).toBeTruthy()
    })

    describe('and banner becomes visible', () => {
      beforeEach(() => {
        wrapper.setState({
          isHidden: false,
        })
      })

      test('should call trackDiscountVisibility', () => {
        expect(props.trackDiscountVisibility).toHaveBeenCalledWith(props.wizardStep)
      })
    })
  })

  describe('when isPromoBarHidden is true', () => {
    let instance

    beforeEach(() => {
      wrapper.instance().setState = jest.fn()
      wrapper.setProps({
        isPromoBarHidden: true,
      })
      wrapper.update()
      instance = wrapper.instance()
    })

    test('then setState should be called', () => {
      expect(instance.setState).toBeCalled()
    })
  })

  describe('when Bar is displayed', () => {
    describe('and user clicks to close it', () => {
      beforeEach(() => {
        wrapper.setState({
          isHidden: false,
        })
        wrapper.find('.closeIcon').simulate('click')
      })

      test('then isHidden state should be changed to true', () => {
        expect(wrapper.state('isHidden')).toBeTruthy()
      })
    })
  })
})
