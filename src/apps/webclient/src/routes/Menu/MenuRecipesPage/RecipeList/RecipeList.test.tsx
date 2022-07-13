import React from 'react'

import { shallow } from 'enzyme'

import { Recipe, RecipeOptionPair } from '@library/api-menu-service'

import { CollectionLink } from '../../components/CollectionLink'
import { RecipeTileBridge } from '../../components/RecipeTile'
import { CollectionId } from '../../domains/collections'
import { buildTracker, RecipeList } from './RecipeList'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => true),
  useSelector: jest.fn(),
}))

describe('RecipeList', () => {
  let wrapper
  let recipes: RecipeOptionPair[]
  let showDetailRecipe: jest.Mock

  beforeEach(() => {
    showDetailRecipe = jest.fn()
    showDetailRecipe.mockClear()
  })

  describe('when there are no recipes', () => {
    test('then it should render nothing', () => {
      wrapper = shallow(<RecipeList recipes={[]} currentCollectionId="123" />)
      expect(wrapper.find(RecipeTileBridge).exists()).toBe(false)
    })
  })

  describe('when it is All Recipes category', () => {
    describe('when the isDietaryCollectionLinksEnabled feature is enabled', () => {
      it('should render Links to Dietary collections', () => {
        recipes = [1, 2, 3, 4].map((i) => ({
          recipe: { id: `${i}` } as Recipe,
          reference: `${i}`,
          originalId: `${i}`,
        }))

        wrapper = shallow(
          <RecipeList
            recipes={recipes}
            currentCollectionId={CollectionId.AllRecipes}
            isDietaryCollectionLinksEnabled
          />,
        )

        expect(wrapper.find(CollectionLink).exists()).toBe(true)
      })
    })
    describe('when the isDietaryCollectionLinksEnabled feature is disabled', () => {
      it('should NOT render Links to Dietary collections', () => {
        recipes = [1, 2, 3, 4].map((i) => ({
          recipe: { id: `${i}` } as Recipe,
          reference: `${i}`,
          originalId: `${i}`,
        }))

        wrapper = shallow(
          <RecipeList
            recipes={recipes}
            currentCollectionId={CollectionId.AllRecipes}
            isDietaryCollectionLinksEnabled={false}
          />,
        )

        expect(wrapper.find(CollectionLink).exists()).toBe(false)
      })
    })
  })

  describe('when it is not category with Dietary collections promotions', () => {
    it('should not render the Links to dietary collections', () => {
      recipes = [1, 2, 3, 4].map((i) => ({
        recipe: { id: `${i}` } as Recipe,
        reference: `${i}`,
        originalId: `${i}`,
      }))

      wrapper = shallow(
        <RecipeList
          recipes={recipes}
          currentCollectionId="Some Collection"
          isDietaryCollectionLinksEnabled
        />,
      )

      expect(wrapper.find(CollectionLink).exists()).toBe(false)
    })
  })
})

describe('buildTracker', () => {
  it('builds a function that passes the collection and recipes IDs to the tracker', () => {
    const dummyTracker = jest.fn()
    const recipes = [1, 2, 3, 4].map((i) => ({
      recipe: { id: `${i}` } as Recipe,
      reference: `${i}`,
      originalId: `${i}`,
    }))

    const tracker = buildTracker({
      recipes,
      currentCollectionId: 'some_collection_id',
      track: dummyTracker,
    })

    tracker()

    expect(dummyTracker).toBeCalledWith('some_collection_id', ['1', '2', '3', '4'])
  })
})
