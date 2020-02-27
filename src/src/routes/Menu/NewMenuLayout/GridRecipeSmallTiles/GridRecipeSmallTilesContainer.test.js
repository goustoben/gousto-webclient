import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { GridRecipeSmallTilesContainer } from './GridRecipeSmallTilesContainer'

describe('GridRecipeSmallTilesContainer', () => {
  describe('when render', () => {
    let wrapper
    const recipe = Immutable.fromJS({
      id: '123',
      rating: {
        avarage: 4.5,
        count: 300
      },
      cookingTime: 20,
      shelfLifeDays: '2-3',
      dietType: 'meat'
    })
    beforeEach(() => {
      wrapper = shallow(<GridRecipeSmallTilesContainer recipe={recipe} position={1} highlight={() => {}} unhighlight={() => {}} />, {
        context: {
          store: {
            getState: () => ({
              basket: Immutable.fromJS({
                recipes: {
                  123: 1
                },
                numPortions: 2
              }),
              menuRecipeStock: Immutable.fromJS({
                123: {
                  2: 1000,
                  4: 1000
                }
              })
            }),
            dispatch: () => {},
            subscribe: () => {}
          }
        }
      })
    })

    test('should render GridRecipeSmallTiles', () => {
      expect(wrapper.find('GridRecipeSmallTiles')).toHaveLength(1)
    })
  })
})
