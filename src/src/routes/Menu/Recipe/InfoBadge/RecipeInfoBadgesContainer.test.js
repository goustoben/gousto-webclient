import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { RecipeInfoBadgesContainer } from './RecipeInfoBadgesContainer'
import { InfoBadges } from './InfoBadges'
import { InfoBadgeSlugs } from './InfoBadgeSlugs'

describe('RecipeInfoBadgesContainer', () => {
  let state

  const context = {
    store: {
      dispatch: () => { },
      getState: () => state,
      subscribe: () => { }
    }
  }

  beforeEach(() => {
    state = {
      recipes: Immutable.Map()
    }
  })

  describe('when recipe exists', () => {
    const recipeId = '123'

    beforeEach(() => {
      state = {
        ...state,
        recipes: state.recipes.set(recipeId, Immutable.Map({ id: recipeId }))
      }
    })

    describe('when recipe is new', () => {
      beforeEach(() => {
        state = {
          ...state,
          recipes: state.recipes.setIn([recipeId, 'availability'], undefined)
        }
      })

      test('should render InfoBadges with NEW_RECIPE slug', () => {
        const wrapper = shallow(<RecipeInfoBadgesContainer recipeId={recipeId} />, { context })

        expect(wrapper.find(InfoBadges).prop('slugs')).toContain(InfoBadgeSlugs.NEW_RECIPE)
      })

      describe('when recipe has a rating', () => {
        beforeEach(() => {
          state = {
            ...state,
            recipes: state.recipes.setIn([recipeId, 'rating', 'count'], 50)
          }
        })

        test('should render InfoBadges without NEW_RECIPE slug', () => {
          const wrapper = shallow(<RecipeInfoBadgesContainer recipeId={recipeId} />, { context })

          expect(wrapper.find(InfoBadges).prop('slugs')).not.toContain(InfoBadgeSlugs.NEW_RECIPE)
        })
      })
    })

    describe('when recipe is chef prepared', () => {
      beforeEach(() => {
        state = {
          ...state,
          recipes: state.recipes.setIn([recipeId, 'chefPrepared'], true)
        }
      })

      test('should render InfoBadges with OVEN_READY slug', () => {
        const wrapper = shallow(<RecipeInfoBadgesContainer recipeId={recipeId} />, { context })

        expect(wrapper.find(InfoBadges).prop('slugs')).toContain(InfoBadgeSlugs.OVEN_READY)
      })
    })

    describe('when recipe has promotions', () => {
      const promotions = Immutable.List(['foo', 'bar'])

      beforeEach(() => {
        state = {
          ...state,
          recipes: state.recipes.setIn([recipeId, 'promotions'], promotions)
        }
      })

      test('should render InfoBadges with slugs from promotions', () => {
        const wrapper = shallow(<RecipeInfoBadgesContainer recipeId={recipeId} />, { context })

        expect(wrapper.find(InfoBadges).prop('slugs')).toContain(promotions.get(0))
        expect(wrapper.find(InfoBadges).prop('slugs')).toContain(promotions.get(1))
      })
    })
  })

  describe('when recipe does not exist', () => {
    const recipeId = '123'

    test('should render InfoBadges with slugs as empty array', () => {
      const wrapper = shallow(<RecipeInfoBadgesContainer recipeId={recipeId} />, { context })

      expect(wrapper.find(InfoBadges).prop('slugs')).toEqual([])
    })
  })
})
