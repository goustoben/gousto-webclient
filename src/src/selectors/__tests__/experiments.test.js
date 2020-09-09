import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { isFetchingExperiments, hasFetchedExperiments, shouldFetchExperiments } from '../experiments'

describe('experiments selectors', () => {
  let state

  describe('isFetchingExperiments', () => {
    describe('When experiments are being fetched', () => {
      beforeEach(() => {
        state = {
          pending: Immutable.Map({
            [actionTypes.EXPERIMENTS_FETCHING]: true
          })
        }
      })

      test('returns true', () => {
        expect(isFetchingExperiments(state)).toBe(true)
      })
    })

    describe('When experiments are not being fetched', () => {
      beforeEach(() => {
        state = {
          pending: Immutable.Map({
            [actionTypes.EXPERIMENTS_FETCHING]: false
          })
        }
      })

      test('returns false', () => {
        expect(isFetchingExperiments(state)).toBe(false)
      })
    })
  })

  describe('hasFetchedExperiments', () => {
    beforeEach(() => {
      state = {
        experiments: Immutable.Map({
          fetchedExperiments: true
        })
      }
    })

    test('returns value of "fetchedExperiments"', () => {
      expect(hasFetchedExperiments(state)).toBe(true)
    })
  })

  describe('shouldFetchExperiments', () => {
    describe.each([
      [{ hasFetched: true, pending: true }, false],
      [{ hasFetched: true, pending: false }, false],
      [{ hasFetched: false, pending: true }, false],
      [{ hasFetched: false, pending: false }, true]
    ])('When called with %o', ({ hasFetched, pending }, expected) => {
      test(`should return ${expected}`, () => {
        expect(shouldFetchExperiments.resultFunc(pending, hasFetched)).toBe(expected)
      })
    })
  })
})
