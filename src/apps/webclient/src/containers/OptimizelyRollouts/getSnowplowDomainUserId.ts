import { canUseWindow } from 'utils/browserEnvironment'

import { Nullable } from '../../types'
import { TrackerDictionary } from '../../types/snowplow'

const TIMEOUT_MS = 3000
const INTERVAL_MS = 100

let cachedDomainUserId: string
let promiseFromSnowplow: Nullable<Promise<string>> = null
let waitingPromise: Nullable<Promise<void>> = null

// Note: must use function declaration because the API returns the tracker holder in `this`
// https://docs.snowplowanalytics.com/docs/collecting-data/collecting-from-own-applications/javascript-trackers/javascript-tracker/javascript-tracker-v3/advanced-usage/tracker-callbacks/
function snowplowCallback(
  this: TrackerDictionary,
  resolve: (id: string) => void,
  reject: (error: Error) => void,
) {
  try {
    const cfTracker = this.cf
    const id = cfTracker.getDomainUserId()
    resolve(id)
  } catch (error) {
    reject(error as Error)
  }
}

const callSnowplow = (resolve: (id: string) => void, reject: (error: Error) => void) => {
  if (!window.snowplow) {
    reject(new Error('window.snowplow is undefined'))

    return
  }

  window.snowplow(snowplowCallback, resolve, reject)
}

const saveDomainUserId = (id: string, callback?: (id: string) => void) => {
  cachedDomainUserId = id
  callback?.(cachedDomainUserId)
}

const getIdDirectlyFromSnowplow = () => {
  if (!promiseFromSnowplow) {
    promiseFromSnowplow = new Promise((resolve, reject) => {
      callSnowplow((id) => saveDomainUserId(id, resolve), reject)
      setTimeout(() => {
        reject(new Error(`Snowplow failed to return id in ${TIMEOUT_MS} ms`))
        promiseFromSnowplow = null
      }, TIMEOUT_MS)
    })
  }

  return promiseFromSnowplow
}

const waitForSnowplowToAppear = async () => {
  if (!waitingPromise) {
    waitingPromise = new Promise((resolve, reject) => {
      let iterations = 0

      const intervalId = setInterval(() => {
        iterations += 1
        const passedMs = iterations * INTERVAL_MS

        if (passedMs >= TIMEOUT_MS) {
          clearInterval(intervalId)
          reject(new Error(`Snowplow failed to initialize in ${TIMEOUT_MS} ms`))
          waitingPromise = null

          return
        }

        if (!window.snowplow) return

        clearInterval(intervalId)
        resolve()
      }, INTERVAL_MS)
    })
  }

  return waitingPromise
}

export const getSnowplowDomainUserId = async (): Promise<string> => {
  if (!canUseWindow()) return Promise.reject(new Error('Can not use window'))

  if (cachedDomainUserId) return cachedDomainUserId

  if (window.snowplow) return getIdDirectlyFromSnowplow()

  try {
    await waitForSnowplowToAppear()
  } catch (error) {
    return Promise.reject(error)
  }

  return getSnowplowDomainUserId()
}
