import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import ProductList from 'Product/List'
import SectionHeader from 'SectionHeader'
import ImageSelection from 'ImageSelection'
import LinkButton from 'LinkButton'

describe('Product List', () => {
  const wrapper = shallow(<ProductList orderId={'1'} />)

  test('should return article', () => {
    expect(wrapper.type()).toEqual('article')
  })
})

describe('Product List header', () => {
  const wrapper = shallow(<ProductList orderId={'1'} />)

  test('should display 1 SectionHeader', () => {
    expect(wrapper.find(SectionHeader).length).toEqual(1)
  })
})

describe('Product List images', () => {
  let wrapper = shallow(<ProductList orderId={'1'} />)

  test('should display 1 ImageSelection', () => {
    expect(wrapper.find(ImageSelection).length).toEqual(1)
  })

  test('should pass max number prop products to ImageSelection', () => {
    const products = Immutable.fromJS({
      product1: { id: 'product1', categories: [{ id: 1 }] },
      product2: { id: 'product2', categories: [{ id: 2 }] },
      product3: { id: 'product3', categories: [{ id: 3 }] },
      product4: { id: 'product4', categories: [{ id: 4 }] },
      product5: { id: 'product5', categories: [{ id: 5 }] },
      product6: { id: 'product6', categories: [{ id: 6 }] },
      product7: { id: 'product7', categories: [{ id: 7 }] },
      product8: { id: 'product7', categories: [] },
    })
    wrapper = shallow(
			<ProductList orderId={'1'} products={products} number={2} />,
    )
    expect(wrapper.find(ImageSelection).prop('content').length).toEqual(2)
    wrapper = shallow(
			<ProductList orderId={'1'} products={products} number={10} />,
    )
    expect(wrapper.find(ImageSelection).prop('content').length).toEqual(8)
  })
})

describe('Product List button', () => {
  let wrapper = shallow(<ProductList orderId={'1'} />)

  test('should display 1 LinkButton', () => {
    expect(wrapper.find(LinkButton).length).toEqual(1)
  })

  test('should link to products page for that orderId', () => {
    wrapper = shallow(<ProductList orderId={'12'} />)
    expect(wrapper.find(LinkButton).prop('to')).toEqual('/order/12/summary')
    expect(wrapper.find(LinkButton).prop('clientRouted')).toBe(false)
  })
})
