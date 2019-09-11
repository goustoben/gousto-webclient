import React from 'react'
import { shallow } from 'enzyme'
import { RecipesCountButton } from '../RecipesCountButton'

describe('RecipesCountButton', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<RecipesCountButton basketRecipes={1} shortlistRecipes={0} />)
  })

  test('should render boxRecipes line', () => {
    expect(wrapper.find('.boxRecipes').exists()).toBe(true)
  })

  test('should render shortlistRecipes line', () => {
    expect(wrapper.find('.shortlistRecipes').exists()).toBe(true)
  })

  test('should render number of basketRecipes', () => {
    expect(wrapper.find('.boxRecipes .recipeNumber').text()).toEqual('1')
  })

  test('should render number of shortlistRecipes', () => {
    expect(wrapper.find('.shortlistRecipes .recipeNumber').text()).toEqual('0')
  })

  test('should render number of shortlistRecipes after update', () => {
    wrapper.setProps({ shortlistRecipes: 3 })
    expect(wrapper.find('.shortlistRecipes .recipeNumber').text()).toEqual('3')
  })

  describe('when animation ends', () => {
    test('should update state for shortlistRecipesChange to false', () => {
      wrapper.setProps({ shortlistRecipes: 3 })

      expect(wrapper.state()).toEqual({
        boxRecipesChange: false,
        shortlistRecipesChange: true,
      })

      wrapper.find('.shortlistRecipes').simulate('animationEnd')

      expect(wrapper.state()).toEqual({
        boxRecipesChange: false,
        shortlistRecipesChange: false,
      })
    })
  })

  test('should render box icon when number of recipes in box is 0 ', () => {
    wrapper.setProps({ basketRecipes: 0 })

    expect(wrapper.find('.box').exists()).toBe(true)
  })

  test('should render withRecipesBox icon when number of recipes in box is more than 0 ', () => {
    wrapper.setProps({ basketRecipes: 1 })

    expect(wrapper.find('.withRecipesBox').exists()).toBe(true)
  })

  test('should render shortlist icon when number of recipes in shortlist is 0 ', () => {
    wrapper.setProps({ shortlistRecipes: 0 })

    expect(wrapper.find('.shortlist').exists()).toBe(true)
  })

  test('should render withRecipesShortlist icon when number of recipes in shortlist is more than 0 ', () => {
    wrapper.setProps({ shortlistRecipes: 1 })

    expect(wrapper.find('.withRecipesShortlist').exists()).toBe(true)
  })
})
