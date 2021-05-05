import React from 'react'
import { shallow } from 'enzyme'
import { OrderedRecipes } from '../OrderedRecipe'

describe('Given OrderedRecipe', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<OrderedRecipes title="recipe title" recipeId="101" isFineDineIn={false} />)
  })

  describe('When component renders', () => {
    describe('And isFineDineIn is false', () => {
      test('Then should not render Fine Dine In span when range is not equal fine_dine_in', () => {
        expect(wrapper.text()).not.toContain('Fine Dine In')
      })
    })

    describe('And isFineDineIn is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          isFineDineIn: true,
        })
      })

      test('Then should render Fine Dine In span when range is equal fine_dine_in', () => {
        expect(wrapper.text()).toContain('Fine Dine In')
      })
    })
  })
})
