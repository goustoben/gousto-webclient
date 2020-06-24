import React from 'react'
import { shallow } from 'enzyme'

import { Carousel } from 'routes/Home/Carousel/Carousel'

import CTA from 'routes/Home/CTA'
import { RecipeCarousel } from 'routes/Home/Carousel/RecipeCarousel'
import { ModuleHeaderContainer } from 'components/ModuleHeader'

describe('Carousel', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Carousel />)
  })

  test('should have Header and CTA elements, but no RecipeCarousel', () => {
    expect(wrapper.find(ModuleHeaderContainer)).toHaveLength(1)
    expect(wrapper.find(RecipeCarousel)).toHaveLength(0)
    expect(wrapper.find(CTA)).toHaveLength(1)
  })

  describe('CTA', () => {
    const redirect = jest.fn()
    const trackGetStarted = jest.fn()

    beforeEach(() => {
      wrapper.setProps({
        redirect,
        trackGetStarted,
        ctaUri: '/carousel'
      })
    })

    test('should dispatch redirect, and trackGetStarted actions with properly', () => {
      wrapper.find(CTA).simulate('click')
      expect(redirect).toHaveBeenCalledWith('/carousel')
      expect(trackGetStarted).toHaveBeenCalledWith('recipecarousel')
    })
  })

  describe('RecipeCarousel', () => {
    beforeEach(() => {
      wrapper.setProps({
        numRecipes: 1
      })
    })

    test('should not render a RecipeCarousel if the numRecipes prop is > 0', () => {
      expect(wrapper.find(RecipeCarousel)).toHaveLength(1)
    })
  })
})
