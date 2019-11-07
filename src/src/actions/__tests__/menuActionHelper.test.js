import Immutable from 'immutable'
import { getStockAvailability } from 'actions/menuActionHelper'

describe('getStockAvailability', () => {
  test('should set availablilty by mapping new ids to old ids', async () => {
    const recipeStock = {
      '123': {
        committed: '1',
        recipeId: 123,
        number: '5',
        familyNumber: '4'
      }
    }
    const getState = () => {
      return {
        recipes: Immutable.Map({
          '07cc774f-c233-4212-9478-bc9c7912f793': {
            id: '07cc774f-c233-4212-9478-bc9c7912f793',
            coreRecipeId: '123'
          }
        })
      }
    }

    const result = getStockAvailability(getState, recipeStock)

    expect(result).toEqual({
      "07cc774f-c233-4212-9478-bc9c7912f793": {
        "2": 5,
        "4": 4,
        "committed": true,
      },
    })
  })
})
