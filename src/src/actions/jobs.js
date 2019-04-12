import { fetchJobs } from 'apis/workable'
import actionTypes from './actionTypes'
import statusActions from './status'

function fetchOpenJobs() {
  return async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.JOBS_RECEIVE, true))
    dispatch(statusActions.error(actionTypes.JOBS_RECEIVE, false))
    try {
      const { data = {} } = await fetchJobs()
      const jobs = { data }
      dispatch({ type: actionTypes.JOBS_RECEIVE, jobs })
    } catch (err) {
      dispatch(err, actionTypes.JOBS_RECEIVE)
    } finally {
      dispatch(statusActions.pending(actionTypes.JOBS_RECEIVE, false))
    }
  }
}

const selectDepartment = (department) => ({
  type: actionTypes.JOBS_DEPARTMENT_CHANGE,
  department,
})

const jobsActions = {
  fetchOpenJobs,
  selectDepartment,
}

export default jobsActions
