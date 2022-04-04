/* eslint-disable global-require */
import jsonfile from 'jsonfile'
import logger from 'utils/logger'
import path from 'path'
import isomorphicFetch from 'isomorphic-fetch'
import { getEnvironment, getProtocol, getDomain } from 'utils/isomorphicEnvironment'

export const ASSET_PATH = '/build/latest'

let localManifest
if (!__DEV__) {
  try {
    const loc = path.resolve(process.cwd(), 'manifest.json')
    localManifest = jsonfile.readFileSync(loc)
  } catch (err) {
    logger.critical({message: 'Missing manifest.json'})
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
  const environment = getEnvironment()
  const domain = getDomain()
  const protocol = getProtocol()

  switch (environment) {
  case 'local':
    return ASSET_PATH

  case 'production':
  case 'staging': return `${protocol}//${environment}-assets.${domain}${ASSET_PATH}`

  default: // Squad environment
    return `${protocol}//s3-gousto-${environment}-assets.s3.amazonaws.com${ASSET_PATH}`
  }
}

export function newAssetPath(filename) {
  const manifest = getLocalManifest()
  const localFileName = manifest && manifest[filename] ? manifest[filename] : filename

  return `${getAssetRootUrl()}/${localFileName}`
}

export async function proxyAssetRequest({ ctx, next }) {
  const { request: { path: assetRequestPath } } = ctx

  if (assetRequestPath.indexOf(ASSET_PATH) !== -1) {
    const file = await isomorphicFetch(newAssetPath(assetRequestPath.replace(`${ASSET_PATH}/`, '')))
    ctx.type = assetRequestPath.split('.').pop()
    ctx.body = file.body
  } else {
    await next()
  }
}
