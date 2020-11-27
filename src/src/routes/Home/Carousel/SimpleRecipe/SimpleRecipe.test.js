import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'
import GoustoImage from 'Image'
import { removeDiacritics } from 'utils/sanitizeText'
import { SimpleRecipe } from './SimpleRecipe'
import { AddRecipe } from '../../../Menu/Recipe/AddRecipe'

jest.mock('utils/sanitizeText', () => ({
  removeDiacritics: jest.fn(),
}))

describe('<SimpleRecipe />', () => {
  let wrapper
  const recipe = {
    id: 1,
    title: 'test',
    ratingCount: 1,
    averageRating: 4,
    maxMediaSize: 400,
    cookingTime: 35,
    media: Immutable.fromJS([
      {},
      {},
      {
        src: 'test',
      },
    ])
  }

  beforeEach(() => {
    removeDiacritics.mockImplementation((param => param))
    wrapper = shallow(<SimpleRecipe {...recipe} />)
  })

  test('should contain one Gousto Image component', () => {
    expect(wrapper.find(GoustoImage).length).toEqual(1)
  })

  test('should contain the recipe title', () => {
    expect(wrapper.find('.simpleHeading').length).toEqual(1)
    expect(wrapper.find('.simpleHeading').text()).toEqual('test')
  })

  test('should not contain any AddRecipe components', () => {
    expect(wrapper.find(AddRecipe).length).toEqual(0)
  })

  describe('when a recipe has reviews', () => {
    test('then should contain rating component', () => {
      expect(wrapper.find('Rating').length).toEqual(1)
    })
  })

  describe('when a recipe has no reviews', () => {
    beforeEach(() => {
      wrapper.setProps({
        averageRating: 0,
        ratingCount: 0,
      })
    })

    test('then should not contain rating component', () => {
      expect(wrapper.find('Rating').length).toEqual(0)
    })
  })

  describe('when isHomePageRedesignEnabled is false', () => {
    test('then should not contain TimeIndicator component', () => {
      expect(wrapper.find('TimeIndicator').length).toEqual(0)
    })
  })

  describe('when isHomePageRedesignEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isHomePageRedesignEnabled: true,
      })
    })

    test('then should contain TimeIndicator component', () => {
      expect(wrapper.find('TimeIndicator').length).toEqual(1)
    })
  })
})
