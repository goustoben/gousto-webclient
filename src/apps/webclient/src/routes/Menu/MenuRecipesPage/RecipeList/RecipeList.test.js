import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { CollectionId } from '../../domains/collections'
import { CollectionLink } from '../../components/CollectionLink'
import { RecipeTile } from '../../components/RecipeTile'
import { buildTracker, RecipeList } from './RecipeList'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => true),
  useSelector: jest.fn(),
}))

describe('RecipeList', () => {
  let wrapper
  let recipes
  let showDetailRecipe

  beforeEach(() => {
    showDetailRecipe = jest.fn()
    showDetailRecipe.mockClear()
  })

  describe('when there are no recipes', () => {
    test('then it should render nothing', () => {
      wrapper = shallow(
        <RecipeList
          recipes={Immutable.List([])}
          currentCollectionId="123"
          browserType="desktop"
          showDetailRecipe={showDetailRecipe}
        />,
      )
      expect(wrapper.find(RecipeTile).exists()).toBe(false)
    })
  })

  describe('when it is All Recipes category', () => {
    describe('when the isDietaryCollectionLinksEnabled feature is enabled', () => {
      it('should render Links to Dietary collections', () => {
        recipes = Immutable.List(
          [1, 2, 3, 4].map((i) => ({ recipe: Immutable.Map({ id: `${i}` }) })),
        )

        wrapper = shallow(
          <RecipeList
            recipes={recipes}
            currentCollectionId={CollectionId.AllRecipes}
            browserType="desktop"
            isDietaryCollectionLinksEnabled
            showDetailRecipe={showDetailRecipe}
          />,
        )

        expect(wrapper.find(CollectionLink).exists()).toBe(true)
      })
    })
    describe('when the isDietaryCollectionLinksEnabled feature is disabled', () => {
      it('should NOT render Links to Dietary collections', () => {
        recipes = Immutable.List(
          [1, 2, 3, 4].map((i) => ({ recipe: Immutable.Map({ id: `${i}` }) })),
        )
        wrapper = shallow(
          <RecipeList
            recipes={recipes}
            currentCollectionId={CollectionId.AllRecipes}
            browserType="desktop"
            isDietaryCollectionLinksEnabled={false}
            showDetailRecipe={showDetailRecipe}
          />,
        )

        expect(wrapper.find(CollectionLink).exists()).toBe(false)
      })
    })
  })

  describe('when it is not category with Dietary collections promotions', () => {
    it('should not render the Links to dietary collections', () => {
      recipes = Immutable.List([1, 2, 3, 4].map((i) => ({ recipe: Immutable.Map({ id: `${i}` }) })))
      wrapper = shallow(
        <RecipeList
          recipes={recipes}
          currentCollectionId="Some Collection"
          browserType="desktop"
          isDietaryCollectionLinksEnabled
          showDetailRecipe={showDetailRecipe}
        />,
      )

      expect(wrapper.find(CollectionLink).exists()).toBe(false)
    })
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
      }),
    },
    {
      originalId: '1',
      recipe: Immutable.Map({ id: '1', availability: [], title: 'recipe1', isRecommended: false }),
    },
  ])
})

describe('buildTracker', () => {
  it('builds a function that passes the collection and recipes IDs to the tracker', () => {
    const dummyTracker = jest.fn()

    const tracker = buildTracker({
      recipes: Immutable.List([1, 2, 3, 4].map((i) => ({ recipe: Immutable.Map({ id: `${i}` }) }))),
      currentCollectionId: 'some_collection_id',
      track: dummyTracker,
    })

    tracker()

    expect(dummyTracker).toBeCalledWith('some_collection_id', ['1', '2', '3', '4'])
  })
})
