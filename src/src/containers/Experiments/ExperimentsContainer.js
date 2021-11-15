import { connect } from 'react-redux'
import { makeGetExperimentByName, isFetchingExperiments} from 'selectors/experiments'
import { Experiments } from './Experiments'
import { fetchOrAssignUserToExperiment } from "actions/experiments/fetchOrAssignUserToExperiment"

const mapStateToProps = (state, props) => {
  const getExperimentByName = makeGetExperimentByName()

  return {
    experiment: getExperimentByName(state, props),
    isFetchingExperiments: isFetchingExperiments(state)
  }
}

const mapDispatchToProps = {
  fetchOrAssignUserToExperiment,
}

export const ExperimentsContainer = connect(mapStateToProps, mapDispatchToProps)(Experiments)
