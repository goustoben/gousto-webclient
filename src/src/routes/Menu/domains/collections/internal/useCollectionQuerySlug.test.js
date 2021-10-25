import { useSelector } from 'react-redux'
import { useCollectionQuerySlug } from './useCollectionQuerySlug'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}))

describe('useCollectionQuerySlug', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when no routing on state', () => {
    const state = {}

    beforeEach(() => {
      useSelector.mockImplementation(selector => selector(state))
    })

    test('should return null', () => {
      const result = useCollectionQuerySlug(state)

      expect(result).toEqual(null)
    })
  })

  describe('when query has a `collection` parameter', () => {
    const state = {
      routing: {
        locationBeforeTransitions: {
          query: {
            collection: 'gluten-free'
          }
        },
      }
    }

    beforeEach(() => {
      useSelector.mockImplementation(selector => selector(state))
    })

    test('should return slug', () => {
      const result = useCollectionQuerySlug(state)

      expect(result).toEqual('gluten-free')
    })
  })

  describe('when query has an empty `collection` parameter', () => {
    const state = {
      routing: {
        locationBeforeTransitions: {
          query: {
            collection: ''
          }
        },
      }
    }

    beforeEach(() => {
      useSelector.mockImplementation(selector => selector(state))
    })

    test('should return null', () => {
      const result = useCollectionQuerySlug(state)

      expect(result).toEqual(null)
    })
  })

  describe('when query has no `collection` parameter', () => {
    const state = {
      routing: {
        locationBeforeTransitions: {
          query: {}
        },
      }
    }

    beforeEach(() => {
      useSelector.mockImplementation(selector => selector(state))
    })

    test('should return null', () => {
      const result = useCollectionQuerySlug(state)

      expect(result).toEqual(null)
    })
  })
})
