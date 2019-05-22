import React from 'react'
import { shallow } from 'enzyme'
import Svg from 'Svg'
import CTAToAllRecipes from '../CTAToAllRecipes'

describe('CTA to all Recipes presentation', () => {
  let wrapper

  test('show image, text and button ', () => {
    wrapper = shallow(<CTAToAllRecipes collectionFilterChange={jest.fn()}/>)

    expect(wrapper.find(Svg)).toHaveLength(1)
    expect(wrapper.find('p')).toHaveLength(1)
    expect(wrapper.find('button')).toHaveLength(1)
  })
})

describe('CTA logic', () => {
  test('should call collectionFilterChange on click', () => {
    const collectionFilterChangeMock = jest.fn()
    const wrapper = shallow(<CTAToAllRecipes collectionFilterChange={collectionFilterChangeMock}/>)

    wrapper.find('.ctaButton').simulate('click')
    expect(collectionFilterChangeMock).toHaveBeenCalledTimes(1)
  })
})
