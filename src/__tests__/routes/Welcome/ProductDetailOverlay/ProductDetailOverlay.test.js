import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import ProductDetail from 'containers/Product/Detail'
import ProductDetailOverlay from 'routes/Welcome/ProductDetailOverlay'
import Overlay from 'Overlay'

describe('ProductDetailOverlay', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<ProductDetailOverlay open productId="product-123" />)
  })

  test('should return Overlay', () => {
    expect(wrapper.type()).toEqual(Overlay)
  })

  test('should contain 1 ProductDetail if productId is specified', () => {
    expect(wrapper.find(ProductDetail).length).toBe(1)
  })

  test('should pass open to Overlay', () => {
    expect(wrapper.prop('open')).toBe(true)
  })

  test('should pass productId to ProductDetail', () => {
    expect(wrapper.find(ProductDetail).prop('productId')).toBe('product-123')
  })
})
