import React from 'react'
import { shallow } from 'enzyme'
import { ChoosePlan } from '../ChoosePlan'

const mockSubOption = {
  title: 'A box a week',
  totalPrice: '47.75',
  totalPriceDiscounted: '23.88',
  pricePerPortion: '2.98',
  priceBoxTypeMessage: 'For first box',
  benefits: [
    'Choose 4 recipes for 2 each week',
    'Cancel or pause online at any time',
    '50% off first box + 30% off all boxes in the first month',
    'Surprise gifts!'
  ]
}

const mockTransOption = {
  title: 'One-off box',
  totalPrice: '47.75',
  pricePerPortion: '5.97',
  priceBoxTypeMessage: 'For one box',
  benefits: [
    'Choose  a single box of 4 recipes for 2 people',
    'One off price, no weekly plan'
  ]
}

let wrapper

describe('ChoosePlan', () => {
  beforeEach(() => {
    wrapper = shallow(<ChoosePlan subscriptionOption={mockSubOption} transactionalOption={mockTransOption} pricingRequest={jest.fn()}/>)
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
      wrapper = shallow(<ChoosePlan subscriptionOption={mockSubOption} transactionalOption={mockTransOption} pricingRequest={jest.fn()} extrasIncluded />)

      expect(wrapper.find('Alert').length).toEqual(1)
    })

    test('should NOT render a message about surcharges if there are no premium recipes or delivery slots chosen ', () => {
      wrapper = shallow(<ChoosePlan subscriptionOption={mockSubOption} transactionalOption={mockTransOption} pricingRequest={jest.fn()} extrasIncluded={false} />)

      expect(wrapper.find('Alert').length).toEqual(0)
    })
  })

})
