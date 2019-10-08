import React from 'react'
import { shallow } from 'enzyme'
import { ChoosePlan } from '../ChoosePlan'

const mockSubPrices = {
  totalPrice: '47.75',
  totalPriceDiscounted: '23.88',
  pricePerPortion: '2.98',
}

const mockTransPrices = {
  title: 'One-off box',
  totalPrice: '47.75',
  pricePerPortion: '5.97',
}

let wrapper

describe('ChoosePlan', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = shallow(<ChoosePlan subscriptionPrices={mockSubPrices} transactionalPrices={mockTransPrices}/>)
  })
  test('should render a title', () => {
    expect(wrapper.find('.title').length).toEqual(1)
  })

  test('should render a subtitle', () => {
    expect(wrapper.find('.subtitle').length).toEqual(1)
  })

  test('should render a button', () => {
    expect(wrapper.find('Button').length).toEqual(1)
  })

  test('should render two PlanOption components', () => {
    expect(wrapper.find('PlanOption').length).toEqual(2)
  })

  describe('Continue button', () => {
    const promoCode = 'PROMO'
    const tempPromoCode = 'TEMP-PROMO'
    const choosePlanContinue = jest.fn()
    const clearTempPromoCode = jest.fn()
    const stashTempPromoCode = jest.fn()
    beforeEach(() => {
      wrapper.setProps({promoCode, tempPromoCode, choosePlanContinue, clearTempPromoCode, stashTempPromoCode})
    })
    describe('when chosen subscriptionOption is transactional', () => {
      beforeEach(() => {
        wrapper.setState({subscriptionOption: 'transactional'})
      })
      test('clicking Continue should call stashTempPromoCode and choosePlanContinue', () => {
        wrapper.find('Button').simulate('click')
        expect(clearTempPromoCode).not.toHaveBeenCalled()
        expect(stashTempPromoCode).toHaveBeenCalled()
        expect(choosePlanContinue).toHaveBeenCalled()
      })
    })
    describe('when chosen subscriptionOption is subscription', () => {
      beforeEach(() => {
        wrapper.setState({subscriptionOption: 'subscription'})
      })
      test('clicking Continue should call clearTempPromoCode and choosePlanContinue', () => {
        wrapper.find('Button').simulate('click')
        expect(stashTempPromoCode).not.toHaveBeenCalled()
        expect(clearTempPromoCode).toHaveBeenCalled()
        expect(choosePlanContinue).toHaveBeenCalled()
      })
    })
  })

  describe('Surcharge message', () => {
    test('should render a message about surcharges if there are any premium recipes or delivery slots chosen ', () => {
      wrapper = shallow(<ChoosePlan subscriptionPrices={mockSubPrices} transactionalPrices={mockTransPrices} extrasIncluded />)

      expect(wrapper.find('Alert').length).toEqual(1)
    })

    test('should NOT render a message about surcharges if there are no premium recipes or delivery slots chosen ', () => {
      wrapper = shallow(<ChoosePlan subscriptionPrices={mockSubPrices} transactionalPrices={mockTransPrices} extrasIncluded={false} />)

      expect(wrapper.find('Alert').length).toEqual(0)
    })
  })

})
