import React from 'react'

import { shallow } from 'enzyme'

import * as BasketHook from 'routes/Menu/domains/basket'

import * as RecipeContext from '../../context/recipeContext'
import { Title, BrandTag } from '../Recipe'
import { RecipeTag } from '../RecipeTag'
import { RecipeTile } from './RecipeTile'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'
import { TileImage } from './TileImage'

const dispatchMock = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockImplementation(() => dispatchMock),
  useSelector: jest.fn(),
}))

jest.mock('../../domains/collections', () => ({
  ...jest.requireActual('../../domains/collections'),
  useCurrentCollectionId: jest.fn().mockImplementation(() => 'foo'),
}))

// jest.mock('routes/Menu/domains/menu/internal/useAlternativeOptions', () => ({
//   useAlternativeOptions: () => ({
//     getAlternativeOptionsForRecipe: () => [],
//   }),
// }))

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest.fn().mockImplementation(() => true),
}))

// skipped due to useMenu/recipe-tile changes
describe.skip('RecipeTile', () => {
  const onClick = jest.fn()
  jest.spyOn(RecipeContext, 'useRecipeBrandAvailabilityTag').mockImplementation(() => true)
  jest.spyOn(RecipeContext, 'useRecipeIsFineDineIn').mockImplementation(() => false)
  jest.spyOn(BasketHook, 'useStock').mockImplementation(() => ({ isRecipeOutOfStock: jest.fn() }))

  let wrapper
  let defaultProps
  const recipeId = '1234'

  beforeEach(() => {
    defaultProps = {
      recipeId,
      originalId: 'original ID',
      fdiStyling: true,
      onClick,
    }
  })

  global.innerWidth = 1200

  beforeEach(() => {
    wrapper = shallow(<RecipeTile {...defaultProps} />)
  })

  test('should contain a Title', () => {
    expect(wrapper.find(Title)).toHaveLength(1)
  })

  describe('when a recipe is in stock', () => {
    test('should return a <div>', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should contain one TileImage component', () => {
      expect(wrapper.find(TileImage)).toHaveLength(1)
    })

    test('should contain one RecipeTag component', () => {
      expect(wrapper.find(RecipeTag)).toHaveLength(1)
    })

    test('should contain one BrandTag component', () => {
      expect(wrapper.find(BrandTag)).toHaveLength(1)
    })
    test('should contain an RecipeTilePurchaseInfo ', () => {
      expect(wrapper.find(RecipeTilePurchaseInfo)).toHaveLength(1)
    })
  })

  describe('when a recipe is not in stock', () => {
    beforeEach(() => {
      wrapper = shallow(<RecipeTile {...defaultProps} isOutOfStock />)
    })

    test('should contain one TileImage component', () => {
      expect(wrapper.find(TileImage)).toHaveLength(1)
    })
  })

  describe('when click on recipe Tile', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    test('should call onClick function which will showDetailRecipe', () => {
      wrapper.simulate('click', {
        stopPropagation: () => {},
      })

      expect(onClick).toHaveBeenCalled()
    })
  })

  describe('when isFineDineIn is true', () => {
    beforeEach(() => {
      jest.spyOn(RecipeContext, 'useRecipeIsFineDineIn').mockImplementation(() => true)
      wrapper = shallow(<RecipeTile {...defaultProps} />)
    })

    test('should have class of recipeTileIsFineDineIn', () => {
      expect(wrapper.find('.recipeTileIsFineDineIn')).toHaveLength(1)
    })
  })

  describe('when isFineDineIn is false', () => {
    beforeEach(() => {
      jest.spyOn(RecipeContext, 'useRecipeIsFineDineIn').mockImplementation(() => false)
      wrapper = shallow(<RecipeTile {...defaultProps} />)
    })

    test('should have class of recipeTileIsFineDineIn', () => {
      expect(wrapper.find('.recipeTileIsFineDineIn')).toHaveLength(0)
    })
  })
})
