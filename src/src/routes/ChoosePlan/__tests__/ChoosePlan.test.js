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
    wrapper = shallow(<ChoosePlan subscriptionPrices={mockSubPrices} transactionalPrices={mockTransPrices} pricingRequest={jest.fn()}/>)
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

  test('should render a loading spinner when isLoading is true', () => {
    wrapper.setProps({isLoading: true})
    expect(wrapper.find('Loading').length).toEqual(1)
    expect(wrapper.find('PlanOption').length).toEqual(0)
  })

  test('should render two PlanOption components when isLoading is false', () => {
    wrapper.setProps({isLoading: false})
    expect(wrapper.find('Loading').length).toEqual(0)
    expect(wrapper.find('PlanOption').length).toEqual(2)
  })

  describe('Surcharge message', () => {
    test('should render a message about surcharges if there are any premium recipes or delivery slots chosen ', () => {
      wrapper = shallow(<ChoosePlan subscriptionPrices={mockSubPrices} transactionalPrices={mockTransPrices} pricingRequest={jest.fn()} extrasIncluded />)

      expect(wrapper.find('Alert').length).toEqual(1)
    })

    test('should NOT render a message about surcharges if there are no premium recipes or delivery slots chosen ', () => {
      wrapper = shallow(<ChoosePlan subscriptionPrices={mockSubPrices} transactionalPrices={mockTransPrices} pricingRequest={jest.fn()} extrasIncluded={false} />)

      expect(wrapper.find('Alert').length).toEqual(0)
    })
  })

})
