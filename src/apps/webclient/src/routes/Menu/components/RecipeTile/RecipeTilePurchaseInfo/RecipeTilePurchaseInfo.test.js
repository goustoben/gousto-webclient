import React from 'react'

import { shallow } from 'enzyme'

import * as RecipeContext from 'routes/Menu/context/recipeContext'
import * as BasketHook from 'routes/Menu/domains/basket'
import * as MenuHook from 'routes/Menu/domains/menu'

import { useDeviceType } from '../../../../../hooks/useDeviceType'
import { AddRecipeButton } from '../AddRecipeButton'
import * as RecipeTilePurchaseInfoHooks from '../Hooks'
import { SwapAlternativeOptionsMobile, SwapAlternativeOptions } from '../SwapAlternativeOptions'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'

jest.mock('../../../../../hooks/useDeviceType')

const mockedUseDeviceType = useDeviceType

describe('RecipeTilePurchaseInfo', () => {
  let wrapper
  const defaultProps = {
    hasAlternativeOptions: false,
    categoryId: 'some category ID',
    originalId: 'some Original ID',
    fdiStyling: false,
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when the recipe is out of stock', () => {
    beforeEach(() => {
      mockHooks({
        isRecipeOutOfStock: true,
        useGetSurchargeForRecipeId: 0,
      })
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} />)
    })

    test('should return null', () => {
      expect(wrapper.type()).toEqual(null)
    })
  })

  describe('When the recipe has a surcharge', () => {
    beforeEach(() => {
      mockHooks({
        isRecipeOutOfStock: false,
        useGetSurchargeForRecipeId: 0.75,
      })
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} />)
    })
    test('then it should render surcharge info', () => {
      expect(wrapper.find('.surchargeAmountText')).toHaveLength(1)
      expect(wrapper.find('.perServingText')).toHaveLength(1)
    })

    describe('when the surcharge prop is more than two decimal places', () => {
      test('should render the surcharge per portion to the nearest 1p', () => {
        mockHooks({
          isRecipeOutOfStock: false,
          useGetSurchargeForRecipeId: 1.992342,
        })
        wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} />)

        expect(wrapper.find('.surchargeAmountText').text()).toEqual('+£1.99')
      })
      test('should add 2 zeros for a whole number', () => {
        mockHooks({
          isRecipeOutOfStock: false,
          useGetSurchargeForRecipeId: 2,
        })
        wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} />)

        expect(wrapper.find('.surchargeAmountText').text()).toEqual('+£2.00')
      })
    })
    describe('when the surcharge provided is zero', () => {
      test('should render nothing', () => {
        mockHooks({
          isRecipeOutOfStock: false,
          useGetSurchargeForRecipeId: 0,
        })
        wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} />)
        expect(wrapper.find('.surchargeAmountText')).toHaveLength(0)
      })
    })
    describe('when the recipe is out of stock', () => {
      test('should render nothing', () => {
        mockHooks({
          isRecipeOutOfStock: true,
          useGetSurchargeForRecipeId: 2,
        })
        wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} />)
        expect(wrapper.find('.surchargeInfo')).toHaveLength(0)
      })
    })
  })

  describe('when recipe is in stock', () => {
    beforeEach(() => {
      mockHooks({
        isRecipeOutOfStock: false,
        useGetSurchargeForRecipeId: 0,
      })
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} />)
    })

    test('should render AddRecipeButton', () => {
      expect(wrapper.find(AddRecipeButton)).toHaveLength(1)
    })
  })

  describe('when isFineDineIn is true and fdiStyling is false', () => {
    beforeEach(() => {
      mockHooks({
        useGetSurchargeForRecipeId: 0.75,
        isRecipeOutOfStock: false,
        useRecipeIsFineDineIn: true,
      })
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} />)
    })

    test('should have class of surchargeInfo', () => {
      expect(wrapper.find('.surchargeInfo').length).toEqual(1)
    })
  })

  describe('when isFineDineIn is false and fdiStyling is true', () => {
    beforeEach(() => {
      mockHooks({
        useGetSurchargeForRecipeId: 0.75,
        isRecipeOutOfStock: false,
        useRecipeIsFineDineIn: false,
      })
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} fdiStyling />)
    })

    test('should have class of surchargeInfo', () => {
      expect(wrapper.find('.surchargeInfo').length).toEqual(1)
    })
  })

  describe('when isFineDineIn and fdiStyling are false', () => {
    beforeEach(() => {
      mockHooks({
        useGetSurchargeForRecipeId: 0.75,
        isRecipeOutOfStock: false,
        useRecipeIsFineDineIn: false,
      })
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} />)
    })

    test('should have class of surchargeInfo', () => {
      expect(wrapper.find('.surchargeInfo').length).toEqual(1)
    })
  })

  describe('when isFineDineIn and fdiStyling are true', () => {
    beforeEach(() => {
      mockHooks({
        useGetSurchargeForRecipeId: 0.75,
        isRecipeOutOfStock: false,
        useRecipeIsFineDineIn: true,
      })
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} fdiStyling />)
    })

    test('should have class of surchargeInfoIsFineDineIn', () => {
      expect(wrapper.find('.surchargeInfo').length).toEqual(1)
    })
  })

  describe('when there is no Alternative options for a recipe', () => {
    beforeEach(() => {
      mockHooks({
        useGetSurchargeForRecipeId: 0,
        isRecipeOutOfStock: false,
        useRecipeIsFineDineIn: false,
      })
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} hasAlternativeOptions={false} />)
    })

    test('should not render buttons for swapping alternative options', () => {
      expect(wrapper.find(SwapAlternativeOptions)).toHaveLength(0)
      expect(wrapper.find(SwapAlternativeOptionsMobile)).toHaveLength(0)
    })
  })

  describe('when there are Alternative options for recipe', () => {
    describe('when it is mobile device', () => {
      beforeEach(() => {
        const props = {
          ...defaultProps,
          hasAlternativeOptions: true,
        }
        mockedUseDeviceType.mockReturnValue('mobile')

        mockHooks({
          useGetSurchargeForRecipeId: 0,
          isRecipeOutOfStock: false,
          useRecipeIsFineDineIn: false,
          alternativeOptionsForRecipe: ['content does not really matter for the test', 'foo'],
        })

        wrapper = shallow(<RecipeTilePurchaseInfo {...props} />)
      })

      test('should render mobile component for swapping alternative options', () => {
        expect(wrapper.find(SwapAlternativeOptions)).toHaveLength(0)
        expect(wrapper.find(SwapAlternativeOptionsMobile)).toHaveLength(1)
      })

      test('should pass the necessary props down to the swapping alternative options component', () => {
        expect(wrapper.find(SwapAlternativeOptionsMobile).prop('recipeId')).toEqual('123')
        expect(wrapper.find(SwapAlternativeOptionsMobile).prop('originalId')).toEqual(
          defaultProps.originalId,
        )
        expect(wrapper.find(SwapAlternativeOptionsMobile).prop('categoryId')).toEqual(
          defaultProps.categoryId,
        )
      })
    })

    describe('when it is not mobile browser', () => {
      beforeEach(() => {
        const props = {
          ...defaultProps,
          hasAlternativeOptions: true,
        }
        mockedUseDeviceType.mockReturnValue('desktop')
        mockHooks({
          useGetSurchargeForRecipeId: 0,
          isRecipeOutOfStock: false,
          useRecipeIsFineDineIn: false,
          alternativeOptionsForRecipe: ['content does not really matter for the test', 'foo'],
        })
        wrapper = shallow(<RecipeTilePurchaseInfo {...props} />)
      })

      test('should render Desktop specific component for swapping alternative options', () => {
        expect(wrapper.find(SwapAlternativeOptions)).toHaveLength(1)
        expect(wrapper.find(SwapAlternativeOptionsMobile)).toHaveLength(0)
      })

      test('should pass the necessary props down to the swapping alternative options component', () => {
        expect(wrapper.find(SwapAlternativeOptions).prop('recipeId')).toEqual('123')
        expect(wrapper.find(SwapAlternativeOptions).prop('originalId')).toEqual(
          defaultProps.originalId,
        )
        expect(wrapper.find(SwapAlternativeOptions).prop('categoryId')).toEqual(
          defaultProps.categoryId,
        )
      })
    })
  })
})

const mockHooks = ({
  isRecipeOutOfStock,
  useGetSurchargeForRecipeId,
  useRecipeIsFineDineIn,
  alternativeOptionsForRecipe = [],
  useRecipeField = '123',
}) => {
  if (isRecipeOutOfStock !== undefined) {
    jest.spyOn(BasketHook, 'useStock').mockImplementation(() => ({
      isRecipeOutOfStock: () => isRecipeOutOfStock,
    }))
  }

  if (useGetSurchargeForRecipeId !== undefined) {
    jest
      .spyOn(RecipeTilePurchaseInfoHooks, 'useGetSurchargeForRecipeId')
      .mockImplementation(() => useGetSurchargeForRecipeId)
  }

  if (useRecipeIsFineDineIn !== undefined) {
    jest
      .spyOn(RecipeContext, 'useRecipeIsFineDineIn')
      .mockImplementation(() => useRecipeIsFineDineIn)
  }

  if (alternativeOptionsForRecipe !== undefined) {
    jest
      .spyOn(MenuHook, 'useGetAlternativeOptionsForRecipeLight')
      .mockImplementation(() => () => alternativeOptionsForRecipe)
  }

  if (useRecipeField !== undefined) {
    jest.spyOn(RecipeContext, 'useRecipeField').mockImplementation(() => useRecipeField)
  }
}
