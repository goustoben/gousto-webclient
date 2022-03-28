/* eslint-disable global-require */
import jsonfile from 'jsonfile'
import logger from 'utils/logger'
import path from 'path'
import isomorphicFetch from 'isomorphic-fetch'
import { getServerEnvironment, getServerDomain } from '../../server/utils/serverEnvironment'

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
  const serverEnvironment = getServerEnvironment()
  const serverDomain = getServerDomain()

  if (serverEnvironment === 'local') {
    return ASSET_PATH
  } else if (serverEnvironment === 'production' || serverEnvironment === 'staging') {
    return `${__CLIENT_PROTOCOL__}://${serverEnvironment}-assets.${serverDomain}${ASSET_PATH}`
  }

  // Return squad env assets
  return `${__CLIENT_PROTOCOL__}://s3-gousto-${serverEnvironment}-assets.s3.amazonaws.com${ASSET_PATH}`
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
    const ext = assetRequestPath.split('.').pop()
    ctx.type = ext
    ctx.body = file.body
  } else {
    await next()
  }
}
