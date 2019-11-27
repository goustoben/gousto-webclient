import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'

import Immutable from 'immutable' // eslint-disable no-caps

import Item from 'Item/Item'
import RecipeItem from 'Recipe/RecipeItem'

describe('RecipeItem', () => {
  const testData = {
    available: true,
    media: Immutable.fromJS({
      images: [{ urls: ['', '', { src: 'image_path' }] }],
    }),
    title: 'Chicken Curry',
    numPortions: 2,
    onRemove: function() {},
  }

  test('should have an item element', () => {
    const wrapper = shallow(<RecipeItem {...testData} />)
    expect(wrapper.find(Item).length).toEqual(1)
  })

  test('should set the item type of recipe', () => {
    const wrapper = shallow(<RecipeItem {...testData} />)
    expect(wrapper.find(Item).prop('type')).toEqual('recipe')
  })

  test('should pass the title through', () => {
    const wrapper = shallow(<RecipeItem {...testData} />)
    expect(wrapper.find(Item).prop('title')).toEqual('Chicken Curry')
  })

  test('should pass numPortions to quantity through', () => {
    const wrapper = shallow(<RecipeItem {...testData} />)
    expect(wrapper.find(Item).prop('quantity')).toEqual(2)
  })

  test('should pass the onRemove through', () => {
    const wrapper = shallow(<RecipeItem {...testData} />)
    expect(wrapper.find(Item).prop('onRemove')).toEqual(testData.onRemove)
  })

  test('should pass the images through to media', () => {
    const wrapper = shallow(<RecipeItem {...testData} />)
    expect(
      Immutable.is(
        wrapper.find(Item).prop('media'),
        Immutable.fromJS(['', '', { src: 'image_path' }]),
      ),
    ).toEqual(true)
  })
})
