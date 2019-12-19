import Immutable from 'immutable'
import {
  getSelectedJobsDepartment,
  getAllJobs,
  getJobsToDisplay
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

  describe('the getJobsToDisplay selector', () => {
    beforeEach(() => {
      testJobs = Immutable.fromJS({
        'jobId1': {
          id: 'jobId1',
          title: 'Test job 1',
          department: 'Operations',
        },
        'jobId2': {
          id: 'jobId2',
          title: 'Test job 2',
          department: 'Tech'
        },
        'jobId3': {
          id: 'jobId3',
          title: 'Test job 3',
          department: 'Operations'
        },
        'jobId4': {
          id: 'jobId4',
          title: 'Test job 4',
          department: 'Data'
        },
        'jobId5': {
          id: 'jobId5',
          title: 'Test job 5',
          department: 'Analytics'
        },
      })

      state = {
        jobsDepartment: Immutable.fromJS({
          selectedDepartment: 'All'
        }),
        jobs: Immutable.fromJS({
          jobs: testJobs
        })
      }
    })

    test('returns all jobs when the All filter is selected', () => {
      expect(getJobsToDisplay(state)).toBe(testJobs)
    })

    test('returns the correct jobs when a filter is selected', () => {
      const updatedState = {
        ...state,
        jobsDepartment: Immutable.fromJS({
          selectedDepartment: 'Tech'
        })
      }
      expect(getJobsToDisplay(updatedState)).toEqual(Immutable.fromJS({
        'jobId2': {
          id: 'jobId2',
          title: 'Test job 2',
          department: 'Tech'
        }
      }))
    })

    test('returns the correct jobs when a filter is selected which contains multiple departments according to config/jobs.js', () => {
      const updatedState = {
        ...state,
        jobsDepartment: Immutable.fromJS({
          selectedDepartment: 'Data'
        })
      }
      expect(getJobsToDisplay(updatedState)).toEqual(Immutable.fromJS({
        'jobId4': {
          id: 'jobId4',
          title: 'Test job 4',
          department: 'Data'
        },
        'jobId5': {
          id: 'jobId5',
          title: 'Test job 5',
          department: 'Analytics'
        },
      }))
    })

    test('returns an empty map when no jobs exist in the selected department', () => {
      const updatedState = {
        ...state,
        jobsDepartment: Immutable.fromJS({
          selectedDepartment: 'Brand'
        })
      }
      expect(getJobsToDisplay(updatedState)).toBe(Immutable.Map())
    })
  })
})

