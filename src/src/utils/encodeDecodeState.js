import Immutable from 'immutable'

const isArray = (value) => Array.isArray(value)
const isObject = (value) => !isArray(value) && typeof value === 'object' && value !== null
const isPlain = (value) => typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null || value === undefined
const isImmutableMap = (value) => value instanceof Immutable.Map
const isImmutableList = (value) => value instanceof Immutable.List
const isImmutableOrderedMap = (value) => value instanceof Immutable.OrderedMap

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

  if (isArray(value)) {
    return 'isArray'
  }

  if (isPlain(value)) {
    return 'isPlain'
  }

  return 'isObject'
}

const serialiseObject = (obj) => {
  const transformedObjects = {}
  Object.entries(obj).forEach(([key, value]) => {
    transformedObjects[key] = {
      tag: defineTag(value),
      value: isObject(value) ? serialiseObject(value) : value,
    }
  })

  return transformedObjects
}

const deserialiseObject = (obj) => {
  const decodedObject = {}
  Object.entries(obj).forEach(([key, value]) => {
    const { tag, value: sliceValue } = value
    if (value.value !== undefined) {
      decodedObject[key] = tag === 'isObject'
        ? deserialiseObject(sliceValue)
        // eslint-disable-next-line no-use-before-define
        : getDecodedValue(tag, sliceValue, key)
    } else {
      decodedObject[key] = undefined
    }
  })

  return decodedObject
}

const serialiseMapObj = (mapObj) => {
  const transformedMap = {}
  mapObj.mapEntries(([mapKey, mapValue]) => {
    transformedMap[mapKey] = {
      tag: defineTag(mapValue),
      value: isImmutableMap(mapValue) ? serialiseMapObj(mapValue) : mapValue,
    }
  })

  return transformedMap
}

const deserialiseMapObject = (mapObj) => {
  const decodedMapObject = {}
  Object.entries(mapObj).forEach(([key, value]) => {
    const { tag, value: sliceValue } = value
    decodedMapObject[key] = tag === 'isMap'
      ? new Immutable.Map(deserialiseMapObject(sliceValue))
      // eslint-disable-next-line no-use-before-define
      : getDecodedValue(tag, sliceValue)
  })

  return decodedMapObject
}

const getDecodedValue = (tag, value) => {
  if (tag === 'isOrderedMap') {
    return new Immutable.OrderedMap(value)
  }

  if (tag === 'isMap') {
    return new Immutable.Map(deserialiseMapObject(value))
  }

  if (tag === 'isList') {
    return new Immutable.List(value)
  }

  if (tag === 'isPlain') {
    return value
  }

  if (tag === 'isArray') {
    return value
  }

  if (tag === 'isObject') {
    return deserialiseObject(value)
  }

  return Immutable.fromJS(value)
}

export const encodeState = (state) => {
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
        value: serialiseMapObj(value),
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

    if (isArray(value)) {
      transformedState[key] = {
        tag: 'isArray',
        value,
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
        value: serialiseObject(value),
      }

      return transformedState
    }

    return transformedState
  })

  return JSON.stringify(transformedState)
}

export const decodeState = (state) => {
  const decodedState = {}

  Object.entries(state).forEach(([key, value]) => {
    decodedState[key] = getDecodedValue(value.tag, value.value)
  })

  return decodedState
}
