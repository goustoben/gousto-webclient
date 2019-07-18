import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'
import Loading from 'Loading'
import Receipt from 'Receipt'
import Link from 'Link'
import Summary from '../Summary'

let wrapper
const prices = Immutable.Map({
  recipeTotal: '29.99',
  deliveryTotal: '10.99',
  total: '39.99',
})

const basketRecipes = Immutable.Map({1234: '4'})

describe('Summary Component', () => {

  beforeEach(() => {
    wrapper = shallow(<Summary prices={prices} basketRecipes={basketRecipes} />)
  })

  test('should render an H3', () => {
    expect(wrapper.find('H3').length).toEqual(1)
  })

  test('should render loading spinner when its loading', () => {
    wrapper = shallow(<Summary prices={prices} basketRecipes={basketRecipes} isLoading />)

    expect(wrapper.find(Loading).length).toEqual(1)
  })

  test('should render a receipt', () => {
    expect(wrapper.find(Receipt).length).toEqual(1)
  })

  describe('links', () => {

    test('should render an edit order link', () => {
      expect(wrapper.find(Link).length).toEqual(1)
    })

    describe('showNoDiscountCTA feature flag is on', () => {

      test('should render a promo discount CTA if the user has no promo code', () => {
        wrapper = shallow(<Summary prices={prices} basketRecipes={basketRecipes} showNoDiscountCTA />)
        expect(wrapper.find('.noDiscountCTA').length).toEqual(1)
      })

      test('should render nothing if the user has a promo code', () => {
        wrapper = shallow(<Summary prices={prices} basketRecipes={basketRecipes} showNoDiscountCTA promoCode='PROMO'/>)
        expect(wrapper.find('.noDiscountCTA').length).toEqual(0)
        expect(wrapper.find(Link).length).toEqual(0)
      })
    })
  })
})
