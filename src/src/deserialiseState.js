import Immutable from 'immutable'
import { defineTag } from 'utils/state'

const decodeObjects = (obj) => {
  const decodedObject = {}
  Object.entries(obj).forEach(([key, value]) => {
    const { tag, value: sliceValue } = value
    if ('value' in value) {
      decodedObject[key] = tag === 'isObject' ? decodeObjects(sliceValue) : getSliceValue(tag, sliceValue)
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
    decodedMapObject[key] = tag === 'isMap' ? new Immutable.Map(decodeMapObjects(sliceValue)) : getSliceValue(tag, sliceValue)
  })

  return decodedMapObject
}

const getSliceValue = (tag, value) => {
  if (tag === 'isPlain') {
    return value
  }

  if (tag === 'isObject') {
    return defineTag(value) === 'isObject' && Object.keys(value).length
      ? decodeObjects(value, getSliceValue)
      : value || undefined
  }

  if (tag === 'isOrderedMap') {
    return new Immutable.OrderedMap(value)
  }

  if (tag === 'isMap') {
    return value.tag === 'isMap'
      ? new Immutable.Map(decodeMapObjects(value.value))
      : getSliceValue(defineTag(value), value)
  }

  if (tag === 'isList') {
    return new Immutable.List(value)
  }

  return Immutable.fromJS(value)
}

export const deserialise = (state) => {
  const deserialisedState = {}

  state.map(({ tag, items }) =>
    Object.entries(items).forEach(([key, value]) => {
      deserialisedState[key] = getSliceValue(tag, value)
    })
  )

  return deserialisedState
}
