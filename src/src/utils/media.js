/* eslint-disable global-require */
import jsonfile from 'jsonfile'
import logger from 'utils/logger'
import path from 'path'

let localManifest
if (!__DEV__) {
  try {
    const loc = path.resolve(process.cwd(), 'manifest.json')
    localManifest = jsonfile.readFileSync(loc)
  } catch (err) {
    logger.error('Missing manifest.json')
  }
}

function getLocalManifest() {
  if (__DEV__) {
    const loc = path.resolve(process.cwd(), 'manifest.json')
    localManifest = jsonfile.readFileSync(loc)
  }

  return localManifest
}

export function getAssetRootUrl() {
  let s3 = '/nsassets'
  if (typeof __CLOUDFRONT_URL__ !== 'undefined' && __CLOUDFRONT_URL__ !== '') {
    s3 = `${__CLIENT_PROTOCOL__}://${__CLOUDFRONT_URL__}/build/latest`
  } else if (typeof window !== 'undefined' && window.imageBaseURL) {
    s3 = window.imageBaseURL
  }

  return s3
}

export function newAssetPath(filename) {
  const manifest = getLocalManifest()
  const localFileName = manifest && manifest[filename] ? manifest[filename] : filename

  return `${getAssetRootUrl()}/${localFileName}`
}
