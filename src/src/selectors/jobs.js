import { createSelector } from 'reselect'
import config from 'config/jobs'

export const getAllJobs = state => state.jobs.get('jobs')
export const getSelectedJobsDepartment = state => state.jobsDepartment.get('selectedDepartment')

export const getJobsToDisplay = createSelector(
  getAllJobs,
  getSelectedJobsDepartment,
  (allJobs, selectedDepartment) => {
    if (selectedDepartment.toLowerCase() === 'all') {
      return allJobs
    }

    return allJobs.filter(job => config.Openings[selectedDepartment].includes(job.get('department')))
  }
)
