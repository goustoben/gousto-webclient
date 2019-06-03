import { connect } from 'react-redux'
import actions from 'actions/jobs'
import {
  getSelectedJobsDepartment,
  getJobsToDisplay
} from 'selectors/jobs'
import config from 'config/jobs'
import Openings from './Openings'

const mapStateToProps = state => ({
  jobs: getJobsToDisplay(state),
  depts: Object.keys(config.Openings),
  selectedDepartment: getSelectedJobsDepartment(state),
})

const OpeningsContainer = connect(mapStateToProps, {
  fetchOpenJobs: actions.fetchOpenJobs,
  selectDepartment: actions.selectDepartment,
})(Openings)

export default OpeningsContainer
