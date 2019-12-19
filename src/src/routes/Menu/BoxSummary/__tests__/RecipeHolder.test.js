import { shallow } from 'enzyme'
import React from 'react'

import Immutable from 'immutable' // eslint-disable-line no-caps

import Image from 'Image'
import RecipeHolder from '../RecipeHolder'

describe('RecipeHolder', () => {
  test('should return a span', () => {
    const wrapper = shallow(<RecipeHolder />)
    expect(wrapper.type()).toBe('span')
  })

  test('should have an image if reicpe is defined', () => {
    const recipe = Immutable.fromJS({
      media: { images: [{ urls: [{}, { src: 'test' }] }] },
    })
    const wrapper = shallow(<RecipeHolder recipe={recipe} />)
    expect(wrapper.find(Image).length).toBe(1)
  })

  test('should say "Add Recipe" when no recipe is defined', () => {
    const wrapper = shallow(<RecipeHolder />)
    expect(
      wrapper
        .find('span')
        .children()
        .first()
        .text(),
    ).toBe('Add Recipe')
  })

  test('should not break if the recipe has no images', () => {
    const recipe = Immutable.fromJS({ media: { images: [] } })
    const wrapper = shallow(<RecipeHolder recipe={recipe} />)
    expect(wrapper.type()).toBe('span')
    expect(wrapper.find(Image).length).toBe(1)
    expect(wrapper.find(Image).prop('media')).toEqual(Immutable.List([]))
  })
})
