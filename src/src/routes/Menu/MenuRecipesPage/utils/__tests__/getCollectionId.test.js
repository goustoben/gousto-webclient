import { getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'
import { getCurrentCollectionIsRecommendation } from '../../../selectors/menu'
import { getCollectionId } from '../getCollectionId'

jest.mock('utils/collections')
jest.mock('../../../selectors/menu')

describe('getCollectionId', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('when a collection is found for the given slug', () => {
    const COLLECTION_ID_FOR_SLUG = 'abcdef'
    beforeEach(() => {
      getCollectionIdWithName.mockReturnValue(COLLECTION_ID_FOR_SLUG)
    })

    test('should return the correct collection id', () => {
      const result = getCollectionId({}, {})

      expect(result).toEqual(COLLECTION_ID_FOR_SLUG)
    })
  })

  describe('when a collection is not found for the given slug', () => {
    beforeEach(() => {
      getCollectionIdWithName.mockReturnValue(undefined)
    })

    describe('when current collection is recommendation', () => {
      const COLLECTION_ID_FOR_RECOMMENDATION = 'defghi'
      beforeEach(() => {
        getCurrentCollectionIsRecommendation.mockReturnValue(COLLECTION_ID_FOR_RECOMMENDATION)
      })

      test('should return the correct collection id', () => {
        const result = getCollectionId({}, {})
  
        expect(result).toEqual(COLLECTION_ID_FOR_RECOMMENDATION)
      })
    })

    describe('when current collection is not recommendation', () => {
      beforeEach(() => {
        getCurrentCollectionIsRecommendation.mockReturnValue(undefined)
      })

      test('should return the default collection id', () => {
        const COLLECTION_ID_DEFAULT = 'ghijkl'
        getDefaultCollectionId.mockReturnValue(COLLECTION_ID_DEFAULT)

        const result = getCollectionId({}, {})
  
        expect(result).toEqual(COLLECTION_ID_DEFAULT)
      })
    })
  })
})
