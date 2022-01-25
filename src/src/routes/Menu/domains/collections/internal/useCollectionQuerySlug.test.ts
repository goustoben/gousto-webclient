import { useSelector } from 'react-redux'
import { useCollectionQuerySlug } from './useCollectionQuerySlug'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

const mockedUseCollectionQuerySlug = useCollectionQuerySlug as jest.MockedFunction<
  typeof useCollectionQuerySlug
>
const mockedUseSelector = useSelector as jest.MockedFunction<typeof useSelector>
describe('useCollectionQuerySlug', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when no routing on state', () => {
    const state = {}

    beforeEach(() => {
      mockedUseSelector.mockImplementation((selector) => selector(state))
    })

    test('should return null', () => {
      const result = mockedUseCollectionQuerySlug()

      expect(result).toEqual(null)
    })
  })

  describe('when query has a `collection` parameter', () => {
    const state = {
      routing: {
        locationBeforeTransitions: {
          query: {
            collection: 'gluten-free',
          },
        },
      },
    }

    beforeEach(() => {
      mockedUseSelector.mockImplementation((selector) => selector(state))
    })

    test('should return slug', () => {
      const result = mockedUseCollectionQuerySlug()

      expect(result).toEqual('gluten-free')
    })
  })

  describe('when query has an empty `collection` parameter', () => {
    const state = {
      routing: {
        locationBeforeTransitions: {
          query: {
            collection: '',
          },
        },
      },
    }

    beforeEach(() => {
      mockedUseSelector.mockImplementation((selector) => selector(state))
    })

    test('should return null', () => {
      const result = mockedUseCollectionQuerySlug()

      expect(result).toEqual(null)
    })
  })

  describe('when query has no `collection` parameter', () => {
    const state = {
      routing: {
        locationBeforeTransitions: {
          query: {},
        },
      },
    }

    beforeEach(() => {
      mockedUseSelector.mockImplementation((selector) => selector(state))
    })

    test('should return null', () => {
      const result = mockedUseCollectionQuerySlug()

      expect(result).toEqual(null)
    })
  })
})
