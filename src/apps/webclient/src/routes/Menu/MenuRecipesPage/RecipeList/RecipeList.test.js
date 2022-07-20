import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RecipeTileBridge } from '../../components/RecipeTile'
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
      expect(wrapper.find(RecipeTileBridge).exists()).toBe(false)
    })
  })
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
