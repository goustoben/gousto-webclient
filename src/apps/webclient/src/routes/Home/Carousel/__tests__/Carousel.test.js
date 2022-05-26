import React from 'react'

import { shallow } from 'enzyme'

import { CTAHomepageContainer } from 'routes/Home/CTA'
import { Carousel } from 'routes/Home/Carousel/Carousel'
import { RecipeCarousel } from 'routes/Home/Carousel/RecipeCarousel'

describe('Carousel', () => {
  let wrapper
  const ctaUri = '/carousel'
  const ctaText = 'button text'

  beforeEach(() => {
    wrapper = shallow(<Carousel ctaUri={ctaUri} ctaText={ctaText} />)
  })

  test('should have ModuleTitle and CTA elements, but no RecipeCarousel', () => {
    expect(wrapper.find('ModuleTitle')).toHaveLength(1)
    expect(wrapper.find(RecipeCarousel)).toHaveLength(0)
    expect(wrapper.find(CTAHomepageContainer)).toHaveLength(1)
  })

  describe('CTA', () => {
    beforeEach(() => {
      wrapper.setProps({
        ctaUri,
      })
    })

    test('should pass ctaUri and the section correctly', () => {
      const cta = wrapper.find(CTAHomepageContainer)
      expect(cta.prop('sectionForTracking')).toBe('recipeCarousel')
      expect(cta.prop('ctaUri')).toBe(ctaUri)
    })
  })

  describe('RecipeCarousel', () => {
    beforeEach(() => {
      wrapper.setProps({
        numRecipes: 1,
      })
    })

    test('should not render a RecipeCarousel if the numRecipes prop is > 0', () => {
      expect(wrapper.find(RecipeCarousel)).toHaveLength(1)
    })
  })
})
