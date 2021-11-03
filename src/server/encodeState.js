import { defineTag, checkSliceTag } from 'utils/state'
const {
  isPlain,
  isObject,
  isImmutableList,
  isImmutableMap,
  isImmutableOrderedMap,
} = checkSliceTag

const transformObjects = (obj) => {
  const transformedObjects = {}
  Object.entries(obj).forEach(([key, value]) => {
    transformedObjects[key] = {
      tag: defineTag(value),
      value: isObject(value) ? transformObjects(value) : value,
    }
  })

  return transformedObjects
}

const transformMapObj = (mapObj) => {
  const transformedMap = {}
  mapObj.mapEntries(([mapKey, mapValue]) => {
    transformedMap[mapKey] = {
      tag: defineTag(mapValue),
      value: isImmutableMap(mapValue) ? transformMapObj(mapValue) : mapValue,
    }
  })

  return transformedMap
}

const transformState = (state) => {
  const transformedState = {}
  Object.entries(state).forEach(([key, value]) => {
    if (isImmutableOrderedMap(value)) {
      transformedState[key] = {
        tag: 'isOrderedMap',
        value,
      }

      return transformedState
    }

    if (isImmutableMap(value)) {
      transformedState[key] = {
        tag: 'isMap',
        value: transformMapObj(value),
      }

      return transformedState
    }

    if (isImmutableList(value)) {
      transformedState[key] = {
        tag: 'isList',
        value: value.toJSON(),
      }

      return transformedState
    }

    if (isPlain(value)) {
      transformedState[key] = {
        tag: 'isPlain',
        value,
      }

      return transformedState
    }

    if (isObject(value)) {
      transformedState[key] = {
        tag: 'isObject',
        value: transformObjects(value),
      }

      return transformedState
    }

    return transformedState
  })

  return transformedState
}

module.exports = state => JSON.stringify(transformState(state))
