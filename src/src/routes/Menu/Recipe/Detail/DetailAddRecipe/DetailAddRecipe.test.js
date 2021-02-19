import React from 'react'
import { shallow } from 'enzyme'
import { DetailAddRecipe } from './DetailAddRecipe'

describe('DetailAddRecipe', () => {
  let wrapper
  describe('when isOutOfStock true', () => {
    beforeEach(() => {
      wrapper = shallow(<DetailAddRecipe id="1" originalId="2" view="grid" position={0} isOutOfStock buttonText="Add recipe" />)
    })
    test('should return null', () => {
      expect(wrapper.type()).toBe(null)
    })
  })

  describe('when isOutOfStock false', () => {
    beforeEach(() => {
      wrapper = shallow(<DetailAddRecipe id="1" originalId="2" view="grid" position={0} isOutOfStock={false} buttonText="Add recipe" />)
    })
    test('should return addRecipeWrapper', () => {
      expect(wrapper.find('.addRecipeWrapper')).toHaveLength(1)
    })
  })
})
