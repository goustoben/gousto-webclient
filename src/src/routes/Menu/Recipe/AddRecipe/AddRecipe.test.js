import React from 'react'
import { shallow } from 'enzyme'
import { AddRecipe } from './AddRecipe'
import { DropdownArrowContainer } from './DropdownArrow'

describe('AddRecipe', () => {
  let wrapper
  describe('when isOutOfStock true', () => {
    beforeEach(() => {
      wrapper = shallow(<AddRecipe id="1" originalId="2" view="grid" position={0} isOutOfStock buttonText="Add Recipe" />)
    })
    test('should return null', () => {
      expect(wrapper.type()).toBe(null)
    })
  })

  describe('when isOutOfStock false', () => {
    beforeEach(() => {
      wrapper = shallow(<AddRecipe id="1" originalId="2" view="grid" position={0} isOutOfStock={false} buttonText="Add Recipe" />)
    })
    test('should return addRecipeWrapper', () => {
      expect(wrapper.find('.addRecipeWrapper')).toHaveLength(1)
    })
    test('should return DropdownArrowContainer', () => {
      expect(wrapper.find(DropdownArrowContainer)).toHaveLength(1)
    })
  })

  describe('when isOnDetailScreen is true', () => {
    beforeEach(() => {
      wrapper = shallow(<AddRecipe id="1" originalId="2" view="grid" position={0} isOutOfStock={false} isOnDetailScreen buttonText="Add Recipe" />)
    })
    test('should return not DropdownArrowContainer', () => {
      expect(wrapper.find(DropdownArrowContainer)).toHaveLength(0)
    })
  })
})
