const appendFeatureToRequest = ({
  body,
  featureShorterCompensationPeriod
}) => {
  const features = []

  if (featureShorterCompensationPeriod === true) {
    features.push('ssrShorterCompensationPeriod')
  }

  return {
    ...body,
    features,
  }
}

export { appendFeatureToRequest }
