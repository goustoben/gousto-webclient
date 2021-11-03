import Immutable from 'immutable'

const decodeObjects = (obj) => {
  const decodedObject = {}
  Object.entries(obj).forEach(([key, value]) => {
    const { tag, value: sliceValue } = value
    if (value.value !== undefined) {
      decodedObject[key] = tag === 'isObject'
        ? decodeObjects(sliceValue)
        // eslint-disable-next-line no-use-before-define
        : getSliceValue(tag, sliceValue, key)
    } else {
      decodedObject[key] = undefined
    }
  })

  return decodedObject
}

const decodeMapObjects = (mapObj) => {
  const decodedMapObject = {}
  Object.entries(mapObj).forEach(([key, value]) => {
    const { tag, value: sliceValue } = value
    decodedMapObject[key] = tag === 'isMap'
      ? new Immutable.Map(decodeMapObjects(sliceValue))
      // eslint-disable-next-line no-use-before-define
      : getSliceValue(tag, sliceValue)
  })

  return decodedMapObject
}

const getSliceValue = (tag, value) => {
  if (tag === 'isOrderedMap') {
    return new Immutable.OrderedMap(value)
  }

  if (tag === 'isMap') {
    return new Immutable.Map(decodeMapObjects(value))
  }

  if (tag === 'isList') {
    return new Immutable.List(value)
  }

  if (tag === 'isPlain') {
    return value
  }

  if (tag === 'isObject') {
    return decodeObjects(value)
  }

  return Immutable.fromJS(value)
}

export const deserialise = (state) => {
  const deserialisedState = {}

  Object.entries(state).forEach(([key, value]) => {
    deserialisedState[key] = getSliceValue(value.tag, value.value)
  })

  return deserialisedState
}
