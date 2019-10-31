import {
  locationBeforeTransitions,
  locationQuery,
  locationAtMyGousto,
} from '../routing'

// Generates a store as it would look in envs other than local.
const generateRoutingStore = (path) => ({
  routing: {
    locationBeforeTransitions: {
      query: { path }
    }
  }
})

// Generates a store as it would look in local environment.
const generateAlternateRoutingStore = (path) => ({
  routing: {
    locationBeforeTransitions: {
      pathname: `/${path}`,
      query: {},
    }
  }
})

describe('the routing selectors', () => {
  let store
  const PAGE_NAME = 'some-test-page'

  beforeEach(() => {
    store = generateRoutingStore(PAGE_NAME)
  })

  describe('the locationBeforeTransitions selector', () => {
    test('returns the correct part of the store', () => {
      expect(locationBeforeTransitions(store)).toEqual({
        query: {
          path: PAGE_NAME,
        }
      })
    })
  })

  describe('the locationQuery selector', () => {
    describe('when the part of store exists', () => {
      test('returns the correct part of store', () => {
        expect(locationQuery(store)).toEqual({
          path: PAGE_NAME
        })
      })
    })

    describe('when the part of store does not exist', () => {
      beforeEach(() => {
        store = {
          routing: {}
        }
      })

      test('returns an empty string', () => {
        expect(locationQuery(store)).toBe('')
      })
    })
  })
})
