import Immutable from 'immutable'

import { useCollectionQuerySlug } from './useCollectionQuerySlug'
import { useDisplayedCollections } from './useDisplayedCollections'
import { useCurrentCollection } from './useCurrentCollection'
import { CollectionSlug } from '../constants'
import { createCollectionFromDefaultValues } from './utils'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

jest.mock('./useCollectionQuerySlug')
jest.mock('./useDisplayedCollections')

const mockedUseCollectionQuerySlug = useCollectionQuerySlug as jest.MockedFunction<typeof useCollectionQuerySlug>
const mockedUseDisplayedCollections = useDisplayedCollections as jest.MockedFunction<typeof useDisplayedCollections>

describe('useCurrentCollection', () => {
  const defaultCollection = createCollectionFromDefaultValues({
    id: '101',
    published: true,
    default: true,
    slug: 'foo',
  })
  const recommendationsCollection = createCollectionFromDefaultValues({
    id: '102',
    published: true,
    default: false,
    slug: CollectionSlug.Recommendations,
  })
  const normalCollection = createCollectionFromDefaultValues({
    id: '103',
    published: true,
    default: false,
    slug: 'pastas',
  })
  const normalCollectionTwo = createCollectionFromDefaultValues({
    id: '104',
    published: true,
    default: false,
    slug: 'pizzas',
  })

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseCollectionQuerySlug.mockReturnValue(null)
    mockedUseDisplayedCollections.mockReturnValue(
      Immutable.OrderedMap({
        a: normalCollection,
        b: normalCollectionTwo,
        c: recommendationsCollection,
        d: defaultCollection,
      })
    )
  })

  describe('when there is a slug matching a collection', () => {
    beforeEach(() => {
      mockedUseCollectionQuerySlug.mockReturnValue(normalCollection.get('slug'))
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
        mockedUseDisplayedCollections.mockReturnValue(
          Immutable.OrderedMap({
            a: normalCollection,
            b: normalCollectionTwo,
            c: recommendationsCollection,
          })
        )
      })

      test('should return recommendations collection', () => {
        const result = useCurrentCollection()

        expect(result).toEqual(recommendationsCollection)
      })

      describe('when there is no recommendations collection', () => {
        beforeEach(() => {
          mockedUseDisplayedCollections.mockReturnValue(
            Immutable.OrderedMap({ a: normalCollection, b: normalCollectionTwo })
          )
        })

        test('should return first collection in list', () => {
          const result = useCurrentCollection()

          expect(result).toEqual(normalCollection)
        })
      })
    })
  })
})
