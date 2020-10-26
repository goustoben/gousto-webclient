import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RecipeList } from './RecipeList'
import { RecipeTileContainer } from '../components/RecipeTile'
import { CategoryCarouselsListContainer } from '../ElevatedMenuExperience/CategoryCarouselsList'
import { ViewAllRecipesButtonContainer } from '../ElevatedMenuExperience/ViewAllRecipesButton'
import { OptimizelyRolloutsContainer } from '../../../containers/OptimizelyRollouts'

jest.mock('actions/tracking', () => ({
  trackRecipeOrderDisplayed: jest.fn()
    .mockReturnValue('trackRecipeOrderDisplayed return value'),
}))
describe('RecipeList', () => {
  const context = {
    store: {
      dispatch: jest.fn(),
    },
  }
  let trackRecipeOrderDisplayed
  let wrapper
  let recipes
  let query
  beforeEach(() => {
    trackRecipeOrderDisplayed = jest.fn()
    trackRecipeOrderDisplayed.mockClear()
  })

  describe('trackRecipeOrderDisplayed', () => {
    recipes = Immutable.List([
      {
        originalId: '3',
        recipe: Immutable.Map({
          id: '3',
          availability: [],
          title: 'recipe3',
          boxType: 'vegetarian',
          dietType: 'Vegetarian',
          isRecommended: false,
        })
      },
      {
        originalId: '1',
        recipe: Immutable.Map({ id: '1', availability: [], title: 'recipe1', isRecommended: false })
      }
    ])
    query = {
      collection: 'vegetarian'
    }
    describe('when the recipe list is initially rendered', () => {
      test('should dispatch trackRecipeOrderDisplayed once', () => {
        const originalOrderRecipeIds = Immutable.List(['1', '2', '3'])

        shallow(
          <RecipeList
            originalOrderRecipeIds={originalOrderRecipeIds}
            recipes={recipes}
            trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
            currentCollectionId="123"
            browserType="desktop"
          />,
        )

        expect(trackRecipeOrderDisplayed).toHaveBeenCalledTimes(1)
        expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(
          ['1', '2', '3'],
          ['3', '1'],
        )
      })
    })

    describe('when the recipe collection selection is changed', () => {
      test('should dispatch trackRecipeOrderDisplayed an additional time', () => {
        const originalOrderRecipeIds = Immutable.List(['1', '2', '3'])

        wrapper = shallow(
          <RecipeList
            originalOrderRecipeIds={originalOrderRecipeIds}
            recipes={recipes}
            currentCollectionId="123"
            trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
            browserType="desktop"
          />,
        )
        wrapper.setProps({
          currentCollectionId: '321',
        })

        expect(trackRecipeOrderDisplayed).toHaveBeenCalledTimes(2)
        expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(
          ['1', '2', '3'],
          ['3', '1'],
        )
      })
    })

    describe('when the recipe collection remains the same', () => {
      test('should not dispatch trackRecipeOrderDisplayed after initial render', () => {
        const originalOrderRecipeIds = Immutable.List(['1', '2', '3'])

        wrapper = shallow(
          <RecipeList
            originalOrderRecipeIds={originalOrderRecipeIds}
            recipes={recipes}
            currentCollectionId="123"
            trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
            browserType="desktop"
          />,
        )
        wrapper.setProps({
          currentCollectionId: '123',
        })

        expect(trackRecipeOrderDisplayed).toHaveBeenCalledTimes(1)
        expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(
          ['1', '2', '3'],
          ['3', '1'],
        )
      })
    })
  })
  describe('when there are no recipes', () => {
    test('then it should render nothing', () => {
      wrapper = shallow(
        <RecipeList
          recipes={Immutable.List([])}
          trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
          currentCollectionId="123"
          browserType="desktop"
        />,
      )
      expect(wrapper.find(RecipeTileContainer).exists()).toBe(false)
    })
  })

  describe('when featureEnabled is false', () => {
    beforeEach(() => {
      context.store.dispatch.mockClear()
      trackRecipeOrderDisplayed.mockClear()
    })

    recipes = Immutable.List([
      {
        originalId: '3',
        recipe: Immutable.Map({
          id: '3',
          availability: [],
          title: 'recipe3',
          boxType: 'vegetarian',
          dietType: 'Vegetarian',
          isRecommended: false,
        })
      },
      {
        originalId: '1',
        recipe: Immutable.Map({ id: '1', availability: [], title: 'recipe1', isRecommended: false })
      }
    ])

    describe('when there is one recipe', () => {
      beforeEach(() => {
        recipes = Immutable.List([
          {
            originalId: '3',
            recipe: Immutable.Map({
              id: '3',
              availability: [],
              title: 'recipe3',
              boxType: 'vegetarian',
              dietType: 'Vegetarian',
              isRecommended: false,
            })
          }
        ])

        wrapper = shallow(
          <RecipeList recipes={recipes} trackRecipeOrderDisplayed={trackRecipeOrderDisplayed} currentCollectionId="123" browserType="desktop" />,
        )
      })
      test('then it should render one RecipeTileContainer', () => {
        expect(wrapper.find(OptimizelyRolloutsContainer).at(1).prop('featureEnabled')).toBe(false)
        expect(wrapper.find(OptimizelyRolloutsContainer).first().find(RecipeTileContainer)).toHaveLength(1)
      })
    })

    describe('when there are multiple recipes', () => {
      beforeEach(() => {
        recipes = Immutable.List([
          {
            originalId: '3',
            recipe: Immutable.Map({
              id: '3',
              availability: [],
              title: 'recipe3',
              boxType: 'vegetarian',
              dietType: 'Vegetarian',
              isRecommended: false,
            })
          },
          {
            originalId: '1',
            recipe: Immutable.Map({
              id: '1',
              availability: [],
              title: 'recipe1',
              isRecommended: false
            })
          }
        ])

        wrapper = shallow(
          <RecipeList recipes={recipes} trackRecipeOrderDisplayed={trackRecipeOrderDisplayed} currentCollectionId="123" browserType="desktop" />,
        )
      })
      test('then it should render multiple RecipeTileContainer', () => {
        expect(wrapper.find(OptimizelyRolloutsContainer).at(1).prop('featureEnabled')).toBe(false)
        expect(wrapper.find(OptimizelyRolloutsContainer).first().find(RecipeTileContainer)).toHaveLength(2)
      })
    })
  })

  describe('when featureEnabled is true', () => {
    beforeEach(() => {
      context.store.dispatch.mockClear()
      trackRecipeOrderDisplayed.mockClear()
      recipes = Immutable.List([
        {
          originalId: '3',
          recipe: Immutable.Map({
            id: '3',
            availability: [],
            title: 'recipe3',
            boxType: 'vegetarian',
            dietType: 'Vegetarian',
            isRecommended: false,
          })
        },
        {
          originalId: '1',
          recipe: Immutable.Map({ id: '1', availability: [], title: 'recipe1', isRecommended: false })
        }
      ])
      query = {
        collection: null
      }

      wrapper = shallow(
        <RecipeList recipes={recipes} trackRecipeOrderDisplayed={trackRecipeOrderDisplayed} browserType="mobile" query={query} />,
        { context }
      )
    })

    test('should render OptimizelyRolloutsContainer with featureEnabled true for EMERecipeList', () => {
      expect(wrapper.find(OptimizelyRolloutsContainer).first().prop('featureEnabled')).toBe(true)
      expect(wrapper.find(OptimizelyRolloutsContainer).first().find(CategoryCarouselsListContainer)).toHaveLength(1)
      expect(wrapper.find(OptimizelyRolloutsContainer).first().find(ViewAllRecipesButtonContainer)).toHaveLength(1)
    })
  })
})
