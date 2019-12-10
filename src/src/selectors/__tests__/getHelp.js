import Immutable from 'immutable'
import { getRecipesForGetHelp } from '../getHelp'

describe('the getRecipesForGetHelp selector', () => {
  let state
  const RECIPES = [
    { id: '1', ingredients: [{ id: '1', label: 'First ingredient' }], title: 'First recipe' },
    { id: '2', ingredients: [{ id: '2', label: 'Second ingredient' }], title: 'Second recipe' },
  ]

  beforeEach(() => {
    state = {
      getHelp: Immutable.fromJS({
        recipes: RECIPES
      })
    }
  })

  test('returns the recipes from the getHelp state as a JS array', () => {
    expect(getRecipesForGetHelp(state)).toEqual(RECIPES)
  })
})
