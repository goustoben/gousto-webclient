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
