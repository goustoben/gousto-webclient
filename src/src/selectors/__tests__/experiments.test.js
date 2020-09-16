import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import {
  getExperiments,
  isFetchingExperiments,
  hasFetchedExperiments,
  shouldFetchExperiments,
  makeGetExperimentByName,
  shouldAssignUserToExperiment
} from '../experiments'

describe('experiments selectors', () => {
  let state

  describe('getExperiments', () => {
    beforeEach(() => {
      state = {
        experiments: Immutable.Map({
          experiments: Immutable.Map({
            'mock-experiment': Immutable.Map({
              name: 'mock-experiment',
              bucket: 'control',
              withinExperiment: true,
            })
          })
        })
      }
    })

    test('returns value all experiments from state', () => {
      const result = getExperiments(state)

      expect(result.toJS()).toEqual({
        'mock-experiment': {
          name: 'mock-experiment',
          bucket: 'control',
          withinExperiment: true,
        }
      })
    })
  })

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

  describe('makeGetExperimentByName', () => {
    beforeEach(() => {
      state = {
        experiments: Immutable.Map({
          experiments: Immutable.Map({
            'mock-experiment': Immutable.Map({
              name: 'mock-experiment',
              bucket: 'control',
              withinExperiment: true,
            })
          })
        })
      }
    })

    test('returns experiment when found', () => {
      const getExperimentByName = makeGetExperimentByName()
      const result = getExperimentByName(state, { experimentName: 'mock-experiment' })

      expect(result.toJS()).toEqual({
        name: 'mock-experiment',
        bucket: 'control',
        withinExperiment: true,
      })
    })

    test('returns null when experiment is not found', () => {
      const getExperimentByName = makeGetExperimentByName()
      const result = getExperimentByName(state, { experimentName: 'mock-experiment-invalid' })

      expect(result).toBe(null)
    })
  })

  describe('shouldAssignUserToExperiment', () => {
    describe.each([
      [{ experiment: {}, isFetching: true }, false],
      [{ experiment: {}, isFetching: false }, false],
      [{ experiment: null, isFetching: true }, false],
      [{ experiment: null, isFetching: false }, true]
    ])('When called with %o', ({ experiment, isFetching }, expected) => {
      test(`should return ${expected}`, () => {
        expect(shouldAssignUserToExperiment.resultFunc(experiment, isFetching)).toBe(expected)
      })
    })
  })
})
