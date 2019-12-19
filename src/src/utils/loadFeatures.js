import actions from 'actions'
import globals from 'config/globals'
import windowUtils from 'utils/window'

export default function loadFeatures({ enable, disable, set = {}, features = {}, experiments = {} } = {}, store) {
  if (enable) {
    enable.forEach(feature => {
      store.dispatch(actions.featureSet(feature, true))
    })
  }

  if (disable) {
    disable.forEach(feature => {
      store.dispatch(actions.featureSet(feature, false))
    })
  }

  const featuresToSet = { ...set, ...features }
  if (featuresToSet) {
    Object.keys(featuresToSet).forEach(name => {
      store.dispatch(actions.featureSet(name, featuresToSet[name]))
    })
  }

  if (experiments) {
    Object.keys(experiments).forEach(name => {
      store.dispatch(actions.featureSet(name, experiments[name], true))
    })
  }

  const clientWindow = windowUtils.getWindow()
  const trackedExperiments = (clientWindow && clientWindow.__snowPlowTrackedExperiments) || {} // eslint-disable-line no-underscore-dangle

  if (globals.client && typeof clientWindow.__snowPlowGetOptimizelyExperimentsData === 'function' && typeof clientWindow.snowplow === 'function') { // eslint-disable-line no-underscore-dangle
    const experimentsData = clientWindow.__snowPlowGetOptimizelyExperimentsData() // eslint-disable-line no-underscore-dangle
    if (Array.isArray(experimentsData)) {
      experimentsData.forEach(experiment => {
        if (experiment.data && experiment.data.experiment_id) {
          const experimentId = experiment.data.experiment_id
          if (trackedExperiments && !trackedExperiments[experimentId]) {
            clientWindow.snowplow('trackSelfDescribingEvent', experiment)
            trackedExperiments[experimentId] = new Date()
          }
        }
      })
    }
  }
}
