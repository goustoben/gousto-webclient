import React from 'react'
import { shallow } from 'enzyme'
import { CTAToAllRecipes } from '../CTAToAllRecipes'

describe('CTAToAllRecipes', () => {
  let wrapper
  describe('given the collection is recommendations', () => {
    test('then CTA text and button should be displayed', () => {
      wrapper = shallow(
        <CTAToAllRecipes
          collectionFilterChange={jest.fn()}
          menuCurrentCollectionId="97270056-cd65-11e8-a2d2-067a72dd5dba"
        />
      )

      expect(wrapper.find('p')).toHaveLength(1)
      expect(wrapper.find('button')).toHaveLength(1)
    })
  })
  describe('given the collection is not recommendations', () => {
    test('then CTA text and button should not be displayed', () => {
      wrapper = shallow(
        <CTAToAllRecipes
          collectionFilterChange={jest.fn()}
          menuCurrentCollectionId="not recommendations"
        />
      )

      expect(wrapper.find('p')).toHaveLength(0)
      expect(wrapper.find('button')).toHaveLength(0)
    })
  })
})

describe('CTAToAllRecipes logic', () => {
  test('should call collectionFilterChange on click', () => {
    const collectionFilterChangeMock = jest.fn()
    const wrapper = shallow(
      <CTAToAllRecipes
        collectionFilterChange={collectionFilterChangeMock}
        menuCurrentCollectionId="97270056-cd65-11e8-a2d2-067a72dd5dba"
      />
    )
    wrapper.find('.ctaButton').simulate('click')
    expect(collectionFilterChangeMock).toHaveBeenCalledTimes(1)
  })
})
