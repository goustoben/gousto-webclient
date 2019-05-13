import Immutable from 'immutable'
/* eslint-disable */
// should use constants and ImmutableJS
const example = {
  example_categories: (state = Immutable.List([]), action) => {
    switch (action.type) {
      case 'RECEIVE_CATEGORIES':
        return Immutable.List(action.categories)
      default:
        return state
    }
  },
}

export default example
