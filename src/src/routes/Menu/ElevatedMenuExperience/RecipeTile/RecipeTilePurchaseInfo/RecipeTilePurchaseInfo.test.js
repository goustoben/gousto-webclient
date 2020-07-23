import React from 'react'
import { shallow } from 'enzyme'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'
import { AddRecipeButtonContainer } from '../AddRecipeButton'

describe('RecipeTilePurchaseInfo', () => {
  let wrapper
  const defaultProps = {
    surcharge: 0,
    isOutOfStock: false,
    recipeId: '123'
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
    test('should render AddRecipeButtonContainer', () => {
      expect(wrapper.find(AddRecipeButtonContainer)).toHaveLength(1)
    })
  })
})
