import { connect } from 'react-redux'
import { fetchOrAssignUserToExperiment } from 'actions/experiments'
import { makeGetExperimentByName, isFetchingExperiments} from 'selectors/experiments'
import { Experiments } from './Experiments'

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
