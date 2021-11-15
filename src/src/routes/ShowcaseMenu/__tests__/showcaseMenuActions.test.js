import { push } from 'react-router-redux'
import Immutable from 'immutable'
import {
  proceed,
  changeCollection,
  openRecipeDetails,
  trackScrollOneStep,
} from '../showcaseMenuActions'
import { collectionFilterChange } from "actions/filters/collectionFilterChange"
import { trackShowcaseMenuAction } from "actions/tracking/trackShowcaseMenuAction"
import { showDetailRecipe } from "routes/Menu/actions/menuRecipeDetails/showDetailRecipe"

jest.mock('react-router-redux', () => ({
  push: jest.fn(),
}))

jest.mock('actions/tracking', () => ({
  trackShowcaseMenuAction: jest.fn(),
}))

jest.mock('actions/filters', () => ({
  collectionFilterChange: jest.fn(),
}))

jest.mock('routes/Menu/actions/menuRecipeDetails', () => ({
  showDetailRecipe: jest.fn(),
}))

describe('given proceed is dispatched', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when signup wizard data is not available', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        basket: Immutable.fromJS({}),
      })
    })

    test('then it should track it and redirect to wizard', () => {
      proceed()(dispatch, getState)
      expect(trackShowcaseMenuAction).toHaveBeenCalledWith('showcase_menu_click_continue')
      expect(push).toHaveBeenCalledWith('/signup')
    })
  })

  describe('when signup wizard data is entered', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        basket: Immutable.fromJS({
          numPortions: 2,
          numRecipes: 3,
          postcode: 'w37up',
          slotId: '123',
        }),
      })
    })

    test('then it should track it and redirect to checkout', () => {
      proceed()(dispatch, getState)
      expect(trackShowcaseMenuAction).toHaveBeenCalledWith('showcase_menu_click_continue')
      expect(push).toHaveBeenCalledWith('/check-out')
    })
  })

  describe('given changeCollection is dispatched', () => {
    test('then it should track it and change the current collection', () => {
      const id = 'coll1'
      const shortTitle = 'Fish'

      changeCollection(id, shortTitle)(dispatch)
      expect(trackShowcaseMenuAction).toHaveBeenCalledWith('showcase_menu_click_category_filter', {
        category: shortTitle,
      })
      expect(collectionFilterChange).toHaveBeenCalledWith(id)
    })
  })

  describe('given openRecipeDetails is dispatched', () => {
    test('then it should track it and open recipe details', () => {
      const recipeId = 'rec1'
      const collectionId = 'coll1'
      const title = 'Caponata'

      openRecipeDetails(recipeId, collectionId, title)(dispatch)
      expect(trackShowcaseMenuAction).toHaveBeenCalledWith('showcase_menu_open_recipe_details', {
        recipe: 'Caponata',
      })
      expect(showDetailRecipe).toHaveBeenCalledWith(recipeId, collectionId)
    })
  })

  describe('given trackScrollOneStep is dispatched', () => {
    test('then it should track it', () => {
      trackScrollOneStep('left')(dispatch)
      expect(trackShowcaseMenuAction).toHaveBeenCalledWith('showcase_menu_scroll_carousel', {
        direction: 'left',
      })
    })
  })
})
