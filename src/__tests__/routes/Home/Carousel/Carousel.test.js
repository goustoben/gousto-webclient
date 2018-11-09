import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import Carousel from 'routes/Home/Carousel/Carousel'

import CTA from 'routes/Home/CTA'
import RecipeCarousel from 'routes/Home/Carousel/RecipeCarousel'
import ModuleHeader from 'components/ModuleHeader'

describe('Carousel', () => {
  test('should have Header and CTA elements, but no RecipeCarousel', () => {
    const wrapper = shallow(<Carousel />)

    expect(wrapper.find(ModuleHeader)).toHaveLength(1)
    expect(wrapper.find(RecipeCarousel)).toHaveLength(0)
    expect(wrapper.find(CTA)).toHaveLength(1)
  })

  test('should not render a RecipeCarousel if the numRecipes prop is > 0', () => {
    const wrapper = shallow(<Carousel numRecipes={1} />)
    expect(wrapper.find(RecipeCarousel)).toHaveLength(1)
  })
})
