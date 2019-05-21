import Immutable from 'immutable'
import {
  getSelectedJobsDepartment,
  getAllJobs
} from 'selectors/jobs'

describe('jobs selectors', () => {
  let state
  let testJobs

  describe('the getSelectedJobsDepartment selector', () => {
    test('returns the selected job department', () => {
      state = {
        jobsDepartment: Immutable.fromJS({
          selectedDepartment: 'Food'
        })
      }
      expect(getSelectedJobsDepartment(state)).toEqual('Food')
    })
  })

  describe('the getAllJobs selector', () => {
    describe('when jobs exist', () => {
      beforeEach(() => {
        testJobs = Immutable.fromJS({
          'jobId1': {
            id: 'jobId1',
            title: 'Test job 1',
          },
          'jobId2': {
            id: 'jobId2',
            title: 'Test job 2',
          }
        })

        state = {
          jobs: Immutable.fromJS({
            jobs: testJobs
          })
        }
      })

      test('returns a list of all jobs in the store', () => {
        expect(getAllJobs(state)).toBe(testJobs)
      })
    })

    describe('when no jobs exist', () => {
      beforeEach(() => {
        state = {
          jobs: Immutable.fromJS({
            jobs: {}
          })
        }
      })

      test('returns an empty map', () => {
        expect(getAllJobs(state)).toBe(Immutable.Map())
      })
    })
  })
})

