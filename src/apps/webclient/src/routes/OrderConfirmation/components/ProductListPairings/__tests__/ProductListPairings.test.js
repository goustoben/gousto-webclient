import { mount } from 'enzyme'
import Immutable from 'immutable'
import React from 'react'
import { ProductListPairings } from '..'
import { mockProductRecipePairings } from '../../config'

jest.mock('utils/basket', () => ({
  getProductLimitReached: jest.fn()
}))

jest.mock('../../Product', () => ({
  Product: () => <div className="product" />
}))

describe('ProductListPairings component', () => {
  let wrapper

  const propsProductList = {
    basket: Immutable.fromJS({ products: { 1234: 1 } }),
    productsCategories: Immutable.Map({}),
    ageVerified: true,
    basketProductAdd: jest.fn(),
    basketProductRemove: jest.fn(),
    toggleAgeVerificationPopUp: jest.fn(),
    productRecipePairings: mockProductRecipePairings
  }

  const assertElementLength = (element, assertion) => {
    wrapper = mount(<ProductListPairings {...propsProductList} />)
    expect(wrapper.find(element).length).toBe(assertion)
  }

  describe('render', () => {
    test('should render product list wrapper', () => assertElementLength('div.productList', 2))

    test('should render 4 products', () => assertElementLength('Product', 4))

    test('should NOT render product list wrapper if no productRecipePairings', () => {
      propsProductList.productRecipePairings = propsProductList.productRecipePairings.clear()
      assertElementLength('div.productList', 0)
    })
  })
})
