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
  // console.log(obj)
  Object.entries(obj).forEach(([key, objValue]) => {
    const { tag, value } = objValue
    // console.log('----tag', key, objValue)
    if (value !== undefined) {
      decodedObject[key] = tag === 'isObject' && Object.keys(value).length > 0
        ? deserialiseObject(value)
        // eslint-disable-next-line no-use-before-define
        : getDecodedValue(tag, value)
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
      value: isImmutableMap(mapValue)
        ? serialiseMapObj(mapValue)
        // eslint-disable-next-line no-use-before-define
        : getEncodedValue(mapKey, mapValue),
    }
  })

  return transformedMap
}

const deserialiseMapObject = (mapObj) => {
  const decodedMapObject = {}
  Object.entries(mapObj).forEach(([key, value]) => {
    const { tag, value: sliceValue } = value
    // eslint-disable-next-line no-use-before-define
    decodedMapObject[key] = getDecodedValue(tag, sliceValue)
    // decodedMapObject[key] = tag === 'isMap'
    //   ? new Immutable.Map(deserialiseMapObject(sliceValue))
    //   // eslint-disable-next-line no-use-before-define
    //   : getDecodedValue(tag, sliceValue)
  })

  return decodedMapObject
}

const serialiseOrderedMapObj = (orderedMapObj) => {
  const transformedOrderedMap = {}
  orderedMapObj.mapEntries(([mapKey, mapValue]) => {
    transformedOrderedMap[mapKey] = {
      tag: defineTag(mapValue),
      value: isImmutableOrderedMap(mapValue)
        ? serialiseOrderedMapObj(mapValue)
        // eslint-disable-next-line no-use-before-define
        : getEncodedValue(mapKey, mapValue),
    }
  })

  return transformedOrderedMap
}

const deserialiseOrderedMapObject = (orderedMapObj) => {
  const decodedMapObject = {}
  Object.entries(orderedMapObj).forEach(([key, value]) => {
    const { tag, value: sliceValue } = value
    // eslint-disable-next-line no-use-before-define
    decodedMapObject[key] = getDecodedValue(tag, sliceValue)
    // decodedMapObject[key] = tag === 'isOrderedMap'
    //   ? new Immutable.OrderedMap(deserialiseOrderedMapObject(sliceValue))
    // eslint-disable-next-line no-use-before-define
    // : getDecodedValue(tag, sliceValue)
  })

  return decodedMapObject
}

const getEncodedValue = (key, value) => {
  if (isImmutableOrderedMap(value)) {
    return {
      tag: 'isOrderedMap',
      value: serialiseOrderedMapObj(value),
    }
  }

  if (isImmutableMap(value)) {
    return {
      tag: 'isMap',
      value: serialiseMapObj(value),
    }
  }

  if (isImmutableList(value)) {
    return {
      tag: 'isList',
      value,
    }
  }

  if (isArray(value)) {
    return {
      tag: 'isArray',
      value,
    }
  }

  if (isPlain(value)) {
    return {
      tag: 'isPlain',
      value,
    }
  }

  if (isObject(value)) {
    return {
      tag: 'isObject',
      value: serialiseObject(value),
    }
  }

  return value
}

const getDecodedValue = (tag, value) => {
  if (tag === 'isOrderedMap') {
    return new Immutable.OrderedMap(deserialiseOrderedMapObject(value))
  }

  if (tag === 'isMap') {
    return new Immutable.Map(deserialiseMapObject(value))
  }

  if (tag === 'isList') {
    return new Immutable.List(value)
  }

  if (tag === 'isPlain' || tag === 'isArray') {
    return value
  }

  if (tag === 'isObject') {
    return deserialiseObject(value)
  }

  return Immutable.fromJS(value)
}

export const encodeState = (state) => {
  const encodededState = {}

  Object.entries(state).forEach(([key, value]) => {
    encodededState[key] = getEncodedValue(key, value)
  })

  return JSON.stringify(encodededState)
}

export const decodeState = (state) => {
  const decodedState = {}

  Object.entries(state).forEach(([key, value]) => {
    decodedState[key] = getDecodedValue(value.tag, value.value)
  })

  return decodedState
}
