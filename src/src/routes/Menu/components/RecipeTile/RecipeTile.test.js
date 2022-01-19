import React from 'react'
import { shallow } from 'enzyme'

import * as MenuHooks from 'routes/Menu/domains/menu'
import { RecipeTile } from './RecipeTile'
import { TileImage } from './TileImage'
import { RecipeTag } from '../RecipeTag'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'
import { Title, BrandTag } from '../Recipe'
import * as MenuRecipeDetails from '../../actions/menuRecipeDetails'
import * as RecipeContext from '../../context/recipeContext'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockImplementation(() => jest.fn()),
  useSelector: jest.fn(),
}))

jest.mock('../../domains/collections', () => ({
  ...jest.requireActual('../../domains/collections'),
  useCurrentCollectionId: jest.fn().mockImplementation(() => 'foo' )
}))

jest.mock('routes/Menu/domains/menu/internal/useAlternativeOptions', () => ({
  useAlternativeOptions: () => ({
    getAlternativeOptionsForRecipe: () => ([]),
  }),
}))

describe('RecipeTile', () => {
  const mockShowDetailRecipe = jest.fn()
  jest.spyOn(MenuRecipeDetails, 'showDetailRecipe').mockImplementation(mockShowDetailRecipe)
  jest.spyOn(RecipeContext, 'useRecipeBrandAvailabilityTag').mockImplementation(() => true)
  jest.spyOn(RecipeContext, 'useRecipeIsFineDineIn').mockImplementation(() => false)
  jest.spyOn(MenuHooks, 'useStock').mockImplementation(() => ({isRecipeOutOfStock: jest.fn()}))

  let wrapper
  let defaultProps
  const recipeId = '1234'

  beforeEach(() => {
    defaultProps = {
      recipeId,
      originalId: 'original ID',
      fdiStyling: true,
    }
  })

  global.innerWidth = 1200

  beforeEach(() => {
    wrapper = shallow(<RecipeTile
      {...defaultProps}
    />)
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
      wrapper = shallow(<RecipeTile
        {...defaultProps}
        isOutOfStock
      />)
    })

    test('should contain one TileImage component', () => {
      expect(wrapper.find(TileImage)).toHaveLength(1)
    })
  })

  describe('when click on recipe Tile', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    test('should call showDetailRecipe function', () => {
      wrapper.simulate('click', {
        stopPropagation: () => { }
      })

      expect(mockShowDetailRecipe).toHaveBeenCalled()
    })
  })

  describe('when isFineDineIn is true', () => {
    beforeEach(() => {
      jest.spyOn(RecipeContext, 'useRecipeIsFineDineIn').mockImplementation(() => true)
      wrapper = shallow(<RecipeTile
        {...defaultProps}
      />)
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
