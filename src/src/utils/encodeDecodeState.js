import Immutable from 'immutable'

const isImmutableList = (value) => value instanceof Immutable.List
const isImmutableOrderedMap = (value) => value instanceof Immutable.OrderedMap
const isImmutableMap = (value) => value instanceof Immutable.Map
const isArray = (value) => Array.isArray(value)
const isObject = (value) => !isArray(value) && typeof value === 'object' && value !== null

export const defineTag = (value) => {
  if (isImmutableList(value)) {
    return 'isImmutableList'
  }

  if (isImmutableOrderedMap(value)) {
    return 'isImmutableOrderedMap'
  }

  if (isImmutableMap(value)) {
    return 'isImmutableMap'
  }

  if (isArray(value)) {
    return 'isArray'
  }

  if (isObject(value)) {
    return 'isObject'
  }

  return 'isPlain'
}

// encoding

// forward declaration because of the mutual recursion
let convertValueToTaggedValue

const encodeImmutableList = (listObj) => listObj.map((value) => convertValueToTaggedValue(value))

const encodeImmutableMap = (mapObj) => {
  const result = {}
  mapObj.entrySeq().forEach(([key, value]) => {
    result[key] = convertValueToTaggedValue(value)
  })

  return result
}

const encodeArray = (arrayObj) => arrayObj.map((value) => convertValueToTaggedValue(value))

const encodeObject = (obj) => {
  const result = {}
  Object.entries(obj).forEach(([key, value]) => {
    result[key] = convertValueToTaggedValue(value)
  })

  return result
}

const encodeValueBasedOnTag = (value, tag) => {
  switch (tag) {
  case 'isImmutableList':
    return encodeImmutableList(value)
  // Immutable.Map and Immutable.OrderedMap have the same encodedValue - only
  // tag differs.
  case 'isImmutableOrderedMap':
  case 'isImmutableMap':
    return encodeImmutableMap(value)
  case 'isArray':
    return encodeArray(value)
  case 'isObject':
    return encodeObject(value)
  default: {
    return value
  }
  }
}

convertValueToTaggedValue = (value) => {
  const tag = defineTag(value)
  const encodedValue = encodeValueBasedOnTag(value, tag)

  return {
    tag,
    value: encodedValue,
  }
}

// Return the string representation of the object which, when passed to
// decodeState(), will evaluate to the original state.  Note the asymmetry:
// encodeState returns a string, while decodeState() takes an object.
export const encodeState = (state) => {
  const encoded = encodeObject(state)

  return JSON.stringify(encoded)
}

// decoding

let convertTaggedValueToValue

const decodeArray = (arrayObj) => arrayObj.map((taggedValue) => convertTaggedValueToValue(taggedValue))

const decodeObject = (obj) => {
  const result = {}
  Object.entries(obj).forEach(([key, taggedValue]) => {
    result[key] = convertTaggedValueToValue(taggedValue)
  })

  return result
}

convertTaggedValueToValue = (taggedValue) => {
  const { tag, value: encodedValue } = taggedValue

  if (tag === 'isImmutableList') {
    return new Immutable.List(decodeArray(encodedValue))
  }

  if (tag === 'isImmutableOrderedMap') {
    return new Immutable.OrderedMap(decodeObject(encodedValue))
  }

  if (tag === 'isImmutableMap') {
    return new Immutable.Map(decodeObject(encodedValue))
  }

  if (tag === 'isArray') {
    return decodeArray(encodedValue)
  }

  if (tag === 'isObject') {
    return decodeObject(encodedValue)
  }

  return encodedValue
}

export const decodeState = (state) => decodeObject(state)
