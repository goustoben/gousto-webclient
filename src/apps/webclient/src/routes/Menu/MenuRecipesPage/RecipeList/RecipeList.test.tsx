import { Recipe } from '@library/api-menu-service'

import { buildTracker } from './RecipeList'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => true),
  useSelector: jest.fn(),
}))

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
