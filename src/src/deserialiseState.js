import Immutable from 'immutable'

export const deserialise = (state) => {
  const deserialisedState = {}

  Object.entries(state).forEach(([key, sliceValues]) => {
    const { type, value } = sliceValues
    deserialisedState[key] = type === 'plain' ? value : Immutable.fromJS(value)
  })

  return deserialisedState
}
