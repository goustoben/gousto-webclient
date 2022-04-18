import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { CollectionId } from '../../domains/collections'
import { CollectionLink } from '../../components/CollectionLink'
import { RecipeTile } from '../../components/RecipeTile'
import { RecipeList } from './RecipeList'

jest.mock('actions/tracking', () => ({
  trackRecipeOrderDisplayed: jest.fn()
    .mockReturnValue('trackRecipeOrderDisplayed return value'),
}))

describe('RecipeList', () => {
  let trackRecipeOrderDisplayed
  let wrapper
  let recipes

  beforeEach(() => {
    trackRecipeOrderDisplayed = jest.fn()
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

    describe('when the recipe list is initially rendered', () => {
      test('should call trackRecipeOrderDisplayed once', () => {
        shallow(
          <RecipeList
            recipes={recipes}
            trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
            currentCollectionId="123"
            browserType="desktop"
          />,
        )

        expect(trackRecipeOrderDisplayed).toHaveBeenCalledTimes(1)
        expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(['3', '1'])
      })
    })

    describe('when the recipe collection selection is changed', () => {
      test('should call trackRecipeOrderDisplayed an additional time', () => {
        wrapper = shallow(
          <RecipeList
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
        expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(['3', '1'])
      })
    })

    describe('when the recipe collection remains the same', () => {
      test('should not call trackRecipeOrderDisplayed after initial render', () => {
        wrapper = shallow(
          <RecipeList
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
        expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(['3', '1'])
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
      expect(wrapper.find(RecipeTile).exists()).toBe(false)
    })
  })

  describe('when it is All Recipes category', () => {
    describe('when the isDietaryCollectionLinksEnabled feature is enabled', () => {
      it('should render Links to Dietary collections', () => {
        recipes = Immutable.List([1, 2, 3, 4].map(i => ({ recipe: Immutable.Map({ id: `${i}`})})))
        wrapper = shallow(
          <RecipeList
            recipes={recipes}
            currentCollectionId={CollectionId.AllRecipes}
            trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
            browserType="desktop"
            isDietaryCollectionLinksEnabled
          />,
        )

        expect(wrapper.find(CollectionLink).exists()).toBe(true)
      })
    })
    describe('when the isDietaryCollectionLinksEnabled feature is disabled', () => {
      it('should NOT render Links to Dietary collections', () => {
        recipes = Immutable.List([1, 2, 3, 4].map(i => ({ recipe: Immutable.Map({ id: `${i}`})})))
        wrapper = shallow(
          <RecipeList
            recipes={recipes}
            currentCollectionId={CollectionId.AllRecipes}
            trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
            browserType="desktop"
            isDietaryCollectionLinksEnabled={false}
          />,
        )

        expect(wrapper.find(CollectionLink).exists()).toBe(false)
      })
    })
  })

  describe('when it is not category with Dietary collections promotions', () => {
    it('should not render the Links to dietary collections', () => {
      recipes = Immutable.List([1, 2, 3, 4].map(i => ({ recipe: Immutable.Map({ id: `${i}`})})))
      wrapper = shallow(
        <RecipeList
          recipes={recipes}
          currentCollectionId="Some Collection"
          trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
          browserType="desktop"
          isDietaryCollectionLinksEnabled
        />,
      )

      expect(wrapper.find(CollectionLink).exists()).toBe(false)
    })
  })
})
