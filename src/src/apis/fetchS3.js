import fetch from 'utils/fetch'
const envName = process.env.npm_config_gousto_webclient_environment_name || 'staging'
const domain = process.env.npm_config_gousto_webclient_domain || 'gousto.info'
const S3FILE = `https://${envName}-media.${domain}/features.json`

export const fetchFeatures = async () => fetch(null, S3FILE, { }, 'GET')
