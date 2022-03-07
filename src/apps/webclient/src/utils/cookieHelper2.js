import moment from 'moment'
import goustoStore from 'store'
import logger from './logger'
import { cookieString } from './cookieString'
import { canUseWindow } from './browserEnvironment'
import { isServer } from './serverEnvironment'

const versionPrefix = 'v1'

function getKey(key) {
  return `${versionPrefix}_${key}`
}

function deleteWithPath(cookies, key) {
  const state = goustoStore.store.getState()
  const path = state && state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname ? state.routing.locationBeforeTransitions.pathname : '/'

  const paths = path
    .split('/')
    .filter(x => x)
    .reduce((sum, strippedCurrent) => {
      const current = `/${strippedCurrent}`
      if (sum.length === 0) {
        return [current]
      }
      sum.push(sum[sum.length - 1] + current)

      return sum
    }, [])

  paths.push('/')

  paths.forEach(pathSegment => {
    unset(cookies, key, false, pathSegment) // eslint-disable-line no-use-before-define
  })
}

function updateCookie(cookies, key, cookieValue) {
  deleteWithPath(cookies, key)
  set(cookies, key, cookieValue, 1) // eslint-disable-line no-use-before-define
}

export function encode(val) {
  let ret

  if (canUseWindow()) {
    ret = val ? JSON.stringify(val) : ''
  }

  if (isServer()) {
    ret = val ? encodeURIComponent(JSON.stringify(val)) : ''
  }

  return ret
}

export function decode(val) {
  let ret

  if (isServer()) {
    ret = val ? JSON.parse(decodeURIComponent(val)) : undefined
  }

  if (canUseWindow()) {
    ret = val ? JSON.parse(val) : undefined
  }

  return ret
}

export function get(cookies, key, withVersionPrefix = true, shouldDecode = true) {
  let result
  let oldCookieValue
  let newCookieValue
  const prefixedKey = withVersionPrefix ? getKey(key) : key

  if (cookies && typeof cookies.get === 'function') {
    try {
      if (key === 'oauth_token' || key === 'oauth_refresh') {
        let keyWithDeletedValue
        if (cookies.get(key) === 'deleted') {
          keyWithDeletedValue = key
        }
        if (cookies.get(prefixedKey) === 'deleted') {
          keyWithDeletedValue = prefixedKey
        }
        if (keyWithDeletedValue) {
          logger.notice(`'deleted' cookie value for key: ${keyWithDeletedValue}`)

          return null
        }
      }
      // shouldDecode is set to false in Optimisely Rollouts as the session id is a string and can't be decoded. Will be deleted after EME2 experiment

      if (shouldDecode) {
        oldCookieValue = decode(cookies.get(key))
        newCookieValue = decode(cookies.get(prefixedKey))
      } else {
        oldCookieValue = cookies.get(key)
        newCookieValue = cookies.get(prefixedKey)
      }
      // Need to check shouldDecode here as Optimizelyrollouts is being used in multiple components and deletes the session id cookie every time
      if (oldCookieValue && !newCookieValue) {
        updateCookie(cookies, key, oldCookieValue)
        result = oldCookieValue
      } else {
        if (oldCookieValue && shouldDecode) {
          deleteWithPath(cookies, key)
        }
        result = newCookieValue
      }
    } catch (err) {
      logger.notice(`un-parsable cookie value for key: ${key}, value: ${cookies.get(key)}`)
      logger.critical({ message: `un-parsable cookie value for key: ${key}`, errors: [err] })
    }
  }

  return result
}

export function set(cookies, key, val, days, withVersionPrefix = true, httpOnly = false, overwrite = false, path = '/', sameSite = 'Lax', domain) {
  const prefixedKey = withVersionPrefix ? getKey(key) : key

  if (cookies && typeof cookies.set === 'function') {
    if (days) {
      const expires = moment().add(days * 24, 'hours')
      cookies.set(prefixedKey, encode(val), { expires: expires.toDate(), httpOnly, overwrite, path, sameSite, domain })
    } else {
      cookies.set(prefixedKey, encode(val), { httpOnly, overwrite, path, sameSite, domain })
    }
  } else {
    logger.error({ message: 'no cookies to set on' })
  }
}

export function unset(cookies, key, withVersionPrefix = true, path = '/', domain) {
  const prefixedKey = withVersionPrefix ? getKey(key) : key

  if (cookies && typeof cookies.set === 'function') {
    cookies.set(prefixedKey, null, { expires: new Date('1970-01-01'), httpOnly: false, path, domain })
  } else {
    logger.error({ message: 'no cookies to delete on' })
  }
}

export function getNamesWithPrefix(reqCookies, prefix) {
  const cookies = cookieString(reqCookies)
  let cookieNames = []
  if (cookies) {
    const match = RegExp('^\\s*' + getKey('') + prefix + '(.*?)=\\s*(.*?)\\s*$') //eslint-disable-line

    let index
    const matches = []
    for (index = 0; index < cookies.length; index++) {
      const entry = cookies[index].match(match)
      if (entry !== null) {
        matches.push(entry[1])
      }
    }

    cookieNames = matches.map(cookieName => `${prefix}${cookieName}`)
  }

  return cookieNames
}
