import Immutable from 'immutable'

const isArray = (value) => Array.isArray(value)
const isObject = (value) => !isArray(value) && typeof value === 'object' && value !== null
const isPlain = (value) => typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null || value === undefined
const isImmutableMap = (value) => value instanceof Immutable.Map
const isImmutableList = (value) => value instanceof Immutable.List
const isImmutableOrderedMap = (value) => value instanceof Immutable.OrderedMap

export const checkSliceTag = {
  isPlain,
  isObject,
  isImmutableList,
  isImmutableMap,
  isImmutableOrderedMap,
}

export const defineTag = (value) => {
  if (isImmutableOrderedMap(value)) {
    return 'isOrderedMap'
  }

  if (isImmutableMap(value)) {
    return 'isMap'
  }

  if (isImmutableList(value)) {
    return 'isList'
  }

  if (isPlain(value)) {
    return 'isPlain'
  }

  return 'isObject'
}
