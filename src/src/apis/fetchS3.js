import fetch from 'utils/fetch'
const envName = __ENV__ || 'production'
const domain = __DOMAIN__ || 'gousto.co.uk'
const S3FILE = `https://${envName}-media.${domain}/features.json`

export const fetchFeatures = async () => fetch(null, S3FILE, { }, 'GET')
