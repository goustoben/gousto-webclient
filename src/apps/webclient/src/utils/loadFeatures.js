import { featuresSet } from 'actions/features'
import { getWindow, canUseWindow } from './browserEnvironment'

export function loadFeatures({ enable, disable, set = {}, features = {}} = {}, store) {
  const featuresArr = []
  if (enable) {
    enable.forEach(feature => {
      featuresArr.push({ feature, value: true })
    })
  }

  if (disable) {
    disable.forEach(feature => {
      featuresArr.push({ feature, value: false })
    })
  }

  const featuresToSet = { ...set, ...features }
  if (featuresToSet) {
    Object.keys(featuresToSet).forEach(name => {
      featuresArr.push({ feature: name, value: featuresToSet[name] })
    })
  }

  store.dispatch(featuresSet(featuresArr))

  const clientWindow = getWindow()
  const trackedExperiments = (clientWindow && clientWindow.__snowPlowTrackedExperiments) || {} // eslint-disable-line no-underscore-dangle

  if (canUseWindow() && typeof clientWindow.__snowPlowGetOptimizelyExperimentsData === 'function' && typeof clientWindow.snowplow === 'function') { // eslint-disable-line no-underscore-dangle
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
