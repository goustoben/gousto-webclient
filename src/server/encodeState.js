import { defineTag, checkSliceTag } from 'utils/state'
const {
  isPlain,
  isArray,
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
  let transformedState = []
  const plainObjects = { tag: 'isPlain', items: {} }
  const orderedMapObjects = { tag: 'isOrderedMap', items: {} }
  const mapObjects = { tag: 'isMap', items: {} }
  const listObjects = { tag: 'isList', items: {} }
  const arrays = { tag: 'isArray', items: {} }
  const objects = { tag: 'isObject', items: {} }
  Object.entries(state).forEach(([key, value]) => {
    if (isImmutableOrderedMap(value)) {
      orderedMapObjects.items[key] = value

      return orderedMapObjects
    }

    if (isImmutableMap(value)) {
      mapObjects.items[key] = {
        tag: defineTag(value),
        value: transformMapObj(value),
      }

      return mapObjects
    }

    if (isImmutableList(value)) {
      listObjects.items[key] = value.toJSON()

      return listObjects
    }

    if (isArray(value)) {
      arrays.items[key] = value

      return arrays
    }

    if (isPlain(value)) {
      plainObjects.items[key] = value

      return plainObjects
    }

    objects.items[key] = transformObjects(value)

    return objects
  })

  transformedState = [
    objects,
    plainObjects,
    mapObjects,
    orderedMapObjects,
    arrays,
    listObjects,
  ]

  return transformedState
}

module.exports = state => JSON.stringify(transformState(state))
