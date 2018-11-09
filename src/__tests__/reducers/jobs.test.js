import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import jobsReducer from 'reducers/jobs'

describe('jobs reducer', () => {
  test('should handle initial state', () => {
    const initialState = Immutable.fromJS({
      jobs: {},
    })
    expect(Immutable.is(jobsReducer.jobs(undefined, {}), initialState)).toEqual(
      true,
    )
  })

  describe('JOBS_RECEIVE', () => {
    test('should load jobs into state', () => {
      const result = jobsReducer.jobs(Immutable.Map({}), {
        type: actionTypes.JOBS_RECEIVE,
        jobs: [{ id: '1', title: 'job 1' }, { id: '2', title: 'job 2' }],
      })
      const expectedState = Immutable.Map()
        .set('1', Immutable.Map({ id: '1', title: 'job 1' }))
        .set('2', Immutable.Map({ id: '2', title: 'job 2' }))
      expect(Immutable.is(result.get('jobs'), expectedState)).toEqual(true)
    })
  })
})
