import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'

import Immutable from 'immutable' // eslint-disable no-caps

import Item from 'Item/Item'
import ProductItem from 'Product/ProductItem'

describe('ProductItem', () => {
  const testData = {
    available: true,
    images: Immutable.fromJS({
      400: { src: 'test.png', url: 'test.png', width: 400 },
      thumbnail: { src: 'test.png', url: 'test.png', width: 100 },
    }),
    title: 'Chicken Curry',
    quantity: 2,
    onRemove: function() {},
    onImageClick: function() {},
  }

  test('should have an item element', () => {
    const wrapper = shallow(<ProductItem {...testData} />)
    expect(wrapper.find(Item).length).toEqual(1)
  })

  test('should set the item type of product', () => {
    const wrapper = shallow(<ProductItem {...testData} />)
    expect(wrapper.find(Item).prop('type')).toEqual('product')
  })

  test('should pass the title through', () => {
    const wrapper = shallow(<ProductItem {...testData} />)
    expect(wrapper.find(Item).prop('title')).toEqual('Chicken Curry')
  })

  test('should pass numPortions to quantity through', () => {
    const wrapper = shallow(<ProductItem {...testData} />)
    expect(wrapper.find(Item).prop('quantity')).toEqual(2)
  })

  test('should pass the onRemove through', () => {
    const wrapper = shallow(<ProductItem {...testData} />)
    expect(wrapper.find(Item).prop('onRemove')).toEqual(testData.onRemove)
  })

  test('should pass the onImageClick through', () => {
    const wrapper = shallow(<ProductItem {...testData} />)
    expect(wrapper.find(Item).prop('onImageClick')).toEqual(
      testData.onImageClick,
    )
  })

  test('should convert images to a list then pass to media', () => {
    const wrapper = shallow(<ProductItem {...testData} />)
    expect(
      Immutable.is(wrapper.find(Item).prop('media'), testData.images.toList()),
    ).toEqual(true)
  })
})
