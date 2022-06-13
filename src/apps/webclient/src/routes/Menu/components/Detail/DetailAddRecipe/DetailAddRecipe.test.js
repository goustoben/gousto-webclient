import React from 'react'

import { shallow } from 'enzyme'

import * as BasketHook from '../../../domains/basket'
import { DetailAddRecipe } from './DetailAddRecipe'

describe('DetailAddRecipe', () => {
  let wrapper
  describe('when isOutOfStock true', () => {
    beforeEach(() => {
      jest.spyOn(BasketHook, 'useStock').mockImplementation(() => ({
        isRecipeOutOfStock: () => true,
      }))
      wrapper = shallow(
        <DetailAddRecipe id="1" originalId="2" view="grid" position={0} buttonText="Add recipe" />,
      )
    })
    test('should return null', () => {
      expect(wrapper.type()).toBe(null)
    })
  })

  describe('when isOutOfStock false', () => {
    beforeEach(() => {
      jest.spyOn(BasketHook, 'useStock').mockImplementation(() => ({
        isRecipeOutOfStock: () => false,
      }))
      wrapper = shallow(
        <DetailAddRecipe id="1" originalId="2" view="grid" position={0} buttonText="Add recipe" />,
      )
    })
    test('should return addRecipeWrapper', () => {
      expect(wrapper.find('.addRecipeWrapper')).toHaveLength(1)
    })
  })
})
