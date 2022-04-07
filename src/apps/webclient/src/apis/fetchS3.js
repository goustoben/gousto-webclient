import fetch from 'utils/fetch'
import { getEnvironment } from 'utils/isomorphicEnvironment'

const getS3Url = () => {
  const environmentName = getEnvironment()
  const S3FileForLocal = 'https://s3-gousto-staging-media.s3-eu-west-1.amazonaws.com/features.json'
  const S3FILE = `https://s3-gousto-${environmentName}-media.s3-eu-west-1.amazonaws.com/features.json`

  return environmentName === 'local' ? S3FileForLocal : S3FILE
}

export const fetchFeatures = async () => fetch(null, getS3Url(), { }, 'GET', 'no-cache')
