import Immutable from 'immutable'

// "4225": {
//   "2": 783,
//   "4": 391,
//   "8": 0
// },
export type MenuRecipeStock = Immutable.Map<string, Immutable.Map<string, number>>
