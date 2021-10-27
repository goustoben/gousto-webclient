import Immutable from 'immutable'

const defineType = (value) => {
  if (value instanceof Immutable.OrderedMap) {
    return 'isOrderedMap'
  }

  if (value instanceof Immutable.Map) {
    return 'isMap'
  }

  if (value instanceof Immutable.List) {
    return 'isList'
  }

  return 'plain'
}

const transformState = (state) => {
  const transformedState = {}
  Object.entries(state).forEach(([key, value]) => {
    transformedState[key] = {
      type: defineType(value),
      value,
    }
  })

  return transformedState
}

module.exports = state => JSON.stringify(transformState(state))
