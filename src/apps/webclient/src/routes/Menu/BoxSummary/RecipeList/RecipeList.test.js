import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { RecipeList } from './RecipeList'
import { useBasketRequiredFeatureEnabled } from '../../hooks/useBasketRequiredFeatureEnabled'
import { RecipeHolder } from '../RecipeHolder'
import { FiveRecipesRecipeList } from '../../../../components/FiveRecipesPaintedDoorTest/FiveRecipesRecipeList'
import * as FiveRecipes from '../../../../components/FiveRecipesPaintedDoorTest/use5RecipesPaintedDoorTest'

const defaultFiveRecipesValue = {
  isEnabled: false,
  hasSeenOnMenu: false,
  hasSeenOnOrderConfirmation: false,
  setMenuAsSeen: () => {},
  setOrderConfirmationAsSeen: () => {},
  maxRecipes: 4,
}

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))
jest.mock('../../hooks/useBasketRequiredFeatureEnabled')
jest.mock('../../../../components/FiveRecipesPaintedDoorTest/use5RecipesPaintedDoorTest', () =>
  ({
    use5RecipesPaintedDoorTest: jest.fn(() => defaultFiveRecipesValue),
  })
)

describe('<RecipeList />', () => {
  let wrapper
  const defaultProps = {
    view: 'desktop',
    recipes: Immutable.fromJS({
      4: 1,
      2726: 2,
    }),
    maxRecipesNum: 4,
    menuRecipesStore: Immutable.Map({}),
    invisible: false,
    detailVisibilityChange: () => {},
    boxDetailsVisibilityChange: () => {},
    boxSummaryVisible: false,
    browser: 'desktop',
  }

  beforeEach(() => {
    useSelector.mockReturnValue(true)
    useDispatch.mockReturnValue(() => {})
    useBasketRequiredFeatureEnabled.mockReturnValue(false)
  })

  describe('RecipeList renders with 3 recipes already selected', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })
    beforeEach(() => {
      FiveRecipes.use5RecipesPaintedDoorTest.mockReturnValue(defaultFiveRecipesValue)
      wrapper = shallow(<RecipeList {...defaultProps} />)
    })

    test('should return 3 filled recipe slots', () => {
      const filledSlots = wrapper.findWhere(n => n.name() === 'RecipeHolder' && !n.prop('data-testing'))
      expect(filledSlots).toHaveLength(3)
    })

    test('should return 1 non-filled recipe slots', () => {
      const emptyHolder = wrapper.findWhere(n => n.name() === 'RecipeHolder' && n.prop('data-testing') === 'empty')
      expect(emptyHolder).toHaveLength(1)
    })

    describe('use5RecipesPaintedDoorTest is enabled', () => {
      beforeEach(() => {
        FiveRecipes.use5RecipesPaintedDoorTest.mockReturnValue({
          ...defaultFiveRecipesValue,
          isEnabled: true,
          maxRecipes: 5,
        })
        wrapper = shallow(<RecipeList {...defaultProps} />)
      })

      test('should only have 3 RecipeHolder', () => {
        const emptyHolder = wrapper.find(RecipeHolder)
        expect(emptyHolder).toHaveLength(3)
      })

      test('should hae 1 FiveRecipesRecipeList holding the empty elements', () => {
        expect(wrapper.find(FiveRecipesRecipeList)).toHaveLength(1)
      })
    })
  })
})
