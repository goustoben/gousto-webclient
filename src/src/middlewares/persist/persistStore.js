import Immutable from 'immutable'
import { cookiePrefix, cookieExpiries } from 'config/storePersistence'
import { set, unset, getNamesWithPrefix } from 'utils/cookieHelper2'

function isEmpty(value) {
  let empty = false

  if (value === '') {
    empty = true
  } else if (Array.isArray(value) && Array.length === 0) {
    empty = true
  } else if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
    empty = true
  } else if (Immutable.Iterable.isIterable(value) && value.size === 0) {
    empty = true
  } else if (value === null) {
    empty = true
  }

  return empty
}

export function serialiseStore(whitelist, state) {
  let serialised

  if (typeof state === 'object') {
    const nativeObjStore = (Immutable.Iterable.isIterable(state)) ? state.toJS() : state
    serialised = nativeObjStore

    if (whitelist) {
      serialised = {}
      Object.keys(whitelist).forEach(key => {
        if (key) {
          if (whitelist.hasOwnProperty(key) && typeof whitelist[key] === 'boolean') {
            if (!isEmpty(nativeObjStore[key])) {
              if (whitelist[key]) {
                // stop and leave raw value
                serialised[key] = nativeObjStore[key]
              } else {
                // stop and stringify
                serialised[key] = JSON.stringify(nativeObjStore[key])
              }
            }
          } else {
            // go deeper
            const serialisedValue = serialiseStore(whitelist[key], nativeObjStore[key])
            if (!isEmpty(serialisedValue)) {
              serialised[key] = serialisedValue
            }
          }
        }
      })
    }
  }

  return serialised
}

export function persistStore(state, parentKey = '') {
  let cookies
  if (state) {
    cookies = {}
    Object.keys(state).forEach(key => {
      const newKey = (parentKey) ? `${parentKey}_${key}` : key
      if (typeof state[key] === 'object') {
        cookies = Object.assign({}, cookies, persistStore(state[key], newKey))
      } else {
        cookies[newKey] = state[key]
      }
    })
  }

  return cookies
}

export function clearPersistentStore(cookies) {
  getNamesWithPrefix(cookies, cookiePrefix).forEach(cookieName => {
    unset(cookies, cookieName)
  })
}

export function saveStoreAsCookie(persistentStore, cookies) {
  clearPersistentStore(cookies)
  Object.keys(persistentStore).forEach(key => {
    const length = cookieExpiries[key] || cookieExpiries.default
    const cookieName = `${cookiePrefix}_${key}`

    set(cookies, cookieName, persistentStore[key], length)
  })
}

export function persist(state, genWhitelist, cookies) {
  const whitelist = genWhitelist(state)
  const serialisedStore = serialiseStore(whitelist, state)
  if (serialisedStore) {
    const persistentStore = persistStore(serialisedStore)
    saveStoreAsCookie(persistentStore, cookies)
  }
}
