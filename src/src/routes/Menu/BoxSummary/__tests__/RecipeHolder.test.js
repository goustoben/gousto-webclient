import { shallow } from 'enzyme'
import React from 'react'

import Immutable from 'immutable'

import Image from 'Image'
import { RecipeHolder } from '../RecipeHolder'

describe('RecipeHolder', () => {
  test('should return a div', () => {
    const wrapper = shallow(<RecipeHolder onClick={() => { }} browserType="mobile" />)
    expect(wrapper.type()).toBe('div')
  })

  test('should have an image if reicpe is defined', () => {
    const recipe = Immutable.fromJS({
      media: { images: [{ urls: [{}, { src: 'test' }] }] },
    })
    const wrapper = shallow(<RecipeHolder onClick={() => { }} browserType="mobile" recipe={recipe} />)
    expect(wrapper.find(Image).length).toBe(1)
  })

  test('should say "Add recipe" when no recipe is defined', () => {
    const wrapper = shallow(<RecipeHolder onClick={() => { }} browserType="mobile" />)
    expect(
      wrapper
        .find('div')
        .children()
        .first()
        .text(),
    ).toBe('Add recipe')
  })

  test('should not break if the recipe has no images', () => {
    const recipe = Immutable.fromJS({ media: { images: [] } })
    const wrapper = shallow(<RecipeHolder onClick={() => { }} browserType="mobile" recipe={recipe} />)
    expect(wrapper.type()).toBe('div')
    expect(wrapper.find(Image).length).toBe(1)
    expect(wrapper.find(Image).prop('media')).toEqual(Immutable.List([]))
  })
})
