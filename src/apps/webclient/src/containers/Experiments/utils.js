export const getBucket = (experiment) => {
  if (!experiment) {
    return 'control'
  }

  const withinExperiment = experiment.get('withinExperiment')
  const bucket = experiment.get('bucket')

  return withinExperiment ? bucket : 'control'
}
