import React from 'react'
import { shallow } from 'enzyme'
import { browserHistory } from 'react-router'
import { RecipeLinks } from '../RecipeLinks'

browserHistory.push = jest.fn()

describe('the RecipeLinks component', () => {
  let wrapper
  const TEST_RECIPES = [
    { id: '1', title: 'test 1', ingredients: [{ id: '1', label: 'test' }] },
    {
      id: '2',
      title: 'test 2',
      ingredients: [{ id: '2', label: 'test' }, { id: '2222', label: 'test2' }]
    },
  ]
  const ORDER_ID = '1234'
  const USER_ID = '6789'
  const trackRecipeCardClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <RecipeLinks
        orderId={ORDER_ID}
        recipes={TEST_RECIPES}
        trackRecipeCardClick={trackRecipeCardClick}
        userId={USER_ID}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe.each([
    [0, TEST_RECIPES[0]],
    [1, TEST_RECIPES[1]],
  ])('renders the recipe %s', (recipeIndex, recipe) => {
    let item

    beforeEach(() => {
      item = wrapper.find('Item').at(recipeIndex)
    })

    test('as an Item component', () => {
      expect(item).toHaveLength(1)
    })

    test('with the recipe title as label', () => {
      expect(item.prop('label')).toBe(recipe.title)
    })

    test('not styled as a link', () => {
      expect(item.prop('isLinkStyled')).toBe(false)
    })

    describe('and when is clicked', () => {
      beforeEach(() => {
        item.simulate('click')
      })

      test('tracks the click of that specific recipe', () => {
        expect(trackRecipeCardClick).toHaveBeenCalledWith(recipe.id)
      })

      test('userId has been set in the sessionStorage', () => {
        expect(window.sessionStorage.getItem('userId')).toBe(USER_ID)
      })

      test('orderId has been set in the sessionStorage', () => {
        expect(window.sessionStorage.getItem('orderId')).toBe(ORDER_ID)
      })

      test('redirects to the corresponding cookbook page of the recipe', () => {
        expect(browserHistory.push).toHaveBeenCalledWith(`/cookbook/recipe-by-id/${recipe.id}`)
      })
    })
  })
})
