import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import { canUseWindow } from 'utils/browserEnvironment'

import { Recipes } from '../Recipes'

jest.mock('../Recipes.css', () => ({
  __esModule: true,
  default: {
    cardWidth: '15rem',
    spaceBetweenCards: '1rem',
  },
}))

jest.mock('utils/browserEnvironment')

describe('Recipes', () => {
  let wrapper
  const openRecipeDetails = jest.fn()
  const trackScrollOneStep = jest.fn()

  describe('when rendered', () => {
    beforeEach(() => {
      jest.resetAllMocks()

      wrapper = shallow(
        <Recipes
          currentCollectionId="id1"
          openRecipeDetails={openRecipeDetails}
          trackScrollOneStep={trackScrollOneStep}
        />
      )
    })

    describe('when recipes are loading', () => {
      const emptyRecipes = Immutable.fromJS([])

      beforeEach(() => {
        wrapper.setProps({
          recipes: emptyRecipes,
        })
      })

      test('then it should render a carousel of loading cards', () => {
        expect(wrapper.find('ScrollCarousel').exists()).toBe(true)
        expect(wrapper.find('ScrollCarousel LoadingRecipeCards').exists()).toBe(true)
      })
    })

    describe('when recipes are available', () => {
      const recipes = Immutable.List([
        {
          originalRecipeId: '1',
          recipe: Immutable.fromJS({
            id: '1',
          }),
        },
      ])

      beforeEach(() => {
        wrapper.setProps({
          recipes,
        })
      })

      test('then it should render the carousel with recipes', () => {
        expect(wrapper.find('ScrollCarousel').exists()).toBe(true)

        const recipeCardsWrapper = wrapper.find('ScrollCarousel RecipeCards')
        expect(recipeCardsWrapper.exists()).toBe(true)
        expect(recipeCardsWrapper.prop('recipes')).toEqual(recipes)
      })
    })
  })

  describe('when rendered on client', () => {
    beforeEach(() => {
      canUseWindow.mockReturnValue(true)

      global.getComputedStyle = jest.fn(() => ({
        fontSize: 16,
      }))

      wrapper = shallow(
        <Recipes
          currentCollectionId="id1"
          openRecipeDetails={openRecipeDetails}
          trackScrollOneStep={trackScrollOneStep}
        />
      )
    })

    test('then it should pass correct step size', () => {
      const carousel = wrapper.find('ScrollCarousel')
      expect(carousel.prop('stepSizePx')).toBe(256)
    })
  })

  describe('when rendered on server', () => {
    beforeEach(() => {
      canUseWindow.mockReturnValue(false)

      wrapper = shallow(
        <Recipes
          currentCollectionId="id1"
          openRecipeDetails={openRecipeDetails}
          trackScrollOneStep={trackScrollOneStep}
        />
      )
    })

    test('then it should ignore window-related apis', () => {
      const carousel = wrapper.find('ScrollCarousel')
      expect(carousel.prop('stepSizePx')).toBe(0)
    })
  })
})
