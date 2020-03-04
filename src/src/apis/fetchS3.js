import fetch from 'utils/fetch'
const envName = 'staging' || __ENV__ || 'production'
const S3FILE = `https://s3-gousto-${envName}-media.s3-eu-west-1.amazonaws.com/features.json`

export const fetchFeatures = async () => fetch(null, S3FILE, { }, 'GET', 'no-cache')
