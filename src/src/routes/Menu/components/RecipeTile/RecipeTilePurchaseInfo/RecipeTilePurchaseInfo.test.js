import React from 'react'
import { shallow } from 'enzyme'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'
import { AddRecipeButton } from '../AddRecipeButton'
import { SwapAlternativeOptions } from '../SwapAlternativeOptions/SwapAlternativeOptions'
import { SwapAlternativeOptionsMobile } from '../SwapAlternativeOptions/SwapAlternativeOptionsMobile'

describe('RecipeTilePurchaseInfo', () => {
  let wrapper
  const defaultProps = {
    surcharge: 0,
    isOutOfStock: false,
    recipeId: '123',
    isFineDineIn: false,
    browserType: 'mobile',
    hasAlternativeOptions: false,
    categoryId: 'some category ID',
    originalId: 'some Original ID',
  }

  describe('when the recipe is out of stock', () => {
    beforeEach(() => {
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} isOutOfStock />)
    })

    test('should return null', () => {
      expect(wrapper.type()).toEqual(null)
    })
  })

  describe('When the recipe has a surcharge', () => {
    beforeEach(() => {
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} surcharge={0.75} />)
    })
    test('then it should render surcharge info', () => {
      expect(wrapper.find('.surchargeAmountText')).toHaveLength(1)
      expect(wrapper.find('.perServingText')).toHaveLength(1)
    })

    describe('when the surcharge prop is more than two decimal places', () => {
      test('should render the surcharge per portion to the nearest 1p', () => {
        wrapper = shallow(<RecipeTilePurchaseInfo
          {...defaultProps}
          surcharge={1.992342}
        />)

        expect(wrapper.find('.surchargeAmountText').text()).toEqual('+£1.99')
      })
      test('should add 2 zeros for a whole number', () => {
        wrapper = shallow(<RecipeTilePurchaseInfo
          {...defaultProps}
          surcharge={2}
        />)

        expect(wrapper.find('.surchargeAmountText').text()).toEqual('+£2.00')
      })
    })
    describe('when the surcharge provided is zero', () => {
      test('should render nothing', () => {
        wrapper = shallow(<RecipeTilePurchaseInfo
          {...defaultProps}
          surcharge={0}
        />)
        expect(wrapper.find('.surchargeAmountText')).toHaveLength(0)
      })
    })
    describe('when the recipe is out of stock', () => {
      test('should render nothing', () => {
        wrapper = shallow(<RecipeTilePurchaseInfo
          {...defaultProps}
          surcharge={2}
          isOutOfStock
        />)
        expect(wrapper.find('.surchargeInfo')).toHaveLength(0)
      })
    })
  })

  describe('when recipe is in stock', () => {
    beforeEach(() => {
      wrapper = shallow(<RecipeTilePurchaseInfo {...defaultProps} />)
    })

    test('should render AddRecipeButton', () => {
      expect(wrapper.find(AddRecipeButton)).toHaveLength(1)
    })
  })

  describe('when isFineDineIn is true and fdiStyling is false', () => {
    beforeEach(() => {
      wrapper = shallow(<RecipeTilePurchaseInfo
        {...defaultProps}
        surcharge={0.75}
        isFineDineIn
      />)
    })

    test('should have class of surchargeInfo', () => {
      expect(wrapper.find('.surchargeInfo').length).toEqual(1)
    })
  })

  describe('when isFineDineIn is false and fdiStyling is true', () => {
    beforeEach(() => {
      wrapper = shallow(<RecipeTilePurchaseInfo
        {...defaultProps}
        surcharge={0.75}
        fdiStyling
      />)
    })

    test('should have class of surchargeInfo', () => {
      expect(wrapper.find('.surchargeInfo').length).toEqual(1)
    })
  })

  describe('when isFineDineIn and fdiStyling are false', () => {
    beforeEach(() => {
      wrapper = shallow(<RecipeTilePurchaseInfo
        {...defaultProps}
        surcharge={0.75}
      />)
    })

    test('should have class of surchargeInfo', () => {
      expect(wrapper.find('.surchargeInfo').length).toEqual(1)
    })
  })

  describe('when isFineDineIn and fdiStyling are true', () => {
    beforeEach(() => {
      wrapper = shallow(<RecipeTilePurchaseInfo
        {...defaultProps}
        surcharge={0.75}
        isFineDineIn
        fdiStyling
      />)
    })

    test('should have class of surchargeInfoIsFineDineIn', () => {
      expect(wrapper.find('.surchargeInfo').length).toEqual(1)
    })
  })

  describe('when there is no Alternative options for a recipe', () => {
    beforeEach(() => {
      wrapper = shallow(<RecipeTilePurchaseInfo
        {...defaultProps}
        hasAlternativeOptions={false}
      />)
    })

    test('should not render buttons for swapping alternative options', () => {
      expect(wrapper.find(SwapAlternativeOptions)).toHaveLength(0)
      expect(wrapper.find(SwapAlternativeOptionsMobile)).toHaveLength(0)
    })
  })

  describe('when there are Alternative options for recipe', () => {
    describe('when it is mobile browser', () => {
      beforeEach(() => {
        const props = {
          ...defaultProps,
          hasAlternativeOptions: true,
          browserType: 'mobile',
        }
        wrapper = shallow(<RecipeTilePurchaseInfo
          {...props}
        />)
      })

      test('should render mobile component for swapping alternative options', () => {
        expect(wrapper.find(SwapAlternativeOptions)).toHaveLength(0)
        expect(wrapper.find(SwapAlternativeOptionsMobile)).toHaveLength(1)
      })

      test('should pass the necessary props down to the swapping alternative options component', () => {
        expect(wrapper.find(SwapAlternativeOptionsMobile).prop('recipeId')).toEqual(defaultProps.recipeId)
        expect(wrapper.find(SwapAlternativeOptionsMobile).prop('originalId')).toEqual(defaultProps.originalId)
        expect(wrapper.find(SwapAlternativeOptionsMobile).prop('categoryId')).toEqual(defaultProps.categoryId)
      })
    })

    describe('when it is not mobile browser', () => {
      beforeEach(() => {
        const props = {
          ...defaultProps,
          hasAlternativeOptions: true,
          browserType: 'desktop',
        }
        wrapper = shallow(<RecipeTilePurchaseInfo
          {...props}
        />)
      })

      test('should render Desktop specific component for swapping alternative options', () => {
        expect(wrapper.find(SwapAlternativeOptions)).toHaveLength(1)
        expect(wrapper.find(SwapAlternativeOptionsMobile)).toHaveLength(0)
      })

      test('should pass the necessary props down to the swapping alternative options component', () => {
        expect(wrapper.find(SwapAlternativeOptions).prop('recipeId')).toEqual(defaultProps.recipeId)
        expect(wrapper.find(SwapAlternativeOptions).prop('originalId')).toEqual(defaultProps.originalId)
        expect(wrapper.find(SwapAlternativeOptions).prop('categoryId')).toEqual(defaultProps.categoryId)
      })
    })
  })
})
