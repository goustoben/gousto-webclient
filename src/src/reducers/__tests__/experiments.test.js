import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { experimentsReducer, initialState } from 'reducers/experiments'

describe('experiments reducer', () => {
  describe('experiments', () => {
    test('initial state', () => {
      expect(experimentsReducer.experiments(undefined, {})).toEqual(initialState)
    })

    test('unknown actions', () => {
      const result = experimentsReducer.experiments(initialState, { type: 'unknown' })
      expect(result).toEqual(initialState)
    })

    describe('EXPERIMENTS_RECEIVED', () => {
      test('should add experiments to state', () => {
        const result = experimentsReducer.experiments(initialState, {
          type: actionTypes.EXPERIMENTS_RECEIVED,
          payload: {
            experiments: [{
              name: 'mock-experiment',
              bucket: 'control',
              withinExperiment: true
            }]
          }
        })

        const expectedExperiments = [{
          name: 'mock-experiment',
          bucket: 'control',
          withinExperiment: true
        }]

        const { experiments, fetchedExperiments } = result.toJS()

        expect(experiments).toEqual(expectedExperiments)
        expect(fetchedExperiments).toBe(true)
      })
    })

    describe('EXPERIMENTS_APPEND', () => {
      test('should add single experiment to state', () => {
        const result = experimentsReducer.experiments(initialState, {
          type: actionTypes.EXPERIMENTS_APPEND,
          payload: {
            experiment: {
              name: 'mock-experiment-2',
              bucket: 'control',
              withinExperiment: true
            }
          }
        })

        const expectedExperiments = [{
          name: 'mock-experiment-2',
          bucket: 'control',
          withinExperiment: true
        }]

        const { experiments } = result.toJS()

        expect(experiments).toEqual(expectedExperiments)
      })
    })

    describe('EXPERIMENTS_REMOVE', () => {
      test('should set experiments to default state', () => {
        const userBucketingState = Immutable.Map({
          experiments: Immutable.List([{
            name: 'mock-experiment',
            bucket: 'control',
            withinExperiment: true
          }])
        })

        const result = experimentsReducer.experiments(userBucketingState, {
          type: actionTypes.EXPERIMENTS_REMOVE,
          payload: {}
        })

        expect(result).toEqual(initialState)
      })
    })
  })
})
