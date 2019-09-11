import React from 'react'
import { shallow } from 'enzyme'

import { PricePerServingMessage } from '../PricePerServingMessage'

const fullPrice = '100.99'
const discountedPrice = '50.99'

describe('PricePerServingMessage', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<PricePerServingMessage fullPrice={fullPrice} discountedPrice={fullPrice} />)
  })
  test('should render the "Price per serving:" message', () => {
    expect(wrapper.find('.pricePerServingMessage').length).toEqual(1)
  })
  test('when fullPrice=discountedPrice, should not render the old price strikethrough', () => {
    expect(wrapper.find('.oldPrice').length).toEqual(0)
  })
  test('when fullPrice!=discountedPrice, should render the old price strikethrough', () => {
    wrapper = shallow(<PricePerServingMessage fullPrice={fullPrice} discountedPrice={discountedPrice} />)
    expect(wrapper.find('.oldPrice').length).toEqual(1)
  })
  test('when discountedPrice is not supplied, should not render the message', () => {
    wrapper = shallow(<PricePerServingMessage />)
    expect(wrapper.find('.pricePerServingMessage').length).toEqual(0)
  })
})
