import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import GoustoImage from 'Image'
import { removeDiacritics } from 'utils/sanitizeText'
import { SimpleRecipe } from './SimpleRecipe'

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
    ]),
  }

  beforeEach(() => {
    removeDiacritics.mockImplementation((param) => param)
    wrapper = shallow(<SimpleRecipe {...recipe} />)
  })

  test('should contain one Gousto Image component', () => {
    expect(wrapper.find(GoustoImage).length).toEqual(1)
  })

  test('should contain the recipe title', () => {
    expect(wrapper.find('.recipeTitle').length).toEqual(1)
    expect(wrapper.find('.recipeTitle').text()).toEqual('test')
  })

  test('should contain TimeIndicator component', () => {
    expect(wrapper.find('TimeIndicator').length).toEqual(1)
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
})
