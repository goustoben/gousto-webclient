import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'
import GoustoImage from 'Image'
import { removeDiacritics } from 'utils/sanitizeText'
import { SimpleStarRating } from './SimpleStarRating'
import { SimpleRecipe } from './SimpleRecipe'
import { AddButton } from '../../../Menu/Recipe/AddButton'

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

  test('should contain one simple star rating component', () => {
    expect(wrapper.find(SimpleStarRating).length).toEqual(1)
  })

  test('should not contain any AddButton components', () => {
    expect(wrapper.find(AddButton).length).toEqual(0)
  })
})
