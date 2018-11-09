import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const jobsInitialState = Immutable.fromJS({
  jobs: {},
})

const jobsDepartmentInitialState = Immutable.fromJS({
  selectedDepartment: 'All',
})

const jobs = {
  jobs: (state = jobsInitialState, action) => {
    if (!state) {
      return jobsInitialState
    }
    switch (action.type) {
    case actionTypes.JOBS_RECEIVE: {
      const keyedJobs = Immutable.fromJS(action.jobs).reduce((workingJobs, job) => (
        workingJobs.set(job.get('id'), job)
      ), Immutable.Map({}))

      return state.set('jobs', keyedJobs)
    }

    default: {
      return state
    }
    }
  },

  jobsDepartment: (state = jobsDepartmentInitialState, action) => {
    switch (action.type) {
    case actionTypes.JOBS_DEPARTMENT_CHANGE:
      return state.set('selectedDepartment', action.department)
    default: {
      return state
    }
    }
  },
}

export default jobs
