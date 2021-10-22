import Immutable from 'immutable'
import { useCollectionQuerySlug } from './useCollectionQuerySlug'
import { useDisplayedCollections } from './useDisplayedCollections'

import { useCurrentCollection } from './useCurrentCollection'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}))

jest.mock('./useCollectionQuerySlug')
jest.mock('./useDisplayedCollections')

describe('useCurrentCollection', () => {
  const defaultCollection = Immutable.Map({ id: '101', published: true, default: true, slug: 'foo' })
  const recommendationsCollection = Immutable.Map({ id: '102', published: true, default: false, slug: 'recommendations' })
  const normalCollection = Immutable.Map({ id: '103', published: true, default: false, slug: 'pastas' })
  const normalCollectionTwo = Immutable.Map({ id: '104', published: true, default: false, slug: 'pizzas' })

  beforeEach(() => {
    jest.clearAllMocks()

    useCollectionQuerySlug.mockReturnValue(null)
    useDisplayedCollections.mockReturnValue(Immutable.List([normalCollection, normalCollectionTwo, recommendationsCollection, defaultCollection]))
  })

  describe('when there is a slug matching a collection', () => {
    beforeEach(() => {
      useCollectionQuerySlug.mockReturnValue(normalCollection.get('slug'))
    })

    test('should return that collection', () => {
      const result = useCurrentCollection()

      expect(result).toEqual(normalCollection)
    })
  })

  describe('when there is no slug (or no collection found for slug)', () => {
    test('should return default collection', () => {
      const result = useCurrentCollection()

      expect(result).toEqual(defaultCollection)
    })

    describe('when there is no default collection', () => {
      beforeEach(() => {
        useDisplayedCollections.mockReturnValue(Immutable.List([normalCollection, normalCollectionTwo, recommendationsCollection]))
      })

      test('should return recommendations collection', () => {
        const result = useCurrentCollection()

        expect(result).toEqual(recommendationsCollection)
      })

      describe('when there is no recommendations collection', () => {
        beforeEach(() => {
          useDisplayedCollections.mockReturnValue(Immutable.List([normalCollection, normalCollectionTwo]))
        })

        test('should return first collection in list', () => {
          const result = useCurrentCollection()

          expect(result).toEqual(normalCollection)
        })
      })
    })
  })
})
