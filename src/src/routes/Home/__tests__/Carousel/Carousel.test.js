import React from 'react'
import { shallow } from 'enzyme'

import { Carousel } from 'routes/Home/Carousel/Carousel'

import { CTAHomepageContainer } from 'routes/Home/CTA'
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
    expect(wrapper.find(CTAHomepageContainer)).toHaveLength(1)
  })

  describe('CTA', () => {
    const ctaUri = '/carousel'

    beforeEach(() => {
      wrapper.setProps({
        ctaUri
      })
    })

    test('should pass ctaUri and the section correctly', () => {
      const cta = wrapper.find(CTAHomepageContainer)
      expect(cta.prop('sectionForTracking')).toBe('recipecarousel')
      expect(cta.prop('ctaUri')).toBe(ctaUri)
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
