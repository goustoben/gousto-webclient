import React from 'react'
import { shallow } from 'enzyme'
import { RecipeSidesModalButtons } from '../RecipeSidesModalButtons'

describe('RecipeSidesModalButtons', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = {
      sidesModalRecipe: {
        recipeId: '123',
        view: '',
        position: 2,
        score: 3
      },
      selectedRecipeSide: '456',
      clearSidesModalRecipe: jest.fn(),
      basketRecipeAdd: jest.fn(),
      unselectRecipeSide: jest.fn(),
      trackAddSide: jest.fn(),
      trackNoSide: jest.fn(),
    }
    wrapper = shallow(<RecipeSidesModalButtons {...props} />)
  })

  describe('when click on Add a side', () => {
    test('correct function is called', () => {
      wrapper.find('.recipeSidesModalAddSideButton').simulate('click')
      expect(props.basketRecipeAdd).toHaveBeenCalledWith('456', '', { position: 2, score: 3})
      expect(props.clearSidesModalRecipe).toHaveBeenCalled()
      expect(props.trackAddSide).toHaveBeenCalledWith('123', '456')
    })
  })

  describe('when click on I do not want a side', () => {
    test('correct function is called', () => {
      wrapper.find('.recipeSidesModalNoSideButton').simulate('click')
      expect(props.basketRecipeAdd).toHaveBeenCalledWith('123', '', { position: 2, score: 3})
      expect(props.unselectRecipeSide).toHaveBeenCalledWith('123')
      expect(props.clearSidesModalRecipe).toHaveBeenCalled()
      expect(props.trackNoSide).toHaveBeenCalledWith('123')
    })
  })
})
