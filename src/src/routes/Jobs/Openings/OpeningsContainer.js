import { connect } from 'react-redux'
import actions from 'actions/jobs'
import Openings from './Openings'
import config from 'config/jobs'

function mapStateToProps(state) {
  const jobs = state.jobs.get('jobs')
  const filteredJobs = jobs.filter((job) => config.Openings[state.jobsDepartment.get('selectedDepartment')].indexOf(job.get('department')) > -1)

  return ({
    jobs: filteredJobs,
    depts: Object.keys(config.Openings),
    selectedDepartment: state.jobsDepartment.get('selectedDepartment'),
  })
}

const OpeningsContainer = connect(mapStateToProps, {
  fetchOpenJobs: actions.fetchOpenJobs,
  selectDepartment: actions.selectDepartment,
})(Openings)

export default OpeningsContainer
