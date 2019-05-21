import React from 'react'
import { shallow } from 'enzyme'
import Svg from 'Svg'
import CTAToAllRecipes from '../CTAToAllRecipes'

describe('CTA to all Recipes presentation', () => {
  let wrapper

  test('show image, text and button ', () => {
    wrapper = shallow(<CTAToAllRecipes/>)

    expect(wrapper.find(Svg)).toHaveLength(1)
    expect(wrapper.find('p')).toHaveLength(1)
    expect(wrapper.find('button')).toHaveLength(1)
  })
})
