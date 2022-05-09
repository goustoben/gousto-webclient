import React from 'react'
import { shallow } from 'enzyme'
import { DetailAddRecipe } from './DetailAddRecipe'
import * as DomainMenu from '../../../domains/menu'

describe('DetailAddRecipe', () => {
  let wrapper
  describe('when isOutOfStock true', () => {
    beforeEach(() => {
      jest.spyOn(DomainMenu, 'useStock').mockImplementation(() => ({
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
      jest.spyOn(DomainMenu, 'useStock').mockImplementation(() => ({
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
