import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'
import { PricePerServingMessage } from 'PricePerServingMessage'
import { PromoCode } from '../../PromoCode'
import { Summary } from '../Summary'

const prices = Immutable.Map({
  recipeTotal: '29.99',
  deliveryTotal: '10.99',
  total: '39.99',
})

const basketRecipes = Immutable.Map({ 1234: '4' })

describe('Summary Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Summary prices={prices} basketRecipes={basketRecipes} isLoading />)
  })

  describe('when isLoading is true', () => {
    test('should be rendered correctly', () => {
      expect(wrapper.find({ 'data-testing': 'CheckoutOrderSummary' }).exists()).toBeTruthy()
      expect(wrapper.find('Loading').exists()).toBeTruthy()
    })
  })

  describe('when isLoading is false', () => {
    beforeEach(() => {
      wrapper.setProps({
        isLoading: false,
      })
    })

    test('should be rendered correctly', () => {
      expect(wrapper.find({ 'data-testing': 'CheckoutOrderSummary' }).exists()).toBeTruthy()
      expect(wrapper.find(PricePerServingMessage).exists()).toBeTruthy()
      expect(wrapper.find('Receipt').exists()).toBeTruthy()
      expect(wrapper.find(PromoCode).exists()).toBeTruthy()
      expect(wrapper.find('Loading').exists()).toBeFalsy()
    })
  })

  describe('PromoCode', () => {
    beforeEach(() => {
      wrapper.setProps({
        showPromocode: true,
      })
    })

    test('should render PromoCode component', () => {
      expect(wrapper.find(PromoCode)).toBeDefined()
    })

    describe('given showPromocode flag', () => {
      describe('when showPromocode flag is false', () => {
        beforeEach(() => {
          wrapper.setProps({
            showPromocode: false,
          })
        })

        test('then should not render PromoCode', () => {
          expect(wrapper.find(PromoCode).exists()).toBeFalsy()
        })
      })
    })
  })
})
