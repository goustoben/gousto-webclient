import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { experimentsReducer, initialState } from 'reducers/experiments'

describe('experiments reducer', () => {
  let state

  beforeEach(() => {
    state = initialState()
  })

  describe('experiments', () => {
    test('initial state', () => {
      expect(experimentsReducer.experiments(undefined, {}).toJS()).toEqual(state.toJS())
    })

    test('unknown actions', () => {
      const result = experimentsReducer.experiments(state, { type: 'unknown' })
      expect(result.toJS()).toEqual(state.toJS())
    })

    describe('EXPERIMENTS_RECEIVED', () => {
      test('should add experiments to state', () => {
        const result = experimentsReducer.experiments(state, {
          type: actionTypes.EXPERIMENTS_RECEIVED,
          payload: {
            experiments: [{
              name: 'mock-experiment',
              bucket: 'control',
              withinExperiment: true
            }]
          }
        })

        const expectedExperiments = {
          'mock-experiment': {
            name: 'mock-experiment',
            bucket: 'control',
            withinExperiment: true
          }
        }

        const { experiments, fetchedExperiments } = result.toJS()

        expect(experiments).toEqual(expectedExperiments)
        expect(fetchedExperiments).toBe(true)
      })
    })

    describe('EXPERIMENTS_APPEND', () => {
      test('should add single experiment to state', () => {
        const result = experimentsReducer.experiments(state, {
          type: actionTypes.EXPERIMENTS_APPEND,
          payload: {
            experiment: {
              name: 'mock-experiment-2',
              bucket: 'control',
              withinExperiment: true
            }
          }
        })

        const expectedExperiments = {
          'mock-experiment-2': {
            name: 'mock-experiment-2',
            bucket: 'control',
            withinExperiment: true
          }
        }

        const { experiments } = result.toJS()

        expect(experiments).toEqual(expectedExperiments)
      })

      test('should add multiple experiments to state', () => {
        const currentState = experimentsReducer.experiments(state, {
          type: actionTypes.EXPERIMENTS_APPEND,
          payload: {
            experiment: {
              name: 'mock-experiment-2',
              bucket: 'control',
              withinExperiment: true
            }
          }
        })

        const nextState = experimentsReducer.experiments(currentState, {
          type: actionTypes.EXPERIMENTS_APPEND,
          payload: {
            experiment: {
              name: 'mock-experiment-3',
              bucket: 'control',
              withinExperiment: true
            }
          }
        })

        const expectedExperiments = {
          'mock-experiment-2': {
            name: 'mock-experiment-2',
            bucket: 'control',
            withinExperiment: true
          },
          'mock-experiment-3': {
            name: 'mock-experiment-3',
            bucket: 'control',
            withinExperiment: true
          }
        }

        const { experiments } = nextState.toJS()

        expect(experiments).toEqual(expectedExperiments)
      })

      test('should not add duplicate experiments to state', () => {
        const currentState = experimentsReducer.experiments(state, {
          type: actionTypes.EXPERIMENTS_APPEND,
          payload: {
            experiment: {
              name: 'mock-experiment-4',
              bucket: 'control',
              withinExperiment: true
            }
          }
        })

        const result = experimentsReducer.experiments(currentState, {
          type: actionTypes.EXPERIMENTS_APPEND,
          payload: {
            experiment: {
              name: 'mock-experiment-4',
              bucket: 'variant',
              withinExperiment: true
            }
          }
        })

        const expectedExperiments = {
          'mock-experiment-4': {
            name: 'mock-experiment-4',
            bucket: 'variant',
            withinExperiment: true
          }
        }

        const { experiments } = result.toJS()

        expect(experiments).toEqual(expectedExperiments)
      })
    })

    describe.each([
      'EXPERIMENTS_REMOVE',
      'USER_LOGGED_IN',
      'USER_LOGGED_OUT'
    ])('%s', (experimentActionType) => {
      test('should set experiments to default state', () => {
        const userBucketingState = Immutable.Map({
          experiments: Immutable.Map({
            'mock-experiment': {
              name: 'mock-experiment',
              bucket: 'control',
              withinExperiment: true
            }
          })
        })

        const result = experimentsReducer.experiments(userBucketingState, {
          type: actionTypes[experimentActionType],
          payload: {}
        })

        expect(result).toEqual(state)
      })
    })
  })
})
